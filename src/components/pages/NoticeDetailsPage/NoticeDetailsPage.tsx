import { Card, CircularProgress } from "@mui/material";
import { useGetNoticeDetail } from "@src/apis/notice";
import ArrowBack from "@src/components/icons/ArrowBack";
import NextIcon from "@src/components/icons/NextIcon";
import PrevIcon from "@src/components/icons/PrevIcon";
import { useIcarusContext } from "@src/hooks/useIcarusContext";
import { formatDate } from "@src/utils/formatter";
import clsx from "clsx";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import useAuth from '@src/hooks/useAuth';

function NoticeDetailsPage() {
    const id = useRouter().query.id as string;
    const { data, isFetching:isLoading } = useGetNoticeDetail({ id });
    const {setPageTitle } = useIcarusContext();
	const { dictionary:{ loadingPageMsg, noticeDetailPage } } = useAuth();
    const router = useRouter();

    useEffect(()=>{
       setPageTitle(noticeDetailPage.pageTitle)
    },[noticeDetailPage])

    return (
        <>
            <Head>
                <title>{isLoading ? loadingPageMsg : data?.title}</title>
            </Head>
            <div className="only-pc lg:!py-5 lg:!pl-7 lg:!pr-5 p-0 text-gray-700 flex flex-col gap-3">
                <div className={styles["notice-header"]}>{noticeDetailPage.title}</div>
                <Card
                    variant="elevation"
                    elevation={2}
                    className="flex flex-col gap-2 relative pt-1"
                >
                    {isLoading ? (
                        <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
                            <CircularProgress color="primary" />
                        </div>
                    ) : (
                        <>
                            <div className="sm:px-7  sm:!border-b-[1px] flex flex-wrap !h-[48px] sm:gap-2 justify-between items-center">
                                <span className="text-[16px] font-medium	w-full lg:w-auto sm:w-auto border-[#EBEDF4] border-b-[1px] sm:!border-b-[0px] py-[12px] sm:py-[0px] px-[20px] sm:px-[0px]">{data?.title}</span>
                                <div className="flex justify-end text-sm w-full lg:w-auto sm:w-auto py-[8px] sm:py-[0px] px-[10px] sm:px-[0px]">
                                    <span className={clsx(styles["author"],"pr-[24px]")}>{noticeDetailPage.postBy}</span>
                                    <span className={clsx(styles["created-date"],"!pr-[2px]")}>
                                        {formatDate(data?.created_at,true)}</span>
                                </div>
                            </div>
                            <div className="px-7 !py-[12px] max-h-96 overflow-y-auto flex flex-col gap-2">
                                {data?.image && (
                                    <Image
                                        src={data?.image}
                                        className="w-full"
                                        alt=""
                                        width={500}
                                        height={500}
                                    />
                                )}
                                <div ><div className={clsx(styles["content"],"break-words whitespace-break-spaces")}
                                dangerouslySetInnerHTML={{ __html: data?.content || '' }}/></div>
                            </div>
                            <div className="sm:py-[25px] p-[20px] !px-[45px] flex justify-between sm:justify-around items-center gap-0 border-t border-[#EBEDF4]">
                                <Link
                                    href={data?.prev !== null ? `${data?.prev}` : "#"}
                                    className="hover:no-underline" >
                                    <button
                                        disabled={data?.prev === null}
                                        type="button"
                                        className="flex items-center disabled:font-normal disabled:hover:font-normal disabled:text-gray-200 text-[#2C324C] disabled:hover:text-gray-200 hover:text-advertiser-primary transition-all duration-200"
                                    >
                                       <PrevIcon/> <span className={styles['next-prev']}>{noticeDetailPage.prevBtnText}</span>
                                    </button>
                                </Link>
                                <Link href={`/dashboard/customer-service/notice`} className="hidden sm:block">
                                    <button
                                        type="button"
                                        className="px-3 py-2 border hover:bg-blue-600 hover:text-gray-50 transition-all duration-200 	!border-advertiser-primary !border-solid w-[92px] h-9 flex justify-center text-advertiser-primary"
                                    >
                                        <span className={styles['list']} >{noticeDetailPage.listBtnText}</span>
                                    </button>
                                </Link>
                                <Link
                                    href={data?.next !== null ? `${data?.next}` : "#"} className="hover:no-underline"
                                >
                                    <button
                                        disabled={data?.next === null}
                                        type="button"
                                        className="flex items-center disabled:font-normal disabled:hover:font-normal disabled:text-gray-200 text-[#2C324C]
                                        disabled:hover:text-gray-200 hover:text-advertiser-primary transition-all duration-200"
                                    >
                                        <span className={styles['next-prev']}>{noticeDetailPage.nextBtnText}</span> <NextIcon/>
                                    </button>
                                </Link>
                            </div>
                        </>
                    )}
                </Card>
            </div>


            <div className={`only-mb`}>
                <div className={`${styles["mobile-top-header"]}`}>
                    <ArrowBack handleAction={()=>router.back()}/>
                    <div className={styles['header']}>
                        {noticeDetailPage.pageTitle}
                    </div>
                    <div></div>
                </div>
            </div>

            <div className="only-mb  p-0 text-gray-700 flex flex-col gap-3">

                <Card
                    variant="elevation"
                    elevation={2}
                    className="flex flex-col gap-2 pt-1 "
                >
                    {isLoading ? (
                        <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
                            <CircularProgress color="primary" />
                        </div>
                    ) : (
                        <>
                            <div className="sm:px-7  sm:!border-b-[1px] flex flex-wrap h-full sm:gap-2 justify-between items-center">
                                <span className="text-[16px] font-medium	w-full lg:w-auto sm:w-auto border-[#EBEDF4] border-b-[1px] sm:!border-b-[0px] py-[12px] sm:py-[0px] px-[18px]">{data?.title}</span>

                            </div>
                            <div className={clsx(styles['mb-main-content'],"px-[18px]   overflow-y-auto flex flex-col gap-2")}>
                                <div className="flex justify-end text-sm w-full lg:w-auto sm:w-auto  sm:px-[0px] pb-[16px]">
                                    <span className={clsx(styles["author"],"pr-[12px]")}>{noticeDetailPage.postBy}</span>
                                    <span className={clsx(styles["created-date"],"!pr-[0px]")}>
                                        {formatDate(data?.created_at)}</span>

                                </div>

                               <div className={''}>
                                   {data?.image && (
                                       <Image
                                           src={data?.image}
                                           className="w-full"
                                           alt=""
                                           width={500}
                                           height={500}
                                       />
                                   )}
                                   <div ><div className={clsx(styles["content"],"break-words whitespace-break-spaces")}>{data?.content}</div></div>

                               </div>
                            </div>
                            <div className="h-[60px] !px-[18px] flex justify-between sm:justify-around items-center gap-0 border-t border-[#EBEDF4]">
                                <Link
                                    href={data?.prev !== null ? `${data?.prev}` : "#"}
                                    className="hover:no-underline" >
                                    <button
                                        disabled={data?.prev === null}
                                        type="button"
                                        className="flex items-center disabled:font-normal disabled:hover:font-normal disabled:text-gray-200 text-[#2C324C] disabled:hover:text-gray-200 hover:text-advertiser-primary transition-all duration-200"
                                    >
                                        <PrevIcon/> <span className={styles['next-prev']}>{noticeDetailPage.prevBtnText}</span>
                                    </button>
                                </Link>
                                <Link href={`/dashboard/customer-service/notice`} className="hidden sm:block">
                                    <button
                                        type="button"
                                        className="px-3 py-2 border hover:bg-blue-600 hover:text-gray-50 transition-all duration-200 	!border-advertiser-primary !border-solid w-[92px] h-9 flex justify-center text-advertiser-primary"
                                    >
                                        <span className={styles['list']} >{noticeDetailPage.listBtnText}</span>
                                    </button>
                                </Link>
                                <Link
                                    href={data?.next !== null ? `${data?.next}` : "#"} className="hover:no-underline"
                                >
                                    <button
                                        disabled={data?.next === null}
                                        type="button"
                                        className="flex items-center disabled:font-normal disabled:hover:font-normal disabled:text-gray-200 text-[#2C324C]
                                        disabled:hover:text-gray-200 hover:text-advertiser-primary transition-all duration-200"
                                    >
                                        <span className={styles['next-prev']}>{noticeDetailPage.nextBtnText}</span> <NextIcon
                                    />
                                    </button>
                                </Link>
                            </div>
                        </>
                    )}
                </Card>
            </div>
        </>
    );
}

export default NoticeDetailsPage;
