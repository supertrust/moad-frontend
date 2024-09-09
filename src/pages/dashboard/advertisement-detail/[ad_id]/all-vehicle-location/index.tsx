// @ts-nocheck
import { Paper } from "@mui/material";
import { useAllAdvertisementVehicleLocationDetails, useGetAdvertisementAllVehicleLocationDate } from "@src/apis/map";
import { Button } from "@src/components/common";
import MultipleLocationDrawer from "@src/components/common/Drawer/MultipleLocationDrawer/MultipleLocationDrawer";
import ArrowBack from "@src/components/icons/ArrowBack";
import PolygonSvg from "@src/components/icons/polygonSvg";
import Loader from "@src/components/Loader";
import { Map } from "@src/components/Map";
import DirectionRender from "@src/components/Map/DirectionRender";
import { KAKAO_MAP_API_KEY } from "@src/config";
import { darkenColor, getRandomColor, ISOformatDate } from "@src/helpers";
import { toLatLng } from "@src/helpers/map";
import useAuth from '@src/hooks/useAuth';
import { useIcarusContext } from "@src/hooks/useIcarusContext";
import { formatNumberWithCommas } from "@src/utils/formatter";
// import { cargoAllLocation } from "@src/utils/test_data";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

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

  const { query } = useRouter();

  const advertisementId = query.ad_id as string;
  const [selectedDateRange, setSelectedDateRange] = useState<Date | null>(new Date());
  const [duplicateDestination,setDuplicateDestination] = useState<string | undefined>(undefined)
  const [values,setValues] = useState({
    in_total_distance_covered : 0
  })
  const [similarPoint,setSimilarPoint] = useState({})
  const [cargoList,setCargoList] = useState<any[]>([])
  const { data: cargoAllLocation, refetch , isLoading, isRefetching,isFetching} = useAllAdvertisementVehicleLocationDetails(advertisementId,ISOformatDate(selectedDateRange as Date))
  const { data: cargoAllLocationDate} = useGetAdvertisementAllVehicleLocationDate(advertisementId as string);

  const [loading] = useKakaoLoader({
    appkey: KAKAO_MAP_API_KEY || '',
    libraries: ['services', 'clusterer', 'drawing'],
  })
  const [hover,setHover] = useState<number>(-1)

  const { setPageTitle } = useIcarusContext();
  const [showDrawer, setShowDrawer] = useState(false);
  const { dictionary: { adVehicleLocDetailsPage,viewAllLocation,allLocation },isKorean } = useAuth();

  useEffect(()=>{

    if(!isFetching && cargoAllLocation){
      const mp = {}
      const newCargo = [...cargoAllLocation].map((cargo)=>{
        if(!mp[cargo?.cargo_to_advertisment?.vehicle_information?.car_number])
            mp[cargo?.cargo_to_advertisment?.vehicle_information?.car_number] = darkenColor(getRandomColor(), 30);

        const {current_point : currentPosition,end_point : destination,starting_point : origin,cargo_to_advertisment,
        logs,start_time,end_time,total_time_covered,total_distance_covered} = cargo;

        return {
          currentPosition,
          destination,
          origin,
          name : cargo_to_advertisment?.advertisement?.ad_name,
          logs,
          info : { start_time,end_time,total_time_covered,total_distance_covered, truck_number : cargo_to_advertisment?.vehicle_information?.car_number,
            color : mp[cargo_to_advertisment?.vehicle_information?.car_number],
            destination
          },

        }
      })

      const sum = cargoAllLocation.reduce((acc, curr) => acc +( Number(curr.total_distance_covered) || 0), 0);

      const similarDes={};

      newCargo.forEach((cargo)=>{
        if(!similarDes[cargo.destination]){
          similarDes[cargo.destination] = []
        }
        similarDes[cargo.destination].push(cargo)
        // console.log('sdas', similarDes[cargo.destination].length)
      })

      setSimilarPoint({...similarDes})

      setCargoList([...newCargo])
      // console.log('asdas',cargoList.length)
      setValues({
        ...values,
        in_total_distance_covered : sum
      })

    }
  },[isFetching])

  useEffect(() => {
    setPageTitle(adVehicleLocDetailsPage.pageTitle);
  }, [isKorean]);

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


  // console.log('asd',similarPoint)

  const renderCargo = (
    { origin, destination, currentPosition, name,logs=[],id,info }:
      { origin?: kakao.maps.LatLng, destination?: kakao.maps.LatLng, currentPosition?: kakao.maps.LatLng, name?: string,logs?: any[],id : number,
      info : { start_time:string,end_time:string,total_time_covered:string,total_distance_covered:string, truck_number : string, color : string } }
  ) => {

    // const color = darkenColor(getRandomColor(), 30);
    const { start_time,end_time,total_time_covered,total_distance_covered,truck_number,color } = info;

    let start = logs?.length ? logs[0]?.created_at?.split(' '): start_time ? start_time.split('T') : null
    let startTime = start ? start[1].split(':') : null

    let end = logs?.length ? logs[logs.length-1]?.created_at?.split(' '): end_time ? end_time.split('T') : null
    let endTime = end ? end[1].split(':') : null
    const isMultiple = similarPoint[info.destination]?.length>1

    // console.log('render',info.destination,isMultiple,similarPoint[info.destination]?.length,origin)


    return (
      <>
        {currentPosition &&
          <MapMarker
            position={{ lat: currentPosition.getLat(), lng: currentPosition.getLng() }}
            image={{
              src: "",
              size: { width: 0, height: 0,}
            }}
            title={name}
          />
        }
        {origin && <MapMarker  image={{
          src: "",
          size: { width: 0, height: 0,}
        }} position={{ lat: origin.getLat(), lng: origin.getLng() }}  title={`Origin ${name}`} />}
        {destination && <MapMarker
            image={{
              src: "",
              size: { width: 0, height: 0,}
            }}
         position={{ lat: destination.getLat(), lng: destination.getLng() }} title={ ``}>

          <div  style={{zIndex : 100}} className="all-location-truck-tooltip-container">
            {id===hover && (
                <div onClick={isMultiple?()=>{  setDuplicateDestination(info?.destination),
                  setShowDrawer(false)
                } :()=> {}} className={clsx('all-location-truck-tooltip flex items-center flex-col !rounded',
                    isMultiple && "cursor-pointer")}  onMouseEnter={() =>  setHover(id)} onMouseLeave={() => setHover(-1)}>
                  <Paper elevation={24}>
                    <div  style={{border: '1px solid #FFFFFF'}}  className={'!rounded !shadow-xxl bg-[#FFFFFF] flex flex-col gap-2 w-[260px] p-4'}>
                      {
                        isMultiple ?
                            <div  className={'text-base text-[#10121d]'}>{allLocation?.duplicateDestination}</div> :
                            <>
                              {
                                [{ title : viewAllLocation?.total_driving_distance, value : formatNumberWithCommas(Number(total_distance_covered),2), extra : <span>km</span>},
                                  { title : viewAllLocation?.total_driving_time, value : total_time_covered},
                                  { title : viewAllLocation?.operation_start_time, value : `${startTime?.[0]}:${startTime?.[1]}`},
                                  { title : viewAllLocation?.operation_end_time, value : `${endTime?.[0]}:${endTime?.[1]}`}
                                ].map((item,index)=> <div style={{zIndex : 100}} key={index} className={'flex justify-between items-center gap-2'}>
                                  <span className={`text-[16px] text-[#2C324C] flex-1`}>{item.title}</span>
                                  <div className={'text-[16px] flex-1 flex justify-end gap-1 break-all flex-wrap'}>
                                    <span className={'font-bold text-advertiser-primary'}>{item.value}</span>  {item?.extra && item?.extra}
                                  </div>
                                </div>)
                              }
                            </>
                      }
                    </div>
                  </Paper>
                   <div className={'mt-[-3px]'}>
                     <PolygonSvg/>
                   </div>
                </div>
            )}
            <div
                className="px-[20px] py-[8px] all-location-truck-tooltip-trigger flex gap-1 min-w-[68px] items-center justify-center"
                onMouseEnter={() =>  setHover(id)}
                onMouseLeave={() => setHover(-1)}
            >
              <img className={'!h-[11px] !w-[20px] !shrink-0'} src={'/images/vehicle_location/truck-marker.png'}/>
              {
                isMultiple ? <div  className={'!shrink-0 flex-1 text-sm font-normal text-advertiser-primary flex w-[100%] whitespace-nowrap'}>{ similarPoint[info.destination]?.length}</div>
                    :
                    <div className={'flex-1 text-sm font-normal text-advertiser-primary flex w-[100%] whitespace-nowrap'}>{truck_number}</div>
              }</div>
          </div>

        </MapMarker>}
        <DirectionRender
          origin={origin}
          destination={destination}
          strokeColor={color  || darkenColor(getRandomColor(), 30)}
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
        vehicle={null}
        vehicleDate={cargoAllLocationDate || []}
        locationIds={[]}
        isLoading={isLoading}
        isFetching={isFetching}
        dateChangeHandler={handleDateChange}
        rideChangeHandler={handleRideChange}
        in_total_distance_covered={values?.in_total_distance_covered}
        duplicateRideInfoList = {duplicateDestination ? similarPoint[duplicateDestination] : []}
      />
    </div>
  );
};

export default AllVehicleLocation;
