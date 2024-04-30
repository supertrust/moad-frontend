import { useIcarusContext } from "@src/hooks/useIcarusContext";
import React, { useEffect, useState } from "react";
import { useAllVehicleLocationDate, useAllVehicleLocationDetails } from "@src/apis/map";
import { useRouter } from "next/router";
import { Button } from "@src/components/common";
import { Map } from "@src/components/Map";
import Drawer from "@src/sections/vehicle-location/Drawer";
import Loader from "@src/components/Loader";
import ArrowBack from "@src/components/icons/ArrowBack";
import { MapInfoWindow, MapMarker, Polygon, useKakaoLoader } from "react-kakao-maps-sdk";
import { toLatLng } from "@src/helpers/map";
import { useGetDirection } from "@src/apis/kakap.map";
import DirectionRender from "@src/components/Map/DirectionRender";
import { ISOformatDate, darkenColor, getRandomColor } from "@src/helpers";
import { KAKAO_MAP_API_KEY } from "@src/config";
import { IVehicleLocationDetails } from "@src/types/map";
import Image from "next/image";
import useAuth from '@src/hooks/useAuth';

type DateRange = {
  startDate: Date | string,
  endDate: Date | string
}


const cargoList = [
  {
    origin: "36.59602064328006, 127.49743696679992",
    destination: "36.5784079310275, 127.42903463451763",
    currentPosition: "36.58974335480901, 127.46645556185162",
    name: "Cargo1",
  },
  {
    origin: "36.5784079310275, 127.42903463451763",
    destination: "36.85292608010818, 127.67670661667673",
    currentPosition: "36.78582763979032, 127.56224513044643",
    name: "Cargo2",
  },
  {
    origin: "36.60056223670456, 127.5773979376397",
    destination: "36.47559052342964, 127.59967843804897",
    currentPosition: "36.54226761556564, 127.56522545444052",
    name: "Cargo3",
  },
]

const VehicleLocationScreen = () => {
  const [loading] = useKakaoLoader({
    appkey: KAKAO_MAP_API_KEY || '',
    libraries: ['services', 'clusterer', 'drawing'],
  })

  const { query } = useRouter();
  const { ad_id, vehicle_id } = query;
  const { setPageTitle } = useIcarusContext();
  const [showDrawer, setShowDrawer] = useState(false);
  const { dictionary: { adVehicleLocDetailsPage } } = useAuth();
  const [cargoLocation, setCargoLocation] = useState<IVehicleLocationDetails | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<Date | null>(new Date());
  const selectedDate = selectedDateRange ? ISOformatDate(selectedDateRange as Date) : null;

  const { data: cargoAllLocation, refetch, isLoading, isRefetching } = useAllVehicleLocationDetails(vehicle_id as string,
    ISOformatDate(selectedDateRange as Date));

  useEffect(() => {
    const latestLocation = cargoAllLocation ? cargoAllLocation[cargoAllLocation?.length - 1] : null;
    setCargoLocation(latestLocation)
  }, [JSON.stringify(cargoAllLocation)])

  useEffect(() => {
    setPageTitle(adVehicleLocDetailsPage.pageTitle);
  }, []);

  const router = useRouter();

  const onBack = () => {
    router.back();
  };



  const renderCargo = (
    { origin, destination, currentPosition, name }:
      { origin?: kakao.maps.LatLng, destination?: kakao.maps.LatLng, currentPosition?: kakao.maps.LatLng, name?: string }
  ) => {

    const color = darkenColor(getRandomColor(), 30);
    return (
      <>
        {currentPosition &&
          <MapMarker
            position={{ lat: currentPosition.getLat(), lng: currentPosition.getLng() }}
            image={{
              src: "/images/vehicle_location/marker.png",
              size: { width: 40, height: 40 }
            }}
            title={name}
          />
        }
        {origin && <MapMarker position={{ lat: origin.getLat(), lng: origin.getLng() }} title={`Origin ${name}`} />}
        {destination && <MapMarker position={{ lat: destination.getLat(), lng: destination.getLng() }} title={`Destination ${name}`} />}
        <DirectionRender
          origin={origin}
          destination={destination}
          strokeColor={color}
        />
      </>
    )
  }
  return (
    <div className="relative">
      {/* {isLoading && (
        <div className={`w-full top-[50%] ${showDrawer ? 'w-full' : 'w-[calc(100%-340px)]'}`}>
          <div className="flex flex-row justify-center items-center h-[calc(100vh-170px)]">
            <Loader size="lg" />
          </div>
        </div>
      )} */}
      <div className={`only-mb`}>
        <div className={`mobile-top-header px-[20px] pt-[15px] pb-[16px] mb-0`}>
          <ArrowBack handleAction={onBack} />
          <div className={"header"}>{adVehicleLocDetailsPage.pageTitle}</div>
          <div></div>
        </div>
      </div>
      <Map
        zoom={5}
        className="!h-[85vh] relative"
        location={toLatLng(cargoList[0].currentPosition)}
        showMarker={false}
        onClick={(map) => console.log(map.getCenter().toString())}
      >
        {cargoList.map(({ origin, destination, currentPosition, name }) => renderCargo({
          origin: toLatLng(origin),
          destination: toLatLng(destination),
          currentPosition: toLatLng(currentPosition),
          name
        }))}
      </Map>
      <div className="absolute hidden sm:block bottom-20 left-[50%] sm:left-[50%] lg:left-[60%] z-50">
        <Button
          className="bg-[#2C324C] text-white w-20 hidden"
          onClick={() => refetch()}
          loading={isRefetching}
        >
          {adVehicleLocDetailsPage.refresh}
        </Button>
      </div>
      {/* <Drawer
        open={showDrawer}
        handleClose={toggleDrawer}
        vehicle={cargoLocation}
        vehicleDate={cargoAllLocationDate}
        locationIds={allLocationIds}
        isLoading={isLoading}
        dateChangeHandler={handleDateChange}
        rideChangeHandler={handleRideChange}
      /> */}
    </div>
  );
};

export default VehicleLocationScreen;
