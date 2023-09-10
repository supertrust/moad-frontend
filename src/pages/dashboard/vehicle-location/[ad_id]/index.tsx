import { useIcarusContext } from "@src/hooks/useIcarusContext";
import React, { useEffect, useRef, useState } from "react";
import { useSaveLocation } from "@src/apis/map";
import { dateFormat } from "@src/helpers";
import { useRouter } from "next/router";
import { styles } from "@src/sections/vehicle-location";
import Image from "next/image";
import Button from "@src/components/Button";
import Map, { ILocation } from "@src/components/Map";
import { clsx } from "clsx";
import Marker from '@images/vehicle_location/marker.png';
import { Tooltip } from "antd";
import Drawer from "@src/sections/vehicle-location/Drawer";

const VehicleLocationScreen = () => {
  const { query } = useRouter();
  const { ad_id, vehicle_id } = query;
  const {setPageTitle} = useIcarusContext();
  const startInputRef = useRef<HTMLInputElement | null>(null);
  const endInputRef = useRef<HTMLInputElement | null>(null);
  const [savingRide, setSavingRide] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const { mutateAsync: saveLocation } = useSaveLocation();


  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  const handleStartRide = async (event: any) => {
    try {
      setSavingRide(true);
      event.preventDefault();
      const currentDate = new Date();
      const data = {
        cargo_vehicle_id: 1,
        starting_point: startInputRef.current?.value || "",
        end_point: endInputRef.current?.value || "",
        start_time: dateFormat(currentDate.toLocaleDateString()),
        end_time: dateFormat(currentDate.toLocaleDateString()),
        route_no: Date.now(),
      };
      await saveLocation(data);
    } catch {
      setSavingRide(false);
    }
  };

  useEffect(() => {
    setPageTitle("차량위치");
  }, []);


  const calculateDistance = (departure: ILocation, destination : ILocation) => {
    // Use the Haversine formula (similar to the previous example)
    const { lat: lat1, lng: lng1 } = departure;
    const { lat: lat2, lng: lng2 } = destination;

    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lng1 - lng2;
    const radtheta = Math.PI * theta / 180;

    let distance = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    distance = Math.acos(distance);
    distance = distance * 180 / Math.PI;
    distance = distance * 60 * 1.1515; 

    //convert to kilometers
    distance = distance * 1.609344;

    return distance.toFixed(2)
  };

  const locations = {
    departure :  { lat: 36.00541942167268, lng: 128.02959310656473}, 
    destination: { lat: 35.92663028655646, lng: 127.9180186752741},
  }

  return (
    <div>
      <Map 
        zoom={13}
        className="md:!h-[85vh]"
        location={locations.departure}
      >
        <Tooltip 
          title={
            <div className="text-grey-500">
              <div>Distance: {calculateDistance(locations.departure, locations.destination)}km </div>
              <div>Duration: 2h 15m</div>
            </div>
          }
          trigger="click" 
          color="#2f48d1"
          defaultOpen
          //@ts-ignore
          lat={locations.destination.lat} 
          lng={locations.destination.lng}
        >
          <Image src={Marker} className='w-auto h-10 cursor-pointer' alt='' />
        </Tooltip>
      </Map>
      <div className="absolute bottom-20 left-[50%] sm:left-[50%] md:left-[60%] ">
        <Button className="bg-[#2C324C] text-white w-20">
          새로고침
        </Button>
      </div>
      <Drawer 
        open={showDrawer}
        handleClose={toggleDrawer}
      />
    </div>
  );
};

export default VehicleLocationScreen;
