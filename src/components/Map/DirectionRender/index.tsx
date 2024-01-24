import { useGetDirection } from '@src/apis/kakap.map';
import { IGetDirection } from '@src/types/kakao.map'
import React, { useEffect, useState } from 'react'
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
      
    const reversedLocations = logs?.map((log,index) => {
        const [latitude, longitude] = log.location.split(',').map(parseFloat);
        if(index < 30){
            return `${longitude.toFixed(7)},${latitude.toFixed(7)}`;
        }
      });
    
      const result = logs?.length && logs?.length < 30 ? reversedLocations?.join(' | ') : '';

    const { data ,refetch } = useGetDirection({ 
        origin: origin  ? `${origin.getLng()},${origin.getLat()}` : '',
        destination: destination  ? `${destination.getLng()},${destination.getLat()}` : '',
        waypoints: result,
        car_type: 4 ,
        priority:'DISTANCE'
    });

    useEffect(() => {
        refetch
    }, [origin,destination])
    
    const directions = data || defaultDirections ;
    const { routes } = directions || {};

    const path: {lat: number, lng: number}[] = [];
    
    if(logs?.length && logs?.length  > 5){       
        if(origin){
            path.push({ lat: origin.getLat(),lng: origin.getLng() })
        } 
        logs?.map((log) => {
            const [latitude, longitude] = log.location.split(',').map(parseFloat);
            path.push({ lat: latitude,lng: longitude });
            return `${longitude.toFixed(7)},${latitude.toFixed(7)}`;
        });
        if(destination){
            path.push({ lat: destination.getLat(),lng: destination.getLng() })
        }

    }else{
        if(routes?.length && routes[0].sections?.length ) {
            routes[0].sections.map((data) => {
                data?.distance > 0 && data?.roads.map((road) => {
                    const { vertexes } = road;
                    for (let index = 0; index < vertexes.length; index = index + 2) {
                        path.push({ lat: vertexes[index+1],lng: vertexes[index] });
                    }
                })
            });
        }
    }

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