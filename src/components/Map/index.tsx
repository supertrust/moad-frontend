import React, { ReactNode } from 'react';
import GoogleMapReact  from 'google-map-react'
import { GOOGLE_MAP_API_KEY } from '@src/config';
import Image from 'next/image';
import Marker from '@images/vehicle_location/marker.png';
import { clsx } from 'clsx';

export interface ILocation{
  address?: string,
  lat : number,
  lng: number,
}
interface MapProps {
  location?: ILocation
  zoom?: number
  children?: ReactNode
  hanldeApiLoad?:  ( props: { map: any;  maps: any }) => void
  className?: string
}

const Map = ({ location , zoom = 13 , children , hanldeApiLoad , className} : MapProps) => {

  // Seoul
  if(!location){
    location = { lat: 35.92386810767318, lng:127.97836979407211}
  }

  return (
    <div className={clsx(className , "h-[100vh] w-full")} >
      <GoogleMapReact
        bootstrapURLKeys={{ 
          key: [GOOGLE_MAP_API_KEY],
          language: "ko" ,
          region: "ko"
        }}
        defaultCenter={location}
        center={location }
        defaultZoom={zoom}
        zoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={( props ) => {
          console.log("Props =>", props);
        }}
        onZoomAnimationEnd ={( props) =>  console.log(" Zom End =>", props) }
      >
        {/* @ts-ignore */}
        <Image src={Marker} className='w-auto h-8' alt='' lat={location?.lat}  lng={location?.lng}/>
        {children}
      </GoogleMapReact>
    </div>
  )
}

export default Map