import { useIcarusContext } from "@src/hooks/useIcarusContext";
import { formatDateKorean } from "@src/utils/formatter";
import React, { useEffect, useState } from "react";
import { useAllVehicleLocationDate, useAllVehicleLocationDetails } from "@src/apis/map";
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
import Image from "next/image";
import useAuth from '@src/hooks/useAuth';

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
  const { dictionary: { adVehicleLocDetailsPage },isKorean } = useAuth();
  const [cargoLocation, setCargoLocation] = useState<IVehicleLocationDetails | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<Date | null>(new Date());
  const selectedDate = selectedDateRange ? ISOformatDate(selectedDateRange as Date) : null;
  // @ts-ignore
	// const { data: cargoLocation , refetch , isLoading, isRefetching} = useVehicleLocationDetails(vehicle_id as string,
  //   ISOformatDate(selectedDateRange as Date));

  const { data: cargoAllLocation, refetch , isLoading, isRefetching} = useAllVehicleLocationDetails(vehicle_id as string,
      formatDateKorean(selectedDateRange));

  const { data: cargoAllLocationDate} = useAllVehicleLocationDate(vehicle_id as string);


  useEffect(() => {
    const latestLocation = cargoAllLocation ? cargoAllLocation[cargoAllLocation?.length - 1] : null;
    setCargoLocation(latestLocation)
  }, [JSON.stringify(cargoAllLocation)])

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  const handleDateChange = (dateRange:Date) => {
    const currentDate = new Date(); // Get the current date and time
    const diffMin = ((currentDate.getMinutes() - dateRange.getMinutes())+60)%60;

    const updatedStartDate = new Date(dateRange);
    updatedStartDate.setMinutes(updatedStartDate.getMinutes() + diffMin);
    setSelectedDateRange(updatedStartDate)
    // refetch();
  }

  const handleRideChange = (data:number) => {
    const foundObject : IVehicleLocationDetails | null = cargoAllLocation?.find(item => item?.id == data) || null;
    setCargoLocation(foundObject)
  }

  useEffect(() => {
    setPageTitle(adVehicleLocDetailsPage.pageTitle);
  }, [isKorean]);

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

  // if(!cargoAllLocation) {
  //   return <div className="m-auto w-fit h-full flex items-center">No Data Found</div>
  // }

  return (
    <div className="relative">
      {isLoading && (
        <div className={`w-full top-[50%] ${showDrawer ? 'w-full' : 'w-[calc(100%-340px)]'}`}>
          <div className="flex flex-row justify-center items-center h-[calc(100vh-170px)]">
            <Loader size="lg" />
          </div>
        </div>
      )}
      <div className={`only-mb`}>
        <div className={`mobile-top-header px-[20px] pt-[15px] pb-[16px] mb-0`}>
          <ArrowBack handleAction={onBack} />
          <div className={"header"}>{adVehicleLocDetailsPage.pageTitle}</div>
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
        <DirectionRender origin={origin}  destination={currentPosition} logs={cargoLocation?.logs}/>
      </Map>
      :
       !isLoading && <div className={`flex flex-col justify-center items-center align-middle h-[calc(100vh-170px)] ${showDrawer ? 'w-full' : 'w-[calc(100%-340px)]'}`}>
        <Image
        src={'/images/location_not_found.png'}
        width={200}
        height={200}
        alt={'no data'}
        unoptimized
        className={``}
        />
        <p>{adVehicleLocDetailsPage.noRecordMsg}</p>
       </div>
      }
      <div className="absolute hidden sm:block bottom-20 left-[50%] sm:left-[50%] lg:left-[60%] z-50">
        <Button
          className="bg-[#2C324C] text-white w-20 hidden"
          onClick={() => refetch()}
          loading={isRefetching}
        >
          {adVehicleLocDetailsPage.refresh}
        </Button>
      </div>
      <Drawer
        open={showDrawer}
        handleClose={toggleDrawer}
        vehicle={cargoLocation}
        vehicleDate={cargoAllLocationDate}
        locationIds={allLocationIds}
        isLoading={isLoading}
        dateChangeHandler={handleDateChange}
        rideChangeHandler={handleRideChange}
      />
    </div>
  );
};

export default VehicleLocationScreen;
