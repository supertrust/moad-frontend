import CaretUp from '@images/vehicle_location/ic-arrow-up.png'
import Skeleton from '@mui/material/Skeleton';
import AmbulanceIconSvg from "@src/components/icons/AmbulanceIconSvg";
import NextIcon from "@src/components/icons/NextIcon";
import PrevIcon from "@src/components/icons/PrevIcon";
import { dateFormat, getNextPrevDates, ISOformatDate } from "@src/helpers";
import useAuth from '@src/hooks/useAuth';
import { IVehicleLocationDetails } from '@src/types/map';
import { formatNumberWithCommas } from "@src/utils/formatter";
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
    vehicle?:IVehicleLocationDetails | null
    vehicleDate?:string[] | null
    locationIds?:{id:number}[]
    dateChangeHandler: (...args: any[]) => void
    rideChangeHandler: (...args: any[]) => void
    in_total_distance_covered : number
}
type DateRange = {
    startDate : Date |string,
    endDate : Date | string
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

function MultipleLocationDrawer({ open, handleClose , isLoading, vehicle,vehicleDate, dateChangeHandler,rideChangeHandler,locationIds,in_total_distance_covered }: DrawerProps) {

    const { RangePicker } = DatePicker;
    const { dictionary: { adVehicleLocDrawerPage } } = useAuth();
    const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
    const [selectedRide, setSelectedRide] = useState<number|undefined>(vehicle?.id);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [bufferdDate, setBufferdDate] = useState<Date | null>(new Date());
    const handleChange = (type,date) => {
        const newDate = getNextPrevDates(type,date)
        setBufferdDate(newDate);
        setSelectedDate(newDate);
    }
    const handleDateChange = (range) => {
        const startDate = new Date(range.format());
        var day = startDate.getDate();
        var month = startDate.getMonth();
        var year = startDate.getFullYear();

        setBufferdDate(startDate);
    };

    useEffect(() => {
        rideChangeHandler(selectedRide)
    }, [selectedRide])

    useEffect(() => {
        if(locationIds) setSelectedRide(locationIds[0]?.id)
    }, [JSON.stringify(locationIds)])


    useEffect(() => {
        dateChangeHandler(selectedDate)
    }, [selectedDate])

    const bufferStartDate = !Array.isArray(bufferdDate) ? bufferdDate : new Date();

    const {
        passing_vehicle_descent,
        passing_vehicle_up ,
        start_time,
        end_time,
        avarageMonthlyDistance,
        today_distance,
        total_distance,
        current_point_name
    } = vehicle || {}

    let start = start_time ? start_time.split('T') : null
    let startMonth = start ? start[0].split('-')[1] : null
    let startDate = start ? start[0].split('-')[2] : null
    let startTime = start ? start[1].split(':') : null

    let end = end_time ? end_time.split('T') : null
    let endMonth = end ? end[0].split('-')[1] : null
    let endDate = end ? end[0].split('-')[2] : null
    let endTime = end ? end[1].split(':') : null
    const categories = adVehicleLocDrawerPage.categories;
    const data = [today_distance||0,total_distance||0,avarageMonthlyDistance||0];

    const style: React.CSSProperties = {
        border: `1px solid #2F48D1`,
        lineHeight: 'normal',
        background : 'var(--primary-color)',
        color: '#FFFF'
    };
    const cellRender = React.useCallback((current: number | Dayjs, info: CellRenderInfo<Dayjs>) => {
        if (info.type !== 'date') {
            return info.originNode;
        }
        if (typeof current === 'number') {
            return <div className="ant-picker-cell-inner">{current}</div>;
        }
        const currentDate = current.toDate();
        const formattedCurrentDate = ISOformatDate(currentDate);
        const isVehicleDate = vehicleDate?.includes(formattedCurrentDate);

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
                    className={clsx(styles.arrow_wrap, open ? styles.btn_closed : styles.btn_open )}
                    onClick={handleClose}
                >
                    <i className={styles.ic_arrrow}></i>
                </button>
            </div>

            <div className='block sm:hidden mt-[-20px]'>
                <div className='flex flex-row justify-center bg-transparent z-[200] relative'>
                    <div className='bg-white rounded-t-md px-3 py-[8px] cursor-pointer' onClick={handleClose}>
                        <Image  src={CaretUp} width={13} alt='' />
                    </div>
                </div>
                <div className='px-2 py-3 text-secondary font-bold bg-white'>
                    {adVehicleLocDrawerPage.wolpi}
                </div>
            </div>
            <div className={`${styles.vehicle_location_content} h-[calc(100vh-120px)]`}>
                <div className={clsx(styles.location_detail_wrap, open ? styles.closed : styles.open)} >
                    <div className={styles.address}>{current_point_name ?? '-'}</div>
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
                                                <div className={`${styles["date-next-prev"]} cursor-pointer`} onClick={() => handleChange('prev',selectedDate)}>
                                                    <PrevIcon width={16} height={16} />
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
                                                        <ConfigProvider locale={koKR}>
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
                                                                    <div className="flex justify-end px-[20px] bg-advertiser-light py-[15px] items-center">
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
                                                <div className={`${styles["date-next-prev"]} cursor-pointer`} onClick={() => handleChange('next',selectedDate)}>
                                                    <NextIcon width={16} height={16} />
                                                </div>
                                            </div>

                                            <div className={"h-[40px] w-[1px] bg-[#EBEDF4]"}></div>
                                        </div>
                                    </div>


                                    {/* DatesPicker end */}
                                    {/*<div className={styles.title}>{adVehicleLocDrawerPage.vehicleSelection}</div>*/}
                                    {/* <Image
                    src="/images/img-location.png"
                    alt=""
                    className={styles.img}
                    width={300}
                    height={300}
                    priority
                  /> */}
                                    {/*<Select*/}
                                    {/*    popupClassName={"admin-advertisement-select"}*/}
                                    {/*    size={"large"}*/}
                                    {/*    style={{ width: '100%', borderRadius: "4px!important" }}*/}
                                    {/*    onChange={(e) => setSelectedRide(Number(e))}*/}
                                    {/*    value={ locationIds?.length || 0 > 0 ? selectedRide : 0}*/}
                                    {/*    defaultValue={0}*/}
                                    {/*    className='mb-2'*/}
                                    {/*>*/}
                                    {/*    {locationIds ? (*/}
                                    {/*        locationIds?.map((ride, index) => {*/}
                                    {/*            return (*/}
                                    {/*                <Select.Option key={index} value={ride?.id}>*/}
                                    {/*                    {adVehicleLocDrawerPage.drivingRecord} {index + 1}*/}
                                    {/*                </Select.Option>*/}
                                    {/*            );*/}
                                    {/*        })*/}
                                    {/*    ) : (*/}
                                    {/*        <Select.Option value={0}>{adVehicleLocDrawerPage.noRecordMsg}</Select.Option>*/}
                                    {/*    )}*/}
                                    {/*</Select>*/}

                                    {/*<div className={styles.location_name}>{adVehicleLocDrawerPage.expressWay}</div>*/}
                                    {/*<div className={styles.text_wrap}>*/}
                                    {/*    <div className={styles.text}>{adVehicleLocDrawerPage.avgVehiclesPerDay}</div>*/}
                                    {/*    <div className={styles.text}>{adVehicleLocDrawerPage.uphill} : {passing_vehicle_up || '- '}대</div>*/}
                                    {/*    <div className={styles.text}>{adVehicleLocDrawerPage.downhill} : {passing_vehicle_descent || '- '}대</div>*/}
                                    {/*</div>*/}
                                </div>

                                {/*<div className={clsx(styles.section, styles.operation_history)}>*/}
                                {/*    <div className={`${styles.text}  mb-[16px]`}>{adVehicleLocDrawerPage.opDetails}</div>*/}
                                {/*    <ul className={styles.history}>*/}
                                {/*        <li className={styles.list}>*/}
                                {/*            <div>*/}
                                {/*                <i className={`${styles.icons} ${styles.ic_start}`}></i>*/}
                                {/*                <div className={`${styles.data} !text-[12px] !text-gray !leading-normal	`}>{startDate ? `${startMonth}/${startDate}` : '-'}</div>*/}
                                {/*            </div>*/}
                                {/*            <div>*/}
                                {/*                <div className={styles.data}>{startTime ? `${startTime[0]}:${startTime[1]}` : '-'}</div>*/}
                                {/*                <div className={styles.text}>{adVehicleLocDrawerPage.startOfOperation}</div>*/}
                                {/*            </div>*/}
                                {/*        </li>*/}
                                {/*        <li className={styles.list}>*/}
                                {/*            <div>*/}
                                {/*                <i className={`${styles.icons} ${styles.ic_end}`}></i>*/}
                                {/*                <div className={`${styles.data} !text-[12px] !text-gray !leading-normal	`}>{endDate ? `${endMonth}/${endDate}` : '-'}</div>*/}
                                {/*            </div>*/}
                                {/*            <div>*/}
                                {/*                <div className={styles.data}>*/}
                                {/*                    {endTime ? `${endTime[0]}:${endTime[1]}` : (startTime ? '운행중' : '-')}*/}
                                {/*                </div>*/}
                                {/*                <div className={styles.text}>{adVehicleLocDrawerPage.opEnd}</div>*/}
                                {/*            </div>*/}
                                {/*        </li>*/}
                                {/*        <li className={styles.list}>*/}
                                {/*            <div className='min-h-[50px]'>*/}
                                {/*                <i className={`${styles.icons} ${styles.ic_drive}`}></i>*/}
                                {/*                <div className={`${styles.data} !text-[12px] !text-gray !leading-normal	`}></div>*/}
                                {/*            </div>*/}
                                {/*            <div>*/}
                                {/*                <div className={styles.data}>{`${today_distance || 0}km`}</div>*/}
                                {/*                <div className={styles.text}>{adVehicleLocDrawerPage.drivingDistance}</div>*/}
                                {/*            </div>*/}
                                {/*        </li>*/}
                                {/*    </ul>*/}
                                {/*</div>*/}

                                {/*<div*/}
                                {/*    className={`${styles.section} ${styles.accomplishment_rate} !pb-0`}*/}
                                {/*>*/}
                                {/*    <div className={`${styles.title} !mb-[7px]`}>{adVehicleLocDrawerPage.drivingAchievementRate}</div>*/}
                                {/*    <ul className={`${styles.list_wrap} !m-0`}>*/}
                                {/*        <Chart*/}
                                {/*            options={*/}
                                {/*                {*/}
                                {/*                    xaxis: {*/}
                                {/*                        categories:categories,*/}
                                {/*                    },*/}
                                {/*                    yaxis: {*/}
                                {/*                        show: false,*/}
                                {/*                    },*/}
                                {/*                    chart: {*/}
                                {/*                        toolbar: {*/}
                                {/*                            show: true,*/}
                                {/*                            tools: {*/}
                                {/*                                download: false*/}
                                {/*                            }*/}
                                {/*                        }*/}
                                {/*                    },*/}
                                {/*                    dataLabels: {*/}
                                {/*                        enabled: true,*/}
                                {/*                        formatter: function (val, opts) {*/}
                                {/*                            return `${val} KM`*/}
                                {/*                        },*/}
                                {/*                        style: {*/}
                                {/*                            fontSize: '11px',*/}
                                {/*                            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',*/}
                                {/*                            fontWeight: 500,*/}
                                {/*                            colors: ["#2C324C"]*/}
                                {/*                        },*/}
                                {/*                    },*/}
                                {/*                    plotOptions: {*/}
                                {/*                        bar : {*/}
                                {/*                            dataLabels: {*/}
                                {/*                                position: 'top',*/}
                                {/*                                total: {*/}
                                {/*                                    enabled: true,*/}
                                {/*                                    formatter: undefined,*/}
                                {/*                                    offsetX: 0,*/}
                                {/*                                    offsetY: 0,*/}
                                {/*                                }*/}
                                {/*                            }*/}
                                {/*                        }*/}
                                {/*                    },*/}
                                {/*                    colors: [*/}
                                {/*                        function ({ value, seriesIndex, dataPointIndex, w }) {*/}
                                {/*                            if (dataPointIndex == 0) {*/}
                                {/*                                return "var(--primary-color)";*/}
                                {/*                            } else if (dataPointIndex == 1){*/}
                                {/*                                return "#515E93";*/}
                                {/*                            } else {*/}
                                {/*                                return "#2C324C";*/}
                                {/*                            }*/}
                                {/*                        }*/}
                                {/*                    ]*/}
                                {/*                }}*/}
                                {/*            series  ={[{ data:data }]}*/}
                                {/*            type="bar"*/}
                                {/*            width={300}*/}
                                {/*            height={180}*/}
                                {/*        />*/}
                                {/*    </ul>*/}
                                {/*</div>*/}
                                {/* <div className={styles.standard}>
                  2023.03.01 ~ 2023.03.28 기준
                </div> */}
                                <div className={'flex flex-col gap-2'}>
                                    <div className={'flex items-center justify-between gap-2 p-3 rounded-lg flex-wrap'} style={{background : "rgba(86, 26, 164, 0.06)"}}>
                                        <div className={'flex items-center gap-2 flex-1'}>
                                            <AmbulanceIconSvg/>
                                                <span className={'font-medium text-base text-[#2C324C]'}>
                                                    총 운행거리
                                                </span>
                                        </div>
                                        <div className={'font-bold text-advertiser-primary text-xl flex-1 break-all flex justify-end items-center gap-1'}>
                                            { isLoading ? <Skeleton width={40} animation="wave" /> : formatNumberWithCommas(in_total_distance_covered,2)} <span className={'font-medium text-[#373737] text-base'}>km</span>
                                        </div>
                                    </div>
                                    <div className={'font-normal text-[#999999] text-xs'}>
                                        *운행이 종료된 차량만 지도에 노출됩니다.
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MultipleLocationDrawer
