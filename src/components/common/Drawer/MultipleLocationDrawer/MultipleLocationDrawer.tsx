// @ts-nocheck
import CaretUp from '@images/vehicle_location/ic-arrow-up.png'
import Skeleton from '@mui/material/Skeleton';
import AmbulanceIconSvg from "@src/components/icons/AmbulanceIconSvg";
import ArrowIcon from "@src/components/icons/locations/ArrowIcon";
import NextIcon from "@src/components/icons/NextIcon";
import PrevIcon from "@src/components/icons/PrevIcon";
import { dateFormat, getNextPrevDates, ISOformatDate } from "@src/helpers";
import useAuth from '@src/hooks/useAuth';
import useOptions from "@src/hooks/useOptions";
import { IVehicleLocationDetails } from '@src/types/map';
import { formatDateKorean, formatNumberWithCommas } from "@src/utils/formatter";
import { logger } from "@src/utils/func";
import { ConfigProvider, DatePicker } from "antd";
import koKR from 'antd/locale/ko_KR';
import { clsx } from 'clsx';
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/ko';
import dynamic from "next/dynamic";
import Image from 'next/image';
import type { CellRenderInfo } from 'rc-picker/es/interface';
import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';

dayjs.locale('ko');

interface DrawerProps {
    open: boolean
    handleClose: VoidFunction
    isLoading: boolean
    vehicle?: IVehicleLocationDetails | null
    vehicleDate?: string[] | null
    locationIds?: { id: number }[]
    dateChangeHandler: (...args: any[]) => void
    rideChangeHandler: (...args: any[]) => void
    in_total_distance_covered: number
    isFetching: boolean
}

type DateRange = {
    startDate: Date | string,
    endDate: Date | string
}
const dateRangePickerCtrls = [
    {
        label: "전체",
        value: "all",
    },
    {
        label: "오늘",
        value: "today",
    },
    {
        label: "이번 주",
        value: "this_week",
    },
    {
        label: "지난주",
        value: "last_week",
    },
    {
        label: "이번 달",
        value: "this_month",
    },
    {
        label: "지난 달",
        value: "last_month",
    },
    {
        label: "올해",
        value: "this_year",
    },
    {
        label: "작년",
        value: "last_year",
    }
];

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

// Set default timezone to Asia/Seoul
const KOREA_TZ = 'Asia/Seoul';


const CollapseAble = ({duplicateRideInfoList,duplicateDestination}) => {
    const { dictionary: { adVehicleLocDetailsPage, viewAllLocation }, isKorean, } = useAuth();
    const [open, setOpen] = useState(-1)
    const [currentInfo,setCurrentInfo] = useState({
       startTime : null,endTime : null,
        total_time_covered : 0, total_distance_covered : 0
    })
    const {startTime, endTime, total_time_covered, total_distance_covered} = currentInfo

   useEffect(()=>{

       if(open!=-1){
           const { start_time,end_time,total_time_covered,total_distance_covered, } = open!=-1? duplicateRideInfoList[open]?.info : {};
           const logs = duplicateRideInfoList[open]?.logs
           let start = logs?.length ? logs[0]?.created_at?.split(' '): start_time ? start_time.split('T') : null
           let startTime = start ? start[1].split(':') : null

           let end = logs?.length ? logs[logs.length-1]?.created_at?.split(' '): end_time ? end_time.split('T') : null
           let endTime = end ? end[1].split(':') : null
           setCurrentInfo({
                startTime, endTime, total_time_covered, total_distance_covered
           })
       }
       else {
           setCurrentInfo({
              startTime : null,endTime : null,total_time_covered: 0, total_distance_covered: 0
           })
       }

   },[open])

    useEffect(()=>{
        return ()=>{
            setOpen(-1)
        }
    },[duplicateDestination])


    return <div className={'flex flex-col border border-radius max-h-[400px] overflow-auto rounded-lg'}>
        {
            duplicateRideInfoList.map((item, index) => {
                return <>
                    <div
                        className={clsx('flex justify-between cursor-pointer text-[#10121d] font-semibold text-base border-[#e1e4ea] px-[12px] py-[16.5px]', duplicateRideInfoList?.length - 1 != index && "border-b")}
                        onClick={() => open === index ? setOpen(-1) : setOpen(index)}>
                        <span>
                            {item?.info?.truck_number}
                        </span>
                        <ArrowIcon rotation={open===index? 0 : 180}/>
                    </div>
                    {open === index && <div style={{transition: 'transform 0.6s ease' }} className={clsx('border-[#e1e4ea] bg-[#f5f7fa] py-[20px] px-[12px] flex flex-col gap-[10px]',duplicateRideInfoList?.length - 1 != index && "border-b")}>
                        {
                            [{ title : viewAllLocation?.total_driving_distance, value : formatNumberWithCommas(Number(total_distance_covered),2), extra : <span className={'pl-1'}>km</span>},
                                { title : viewAllLocation?.total_driving_time, value : total_time_covered},
                                { title : viewAllLocation?.operation_start_time, value : `${startTime?.[0]}:${startTime?.[1]}`},
                                { title : viewAllLocation?.operation_end_time, value : `${endTime?.[0]}:${endTime?.[1]}`}
                            ].map((item, index) => {
                                return <div key={index} className={'flex justify-between items-center'}>
                                    <div className={'text-[#10121d] text-base'}>
                                        {item.title}
                                    </div>
                                    <div className={'text-[#10121d] text-base font-semibold'}>
                                        {item.value}
                                        {item.extra}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    }
                </>

            })}

    </div>

}

function MultipleLocationDrawer({
                                    open,
                                    handleClose,
                                    isLoading,
                                    isFetching,
                                    vehicle,
                                    vehicleDate,
                                    dateChangeHandler,
                                    rideChangeHandler,
                                    locationIds,
                                    in_total_distance_covered,
                                    duplicateRideInfoList,
                                    duplicateDestination
                                }: DrawerProps) {

    const { RangePicker } = DatePicker;
    const { getAntDesignLocale } = useOptions()
    const { dictionary: { adVehicleLocDrawerPage, viewAllLocation },isPcOnly } = useAuth();
    const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
    const [selectedRide, setSelectedRide] = useState<number | undefined>(vehicle?.id);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [bufferdDate, setBufferdDate] = useState<Date | null>(new Date());
    const handleChange = (type, date) => {
        const newDate = getNextPrevDates(type, date)
        setBufferdDate(newDate);
        setSelectedDate(newDate);
    }
    const handleDateChange = (range) => {
        const startDate = new Date(range.format());
        logger.log('hello',formatDateKorean(startDate,true))
        setBufferdDate(startDate);
    };

    useEffect(() => {
        rideChangeHandler(selectedRide)
    }, [selectedRide])

    useEffect(() => {
        if (locationIds) setSelectedRide(locationIds[0]?.id)
    }, [JSON.stringify(locationIds)])


    useEffect(() => {
        dateChangeHandler(selectedDate)
    }, [selectedDate])

    const bufferStartDate = !Array.isArray(bufferdDate) ? bufferdDate : new Date();

    const style: React.CSSProperties = {
        border: `1px solid rgba(86, 26, 164, 0.2)`,
        lineHeight: 'normal',
        background: 'rgba(86, 26, 164, .2)',
        color: '#606060'
    };
    const cellRender = React.useCallback((current: number | Dayjs, info: CellRenderInfo<Dayjs>) => {
        if (info.type !== 'date') {
            return info.originNode;
        }
        if (typeof current === 'number') {
            return <div className="ant-picker-cell-inner">{current}</div>;
        }
        // const currentDate = current.toDate();
        // const formattedCurrentDate = ISOformatDate(currentDate);
        const formattedCurrentDate = current.format("YYYY-MM-DD");
        const isVehicleDate = vehicleDate?.includes(formattedCurrentDate);
        //
        // logger.log('current',current.format("YYYY-MM-DD"),current.date())

        return (
            <div className="ant-picker-cell-inner" style={isVehicleDate ? style : {}}>
                {current.date()}
            </div>
        );
    }, [vehicleDate]);
    return (
        <div>
            <div className={`${styles.button_wrap} z-50`}>
                <button
                    type="button"
                    id="location_detail_btn"
                    className={clsx(styles.arrow_wrap, open ? styles.btn_closed : styles.btn_open)}
                    onClick={handleClose}
                >
                    <i className={styles.ic_arrrow}></i>
                </button>
            </div>

            <div className='block sm:hidden mt-[-20px]'>
                <div className='flex flex-row justify-center bg-transparent z-[200] relative'>
                    <div className='bg-white rounded-t-md px-3 py-[8px] cursor-pointer' onClick={handleClose}>
                        <Image src={CaretUp} width={13} alt=''/>
                    </div>
                </div>
                <div className='px-2 py-3 text-secondary font-bold bg-white'>
                    {adVehicleLocDrawerPage.wolpi}
                </div>
            </div>
            <div className={clsx(styles.vehicle_location_content, isPcOnly && "h-[calc(100vh-120px)]")}>
                <div className={clsx(styles.location_detail_wrap, open ? styles.closed : styles.open)}>
                    <div className={`${styles.content_inner}`}>
                        <div className={styles.inner}>
                            <div className={`${styles.section} ${styles.now_location}`}>
                                {/* DatesPicker start */}
                                <div
                                    className={
                                        "min-h-[74px] flex items-center justify-between space-x-1 relative"
                                    }
                                >
                                    <div className={"flex space-x-[20px]"}>
                                        <div
                                            className={
                                                "flex items-center justify-between  bg-white border-y border-[#ebedf4] w-[300px]"
                                            }
                                        >
                                            <div className={`${styles["date-next-prev"]} cursor-pointer`}
                                                 onClick={() => handleChange('prev', selectedDate)}>
                                                <PrevIcon width={16} height={16}/>
                                            </div>
                                            <div>
                        <span
                            className={`${styles["date"]} ${
                                datePickerOpen ? "hidden" : "block"
                            }`}
                            onClick={() => setDatePickerOpen(true)}
                        >
                          <div className="flex">
                            <div>
                              <input
                                  className="w-[80px] text-center"
                                  readOnly
                                  placeholder="Start date"
                                  value={selectedDate ? dateFormat(
                                      (selectedDate as Date)?.toISOString(),
                                      "Y-m-d"
                                  ) : ''}
                              />
                            </div>
                          </div>
                        </span>
                                                <div>
                                                    <ConfigProvider locale={getAntDesignLocale()}>
                                                        <DatePicker
                                                            className={datePickerOpen ? "custom_picker" : "hidden"}
                                                            popupClassName={"custom_popup_picker vehicle-location !left-[calc(100%-314px)]"}
                                                            format="YYYY-MM-DD"
                                                            onChange={handleDateChange}
                                                            // separator={"~"}
                                                            defaultValue={dayjs(bufferStartDate)}
                                                            value={dayjs(bufferStartDate)}
                                                            allowClear={false}
                                                            suffixIcon={""}
                                                            inputReadOnly
                                                            open={datePickerOpen}
                                                            onOpenChange={(open) =>
                                                                setDatePickerOpen(datePickerOpen)
                                                            }
                                                            renderExtraFooter={() => (
                                                                <div
                                                                    className="flex justify-end px-[20px] bg-advertiser-light py-[15px] items-center">
                                                                    <div className="flex gap-[4px]">
                                                                        <button
                                                                            className=" bg-advertiser-primary text-[#fff] px-[12px] py-[5px] rounded text-[12px] leading-normal"
                                                                            onClick={() => {
                                                                                setSelectedDate(bufferStartDate);
                                                                                setDatePickerOpen(false)
                                                                            }}
                                                                        >
                                                                            {adVehicleLocDrawerPage.checkBtn}
                                                                        </button>
                                                                        <button
                                                                            className=" bg-[#fff] text-[#999] px-[12px] py-[5px] rounded text-[12px] leading-normal"
                                                                            onClick={() => {
                                                                                setDatePickerOpen(false);
                                                                            }}
                                                                        >
                                                                            {adVehicleLocDrawerPage.cancelBtn}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            cellRender={cellRender}
                                                        />
                                                    </ConfigProvider>
                                                </div>
                                            </div>
                                            <div className={`${styles["date-next-prev"]} cursor-pointer`}
                                                 onClick={() => handleChange('next', selectedDate)}>
                                                <NextIcon width={16} height={16}/>
                                            </div>
                                        </div>

                                        {/*<div className={"h-[40px] w-[1px] bg-[#EBEDF4]"}></div>*/}
                                    </div>
                                </div>
                            </div>

                            <div className={'flex flex-col gap-4'}>
                                <div className={'flex items-center justify-between gap-2 p-3 rounded-lg flex-wrap'}
                                     style={{ background: "rgba(86, 26, 164, 0.06)" }}>
                                    <div className={'flex items-center gap-2 flex-1'}>
                                        <div className={'!shrink-0'}>
                                            <AmbulanceIconSvg/>
                                        </div>
                                        <span className={'font-medium text-base text-[#2C324C]'}>
                                                    {viewAllLocation?.in_total_driving_distance}
                                                </span>
                                    </div>
                                    <div
                                        className={'font-bold text-advertiser-primary text-xl flex-1 break-all flex justify-end items-center gap-1'}>
                                        {isFetching ? <Skeleton width={40}
                                                                animation="wave"/> : formatNumberWithCommas(in_total_distance_covered, 2)}
                                        <span className={'font-medium text-[#373737] text-base'}>km</span>
                                    </div>
                                </div>
                                {
                                    duplicateRideInfoList?.length ?
                                        <CollapseAble duplicateRideInfoList = {duplicateRideInfoList} duplicateDestination={duplicateDestination}/> : <></>
                                }
                                {
                                    !isPcOnly &&   <div className={'font-normal text-[#999999] text-sm px-4'}>
                                        *{viewAllLocation?.noteInfo}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    {
                        isPcOnly &&  <div className={'font-normal text-[#999999] text-sm px-4'}>
                            *{viewAllLocation?.noteInfo}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MultipleLocationDrawer
