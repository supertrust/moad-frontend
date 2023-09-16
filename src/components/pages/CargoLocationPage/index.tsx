import { useIcarusContext } from '@src/hooks/useIcarusContext';
import React, { useEffect, useRef, useState } from 'react';
import { useLogVehicleLocation, useSaveLocation, useVehicleLocationDetails } from '@src/apis/map';
import { dateFormat } from '@src/helpers';
import { useRouter } from 'next/router';
import { Button, FormProvider, useForm, Yup, yupResolver} from '@src/components/common';
import { Map , Marker } from '@src/components/Map';
import { Autocomplete, DirectionsRenderer, InfoWindow, PolylineF } from '@react-google-maps/api';
import Input from '@src/components/common/Input';
import { clsx } from 'clsx';
import { useConfirmDialog } from '@src/hooks/useConfirmationDialog';
import { ConfirmPropsType } from '@src/contexts/ConfirmDialogContext';
import { ILocation } from '@src/components/Map/Map';

interface IRide {
	started: boolean,
	origin?: ILocation,
	destination?: ILocation,
	current?: ILocation,
	distance?: string,
	duration?: string,
	directions?:google.maps.DirectionsResult,
	currentIndex?: number
	progress?: number[];
	currentLoc?: string
}

type PointType = 'origin' | 'destination' | 'current'

const RideSchema = Yup.object({
	origin: Yup.string().required("위치를 입력하세요."),
	destination: Yup.string().required("위치를 입력하세요."),
	current: Yup.string()
  })

const CargoLocationPage = () => {
	const { query } = useRouter();
	const { vehicle_id } = query;
	const { setPageTitle } = useIcarusContext();
	const { mutateAsync: saveLocation, isLoading: isSaving } = useSaveLocation();
	const { mutateAsync: logVehicleLocation } = useLogVehicleLocation();
	const { confirm } = useConfirmDialog();

	const originRef = useRef<typeof Input>();
	const destinationRef = useRef<typeof Input>();
	const [map, setMap] = useState<google.maps.Map>();
	const [center, setCenter] = useState<ILocation | undefined>()
	const [ride , setRide] = useState<IRide>({started : false });
	let timer ;

	useEffect(() => { 
		calculateRoute() ;
		ride.current && setCenter(ride.current);
	}, [ride]);

	const [isReady, setIsReady] = useState(false);
	useEffect(() => {
		if(isReady && !center){
			const geolocation = navigator.geolocation;
			geolocation.getCurrentPosition(position => {
				const { coords } = position;
				const gPosition =  new google.maps.LatLng(coords.latitude , coords.longitude);
				// setRide({ ...ride , origin: gPosition })
				setCenter(gPosition);
			});
		}
	},[isReady])


	// const { data: cargoLocation } = useVehicleLocationDetails(vehicle_id as string);

	const methods = useForm({ 
		defaultValues: { origin : '' , destination: '' , current: ''},
		resolver: yupResolver(RideSchema)
	});
	const { handleSubmit, formState: { errors } , setValue } = methods;
	

	const handleStartRide = handleSubmit(async (props) => {
		try {
			const origin = ride.origin as google.maps.LatLng;
			const destination = ride.destination as google.maps.LatLng;
			const currentDate = new Date();
			const geocodingService = new google.maps.Geocoder();
			const { results } = await geocodingService.geocode({ location: ride.origin });

			const options: ConfirmPropsType = {
				title: '',
				size: 'sm',
				cancelText: '확인',
				disableConfirmBtn: true,
				cancelButtonProps: {
					className: 'border-secondary bg-secondary text-white',
				},
				footerClassName: 'border-none flex flex-row justify-center mb-3',
			};

			await saveLocation({
				cargo_vehicle_id: 5,
				cargo_to_advertisement_id: 12,
				starting_point: `${origin?.lat()},${origin?.lng()}`,
				end_point: `${destination?.lat()},${destination?.lng()}`,
				start_time: dateFormat(currentDate.toISOString()),
				end_time: '',
				current_point: `${origin?.lat()},${origin?.lng()}`,
				is_active: 'running',
				current_point_name: results?.length && results[0] ? results[0].formatted_address : '',
				passing_vehicle_descent: "low",
				passing_vehicle_up: "low",
			},{
				onSuccess: () =>  {
					confirm({
						...options,
						description: (
							<div className='mt-3'>
								<div className='text-secondary text-center mb-2 font-bold'>
									차량 위치
								</div>
								<div className='text-center'>
									여행 저장 성공.
								</div>
							</div>
						),
					});
					logCurrentLocation()
					setRide({ ...ride, started: true})
				},
				onError: (error) => confirm({
					...options,
					description: (
						<div className='mt-3 text-secondary text-center'>{error}</div>
					),
				})
			});
		} catch(e) {
			// setSavingRide(false);
			console.log("Error =>", e);
		}
	});

	const getLocationName = async (location: ILocation) => {
		const geocodingService = new google.maps.Geocoder();
		const { results } = await geocodingService.geocode({ location: ride.origin });
		return results?.length && results[0] ? results[0].formatted_address : ""
	}

	useEffect(() => {
		setPageTitle('차량위치');

		logCurrentLocation()
		return () => timer && clearInterval(timer)
	}, []);

	const calculateRoute = async () => {
		const { origin , destination , directions } = ride ;
		if (!origin  || !destination || directions) {
			return
		}
		const directionsService = new google.maps.DirectionsService()
		const results = await directionsService.route({
			origin, 
			destination,
			travelMode: google.maps.TravelMode.DRIVING,
			language: "ko",
		})

		if(!results) return;
		setRide({
			...ride,
			directions: results,
			//@ts-ignore
			distance: results?.routes?.length ? results.routes[0].legs[0].distance.text : '',
			//@ts-ignore
			duration:  results?.routes?.length ? results.routes[0].legs[0].duration.text : ''
		})
	};

	const handleDropMark = (location : google.maps.LatLng | null, type?: PointType) => {
		if(!location) return;
		const { origin } = ride; 
		setCenter(location);
		const init = { directions: undefined, distance: undefined, duration: undefined }
		if(type){
			return setRide({ ...ride, ...init, current: undefined, [type]: location }) ;
		}
		if(!origin) {
			changeInputLocationName(location, 'origin')
			return setRide({ ...ride, ...init, origin: location, current: undefined }) ;
		}
		changeInputLocationName(location, 'destination')
		return setRide({ ...ride,...init, destination: location, current: undefined  }) ;
	}


	const [showInfo, setShowInfo] = useState(false);
	const renderMarker =  (position: ILocation, type: PointType) => {
		return (
			<>
				<Marker 
					position={position}
					draggable={true}
					onDragEnd={async (e) => {
						const { latLng } = e;
						if(latLng){
							setRide({
								...ride, 
								directions: undefined,
								current: undefined,
								[type] : latLng ,
							})
							await changeInputLocationName(latLng , type)
							// type == 'current' && await logCurrentLocation(latLng);
						}
					}}
					onClick={() =>  type == 'destination' && setShowInfo(true)}
					onMouseUp={() =>  type == 'destination' && setShowInfo(true)}
				>
				{type == 'destination' && showInfo && 
					<InfoWindow onCloseClick={() => setShowInfo(false)} >
						<>
							<div>Distance:{` ${ride.distance}`}</div>
							<div>Duration: {` ${ride.duration}`}</div>
						</>
					</InfoWindow>
				}
				</Marker>
			</>
		)
	}
	
	const handleChangePlace = async ( type: PointType) => {
		const refs = { origin: originRef , destination: destinationRef };
		//@ts-ignore
		const query = refs[type].current?.value || '';
		setValue(type, query);
		if(!map || !query) return;
		const placeService = new google.maps.places.PlacesService(map);
		placeService.findPlaceFromQuery({ fields: ['ALL'], language:"ko" , query }, (result, status) => {
			if(status == 'OK' && result){
				result[0].geometry?.location && 
				handleDropMark(result[0].geometry.location , type )
			}
		})
	}


	const changeInputLocationName = async (location: ILocation, type: PointType) => {
		const refs = { origin: originRef , destination: destinationRef };
		const ref = refs[type];
		if(ref){
			const locationName = await getLocationName(location) ;
			if(ref.current?.value !== locationName){
				ref.current.value = locationName;
				setValue(type, locationName)
			}
		}
	} 

	const logCurrentLocation = () => {
		timer = !timer && setInterval(async () => {
			setRide(prevRide => {
				
				const { directions, currentIndex,  started } = prevRide;
				if(!directions || !started ) return prevRide
				const { overview_path } = directions.routes[0];
				
				if(currentIndex == overview_path.length - 1) {
					timer && clearInterval(timer);
					return { ...prevRide, started: false, current: undefined }
				}

				const progress =  Math.floor(Math.random() * 10);
				let nextIndex =  (currentIndex || 0) + progress;
				if(nextIndex >= overview_path.length ) {
					nextIndex = overview_path.length - 1 ; 
				}
				const nextLocation = overview_path[nextIndex];

				const geocodingService = new google.maps.Geocoder();

				geocodingService.geocode({ location: nextLocation }, async (results ,  status) => {
					if(status == 'OK')
					logVehicleLocation({
						cargo_vehicle_id: Number(vehicle_id),
						//@ts-ignore
						current_point: `${nextLocation.lat()},${nextLocation.lng()}`,
						current_point_name: results?.length && results[0] ? results[0].formatted_address : '',
						passing_vehicle_descent: '0',
						passing_vehicle_up: "0",
					},{
						onSuccess: () => console.log("Log Position =>", nextLocation.toString())
					})
				});
				
				return { 
					...prevRide, 
					current: nextLocation, 
					currentLoc: nextLocation.toString(),
					currentIndex: nextIndex  
				}
			})

		}, 10*1000); //5 * 60 * 1000
	}

	return (
		<div>
			<Map 
				zoom={13}
				className="!h-[85vh]"
				showMarker={false}
				onClick={handleDropMark}
				location={center}
				onLoad={(map) => {
					setMap(map);
					setIsReady(true);
				}}
			>
				{ride.directions && (
					<DirectionsRenderer 
						directions={ride.directions} 
						options={{
							markerOptions : { 
								icon: {
									url: '/images/vehicle_location/marker.png',
									scaledSize: new window.google.maps.Size(0, 0),
								}
							}
							
						}} 
					/>
					// <PolylineF 
					// 	path={ride.directions.routes.flatMap((route) => {
					// 		return route.overview_path
					// 	})}
					// 	options={{ 
					// 		strokeColor: "#2183FE", 
					// 		strokeOpacity: 60 ,
					// 		strokeWeight: 5,
					// 		geodesic: true
					// 	}}
					// />
				)}
				{ride.origin && renderMarker(ride.origin, 'origin')}
				{ride.destination && renderMarker(ride.destination, 'destination')}
				{ride.current && renderMarker(ride.current, 'current')}
				{/* {ride.current &&  starting_point !== current_point && end_point !== current_point &&
					<Marker position={ride.current}  />
				} */}
			</Map>
			{isReady && 
				<div 
					className={clsx(
						"absolute bottom-0 md:bottom-40 z-[200]",
						"w-full sm:w-auto",
						"left-0 sm:left-[20%] md:left-[30%] lg:left-[40%]",
					)}
				>
					<div className='bg-white p-4 rounded-md'>
						<FormProvider methods={methods}>
							<div className='flex flex-row mb-3 gap-3'>
								<Autocomplete >
									<>
										<Input 
											ref={originRef}
											name="origin"
											className={clsx("border rounded-md p-2" , errors.origin && 'border-danger')}
											placeholder='위치 입력'
											type='text'
											readOnly={ride.started}
											onBlur={() => handleChangePlace('origin')}
										/>
										{errors.origin && 
											<span className='text-danger text-xs'>{errors.origin.message}</span>}
									</>
								</Autocomplete>
								<Autocomplete >
									<>
										<Input 
											ref={destinationRef}
											name="destination" 
											type='text' 
											placeholder='위치 입력'  
											className={clsx("border rounded-md p-2" , errors.destination && 'borde-danger')}
											readOnly={ride.started}
											onBlur={() => handleChangePlace('destination')}
										/>
										{errors.destination && 
											<span className='text-danger text-xs'>{errors.destination.message}</span>}
									</>
								</Autocomplete>
							</div>
						</FormProvider>
						<div className='flex flex-row gap-2'>
							<Button 
								onClick={handleStartRide} 
								className="bg-secondary text-white px-4"
								loading={isSaving}
								disabled={ ride.started ? true : (!ride.origin || !ride.destination)  }
							>시작</Button>
							<Button 
								className="bg-danger text-white px-4" 
								disabled
							>중지 </Button>
							<Button 
								className="bg-primary text-white px-4" 
								disabled //={ !['running', 'stopped'].includes(cargoLocation?.is_active || '') }
							> 완료 </Button>
						</div>
					</div>
				</div>
			}
		</div>
	);
};

export default CargoLocationPage;
