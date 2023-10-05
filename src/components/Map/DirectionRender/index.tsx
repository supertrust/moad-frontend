import { useGetDirection } from '@src/apis/kakap.map';
import { IGetDirection } from '@src/types/kakao.map'
import React from 'react'
import { Polyline, PolylineProps } from 'react-kakao-maps-sdk';

interface DirectionRenderProps extends Omit<PolylineProps, 'path'> {
    origin?: kakao.maps.LatLng
    destination?: kakao.maps.LatLng 
    defaultDirections?: IGetDirection
}

function DirectionRender({ 
    origin, 
    destination , 
    defaultDirections, 
    strokeWeight,
    strokeColor,
    strokeOpacity,
    strokeStyle,
    ...rest
} : DirectionRenderProps) {

    const { data } = useGetDirection({ 
        origin: origin  ? `${origin.getLng()},${origin.getLat()}` : '',
        destination: destination  ? `${destination.getLng()},${destination.getLat()}` : '',
        car_type: 4 ,
        priority:'DISTANCE'
    });

    const directions = data || defaultDirections ;
    const { routes } = directions || {};

    const path: {lat: number, lng: number}[] = [];
    if(routes?.length && routes[0].sections?.length ) {
        routes[0].sections[0].roads.map((road) => {
            const { vertexes } = road;
            for (let index = 0; index < vertexes.length; index = index + 2) {
                path.push({ lat: vertexes[index+1],lng: vertexes[index] });
            }
        });
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