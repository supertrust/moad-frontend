import { Card, CircularProgress, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useGetShowAdvertisementStats } from '@src/apis/advertisement';
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
import styles from './styles.module.scss';

function StatisticsDetailsPage() {
    const { isLoading } = useGetShowAdvertisementStats({ page: 1});
    const [selectedAds, setSelectedAds] = useState<IAdvertisementStat[]>([]);
    const { setPageTitle } = useIcarusContext()
    const router = useRouter()

    const itemsPerPage = 10;

    const [currentPage, setCurrentPage] = useState(1); // Current page number

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const totalItems = 50;
    const prevItems = 1;
    const currentItems = 10;

    // useEffect(() => {
    //   setPageTitle("이카루스 서비스 오픈 출시 기념")
    // }, [])


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
                    ) : data?.length ? (
                        <div>
                            <div className={'min-h-[74px] flex items-center px-4 justify-between space-x-5'}>
                               <div className={'flex space-x-[20px]'}>
                                   <div
                                       className={'flex items-center justify-between  bg-white border-y border-[#ebedf4] w-[320px]'}>
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

                                   <div className={'h-[40px] w-[1px] bg-[#EBEDF4]'}>

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
                                    {data?.map((stats: any, index: number) => {
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
                                                    {stats?.car_number}
                                                </TableCell>
                                                <TableCell className={clsx(styles["table-value"], "!w-[195px]")}>
                                                    {stats?.driving_distance}
                                                </TableCell>
                                                <TableCell className={clsx(styles["table-value"], "!w-[190px]")}>
                                                    {stats?.operating_time}
                                                </TableCell>
                                                <TableCell className={clsx(styles["table-value"], "w-[200px]")}>{stats?.achievement_rate}</TableCell>
                                                <TableCell className={clsx(styles["table-value"], "w-[200px]")}>광고진행중</TableCell>
                                                <TableCell className={clsx(styles["table-value"], "w-[200px]")}>2023.03.01 ~ 2023.09.30</TableCell>
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
                    {data?.length ? (
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
                        data.map((obj, idx) => {
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
                                    <span className={styles['card-info-value']}>{obj.car_number}</span>
                                </div>

                                <div
                                    className={'flex  items-center space-x-2 justify-between mx-[30px] border-b border-[#ebedf4] py-[14px]'}>
                                    <span className={styles['card-info-title']}>운행거리</span>
                                    <span className={styles['card-info-value']}>{obj.driving_distance}</span>
                                </div>

                                <div
                                    className={'flex  items-center space-x-2 justify-between mx-[30px] border-b border-[#ebedf4] py-[14px]'}>
                                    <span className={styles['card-info-title']}>운행시간</span>
                                    <span className={styles['card-info-value']}>{obj.operating_time}</span>
                                </div>

                                <div className={'flex  items-center space-x-2 justify-between mx-[30px]  py-[14px]'}>
                                    <span className={styles['card-info-title']}>달성률</span>
                                    <span className={styles['card-info-value']}>{obj.achievement_rate}</span>
                                </div>


                            </div>
                        })
                    }

                </div>

                <div className='flex justify-center py-[30px] notification_pagination'>
                    <Pagination
                        current={currentPage}
                        total={totalItems}
                        pageSize={itemsPerPage}
                        onChange={handlePageChange}
                    />
                </div>
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
