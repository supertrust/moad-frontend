import {ConfirmModal} from "@src/components/ConfirmModal";
import ArrowBack from "@src/components/icons/ArrowBack";
import { dateFormat, downloadFile, getFileName } from "@src/helpers";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Card, CircularProgress } from "@mui/material";
import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import { API_BASE_URL } from "@src/config";
import { useDeleteInquiry, useGetInquiryDetail } from "@src/apis/inquiry";
import useAuth from "@src/hooks/useAuth";
import styles from "./styles.module.scss";

function InquireDetailsPage() {
    const id = useRouter().query.id as string;
    const { data, isLoading } = useGetInquiryDetail({ id });
    const { mutateAsync: deleteInquiry } = useDeleteInquiry();
    const { user } = useAuth();
    const [deleteModal, setDeleteModal] = useState<{
        open: boolean;
        text: ReactNode;
    }>({
        open: false,
        text: null,
    });
    const router = useRouter();

    const download = async (path: string) => {
        const url = API_BASE_URL;
        return downloadFile(url + path, getFileName(path) as string);
    };


    const deleteData = async () => {
        deleteInquiry(
            { id },
            {
                onSuccess: () => {
                    router.push("/dashboard/customer-service/inquire");
                },
            }
        );
    };
    const InquiryType = {
        classification_of_payments: "결제",
        error: "오류",
        usage_inquiry: "이용문의",
        member_related: "회원관련",
    };
    return (
        <>
            <Head>
                <title>
                    {isLoading
                        ? "Loading page ..."
                        : data !== undefined
                            ? `[${InquiryType[data?.inquiry_type]}] ${data?.inquiry_title}`
                            : "Data Not Found"}
                </title>
            </Head>
            <ConfirmModal
                open={deleteModal.open}
                text={deleteModal.text}
                reject={() => {
                    deleteModal.open = false;
                    setDeleteModal({ ...deleteModal });
                }}
                accept={deleteData}
            />
            <div className="p-[20px] px-[15px] sm:px-[30px] sm:py-[20px] text-gray-700 flex flex-col gap-[30px] only-pc">
                <div className="flex gap-[20px] items-center p-[20px] sm:p-[0]">
                    <Link href={`/dashboard/customer-service/inquire`} className="hover:no-underline">
                        <button className="font-bold text-[20px] text-blue-700">
                            문의내역확인
                        </button>
                    </Link>
                    {user?.role === "Advertiser" && (
                        <Link href={`form`} className="text-[16px] hover:no-underline">
                            <button>문의하기</button>
                        </Link>
                    )}
                </div>
                <Card
                    variant="elevation"
                    elevation={1}
                    className="flex flex-col relative"
                >
                    {isLoading ? (
                        <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
                            <CircularProgress color="primary" />
                        </div>
                    ) : data !== null ? (
                        <>
                            <div className="sm:px-7 sm:py-3 sm:!border-b-[1px] flex flex-wrap	 sm:gap-2 justify-between items-center">
                <span className="text-[16px] font-medium	w-full lg:w-auto sm:w-auto border-[#EBEDF4] border-b-[1px] sm:!border-b-[0px] py-[12px] sm:py-[0px] px-[20px] sm:px-[0px]">
                  [{data? InquiryType[data?.inquiry_type] : null}] {data?.inquiry_title}
                </span>
                                <div className="flex justify-end text-sm w-full lg:w-auto sm:w-auto py-[12px] sm:py-[0px] px-[10px] sm:px-[0px]">
                  <span className={styles["date"]}>
                    {dateFormat(data?.created_at as string, "Y-m-d H:i")}
                  </span>
                                </div>
                            </div>
                        <div className={'h-[542px] overflow-y-auto'}>
                            <div className="break-words whitespace-break-spaces px-7  min-h-[285px]  justify-between py-3 border-b-[1px] border-[#EBEDF4]  flex flex-col sm:gap-3">
                                <div className="flex flex-col pt-1">
                                    {data?.documents?.question?.length?
                                        <>
                  <span className={styles['document-count']}>
                    첨부파일 총 {data?.documents?.question?.length ?? 0} 건
                  </span>
                                            <div className="flex gap-[8px] pb-[30px] pt-2 flex-wrap">
                                                {data?.documents?.question?.map((v, i) => {
                                                    return (
                                                        <div
                                                            onClick={() => download(v)}
                                                            key={i}
                                                            className={styles['document-body']}
                                                        >
                                                            <span className={styles['document-name']}> {getFileName(v)}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </>
                                        : null
                                    }
                                    <div className={styles["question"]}>{data?.inquiry_question}</div>
                                </div>

                                <div className="mt-3 flex justify-end gap-2 !text-sm">
                                    {data?.inquiry_answer !== null ? (
                                        <span className={styles["answer-complete"]}>답변완료</span>
                                    ) : (
                                        <>
                                            <span className={styles["before-reply-correction"]}>수정</span>
                                            <Link
                                                href={`/dashboard/customer-service/inquire/form/${id}`}
                                            >
                                                <span className={styles["before-reply-correction"]}>삭제</span>
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    deleteModal.open = true;
                                                    if (!deleteModal.text) {
                                                        deleteModal.text =<>
                                                            <div className={styles[`delete-modal-header`]}>게시물 삭제</div>
                                                            <div className={styles["delete-modal-body"]}>게시물을 정말 삭제하시겠습니까?</div>
                                                        </>
                                                    }
                                                    setDeleteModal({ ...deleteModal });
                                                }}
                                            >
                                                <span className={styles['delete-inquire']}>답변전</span>

                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="p-[0] sm:px-4 sm:py-[20px]  break-words whitespace-break-spaces">
                                <div className="bg-blue-50 py-4 pl-4 pr-7 flex flex-col gap-3 bg-[#E1ECFF40] !h-full min-h-[214px]">
                                    {data?.inquiry_answer !== null ? (
                                        <>
                                            <div className="flex justify-between  text-sm">

                                                <div className="flex flex-col gap-2">
                                                    { data?.documents?.answer &&  <span className={styles['document-count']}>
                            첨부파일 총 {data?.documents?.answer?.length ?? 0}{" "}
                                                        건
                          </span>
                                                    }


                                                    { data?.documents?.answer &&   <div
                                                        className={ "flex flex-row gap-2 !mt-2 flex-wrap"}>
                                                        {data?.documents?.answer?.map((v, i) => {
                                                            return (
                                                                <div
                                                                    onClick={() => download(v)}
                                                                    key={i}
                                                                    className={styles['document-body']}
                                                                >
                                                                    <span
                                                                        className={styles['document-name']}> {v}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    }

                                                    <span className={clsx(styles['text-answer-header'], data?.documents?.answer?.length ? "mt-[18px]" : "")}>이카루스</span>

                                                    <div className={styles['answer']}>{data?.inquiry_answer}</div>
                                                </div>

                                                <div className={styles["date"]}>
                                                    {dateFormat(data?.updated_at as string, "Y-m-d H:i")}
                                                </div>
                                            </div>

                                        </>
                                    ) : (
                                        <div className="flex p-5 justify-center">
                                            작성된 답변이 없습니다.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                            <div className="sm:py-[25px] p-[20px] px-[70px] pb-7 flex justify-between sm:justify-around items-center gap-5 border-t">
                                <Link href={data?.prev !== null ? `${data?.prev}` : "#"} className="hover:no-underline text-[#2C324C] hover:!text-[#2F48D1]">
                                    <button
                                        disabled={data?.prev === null}
                                        type="button"
                                        className="flex items-center disabled:font-normal disabled:hover:font-normal disabled:text-gray-200 disabled:hover:text-gray-200 disabled:cursor-not-allowed transition-all duration-200"
                                    >
                                        <ChevronLeftIcon className="w-[20px] h-[20px]" /> <span className={styles['next-prev']}>이전글</span>
                                    </button>
                                </Link>
                                <Link href={`/dashboard/customer-service/inquire`} className="hidden sm:block">
                                    <button
                                        type="button"
                                        className="px-8 py-2 border-solid border-[1px] border-[#2F48D1] hover:bg-blue-600 hover:text-gray-50 transition-all duration-200"
                                    >
                                        <span>목록</span>
                                    </button>
                                </Link>
                                <Link href={data?.next !== null ? `${data?.next}` : "#"} className="hover:no-underline text-[#2C324C] hover:!text-[#2F48D1]">
                                    <button
                                        disabled={data?.next === null}
                                        type="button"
                                        className="flex items-center disabled:font-normal disabled:hover:font-normal disabled:text-gray-200 disabled:cursor-not-allowed disabled:hover:text-gray-200 transition-all duration-200"
                                    >
                                        <span className={styles['next-prev']}>다음글</span> <ChevronRightIcon className="w-[20px] h-[20px] " />
                                    </button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="flex p-3 justify-center items-center">
                            데이터를 찾을 수 없습니다!
                        </div>
                    )}
                </Card>
            </div>

            {/*mobile version */}

            <div className={' only-mb'}>
                <div className={`${styles["mobile-top-header"]}`}>
                    <ArrowBack handleAction={()=>router.back()}/>
                    <div className={styles['header']}>
                        문의내역
                    </div>
                    <div></div>
                </div>
            </div>

            <div className="text-gray-700 flex flex-col gap-[30px] only-mb">

                <Card
                    variant="elevation"
                    elevation={1}
                    className="flex flex-col relative"
                >
                    {isLoading ? (
                        <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
                            <CircularProgress color="primary" />
                        </div>
                    ) : data !== null ? (
                        <>
                            <div className="sm:px-7 sm:py-3 sm:!border-b-[1px] flex flex-wrap	 sm:gap-2 justify-between items-center">
                <div className="flex space-x-[10px] text-[16px] font-medium	w-full lg:w-auto sm:w-auto border-[#EBEDF4] border-b-[1px] sm:!border-b-[0px] py-[12px] sm:py-[0px] px-[20px] sm:px-[0px]">
                  <span>[{data? InquiryType[data?.inquiry_type] : null}]</span> <span>{data?.inquiry_title}</span>
                </div>
                            </div>
                            <div className={clsx(styles['mobile-layout'],' overflow-y-auto')}>
                                <div className="flex justify-between text-sm w-full  sm:w-auto pt-[12px]  px-[14px]">
                     <span className={clsx(styles['document-count'],'ml-[6px]')}>
                    { data?.documents?.question?.length ? `첨부파일 총 ${data?.documents?.question?.length ?? 0} 건` : ""}
                  </span> <span className={styles["date"]}>
                    {dateFormat(data?.created_at as string, "Y-m-d")}
                  </span>
                                </div>
                                <div className="break-words whitespace-break-spaces px-[20px]  min-h-[285px]  justify-between py-[1rem] border-b-[1px] border-[#EBEDF4]  flex flex-col sm:gap-3">
                                    <div className={clsx("flex flex-col",data?.documents?.question?.length ? "" : "pt-2")}>
                                        {data?.documents?.question?.length?
                                            <>

                                                <div className={clsx("flex gap-[4px]   flex-wrap",data?.documents?.question?.length ? "pb-[19px]" : "pt-2 pb-[30px]")}>
                                                    {data?.documents?.question?.map((v, i) => {
                                                        return (
                                                            <div
                                                                onClick={() => download(v)}
                                                                key={i}
                                                                className={styles['document-body']}
                                                            >
                                                                <span className={styles['document-name']}> {getFileName(v)}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </>
                                            : null
                                        }
                                        <div className={styles["question"]}>{data?.inquiry_question}</div>
                                    </div>

                                    <div className="mt-9 flex justify-end gap-2 !text-sm">
                                        {data?.inquiry_answer !== null ? (
                                            <span className={styles["answer-complete"]}>답변완료</span>
                                        ) : (
                                            <>
                                                <span className={styles["before-reply-correction"]}>수정</span>
                                                <Link
                                                    href={`/dashboard/customer-service/inquire/form/${id}`}
                                                >
                                                    <span className={styles["before-reply-correction"]}>삭제</span>
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        deleteModal.open = true;
                                                        if (!deleteModal.text) {
                                                            deleteModal.text =<>
                                                                <div className={styles[`delete-modal-header`]}>게시물 삭제</div>
                                                                <div className={styles["delete-modal-body"]}>게시물을 정말 삭제하시겠습니까?</div>
                                                            </>
                                                        }
                                                        setDeleteModal({ ...deleteModal });
                                                    }}
                                                >
                                                    <span className={styles['delete-inquire']}>답변전</span>

                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-[14px] break-words whitespace-break-spaces">
                                    <div className="bg-blue-50 pt-4 pl-5 pr-5 flex flex-col gap-3 bg-[#E1ECFF40] !h-full min-h-[202px]">
                                        {data?.inquiry_answer !== null ? (
                                            <>
                                            <div className="flex justify-between ">
                                                { data?.documents?.answer ?  <span className={styles['document-count']}>
                            첨부파일 총 {data?.documents?.answer?.length ?? 0}{" "} 건
                          </span> :   <span className={clsx(styles['text-answer-header'], data?.documents?.answer?.length ? "mt-[18px]" : "")}>이카루스</span>

                                                }   <span className={styles["date"]}>
                                                        {dateFormat(data?.updated_at as string, "Y-m-d")}
                                                    </span>
                    </div>
                                                <div className="flex justify-between  text-sm">

                                                    <div className="flex flex-col gap-[10px]">



                                                        { data?.documents?.answer &&   <div
                                                            className={ "flex flex-row gap-1 !mt-2 flex-wrap"}>
                                                            {data?.documents?.answer?.map((v, i) => {
                                                                return (
                                                                    <div
                                                                        onClick={() => download(v)}
                                                                        key={i}
                                                                        className={styles['document-body']}
                                                                    >
                                                                    <span
                                                                        className={styles['document-name']}> {v}</span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                        }

                                                        <div className={styles['answer']}>{data?.inquiry_answer}</div>
                                                    </div>

                                                </div>

                                            </>
                                        ) : (
                                            <div className="flex p-5 justify-center">
                                                작성된 답변이 없습니다.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="py-[20px] px-[15px] pb-7 flex justify-between sm:justify-around items-center border-t border-[#EBEDF4]">
                                <Link href={data?.prev !== null ? `${data?.prev}` : "#"} className="hover:no-underline text-[#2C324C] hover:!text-[#2F48D1]">
                                    <button
                                        disabled={data?.prev === null}
                                        type="button"
                                        className="flex items-center disabled:font-normal disabled:hover:font-normal disabled:text-gray-200 disabled:hover:text-gray-200 disabled:cursor-not-allowed transition-all duration-200"
                                    >
                                        <ChevronLeftIcon className="w-[20px] h-[20px]" /> <span className={styles['next-prev']}>이전글</span>
                                    </button>
                                </Link>
                                <Link href={data?.next !== null ? `${data?.next}` : "#"} className="hover:no-underline text-[#2C324C] hover:!text-[#2F48D1]">
                                    <button
                                        disabled={data?.next === null}
                                        type="button"
                                        className="flex items-center disabled:font-normal disabled:hover:font-normal disabled:text-gray-200 disabled:cursor-not-allowed disabled:hover:text-gray-200 transition-all duration-200"
                                    >
                                        <span className={styles['next-prev']}>다음글</span> <ChevronRightIcon className="w-[20px] h-[20px] " />
                                    </button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="flex p-3 justify-center items-center">
                            데이터를 찾을 수 없습니다!
                        </div>
                    )}
                </Card>
            </div>
        </>
    );
}

export default InquireDetailsPage;

