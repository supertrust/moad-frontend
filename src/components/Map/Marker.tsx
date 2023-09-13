import React from 'react';
import { MarkerF as RGMarker , MarkerProps as RGMarketProps } from '@react-google-maps/api'

interface MarkerProps extends RGMarketProps {
    size?: number
}

function Marker({size, position, ...rest} : MarkerProps) {
    size = size || 40;

    return (
        <RGMarker 
            {...rest}
            position={position} 
            icon={{
                url: '/images/vehicle_location/marker.png',
                scaledSize: new window.google.maps.Size(size, size),
            }}
        />
    )
}

export default Marker