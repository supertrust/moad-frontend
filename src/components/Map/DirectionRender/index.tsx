import { useGetDirection } from '@src/apis/kakap.map';
import { IGetDirection } from '@src/types/kakao.map'
import React, { useEffect } from 'react'
import { Polyline, PolylineProps } from 'react-kakao-maps-sdk';

interface DirectionRenderProps extends Omit<PolylineProps, 'path'> {
    origin?: kakao.maps.LatLng
    destination?: kakao.maps.LatLng 
    defaultDirections?: IGetDirection
    logs?: {location : string}[]
}

function DirectionRender({ 
    origin, 
    destination , 
    logs, 
    defaultDirections, 
    strokeWeight,
    strokeColor,
    strokeOpacity,
    strokeStyle,
    ...rest
} : DirectionRenderProps) {

    const totalObjects = logs?.length || 0;
      
    // Calculate the start and end indices for the middle 5 objects
    // const middleStart = Math.max(0, Math.floor((totalObjects - 5) / 2));
    // const middleEnd = Math.min(totalObjects, middleStart + 5);
    
    // Extract the middle 5 objects from logs?
    // const middleObjects = logs?.slice(middleStart, middleEnd);

    // const reversedLocations = middleObjects?.map((log) => {
    //     const [latitude, longitude] = log.location.split(',').map(parseFloat);
    //     return `${longitude.toFixed(7)},${latitude.toFixed(7)}`;
    //   });
    
    //   const result = reversedLocations?.join(' | ');

    const { data ,refetch } = useGetDirection({ 
        origin: origin  ? `${origin.getLng()},${origin.getLat()}` : '',
        destination: destination  ? `${destination.getLng()},${destination.getLat()}` : '',
        // waypoints: result,
        car_type: 4 ,
        priority:'DISTANCE'
    });

    useEffect(() => {
        refetch
    }, [origin,destination])
    
    const directions = data || defaultDirections ;
    const { routes } = directions || {};

    const path: {lat: number, lng: number}[] = [];
    if(routes?.length && routes[0].sections?.length ) {
        routes[0].sections.map((data) => {
            data?.distance > 0 && data?.roads.map((road) => {
                const { vertexes } = road;
                for (let index = 0; index < vertexes.length; index = index + 2) {
                    // path.push({ lat: vertexes[index+1],lng: vertexes[index] });
                }
            })
        });
    }
    logs?.map((log) => {
        const [latitude, longitude] = log.location.split(',').map(parseFloat);
        path.push({ lat: latitude,lng: longitude });
        return `${longitude.toFixed(7)},${latitude.toFixed(7)}`;
      });
    console.log('logs', logs)
    return (
        <>
           {directions && 
                <Polyline
                    {...rest}
                    path={path}
                    strokeWeight={strokeWeight || 10} 
                    strokeColor={strokeColor || "#39f"} 
                    strokeOpacity={strokeOpacity || 0.7} 
                    strokeStyle={strokeStyle || "solid"}
                />
            }
        </>
    )
}

export default DirectionRender