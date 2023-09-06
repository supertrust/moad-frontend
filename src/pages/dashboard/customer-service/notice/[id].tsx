import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Card, CircularProgress } from "@mui/material";
import { useGetNoticeDetail } from "@src/apis/notice";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function NoticeDetailScreen() {
  const id = useRouter().query.id as string;
  const { data, isLoading } = useGetNoticeDetail({ id });
  return (
    <>
      <Head>
        <title>{isLoading ? "Loading page ..." : data?.title}</title>
      </Head>
      <div className="lg:!p-7 p-0 text-gray-700 flex flex-col gap-5">
        <div className="font-bold">이카루스에서 알려드립니다.</div>
        <Card
          variant="elevation"
          elevation={2}
          className="flex flex-col gap-2 relative"
        >
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
              <CircularProgress color="primary" />
            </div>
          ) : (
            <>
              <div className="lg:px-7 lg:py-3 px-[20px] py-[13px] border-b flex gap-2 justify-between items-center">
                <span className="text-[16px] font-medium	w-full lg:w-auto sm:w-auto">[공지] {data?.title}</span>
                <div className="flex justify-end text-sm w-full lg:w-auto sm:w-auto">
                  <span className="font-medium pr-[24px]">By. 이카루스</span>
                  <span className="text-[#999999] pr-[10px] font-medium	">{data?.created_at?.split('T')[0]}</span>
                  <span className="text-[#999999] font-medium	">{data?.created_at? (new Date(data?.created_at?.split('.')[0]).getHours()) : null}:{data?.created_at? (new Date(data?.created_at?.split('.')[0]).getMinutes()) : null} </span>
                </div>
              </div>
              <div className="px-7 py-3 max-h-96 overflow-y-auto flex flex-col gap-2">
                {data?.image && (
                  <Image
                    src={data?.image}
                    className="w-full"
                    alt=""
                    width={500}
                    height={500}
                  />
                )}
                <div>{data?.content}</div>
              </div>
              <div className="py-[25px] flex justify-around items-center gap-5 border-t border-[#EBEDF4]">
                <Link
                  href={"#"}
                  // href={data?.prev !== null ? `/notice/${data?.prev}` : "#"}
                  className="hover:no-underline" >
                  <button
                    // disabled={data?.prev === null}
                    type="button"
                    className="flex items-center disabled:font-normal disabled:hover:font-normal disabled:text-gray-200 text-[#2C324C] disabled:hover:text-gray-200 hover:text-[#2F48D1] transition-all duration-200"
                  >
                    <ChevronLeftIcon className="w-7 h-7" /> 이전글
                  </button>
                </Link>
                <Link href={`/customer-service/notice`}>
                  <button
                    type="button"
                    className="px-3 py-2 border hover:bg-blue-600 hover:text-gray-50 transition-all duration-200 	!border-[#2F48D1] !border-solid w-24 h-9 flex justify-center text-[#2F48D1]"
                  >
                    목록
                  </button>
                </Link>
                <Link
                  // href={data?.next !== null ? `/notice/${data?.next}` : "#"} className="hover:no-underline"
                  href={"#"} className="hover:no-underline"
                >
                  <button
                    // disabled={data?.next === null}
                    type="button"
                  className="flex items-center disabled:font-normal disabled:hover:font-normal disabled:text-gray-200 text-[#2C324C] disabled:hover:text-gray-200 hover:text-[#2F48D1] transition-all duration-200"
                  >
                    다음글 <ChevronRightIcon className="w-7 h-7" />
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
