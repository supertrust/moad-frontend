import  MultipleLocationDrawer  from "@src/components/common/Drawer/MultipleLocationDrawer/MultipleLocationDrawer";
import { useIcarusContext } from "@src/hooks/useIcarusContext";
import { formatNumberWithCommas } from "@src/utils/formatter";
import React, { useEffect, useState } from "react";
import {
  useAllAdvertisementVehicleLocationDetails,
  useAllVehicleLocationDate,
  useAllVehicleLocationDetails
} from "@src/apis/map";
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


// const cargoList = [
//   {
//     origin: "36.59602064328006, 127.49743696679992",
//     destination: "36.5784079310275, 127.42903463451763",
//     currentPosition: "36.58974335480901, 127.46645556185162",
//     name: "Cargo1",
//   },
//   {
//     origin: "36.5784079310275, 127.42903463451763",
//     destination: "36.85292608010818, 127.67670661667673",
//     currentPosition: "36.78582763979032, 127.56224513044643",
//     name: "Cargo2",
//   },
//   {
//     origin: "36.60056223670456, 127.5773979376397",
//     destination: "36.47559052342964, 127.59967843804897",
//     currentPosition: "36.54226761556564, 127.56522545444052",
//     name: "Cargo3",
//   },
// ]

const AllVehicleLocation = () => {

  const [selectedDateRange, setSelectedDateRange] = useState<Date | null>(new Date());
  const [values,setValues] = useState({
    in_total_distance_covered : 0
  })
  const [cargoList,setCargoList] = useState<any[]>([])
  const { data: cargoAllLocation, refetch , isLoading, isRefetching,isFetching} = useAllAdvertisementVehicleLocationDetails( ISOformatDate(selectedDateRange as Date))
  const [loading] = useKakaoLoader({
    appkey: KAKAO_MAP_API_KEY || '',
    libraries: ['services', 'clusterer', 'drawing'],
  })
  const [hover,setHover] = useState<number>(-1)

  const { query } = useRouter();
  const { ad_id, vehicle_id } = query;
  const { setPageTitle } = useIcarusContext();
  const [showDrawer, setShowDrawer] = useState(false);
  const { dictionary: { adVehicleLocDetailsPage,viewAllLocation } } = useAuth();
  const [cargoLocation, setCargoLocation] = useState<IVehicleLocationDetails | null>(null);
  const selectedDate = selectedDateRange ? ISOformatDate(selectedDateRange as Date) : null;




  // useEffect(() => {
  //   const latestLocation = cargoAllLocation ? cargoAllLocation[cargoAllLocation?.length - 1] : null;
  //   setCargoLocation(latestLocation)
  // }, [JSON.stringify(cargoAllLocation)])


  useEffect(()=>{

    if(!isFetching && cargoAllLocation){
      const newCargo = [...cargoAllLocation].map((cargo)=>{
        const {current_point : currentPosition,end_point : destination,starting_point : origin,cargo_to_advertisment,
        logs,start_time,end_time,total_time_covered,total_distance_covered} = cargo;
        return {
          currentPosition,
          destination,
          origin,
          name : cargo_to_advertisment?.advertisement?.ad_name,
          logs,
          info : { start_time,end_time,total_time_covered,total_distance_covered }
        }
      })

      let sum = cargoAllLocation.reduce((acc, curr) => acc + curr.total_distance_covered, 0);

      setCargoList([...newCargo])
      setValues({
        ...values,
        in_total_distance_covered : sum
      })

    }
  },[isFetching])

  useEffect(() => {
    setPageTitle(adVehicleLocDetailsPage.pageTitle);
  }, []);

  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  const handleDateChange = (dateRange:Date) => {
    setSelectedDateRange(dateRange)
    // refetch();
  }

  const handleRideChange = (data:number) => {
    // const foundObject : IVehicleLocationDetails | null = cargoAllLocation?.find(item => item?.id == data) || null;
    // setCargoLocation(foundObject)
  }

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };




  const renderCargo = (
    { origin, destination, currentPosition, name,logs=[],id,info }:
      { origin?: kakao.maps.LatLng, destination?: kakao.maps.LatLng, currentPosition?: kakao.maps.LatLng, name?: string,logs?: any[],id : number,
      info : { start_time:string,end_time:string,total_time_covered:string,total_distance_covered:number } }
  ) => {

    const color = darkenColor(getRandomColor(), 30);
    const { start_time,end_time,total_time_covered,total_distance_covered } = info;

    let start = logs?.length ? logs[0]?.created_at?.split(' '): start_time ? start_time.split('T') : null
    let startTime = start ? start[1].split(':') : null

    let end = logs?.length ? logs[logs.length-1]?.created_at?.split(' '): end_time ? end_time.split('T') : null
    let endTime = end ? end[1].split(':') : null

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
        {origin && <MapMarker position={{ lat: origin.getLat(), lng: origin.getLng() }}  title={`Origin ${name}`} />}
        {destination && <MapMarker
         position={{ lat: destination.getLat(), lng: destination.getLng() }} title={ ``} onMouseOut={()=>setHover(-1)} onMouseOver={()=>
          setHover(id)}>
          {
          id===hover &&  <div style={{border: '1px solid #FFFFFF'}}  className={'bg-[#FFFFFF] flex flex-col gap-2 w-[260px] p-4'}>
                {
                  [{ title : viewAllLocation?.total_driving_distance, value : formatNumberWithCommas(total_distance_covered,2), extra : <span>km</span>},
                    { title : viewAllLocation?.total_driving_time, value : total_time_covered},
                     { title : viewAllLocation?.operation_start_time, value : `${startTime?.[0]}:${startTime?.[1]}`},
                     { title : viewAllLocation?.operation_end_time, value : `${endTime?.[0]}:${endTime?.[1]}`}

                  ].map((item,index)=> <div key={index} className={'flex justify-between items-center gap-2'}>
                    <span className={`text-[16px] text-[#2C324C] flex-1`}>{item.title}</span>
                  <div className={'text-[16px] flex-1 flex justify-end gap-1 break-all flex-wrap'}>
                    <span className={'font-bold text-advertiser-primary'}>{item.value}</span>  {item?.extra && item?.extra}
                  </div>
                  </div>)
                }

              </div>
          }

        </MapMarker>}
        <DirectionRender
          origin={origin}
          destination={destination}
          strokeColor={color}
          logs={logs}
        />
      </>
    )
  }
  return (
    <div className="relative">
       { (isFetching || isLoading) && (
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
        isFetching ? <></>:
        cargoList?.length || 0 > 0 ?
      <Map
        zoom={5}
        className="!h-[85vh] relative"
        location={toLatLng(cargoList?.[0]?.currentPosition)}
        showMarker={false}
        onClick={(map) => console.log(map.getCenter().toString())}
      >
        {cargoList.map(({ origin, destination, currentPosition, name,logs,info },index) => renderCargo({
          origin: toLatLng(origin),
          destination: toLatLng(destination),
          currentPosition: toLatLng(currentPosition),
          name,
          logs,id : index, info
        }))}
      </Map> :  !isLoading && <div className={`flex flex-col justify-center items-center align-middle h-[calc(100vh-170px)] ${showDrawer ? 'w-full' : 'w-[calc(100%-340px)]'}`}>
          <Image
              src={'/images/location_not_found.png'}
              width={200}
              height={200}
              alt={'no data'}
              unoptimized
              className={``}
          />
          <p>{adVehicleLocDetailsPage.noRecordMsg}</p>
        </div>}
      <div className="absolute hidden sm:block bottom-20 left-[50%] sm:left-[50%] lg:left-[60%] z-50">
        <Button
          className="bg-[#2C324C] text-white w-20 hidden"
          onClick={() => refetch()}
          loading={isRefetching}
        >
          {adVehicleLocDetailsPage.refresh}
        </Button>
      </div>
   <MultipleLocationDrawer
        open={showDrawer}
        handleClose={toggleDrawer}
        vehicle={cargoLocation}
        vehicleDate={[]}
        locationIds={[]}
        isLoading={isLoading}
        isFetching={isFetching}
        dateChangeHandler={handleDateChange}
        rideChangeHandler={handleRideChange}
        in_total_distance_covered={values?.in_total_distance_covered}
      />
    </div>
  );
};

export default AllVehicleLocation;
