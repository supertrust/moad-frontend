import { Card, CircularProgress, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useGetVehicleAdvertisementStatsDetails } from '@src/apis/advertisement';
import ArrowBack from "@src/components/icons/ArrowBack";
import NextIcon from "@src/components/icons/NextIcon";
import PrevIcon from "@src/components/icons/PrevIcon";
import { useIcarusContext } from "@src/hooks/useIcarusContext";
import { IAdvertisementStat, } from '@src/types/advertisement';
import { Pagination } from 'antd';
import { clsx } from 'clsx';
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import { Table } from "react-bootstrap";
import { useSearchParams } from 'next/navigation'
import styles from './styles.module.scss';
import {ISOformatDate, dateFormat} from  '@src/helpers'
import { TypeOfVechicle } from "@src/sections/dashboard/SaveAdModel/SaveAdForm";
import RangePicker from "@src/components/common/RangePicker";


const currentYearStart = new Date(new Date().getFullYear(), 0, 1)
function StatisticsDetailsPage() {
    const router = useRouter()
    const { id } = router.query
    const searchParams = useSearchParams()
    
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const { data: vehicle_advertisement_stats_details, isLoading } = useGetVehicleAdvertisementStatsDetails({ to: String(searchParams.get('end')), from: ISOformatDate(currentYearStart), advertisement_id: String(id), page: currentPage});
    const [selectedAds, setSelectedAds] = useState<IAdvertisementStat[]>([]);
    const { setPageTitle } = useIcarusContext();

    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);

    const itemsPerPage = 10;
    const totalItems = 50;
    const prevItems = 1;
    const currentItems = 10;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
     useEffect(() => {
      setPageTitle("통계")
    }, [])

    const allStatuses = [
        { label: '시작', value: 'accepted' },
        { label: '시작', value: 'apply' },
        { label: '거부됨', value: 'rejected' },
        { label: '시작', value: 'start' },
        { label: '끝', value: 'end' },
    ]
    const handleDateChange = (range) => {
        const startDate = range[0].format();
        const endDate = range[1].format();
        setStartDate(startDate);
        setEndDate(endDate);
      };
    
    return (
        <>
            {/*pc version*/}

            <div className={clsx("only-pc", "mx-[30px]")}>
                <div className={'py-[20px]'}>
                    <span className={styles['top-title']}>{"통계 > 이카루스 서비스 오픈 출시 기념 "}</span>
                </div>

                <Card variant="elevation" elevation={1}
                      className="mb-10 flex flex-col sm:min-h-[560px] h-full justify-between">
                    {isLoading ? (
                        <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
                            <CircularProgress color="primary"/>
                        </div>
                    ) : vehicle_advertisement_stats_details?.length ? (
                        <div>
                            <div className={'min-h-[74px] flex items-center px-4 justify-between space-x-5 relative'}>
                               <div className={'flex space-x-[20px]'}>
                                   <div
                                       className={'flex items-center justify-between  bg-white border-y border-[#ebedf4] w-[320px]'}>
                                       <div className={styles['date-next-prev']}>
                                           <PrevIcon width={16} height={16}/>
                                       </div>
                                       <div>
                        <span className={styles['date']} onClick={() => setDatePickerOpen(true)}>
                            {/* 오늘 : {dateFormat(startDate?.toISOString(),'Y-m-d')} ~ {dateFormat(endDate?.toISOString(),'Y-m-d')} */}
                            <RangePicker
                                    className='custom_picker'                                    
                                    onchange={() => handleDateChange}
                                    // footer={'extra footer'} 
                                />
                        </span>
                        
                                       </div>
                                       <div className={styles['date-next-prev']}>
                                           <NextIcon width={16} height={16}/>
                                       </div>
                                   </div>

                                   <div className={'h-[40px] w-[1px] bg-[#EBEDF4]'}>
                                   {/* <DatePicker
                                //    calendarClassName="!absolute left-0 top-[60px] !z-[99]"
                                    startDate={startDate}
                                    endDate={endDate}
                                    selected={startDate}
                                    onChange={ (dates) => {
                                        const [start, end] = dates;
                                        setStartDate(start);
                                        setEndDate(end);
                                    }}
                                    shouldCloseOnSelect={true}
                                    onBlur ={() => {
                                        setDatePickerOpen(false)
                                    }}
                                    open={datePickerOpen}
                                    selectsRange
                                    selectsDisabledDaysInRange
                                    inline
                                    monthsShown={2}
                                    isClearable
                                    clearButtonTitle="Confirm"
                                    cancelBtnText="Cancel"
                                />
                                 */}
                                 {/* <DatePicker 
                                 calendarClassName="!absolute left-0 top-[60px] !z-[99]"
                                startDate={startDate}
                                endDate={endDate}
                                selected={startDate}
                                onChange={ (dates) => {
                                    const [start, end] = dates;
                                    setStartDate(start);
                                    setEndDate(end);
                                    if(end){
                                        setDatePickerOpen(false)
                                    }
                                }}
                                selectsRange
                                monthsShown={2}
                                open={datePickerOpen}
                                onClickOutside ={() => {
                                    setDatePickerOpen(false)
                                }}
                                clearButtonTitle={'Today'}
                                className="hidden"
                                renderExtraFooter={() => (
                                    <div onMouseDown={(e) => e.stopPropagation()}>
                                     <input />  
                                    </div>
                                  )}
                                 /> */}
                                  
                                   </div>
                               </div>
                                <span className={styles['selected-date']}>
                                  보고서는 실시간이 아닙니다. 2023. 03. 28 14:59 기준 , 2023.03.28  11: 00 시간까지 업데이트된 지표입니다.
                              </span>


                            </div>
                            <Table width={`100%`} className="m-0 !text-[16px]">
                                <TableHead className="bg-[#f5f7fb]">
                                    <TableRow className={'!h-[60px]'}>
                                        <TableCell className={clsx(styles["table-title"])}>no</TableCell>
                                        <TableCell className={clsx(styles["table-title"])}>등록번호</TableCell>
                                        <TableCell className={clsx(styles["table-title"])}>차량종류</TableCell>
                                        <TableCell className={clsx(styles["table-title"])}>운행거리</TableCell>
                                        <TableCell className={clsx(styles["table-title"])}>운행시간</TableCell>
                                        <TableCell className={clsx(styles["table-title"])}>달성률</TableCell>
                                        <TableCell className={clsx(styles["table-title"])}>상태</TableCell>
                                        <TableCell className={clsx(styles["table-title"])}>광고기간</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className="divide-y">
                                    {vehicle_advertisement_stats_details?.map((stats: any, index: number) => {
                                        return (
                                            <TableRow
                                                key={index}
                                                className="cursor-pointer hover:bg-blue-50 transform transition-all duration-200
                                            !h-[50px]"
                                            >
                                                <TableCell className={clsx(styles["table-value"], "!w-[82.4px]")}>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell className={clsx(styles["table-value"], "!w-[185px]")}>
                                                    {stats?.registration_number}
                                                </TableCell>

                                                <TableCell className={clsx(styles["table-value"], "!w-[205px]")}>
                                                    {TypeOfVechicle?.find((item) => 
                                                    item.value === (stats?.advertisement_vehicle_type))
                                                    ?.text + ` `}
                                                    {stats?.vehicle_type}
                                                </TableCell>
                                                <TableCell className={clsx(styles["table-value"], "!w-[195px]")}>
                                                    {stats?.total_distance}km
                                                </TableCell>
                                                <TableCell className={clsx(styles["table-value"], "!w-[190px]")}>
                                                    {stats?.total_hours}시간
                                                </TableCell>
                                                <TableCell className={clsx(styles["table-value"], "w-[200px]")}>{stats?.achievement_rate}</TableCell>
                                                <TableCell className={clsx(styles["table-value"], "w-[200px]")}>
                                                    {allStatuses.find((status) => stats?.status === status.value)?.label}
                                                    </TableCell>
                                                <TableCell className={clsx(styles["table-value"], "w-[200px]")}>{stats?.start_date} ~ {stats?.end_date}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="flex p-3 justify-center items-center">
                            데이터를 찾을 수 없습니다!
                        </div>
                    )}
                    {vehicle_advertisement_stats_details?.length ? (
                        <div className='flex justify-center py-[20px] notification_pagination'>
                            <Pagination
                                current={currentPage}
                                total={totalItems}
                                pageSize={itemsPerPage}
                                onChange={handlePageChange}
                            />
                        </div>
                    ) : null}
                </Card>

            </div>


            {/*mobile version*/}

            <div className={'only-mb ml-[19px] mr-[19px] break-words whitespace-break-spaces'}>

                <div className={`${styles["mobile-top-header"]}`}>
                    <ArrowBack handleAction={() => router.back()}/>
                    <div className={styles['header']}>
                        이카루스 서비스 오픈 출시 기념
                    </div>
                    <div></div>
                </div>

                <div className={'mt-[20px] flex flex-col space-y-3'}>

                    <div className={'flex justify-between space-x-2 items-center'}>
                              <span className={clsx(styles['mb-top-title'])}>
                   총운행거리/시간
                       </span>
                        <div className={styles['horizontal-line']}>
                        </div>
                    </div>


                    <div className={clsx(styles['driving-section'])}>
                        <div className={'flex  items-center space-x-2 justify-between'}>
                            <span className={styles['card-info-title']}>총 운행거리</span>
                            <span className={styles['total-driving-amount']}>3000시간</span>
                        </div>

                        <div className={'flex items-center space-x-2 justify-between'}>
                            <span className={styles['card-info-title']}>총 운행시간</span>
                            <span className={styles['total-driving-amount']}>300시간</span>
                        </div>

                    </div>
                </div>


                <div className={'mt-[28px]'}>
                    <div className={'flex justify-between space-x-2 items-center'}>
                        <span className={clsx(styles['mb-top-title'])}>
                        운행차량
                        </span>
                        <div className={styles['horizontal-line']}>

                        </div>
                    </div>
                </div>

                <div className={'flex items-center justify-between min-h-[40px] mb-[20px] mt-3 bg-white'}>
                    <div className={styles['date-next-prev']}>
                        <PrevIcon width={16} height={16}/>
                    </div>
                    <div>
                        <span className={styles['date']}>
                            오늘 : 2023. 03. 08 ~ 2023. 03. 08
                        </span>
                    </div>
                    <div className={styles['date-next-prev']}>
                        <NextIcon width={16} height={16}/>
                    </div>
                </div>


                <div className={'flex flex-col space-y-[12px]'}>
                    {
                        vehicle_advertisement_stats_details?.map((obj, idx) => {
                            return <div key={idx}
                                        className={clsx(styles['mobile-card-body'], 'flex flex-col py-[20px]')}>

                                <div
                                    className={'flex  items-center space-x-2 justify-between mx-[30px] border-b border-[#ebedf4] py-[14px]'}>
                                    <span className={styles['card-info-title']}>등록번호</span>
                                    <span className={styles['card-info-value']}>{obj.registration_number}</span>
                                </div>

                                <div
                                    className={'flex items-center space-x-2 justify-between mx-[30px] border-b border-[#ebedf4] py-[14px]'}>
                                    <span className={styles['card-info-title']}>차량종류</span>
                                    <span className={styles['card-info-value']}>{obj.vehicle_type}</span>
                                </div>

                                <div
                                    className={'flex  items-center space-x-2 justify-between mx-[30px] border-b border-[#ebedf4] py-[14px]'}>
                                    <span className={styles['card-info-title']}>운행거리</span>
                                    <span className={styles['card-info-value']}>{obj.total_distance}</span>
                                </div>

                                <div
                                    className={'flex  items-center space-x-2 justify-between mx-[30px] border-b border-[#ebedf4] py-[14px]'}>
                                    <span className={styles['card-info-title']}>운행시간</span>
                                    <span className={styles['card-info-value']}>{obj.total_hours}</span>
                                </div>

                                <div className={'flex  items-center space-x-2 justify-between mx-[30px]  py-[14px]'}>
                                    <span className={styles['card-info-title']}>달성률</span>
                                    <span className={styles['card-info-value']}>{obj.achievement_rate}</span>
                                </div>


                            </div>
                        })
                    }

                </div>
                {vehicle_advertisement_stats_details?.length && (
                <div className='flex justify-center py-[30px] notification_pagination'>
                    <Pagination
                        current={currentPage}
                        total={totalItems}
                        pageSize={itemsPerPage}
                        onChange={handlePageChange}
                    />
                </div>)}
            </div>
        </>
    );
}

export default StatisticsDetailsPage;

const data = [1, 2, 3,4,5,6,7,8,9].map((obj, id) => {
    return {
        no: id + 1,
        registration_number: "10150122호",
        car_number: "윙바디 1t",
        driving_distance: "500km",
        operating_time: "50시간",
        achievement_rate: "80%"
    }
})
