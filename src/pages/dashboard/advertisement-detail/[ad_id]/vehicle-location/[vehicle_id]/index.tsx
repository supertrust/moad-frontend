import { useIcarusContext } from '@src/hooks/useIcarusContext';
import React, { useEffect, useRef, useState } from 'react';
import { useSaveLocation, useVehicleLocationDetails } from '@src/apis/map';
import { dateFormat } from '@src/helpers';
import { useRouter } from 'next/router';
import { Button } from '@src/components/common';
import { Map , Marker } from '@src/components/Map';
import Drawer from '@src/sections/vehicle-location/Drawer';
import { ILocation } from '@src/components/Map/Map';
import { DirectionsRenderer, InfoBox } from '@react-google-maps/api';
import Loader from '@src/components/Loader';

const VehicleLocationScreen = () => {
	const { query } = useRouter();
	const { ad_id, vehicle_id } = query;
	const { setPageTitle } = useIcarusContext();
	const [showDrawer, setShowDrawer] = useState(false);
	const { data: cargoLocation , refetch , isLoading, isRefetching} = useVehicleLocationDetails(vehicle_id as string);
	const [directions, setDirections] = useState<google.maps.DirectionsResult>()
	useEffect(() => {
		calculateRoute()
	},[cargoLocation])

	const toggleDrawer = () => {
		setShowDrawer(!showDrawer);
	};

	useEffect(() => {
		setPageTitle('차량위치');
	}, []);


	const starting_point = cargoLocation?.starting_point?.split(',');
	const end_point = cargoLocation?.end_point.split(',') ; 
	const current_point = cargoLocation?.current_point.split(',');
	const origin = starting_point && { lat: Number(starting_point[0]), lng : Number(starting_point[1]) }
	const destination = end_point && { lat: Number(end_point[0]), lng : Number(end_point[1]) }
	const currentPosition = current_point && { lat: Number(current_point[0]), lng : Number(current_point[1])}

	 
	const calculateRoute = async () => {
		if (!origin  || !destination ) {
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
		setDirections(results)
	};

  return (
    <div>
			{isLoading && 
				<div className='absolute z-50 left-0 w-full top-[50%]'>
					<div className='flex flex-row justify-center items-center'>
						<Loader size='lg' />
					</div>
				</div>
			}
      <Map 
        zoom={13}
        className="!h-[85vh]"
        location={currentPosition}
				showMarker={false}
      >
		
			{currentPosition && <Marker position={currentPosition as google.maps.LatLngLiteral}/>}
			{directions && (
				<DirectionsRenderer 
					directions={directions} 
					options={{
						// markerOptions : { 
						// 	icon: {
						// 		url: '/images/vehicle_location/marker.png',
						// 		scaledSize: new window.google.maps.Size(0, 0),
						// 	}
						// }
						
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
		{/* <Marker position={locations.destination}>
			<InfoBox >
				<div>
					<div>
						Distance:{' '}
						{calculateDistance(locations.departure, locations.destination)}
						km{' '}
					</div>
					<div>Duration: 2h 15m</div>
				</div>
			</InfoBox>
		</Marker> */}
      </Map>
      <div className="absolute hidden sm:block bottom-20 left-[50%] sm:left-[50%] lg:left-[60%] ">
        <Button className="bg-[#2C324C] text-white w-20" onClick={() => refetch()} loading={isRefetching}>
          새로고침
        </Button>
      </div>
      <Drawer 
        open={showDrawer}
        handleClose={toggleDrawer}
				vehicle={cargoLocation}
				isLoading={isLoading}
      />
    </div>
  );
};

export default VehicleLocationScreen;
