import React, { useState,useEffect } from 'react';
import styles from '../style.module.scss';
import Image from 'next/image';
import { clsx } from 'clsx';
import CaretUp from '@images/vehicle_location/ic-arrow-up.png'
import { IVehicleLocationDetails } from '@src/types/map';
import Loader from '@src/components/Loader';
import dynamic from "next/dynamic";
import { DatePicker, Select } from "antd";
import NextIcon from "@src/components/icons/NextIcon";
import PrevIcon from "@src/components/icons/PrevIcon";
import { DateSelected, ISOformatDate, dateFormat, getNextMonthDates, getNextPrevDates, totalDays } from "@src/helpers";
import dayjs, { Dayjs } from "dayjs";
import type { CellRenderInfo } from 'rc-picker/es/interface';

interface DrawerProps {
  open: boolean
  handleClose: VoidFunction
  isLoading: boolean
  vehicle?:IVehicleLocationDetails | null
  vehicleDate?:string[] | null
  locationIds?:{id:number}[]
  dateChangeHandler: (...args: any[]) => void
  rideChangeHandler: (...args: any[]) => void
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

function Drawer({ open, handleClose , isLoading, vehicle,vehicleDate, dateChangeHandler,rideChangeHandler,locationIds }: DrawerProps) {

  const { RangePicker } = DatePicker;
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

  const filterDate = (value : string) => {
    // if(value == 'all'){
    //   setBufferdDate([])
    //   setSelectedDate({startDate:'',endDate:''})
    // }else{
    //   const filteredItemsToday : DateRange = DateSelected(value)
    //   setBufferdDate({startDate:filteredItemsToday?.startDate,endDate:filteredItemsToday?.endDate});
    // }
  }
  // Extra options in date range picker
  useEffect(() => {
    // const dateRangePicker = document.querySelector(
    //   ".custom_popup_picker .ant-picker-panel-layout>div"
    // );
    // var newElementOuter = document.createElement("div");
    // newElementOuter.classList.add(styles['ant-picker-custom-header']);
    // var newElement = document.createElement("div");

    // dateRangePickerCtrls.forEach((item) => {
    //   var newButton = document.createElement("button");
    //   newButton.textContent = item.label;
    //   newButton.onclick = () => {
    //     var elements = document.getElementsByClassName(styles['active']);
    //     for (var i = 0; i < elements.length; i++) {
    //       elements[i].classList.remove(styles['active']);
    //     }
    //     newButton.classList.add(styles['active']);
    //     filterDate(item.value??'')
    //   };
    //   newElement.appendChild(newButton);
    // });

    // newElementOuter.appendChild(newElement);
    // dateRangePicker?.insertBefore(newElementOuter, dateRangePicker?.firstChild);
    // return () => {
    //   dateRangePicker?.removeChild(newElementOuter);
    // };
  }, [datePickerOpen]);

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
  const categories = ['오늘 운행거리','총 운행거리','평균 월 운행거리'];
  const data = [today_distance||0,total_distance||0,avarageMonthlyDistance||0];

  const style: React.CSSProperties = {
    border: `1px solid #2F48D1`,
    lineHeight: 'normal',
    background : '#E1ECFF'
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
          안산시 상록구 월피동
        </div>
      </div>
      <div className={`${styles.vehicle_location_content} h-[calc(100vh-120px)]`}>
        <div className={clsx(styles.location_detail_wrap, open ? styles.closed : styles.open)} >
          <div className={styles.address}>{current_point_name ?? '-'}</div>
          <div className={`${styles.content_inner}`}>
            {isLoading ?

              <Loader size="lg" className='h-full w-full items-center justify-center flex flex-row '/> :
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
                              <div className="flex justify-end px-[20px] bg-[#E1ECFF] py-[15px] items-center">
                                <div className="flex gap-[4px]">
                                  <button
                                    className=" bg-[#2F48D1] text-[#fff] px-[12px] py-[5px] rounded text-[12px] leading-normal"
                                    onClick={() => {
                                      setSelectedDate(bufferStartDate);
                                      setDatePickerOpen(false)
                                    }}
                                  >
                                    Ok
                                  </button>
                                  <button
                                    className=" bg-[#fff] text-[#999] px-[12px] py-[5px] rounded text-[12px] leading-normal"
                                    onClick={() => {
                                      setDatePickerOpen(false);
                                    }}
                                  >
                                    취소
                                  </button>
                                </div>
                              </div>
                            )}
                            cellRender={cellRender}
                          />
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
                  <div className={styles.title}>차량 선택</div>
                  {/* <Image
                    src="/images/img-location.png"
                    alt=""
                    className={styles.img}
                    width={300}
                    height={300}
                    priority
                  /> */}
                  <Select
                    popupClassName={"admin-advertisement-select"}
                    size={"large"}
                    style={{ width: '100%', borderRadius: "4px!important" }}
                    onChange={(e) => setSelectedRide(Number(e))}
                    value={ locationIds?.length || 0 > 0 ? selectedRide : 0}
                    defaultValue={0}
                    className='mb-2'
                  >
                    {locationIds ? (
                      locationIds?.map((ride, index) => {
                        return (
                          <Select.Option key={index} value={ride?.id}>
                            운행기록 {index + 1}
                          </Select.Option>
                        );
                      })
                    ) : (
                      <Select.Option value={0}>운행 기록이 없습니다.</Select.Option>
                    )}
                  </Select>

                  <div className={styles.location_name}>영동고속도로</div>
                  <div className={styles.text_wrap}>
                    <div className={styles.text}>평균(일) 통과차량</div>
                    <div className={styles.text}>상행 : {passing_vehicle_up || '- '}대</div>
                    <div className={styles.text}>하행 : {passing_vehicle_descent || '- '}대</div>
                  </div>
                </div>

                <div className={clsx(styles.section, styles.operation_history)}>
                  <div className={`${styles.text}  mb-[16px]`}>운행내역</div>
                  <ul className={styles.history}>
                    <li className={styles.list}>
                      <div>
                        <i className={`${styles.icons} ${styles.ic_start}`}></i>
                      <div className={`${styles.data} !text-[12px] !text-gray !leading-normal	`}>{startDate ? `${startMonth}/${startDate}` : '-'}</div>
                        </div>
                        <div>
                      <div className={styles.data}>{startTime ? `${startTime[0]}:${startTime[1]}` : '-'}</div>
                      <div className={styles.text}>운행시작</div>
                        </div>
                    </li>
                    <li className={styles.list}>
                      <div>
                      <i className={`${styles.icons} ${styles.ic_end}`}></i>
                      <div className={`${styles.data} !text-[12px] !text-gray !leading-normal	`}>{endDate ? `${endMonth}/${endDate}` : '-'}</div>
                      </div>
                      <div>
                      <div className={styles.data}>
                        {endTime ? `${endTime[0]}:${endTime[1]}` : (startTime ? '운행중' : '-')}
                      </div>
                      <div className={styles.text}>운행종료</div>
                      </div>
                    </li>
                    <li className={styles.list}>
                      <div className='min-h-[50px]'>
                      <i className={`${styles.icons} ${styles.ic_drive}`}></i>
                      <div className={`${styles.data} !text-[12px] !text-gray !leading-normal	`}></div>
                      </div>
                      <div>
                      <div className={styles.data}>{`${today_distance || 0}km`}</div>
                      <div className={styles.text}>운행거리</div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div
                  className={`${styles.section} ${styles.accomplishment_rate} !pb-0`}
                >
                  <div className={`${styles.title} !mb-[7px]`}>운행 달성률</div>
                  <ul className={`${styles.list_wrap} !m-0`}>
                    <Chart
              options={
                {
                xaxis: {
                  categories:categories,
                },
                yaxis: {
                  show: false,
                },
                chart: {
                  toolbar: {
                    show: true,
                    tools: {
                      download: false
                    }
                  }
                },
                dataLabels: {
                  enabled: true,
                  formatter: function (val, opts) {
                    return `${val} KM`
                  },
                  style: {
                    fontSize: '11px',
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    fontWeight: 500,
                    colors: ["#2C324C"]
                },
                },
                plotOptions: {
                  bar : {
                    dataLabels: {
                      position: 'top',
                      total: {
                        enabled: true,
                        formatter: undefined,
                        offsetX: 0,
                        offsetY: 0,
                      }
                  }
                  }
                },
                colors: [
                  function ({ value, seriesIndex, dataPointIndex, w }) {
                      if (dataPointIndex == 0) {
                        return "#2F48D1";
                      } else if (dataPointIndex == 1){
                        return "#515E93";
                      } else {
                        return "#2C324C";
                      }
                    }
                ]
              }}
              series  ={[{ data:data }]}
              type="bar"
              width={300}
              height={180}
            />
                  </ul>
                </div>
                {/* <div className={styles.standard}>
                  2023.03.01 ~ 2023.03.28 기준
                </div> */}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Drawer
