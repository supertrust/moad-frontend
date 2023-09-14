import React, { ReactNode, forwardRef, useRef, useState } from 'react';
import { GOOGLE_MAP_API_KEY } from '@src/config';
import { clsx } from 'clsx';
import { 
  useJsApiLoader,
  GoogleMap ,
  Marker,
} from '@react-google-maps/api';

export interface ILocation{
  address?: string,
  lat : number,
  lng: number,
}
interface MapProps {
  location?: google.maps.LatLng | google.maps.LatLngLiteral
  zoom?: number
  children?: ReactNode
  className?: string
  showMarker?:boolean
  onLoad?: (map: google.maps.Map) => void
  onClick?: (location: google.maps.LatLng | null) => void
}

const Map = ({ 
  location, 
  zoom = 13, 
  showMarker = true, 
  children, className,
  onClick ,
  onLoad,
} : MapProps) => {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_API_KEY || '',
    libraries: ['places'],
    language: "ko",
    region: "KO",    
  })

  const map = useRef<GoogleMap | undefined>();
  const [center, setCenter] = useState();


  // Seoul
  if(!location){
    location = { lat: 35.92386810767318, lng:127.97836979407211}
  }

  return (
    <div className={clsx(className , "h-[100vh] w-full")} >
        {isLoaded && 
          <GoogleMap
            center={center || location}
            zoom={zoom}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: true,

            }}
            onLoad={map => onLoad && onLoad(map)}
            onClick={(e) => onClick && onClick(e.latLng)}
          >
            {showMarker && <Marker 
              position={location} 
              icon={{
                url: '/images/vehicle_location/marker.png',
                scaledSize: new window.google.maps.Size(40,40),
              }}
            />}
            {children}
          </GoogleMap>
        }
    </div>
  )
}

export default Map