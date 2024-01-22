import { useIcarusContext } from "@src/hooks/useIcarusContext";
import React, { useEffect, useState } from "react";
import { useAllVehicleLocationDetails } from "@src/apis/map";
import { useRouter } from "next/router";
import { Button } from "@src/components/common";
import { Map } from "@src/components/Map";
import Drawer from "@src/sections/vehicle-location/Drawer";
import Loader from "@src/components/Loader";
import ArrowBack from "@src/components/icons/ArrowBack";
import { MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import { toLatLng } from "@src/helpers/map";
import { useGetDirection } from "@src/apis/kakap.map";
import DirectionRender from "@src/components/Map/DirectionRender";
import { ISOformatDate } from "@src/helpers";
import { KAKAO_MAP_API_KEY } from "@src/config";
import { IVehicleLocationDetails } from "@src/types/map";

type DateRange = {
  startDate : Date |string,
  endDate : Date | string
}

const VehicleLocationScreen = () => {
  const [ loading ] = useKakaoLoader({
    appkey: KAKAO_MAP_API_KEY || '', 
    libraries: ['services', 'clusterer', 'drawing'],
  })

	const { query } = useRouter();
	const { ad_id, vehicle_id } = query;
	const { setPageTitle } = useIcarusContext();
	const [showDrawer, setShowDrawer] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<Date | null>(new Date());
  const selectedDate = selectedDateRange ? ISOformatDate(selectedDateRange as Date) : null;
  // @ts-ignore
	// const { data: cargoLocation , refetch , isLoading, isRefetching} = useVehicleLocationDetails(vehicle_id as string, 
  //   ISOformatDate(selectedDateRange as Date));
	
    const { data: cargoAllLocation, refetch , isLoading, isRefetching} = useAllVehicleLocationDetails(vehicle_id as string, 
    ISOformatDate(selectedDateRange as Date));

const latestLocation = cargoAllLocation ? cargoAllLocation[cargoAllLocation?.length - 1] : null;
    const [cargoLocation, setCargoLocation] = useState<IVehicleLocationDetails | null>(latestLocation);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  const handleDateChange = (dateRange:Date) => {
    setSelectedDateRange(dateRange)
    // refetch();
  }
  
  const handleRideChange = (data:number) => {
    const foundObject : IVehicleLocationDetails | null = cargoAllLocation?.find(item => item?.id == data) || null;
    setCargoLocation(foundObject)
  }

  useEffect(() => {
    setPageTitle("차량위치");
  }, []);
  
  useEffect(() => {
    if(cargoAllLocation){
      setCargoLocation(cargoAllLocation[cargoAllLocation?.length - 1])
    }
  }, [cargoAllLocation]);
  
  const router = useRouter();

  const allLocationIds = cargoAllLocation?.map((data,index) => {
    return {id:data?.id}
  })
  
  
  const onBack = () => {
    router.back();
  };

  const origin = toLatLng(cargoLocation?.starting_point);
  const destination = toLatLng(cargoLocation?.end_point);
  const currentPosition = toLatLng(cargoLocation?.current_point);

  // const { data , isLoading: isChecking } = useGetDirection({
  //   origin: '127.48141666204886,36.674169220914834', // cargoLocation?.starting_point || '',
  //   destination: '127.50405731284744,36.632767976460656', //cargoLocation?.end_point || '',
  //   priority: "RECOMMEND",
  //   car_type: 4,
  //   road_details: true
  // });

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute z-50 left-0 w-full top-[50%]">
          <div className="flex flex-row justify-center items-center">
            <Loader size="lg" />
          </div>
        </div>
      )}
      <div className={`only-mb`}>
        <div className={`mobile-top-header px-[20px] pt-[15px] pb-[16px] mb-0`}>
          <ArrowBack handleAction={onBack} />
          <div className={"header"}>차량위치</div>
          <div></div>
        </div>
      </div>
      {
        allLocationIds?.length || 0 > 0 ?
      <Map
        zoom={13}
        className="!h-[85vh] relative"
        location={currentPosition}
        showMarker={false}
      >
        {currentPosition  &&
          <MapMarker
            position={{lat: currentPosition .getLat(), lng: currentPosition .getLng() }}
            image ={{
              src: "/images/vehicle_location/marker.png" ,
              size: { width: 40, height: 40 }
            }}
          />
        }
        {origin && <MapMarker position={{lat: origin.getLat(), lng: origin.getLng() }} />}
        {currentPosition && <MapMarker  position={{lat: currentPosition.getLat(), lng: currentPosition.getLng() }} /> }
        <DirectionRender origin={origin}  destination={currentPosition} />
      </Map>
      :
      <div>No dat</div>
      }
      <div className="absolute hidden sm:block bottom-20 left-[50%] sm:left-[50%] lg:left-[60%] z-50">
        <Button
          className="bg-[#2C324C] text-white w-20 hidden"
          onClick={() => refetch()}
          loading={isRefetching}
        >
          새로고침
        </Button>
      </div>
      <Drawer
        open={showDrawer}
        handleClose={toggleDrawer}
        vehicle={cargoLocation}
        locationIds={allLocationIds}
        isLoading={isLoading}
        dateChangeHandler={handleDateChange}
        rideChangeHandler={handleRideChange}
      />
    </div>
  );
};

export default VehicleLocationScreen;
