import { useIcarusContext } from '@src/hooks/useIcarusContext';
import React, { useEffect, useRef, useState } from 'react';
import { useFinishVehicleRide, useLogVehicleLocation, useSaveLocation, useVehicleLocationDetails } from '@src/apis/map';
import { dateFormat, formatTimeFromMinute } from '@src/helpers';
import { useRouter } from 'next/router';
import { Button, Controller, FormProvider, useForm, Yup, yupResolver} from '@src/components/common';
import { Map } from '@src/components/Map';
import { clsx } from 'clsx';
import { useConfirmDialog } from '@src/hooks/useConfirmationDialog';
import { ConfirmPropsType } from '@src/contexts/ConfirmDialogContext';
import { VehicleLocationState } from '@src/types/map';
import { IGetDirection } from '@src/types/kakao.map';
import { useGetDirection } from '@src/apis/kakap.map';
import { MapMarker } from 'react-kakao-maps-sdk';
import DirectionRender from '@src/components/Map/DirectionRender';
import PlaceAutoComplete from '@src/components/Map/PlaceAutoComplete';
import { getRoutesPath } from '@src/helpers/map';

interface IRide {
	// started: boolean,
	status?: VehicleLocationState
	origin?: kakao.maps.LatLng,
	originName? :string
	destination?: kakao.maps.LatLng,
	destinationName?: string
	current?: kakao.maps.LatLng,
	distance?: string,
	duration?: string,
	directions?: IGetDirection,
	currentIndex?: number
}

type PointType = 'origin' | 'destination' | 'current'

const RideSchema = Yup.object({
	origin: Yup.string().required("위치를 입력하세요."),
	destination: Yup.string().required("위치를 입력하세요."),
	current: Yup.string()
  })

const CargoLocationPage = () => {
	const { query } = useRouter();
	const { ad_id, vehicle_id } = query;
	const { setPageTitle } = useIcarusContext();
	const { mutateAsync: saveLocation, isLoading: isSaving } = useSaveLocation();
	const { mutateAsync: logVehicleLocation } = useLogVehicleLocation();
	const { mutateAsync: finishVehicleRide, isLoading: isEnding } = useFinishVehicleRide();
	const { confirm } = useConfirmDialog();

	const [map, setMap] = useState<kakao.maps.Map>();
	const mapRef = useRef<kakao.maps.Map>(null);
	const [center, setCenter] = useState<kakao.maps.LatLng | undefined>()
	const [ride , setRide] = useState<IRide>({ });
	let timer ;

	const { data: directions } =  useGetDirection({
		origin:  ride.origin ? `${ride.origin.getLng()},${ride.origin.getLat()}` : "",
		destination:  ride.destination ? `${ride.destination.getLng()},${ride.destination.getLat()}` : "",
		priority: "DISTANCE",
		car_type: 4
	});

	const { routes } = directions || {} ;


	const confirmOptions: ConfirmPropsType = {
		title: '',
		size: 'sm',
		cancelText: '확인',
		disableConfirmBtn: true,
		cancelButtonProps: {
			className: 'border-secondary bg-secondary text-white',
		},
		footerClassName: 'border-none flex flex-row justify-center mb-3',
	};

	useEffect(() => { 
		// calculateRoute() ;
		ride.current && setCenter(ride.current);
	}, [ride]);

	const [isReady, setIsReady] = useState(false);
	useEffect(() => {
		if(isReady && !center){
			const geolocation = navigator.geolocation;
			geolocation.getCurrentPosition(async position => {
				const { coords } = position;
				if(kakao?.maps){
					const gPosition =  new kakao.maps.LatLng(coords.latitude , coords.longitude) ;
					setRide({ ...ride , origin: gPosition })
					setCenter(gPosition);
					await changeInputLocationName(gPosition, 'origin');
				}
			});
		}
	},[])


	const methods = useForm({ 
		defaultValues: { origin : '' , destination: '' , current: ''},
		resolver: yupResolver(RideSchema)
	});
	const { handleSubmit, setValue, control } = methods;
	

	const handleStartRide = handleSubmit(async (props) => {
		try {
			if(ride.status === 'stopped'){
				return handleUpdateRide('running');
			}

			const  { origin, destination } = ride ;
			const currentDate = new Date();

			await saveLocation({
				cargo_vehicle_id: Number(vehicle_id),
				cargo_to_advertisement_id: Number(ad_id),
				starting_point: `${origin?.getLat()},${origin?.getLng()}`,
				end_point: `${destination?.getLat()},${destination?.getLng()}`,
				start_time: dateFormat(currentDate.toISOString()),
				end_time: '',
				current_point: `${origin?.getLat()},${origin?.getLng()}`,
				is_active: 'running',
				current_point_name:  '',
				passing_vehicle_descent: "0",
				passing_vehicle_up: "0",
			},{
				onSuccess: () =>  {
					confirm({
						...confirmOptions,
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
					setRide({ ...ride, status: 'running'})
					logCurrentLocation()
				},
				onError: (error) => confirm({
					...confirmOptions,
					description: (
						<div className='mt-3 text-secondary text-center'>{error}</div>
					),
				})
			});
		} catch(e) {
			// setSavingRide(false);
		}
	});

	const handleUpdateRide = async (status : VehicleLocationState) => {
		const current = ride.current as kakao.maps.LatLng;
		const currentDate = new Date();
		await finishVehicleRide({
			cargo_vehicle_id: Number(vehicle_id),
			end_point: `${current?.getLat()},${current?.getLng()}`,
			end_time:  dateFormat(currentDate.toISOString()),
			is_active: status
		}, {
			onSuccess: () => { 
				status !== 'running' && confirm({
					...confirmOptions,
					description: (
						<div className='mt-3'>
							<div className='text-secondary text-center mb-2 font-bold'>
								차량 위치
							</div>
							<div className='text-center'>
								{ status == 'stopped' ? '승차 중지' : '라이드 종료'}.
							</div>
						</div>
					),
				});
				setRide( { 
					...ride, 
					current: status == 'finish' ? undefined :  ride.current,
					status 
				})
			},
		})
	}

	const getLocationName = async (location: kakao.maps.LatLng) => {
		if(!window.kakao ) return ; 
		const geocodingService = new kakao.maps.services.Geocoder();
		return new Promise<string>((resolve, reject) => { 
			geocodingService.coord2Address(location.getLng(),location.getLat() ,  ( result ) => {
				resolve(result.length ? result[0].address.address_name : '')
			})
		})
	}

	useEffect(() => {
		setPageTitle('차량위치');

		// logCurrentLocation()
		return () => timer && clearInterval(timer)
	}, []);

	const handleDropMark = (location : kakao.maps.LatLng | null, type?: PointType) => {
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


	const renderMarker =  (position: kakao.maps.LatLng, type: PointType) => {
		return (
			<>
				<MapMarker 
					position={{ lat: position.getLat(), lng: position.getLng()}}
					draggable= { !ride.status || !['running', 'stop'].includes(ride.status)  }//{!ride.status || ride?.status == 'finish'}
					onDragEnd={async (marker) => {
						const position = marker.getPosition();
						if(position){
							const name = getLocationName(position);
							setRide({
								...ride, 
								directions: undefined,
								current: undefined,
								[type] : position ,
								[`${type}Name`]: name
							})

							await changeInputLocationName(position , type)
							// type == 'current' && await logCurrentLocation(latLng);
						}
					}}
				>
				{type == 'destination' && routes?.length && 
					<div className='px-2'>
						<div>Distance:{` ${routes[0].summary.distance > 1000 ? (routes[0].summary.distance / 1000 ).toLocaleString().slice(0,4)+'km' : (routes[0].summary.distance).toLocaleString()+'m' }`}</div>
						<div>Duration: {` ${formatTimeFromMinute(routes[0].summary.duration)}`}</div>
					</div>
				}
				</MapMarker>
			</>
		)
	}

	const changeInputLocationName = async (location: kakao.maps.LatLng, type: PointType) => {
		const locationName = await getLocationName(location) ;
		setValue(type, locationName || '');
		setRide({
			...ride,
			[type]: location,
			[`${type}Name`]: locationName
		})
	} 

	const logCurrentLocation = () => {
		timer = !timer && setInterval(async () => {
			setRide(prevRide => {
				
				const { currentIndex,  status } = prevRide;
				if(!directions || !status || ['stopped', 'finish'].includes(status)  ) return prevRide
				const roads = getRoutesPath(directions);
				
				if(currentIndex == roads.length - 1) {
					timer && clearInterval(timer);
					return { ...prevRide, status: 'finish', current: undefined }
				}

				const progress =  Math.floor(Math.random() * 10);
				let nextIndex =  (currentIndex || 0) + progress;
				if(nextIndex >= roads.length ) {
					nextIndex = roads.length - 1 ; 
				}
				const nextLocation = roads[nextIndex];

				logVehicleLocation({
					cargo_vehicle_id: Number(vehicle_id),
					current_point: `${nextLocation.lat},${nextLocation.lng}`,
					current_point_name: '',
					passing_vehicle_descent: '0',
					passing_vehicle_up: "0",
				})
				
				return { 
					...prevRide, 
					current: new kakao.maps.LatLng(nextLocation.lat, nextLocation.lng), 
					currentIndex: nextIndex  
				}
			})

		}, 10*1000); //5 * 60 * 1000
	}

	return (
		<div>
			<Map 
				ref={mapRef}
				zoom={13}
				className="!h-[85vh]"
				showMarker={false}
				onClick={(_, event) => handleDropMark( event.latLng )}
				location={center}
				onLoad={() => { setIsReady(true);
					// setMap(map);
				}}
			>
				{directions && <DirectionRender defaultDirections={directions} /> }
				{ride.origin && renderMarker(ride.origin, 'origin')}
				{ride.destination && renderMarker(ride.destination, 'destination')}
				{/* {ride.current && renderMarker(ride.current, 'current')} */}
				{ride.current && 
					<MapMarker 
						position={{ lat: ride.current.getLat(), lng: ride.current.getLng() } } 
						image ={{ 
							src: "/images/vehicle_location/marker.png" , 
							size: { width: 45, height: 45}
						}} 
					/>
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
					<div className='bg-white p-4 rounded-md z-50'>
						<FormProvider methods={methods}>
							<div className='flex flex-row mb-3 gap-3'>
								<Controller
									control={control}
									name='origin'
									render={({ fieldState: { error } }) => (
										<PlaceAutoComplete 
											placeholder='위치 입력'  
											value = {ride.origin && {
												lat: ride.origin?.getLat(),
												lng: ride.origin?.getLng(),
												name: ride.originName || ''
											}}
											onChange={ value => {
												if(value){
													setValue('origin', value.name)
													handleDropMark(new kakao.maps.LatLng(value?.lat, value?.lng), 'origin')
												}
											}}
											error={error?.message}
										/>
									)}
								/>
								<Controller
									control={control}
									name='destination'
									render={({ fieldState: { error } }) => (
										<PlaceAutoComplete 
											placeholder='위치 입력'   
											value = {ride.destination && {
												lat: ride.destination?.getLat(),
												lng: ride.destination?.getLng(),
												name: ride.destinationName || ''
											}}
											onChange={ value => {
												if(value){
													setValue('destination', value.name)
													handleDropMark(new kakao.maps.LatLng(value?.lat, value?.lng), 'destination')
												}
											}}
											error={error?.message}
										/>
									)}
								/>
							</div>
						</FormProvider>
						<div className='flex flex-row gap-2'>
							<Button 
								onClick={handleStartRide} 
								className="bg-secondary text-white px-4"
								loading={isSaving}
								disabled={ ride.status ? 
										ride.status !== 'stopped' : 
										(!ride.origin || !ride.destination)  
								}
							>시작</Button>
							<Button 
								className="bg-danger text-white px-4" 
								disabled ={ ride.status !== 'running' }
								onClick={() =>  handleUpdateRide('stopped')}
								loading={ ride.status == 'running' && isEnding }
							>중지 </Button>
							<Button 
								className="bg-primary text-white px-4" 
								disabled ={ !ride.status && ride.status !== 'finish' }
								onClick={() =>  handleUpdateRide('finish')}
								loading={ !!ride.status && isEnding }
							> 완료 </Button>
						</div>
					</div>
				</div>
			}
		</div>
	);
};

export default CargoLocationPage;
