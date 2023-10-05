import { KOKAO_MAP_URL } from "@src/config";
import { IGetDirection } from "@src/types/kakao.map";
import { MutableRefObject } from "react";

export const getMapScriptTag = (mapRef: null) => {
  // console.log("KOKAO_MAP_URL", KOKAO_MAP_URL);
  const script = document.createElement("script");
  script.async = true;
  if (KOKAO_MAP_URL !== undefined) {
    script.src = KOKAO_MAP_URL;
  }
  return script;
};

declare global {
  interface Window {
    kakao: any;
  }
}
export const registerEvents = (
  mapScript: HTMLScriptElement,
  mapRef: MutableRefObject<null>,
  startInputRef: MutableRefObject<HTMLInputElement | null>,
  endInputRef: MutableRefObject<HTMLInputElement | null>
) => {
  mapScript.onload = () => {
    window.kakao.maps.load(() => {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);
      const geocoder = new window.kakao.maps.services.Geocoder();

      // Create marker for start location
      const startMarker = new window.kakao.maps.Marker({
        position: map.getCenter(),
        map,
      });

      // Create marker for end location
      const endMarker = new window.kakao.maps.Marker({
        position: map.getCenter(),
        map,
      });

      // Event listener for map click
      window.kakao.maps.event.addListener(
        map,
        "click",
        function (mouseEvent: { latLng: any }) {
          const position = mouseEvent.latLng;
          // console.log(
          //   "position.getLat(),position.getLng()",
          //   position.getLng(),
          //   position.getLat()
          // );

          geocoder.coord2Address(
            position.getLng(),
            position.getLat(),
            (result: { address: any }[], status: any) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const roadAddress = result[0].address;
                // console.log("this was the address result", roadAddress);
              }
            }
          );
          // Check if start location is set
          if (!startInputRef?.current?.value) {
            startMarker.setPosition(position);
            if (startInputRef.current !== null) {
              startInputRef.current.value = `${position.getLat()}, ${position.getLng()}`;
            }
          }
          // Check if start location is set and end location is not set
          else if (!endInputRef?.current?.value) {
            endMarker.setPosition(position);
            if (endInputRef.current !== null) {
              endInputRef.current.value = `${position.getLat()}, ${position.getLng()}`;
            }
          }
          // Both start and end locations are set, reset markers and input fields
          else {
            startMarker.setPosition(position);
            startInputRef.current.value = `${position.getLat()}, ${position.getLng()}`;
            endMarker.setPosition(map.getCenter());
            endInputRef.current.value = "";
          }
        }
      );
    });
  };
};


export const toLatLng = (location?: string):  kakao.maps.LatLng | undefined => {
  if(!location) return undefined;
  const position  = location.split(",");
  return window.kakao ? new kakao.maps.LatLng(Number(position[0]), Number(position[1])): undefined;
}

export const getRoutesPath = ( directions: IGetDirection) => {
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
  return path;
}

export const getConvertDistance = (distance?: number) => {
  if (!distance) return undefined;

  if (distance > 1000) {
    return `${(distance / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 })}km`;
  } else {
    return `${distance.toLocaleString()}m`;
  }
};
