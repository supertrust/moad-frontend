import { useIcarusContext } from '@src/hooks/useIcarusContext';
import React, { useEffect, useState } from 'react';
import { useSaveLocation } from '@src/apis/map';
import { dateFormat } from '@src/helpers';
import { useRouter } from 'next/router';
import { Button } from '@src/components/common';
import { Map , Marker } from '@src/components/Map';
import { DirectionsRenderer, InfoWindow } from '@react-google-maps/api';

interface IRide {
	origin?: google.maps.LatLng ,
	destination?: google.maps.LatLng 
	distance?: string,
	duration?: string,
	directions?:google.maps.DirectionsResult
}

const CargoLocationPage = () => {
	const { query } = useRouter();
	const { ad_id, vehicle_id } = query;
	const { setPageTitle } = useIcarusContext();

	const [isReady, setIsReady] = useState(false);
	const [center, setCenter] = useState<google.maps.LatLng | undefined>()
	const [ride , setRide] = useState<IRide>({});

	useEffect(() => {
		const geolocation = navigator.geolocation;
		geolocation.getCurrentPosition(position => {
			if(isReady){
				const { coords } = position;
				const gPosition =  new google.maps.LatLng(coords.latitude , coords.longitude);
				setRide({ ...ride , origin: gPosition })
				setCenter(gPosition);
			}
		});
	},[isReady])


	useEffect(() => { calculateRoute() }, [ride])

	// const handleStartRide = async (event: any) => {
	// 	try {
	// 		setSavingRide(true);
	// 		event.preventDefault();
	// 		const currentDate = new Date();
	// 		const data = {
	// 			cargo_vehicle_id: 1,
	// 			starting_point: startInputRef.current?.value || '',
	// 			end_point: endInputRef.current?.value || '',
	// 			start_time: dateFormat(currentDate.toLocaleDateString()),
	// 			end_time: dateFormat(currentDate.toLocaleDateString()),
	// 			route_no: Date.now(),
	// 		};
	// 		await saveLocation(data);
	// 	} catch {
	// 		setSavingRide(false);
	// 	}
	// };

	useEffect(() => {
		setPageTitle('차량위치');
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

	const handleDropMark = (location : google.maps.LatLng | null) => {
		if(!location) return;
		const { origin } = ride; 
		setCenter(location);
		const init = { direction: undefined, distance: undefined, duration: undefined}
		if(!origin) {
			return setRide({ ...ride, ...init, origin : location }) ;
		}
		return setRide({ ...ride,...init, destination : location }) ;
	}


	const [showInfo, setShowInfo] = useState(false);
	const renderMarker = (position: google.maps.LatLng, type: 'origin' | 'destination') => {
		
		return (
			<>
				<Marker 
					position={position}
					draggable={true}
					onDragEnd={(e) => setRide({
						...ride, 
						directions: undefined,
						[type] : e.latLng 
					})}
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
	

	return (
		<div>
			<Map 
				zoom={13}
				className="!h-[85vh]"
				showMarker={false}
				onClick={handleDropMark}
				location={center}
				onLoad={() => setIsReady(true)}
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
				)}
				{ride.origin && renderMarker(ride.origin, 'origin')}
				{ride.destination && renderMarker(ride.destination, 'destination')}

			</Map>
			<div className="absolute hidden sm:block bottom-20 left-[40%] sm:left-[40%] lg:left-[50%] ">
				<div className='flex flex-row gap-2'>
					<Button className="bg-secondary text-white px-4">
						시작 
					</Button>
					<Button className="bg-danger text-white px-4">
						중지 
					</Button>
					<Button className="bg-primary text-white px-4">
						완료 
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CargoLocationPage;
