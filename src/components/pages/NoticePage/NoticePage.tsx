import { Card, CircularProgress, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ArrowBack from "@src/components/icons/ArrowBack";
import { logger } from "@src/utils/func";
import clsx from "clsx";
import styles from "./styles.module.scss";
import { useIcarusContext } from "@src/hooks/useIcarusContext";
import { Pagination } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { PushPin } from '@mui/icons-material';
import { useGetNotices } from "@src/apis/notice";
import useAuth from '@src/hooks/useAuth';
import Head from "next/head";

function NoticePage() {

    const [filter, setFilter] = useState({
        page: 1,
        total: 0,
        per_page: 10,
        totalPinned : 0
    })
    const { setPageTitle } = useIcarusContext()
    const { data: res,isInitialLoading, isLoading, isFetching } = useGetNotices({ page: filter.page });
    const { dictionary: { noticePage, pageTitle }, isKorean } = useAuth();
    const router = useRouter();
    const data = res?.data

    const onBack = () => {
        router.back();
    }

    const handlePageChange = (page) => {
        setFilter({
            ...filter,
            page
        });
    };

    useEffect(() => {
        setPageTitle(pageTitle['top_bar_announcement']);
    }, [isKorean])

    useEffect(() => {
        if(!isInitialLoading && res){
            setFilter({
                ...filter,
                total: res?.total,
                totalPinned : res?.totalPinned || 0
            })
        }

    }, [isLoading])

    return (
        <>
            <Head>
                <title>{noticePage.title}</title>
            </Head>
            <div className="pl-[30px] pr-[20px]  pt-[20px] pb-[35px] text-gray-700 flex flex-col gap-[20px] only-pc">
                <div className="font-bold text-[20px] text-[#373737]">{noticePage.heading}</div>
                <Card variant="elevation" elevation={3}
                      className="flex flex-col justify-between min-h-[660px] h-full gap-2 !shadow-[0px_2px_8px_0px_rgba(38,51,77,0.05)]">
                    {isLoading ? (
                        <div className="flex justify-center items-center w-full  min-h-[560px] backdrop-blur-sm">
                            <CircularProgress/>
                        </div>
                    ) : (
                        <Table width={`100%`} className="mb-[0px] relative" id="notice-table">
                            {/* <TableHead className={`bg-sky-100 bg-[#E1ECFF] ${pin?'table-head-notice' : ''}`}> */}
                            <TableHead className={`bg-table-header`}>
                                <TableRow>
                                    <TableCell className="!text-center">{noticePage.columns[0]}</TableCell>
                                    <TableCell className="!text-center">{noticePage.columns[1]}</TableCell>
                                    <TableCell className="!text-center">{noticePage.columns[2]}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y">
                                {data?.length ? data.map((notice, index) => {
                                        return (
                                            <TableRow key={index} style={{ height: "50px", background : notice.sort_order ?"#FFF6E3" : "" }}>
                                                <TableCell className="!text-center !text-[16px] w-[225px]">
                                                    <div
                                                        className="flex items-center cursor-pointer justify-center"
                                                    >
                                                        { notice.sort_order ? (
                                                            <PushPin className="!w-4"/>
                                                        ) : (
                                                            // data.slice(prevItems,currentItems).length - i
                                                            index + 1 + (filter.page - 1) * filter.per_page- filter?.totalPinned
                                                            //- data?.filter((v) => notice.important == true)
                                                            //   .length +
                                                            // (page - 1) * 10
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="!text-[16px]" style={{ letterSpacing: "-0.16px" }}>
                                                    <Link
                                                        href={`notice/${notice.id}`}
                                                        className="text-[#2C324C] hover:no-underline transition-colors duration-200"
                                                    >
                                                        {notice.title}
                                                    </Link>
                                                </TableCell>
                                                <TableCell className="!text-center !text-[16px] !text-[#525866] w-[350px]">
                                                    {notice.created_at?.split('T')[0]}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                    :
                                    <TableRow>
                                        <TableCell colSpan={3}
                                                   className="!text-center !text-[#999] border-0 !p-[200px]">{noticePage.noAdsMsg}</TableCell>
                                    </TableRow>
                                }

                            </TableBody>
                        </Table>
                    )}
                    {filter.total ? (

                        <div className="flex justify-center py-[30px] notification_pagination">
                            <Pagination
                                current={filter.page}
                                total={filter.total}
                                pageSize={filter.per_page}
                                onChange={handlePageChange}
                            />
                        </div>
                    ) : null}
                </Card>
            </div>

            <div className={'only-mb'}>
                <div className={`${styles["mobile-top-header"]}`}>
                    <div style={{ alignSelf: "flex-start" }}>
                        <ArrowBack className={'ml-4'} handleAction={onBack}/>
                    </div>
                    <div className={styles['header']}>
                        {noticePage.pageTitle}
                    </div>
                    <div></div>

                </div>

                {
                    data?.length ? data?.map((notice, idx) => {
                        return <div style={{ background : notice.sort_order ?"#FFF6E3" : ""}} onClick={() => router.push(`notice/${notice.id}`)} key={idx}
                                    className={'flex gap-4 h-[60px] px-3 py-4 border-b border-[#ebedf4]'}>
                            <div className={'text-center flex justify-center w-[10px]'}>
                                 { notice.sort_order ? (
                                     <PushPin className="!w-4"/>
                                 ) : (
                                     ( idx + 1 + (filter.page - 1) * filter.per_page)- filter?.totalPinned
                                 )}
                            </div>
                           <div className={'flex justify-between flex-1 gap-4'}>
                                <span className={clsx(styles["notice-title"],'line-clamp-1')}>
                            {notice.title}
                        </span>
                               <span className={clsx(styles['notice-date'],'shrink-0 w-[70px]')}>
                            {notice.created_at?.split('T')[0]}
                       </span>
                           </div>
                        </div>
                    }) : isLoading ? (
                        <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
                            <CircularProgress color="primary"/>
                        </div>) : <></>
                }

                {filter.total ? (

                    <div className="flex justify-center py-[30px] notification_pagination">
                        <Pagination
                            current={filter.page}
                            total={filter.total}
                            pageSize={filter.per_page}
                            onChange={handlePageChange}
                        />
                    </div>
                ) : null}


            </div>
        </>
    );
}

export default NoticePage;
