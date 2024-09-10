import React, { ReactNode, Ref, useEffect, useRef, forwardRef } from 'react'; '@src/config';
import { clsx } from 'clsx';
import { Map as KakaoMap, MapMarker, useKakaoLoader , MapComponent } from "react-kakao-maps-sdk"
import { KAKAO_MAP_API_KEY } from '@src/config';


export type ILocation = kakao.maps.LatLng
interface MapProps {
  location?: kakao.maps.LatLng
  zoom?: number
  children?: ReactNode
  className?: string
  showMarker?:boolean
  onClick?: (map: kakao.maps.Map , event: kakao.maps.event.MouseEvent) => void
  onLoad?: (map?: kakao.maps.Map) => void
}

const Map = ({ 
  location, 
  zoom = 13, 
  showMarker = true, 
  children, className,
  onClick ,
  onLoad,
    ...res
} : MapProps, ref: Ref<kakao.maps.Map>) => {

  const [ loading ] = useKakaoLoader({
    appkey: KAKAO_MAP_API_KEY || '', 
    libraries: ['services', 'clusterer', 'drawing'],
  })

  useEffect(() => {
    if(loading && onLoad) onLoad()
  },[loading])

  // Seoul
  if(!location){
    location = window.kakao && new kakao.maps.LatLng(35.92386810767318, 127.97836979407211);
  }

  return (
    <div className={clsx(className , "h-[100vh] w-full z-10")} >
        {!loading && 
          <KakaoMap
            ref={ref}
            center={location ?
              { lat: location.getLat(), lng: location.getLng() } : 
              { lat: 35.92386810767318, lng: 127.97836979407211 }
            }
            style={{ width: '100%', height: '100%' }}
            level={3}
            onClick={onClick}
              {...res}
          >
            {showMarker && 
              <MapMarker 
                position={location ?
                  { lat: location.getLat(), lng: location.getLng() } : 
                  { lat: 35.92386810767318, lng: 127.97836979407211 }
                } 
                image ={{ 
                  src: "/images/vehicle_location/marker.png" , 
                  size: { width: 50, height: 50}}
                } 
              />
            }
            {children}
          </KakaoMap>
        }
    </div>
  )
}

export default forwardRef(Map)