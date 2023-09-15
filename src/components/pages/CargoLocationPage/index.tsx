import { useIcarusContext } from '@src/hooks/useIcarusContext';
import React, { useEffect, useRef, useState } from 'react';
import { useLogVehicleLocation, useSaveLocation, useVehicleLocationDetails } from '@src/apis/map';
import { dateFormat } from '@src/helpers';
import { useRouter } from 'next/router';
import { Button, FormProvider, useForm, Yup, yupResolver} from '@src/components/common';
import { Map , Marker } from '@src/components/Map';
import { Autocomplete, DirectionsRenderer, InfoWindow, Polyline } from '@react-google-maps/api';
import Input from '@src/components/common/Input';
import { clsx } from 'clsx';
import { useConfirmDialog } from '@src/hooks/useConfirmationDialog';
import { ConfirmPropsType } from '@src/contexts/ConfirmDialogContext';

interface IRide {
	origin?: google.maps.LatLng | google.maps.LatLngLiteral,
	destination?: google.maps.LatLng | google.maps.LatLngLiteral,
	currentPosition?: google.maps.LatLng | google.maps.LatLngLiteral,
	distance?: string,
	duration?: string,
	directions?:google.maps.DirectionsResult
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
	const [center, setCenter] = useState<google.maps.LatLng | google.maps.LatLngLiteral | undefined>()
	const [ride , setRide] = useState<IRide>({});
	useEffect(() => { 
		calculateRoute() ;
		ride.currentPosition && setCenter(ride.currentPosition);
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


	const { data: cargoLocation } = useVehicleLocationDetails(vehicle_id as string);
	useEffect(() => {
		if(cargoLocation) {
			const origin = cargoLocation.starting_point.split(',') ;
			const destination = cargoLocation.end_point.split(',');
			const current_point = cargoLocation.current_point.split(',');
			setRide ({
				origin : { lat: Number(origin[0]),  lng: Number(origin[1]) },
				destination: { lat: Number(destination[0]),  lng: Number(destination[1]) },
				currentPosition: { lat: Number(current_point[0]), lng: Number(current_point[1]) },
				directions: undefined
			});
			calculateRoute()
		}
	},[cargoLocation])

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
				onSuccess: () =>  confirm({
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
				}),
				onError: (error) => {
					confirm({
						...options,
						description: (
							<div className='mt-3 text-secondary text-center'>{error}</div>
						),
					});
				},
			});
		} catch(e) {
			// setSavingRide(false);
			console.log("Error =>", e);
		}
	});

	useEffect(() => {
		setPageTitle('차량위치');

		if(cargoLocation) {
			// Log cargo current location every 5 min
			setInterval(() => {
				const geolocation = navigator.geolocation;
				geolocation.getCurrentPosition(async (position) => {
					const { coords } = position;
					const geocodingService = new google.maps.Geocoder();
					const { results } = await geocodingService.geocode({ location: ride.origin });

					await logVehicleLocation({
						cargo_vehicle_id: Number(vehicle_id),
						current_point: `${coords.latitude},${coords.longitude}`,
						current_point_name: results?.length && results[0] ? results[0].formatted_address : '',
						passing_vehicle_descent: '0',
						passing_vehicle_up: "0",
					},{
						onSuccess: () => console.log("Log Position =>", coords)
					})
				});

			}, 60*1000); //5 * 60 * 1000
		}
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
		const init = { direction: undefined, distance: undefined, duration: undefined}
		if(type){
			return setRide({ ...ride, ...init, [type]: location }) ;
		}
		if(!origin) {
			return setRide({ ...ride, ...init, origin: location }) ;
		}
		return setRide({ ...ride,...init, destination: location }) ;
	}


	const [showInfo, setShowInfo] = useState(false);
	const renderMarker = (position: google.maps.LatLng | google.maps.LatLngLiteral, type: PointType) => {
		return (
			<>
				<Marker 
					position={position}
					draggable={!cargoLocation}
					onDragEnd={(e) => {
						setRide({
							...ride, 
							directions: undefined,
							[type] : e.latLng 
						})
						// const geocodingService = new google.maps.Geocoder();
						// geocodingService.geocode({ location: ride.origin } , (result, status) => {
						// 	originRef.current?.value = result ? result[0] : "";
						// })
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
		const refs = { origin: originRef , destination: destinationRef }
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

	const { starting_point, end_point, current_point } = cargoLocation || {} 

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
					// <Polyline 
					// 	path={ride.directions.routes.flatMap((route) => {
					// 		return route.overview_path
					// 	})}
					// 	options={{ strokeColor: "#2183FE" }}
					// />
				)}
				{ride.origin && renderMarker(ride.origin, 'origin')}
				{ride.destination && renderMarker(ride.destination, 'destination')}
				{ride.currentPosition &&  starting_point !== current_point && end_point !== current_point &&
					<Marker position={ride.currentPosition}  />
				}
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
											readOnly={!!cargoLocation}
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
											readOnly={!!cargoLocation}
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
								disabled={ !cargoLocation ? (!ride.origin || !ride.destination) : true }
							>시작</Button>
							<Button 
								className="bg-danger text-white px-4" 
								disabled={ !['running'].includes(cargoLocation?.is_active || '') }

							>중지 </Button>
							<Button 
								className="bg-primary text-white px-4" 
								disabled={ !['running', 'stopped'].includes(cargoLocation?.is_active || '') }
							> 완료 </Button>
						</div>
					</div>
				</div>
			}
		</div>
	);
};

export default CargoLocationPage;
