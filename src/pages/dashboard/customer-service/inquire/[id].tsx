import ConfirmModal from "@src/components/ConfirmModal";
import { dateFormat, downloadFile, getFileName } from "@src/helpers";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Card, CircularProgress } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { API_BASE_URL } from "@src/config";
import { useDeleteInquiry, useGetInquiryDetail } from "@src/apis/inquiry";
import useAuth from "@src/hooks/useAuth";

export default function InquireDetailScreen() {
  const id = useRouter().query.id as string;
  const { data, isLoading } = useGetInquiryDetail({ id });
  const { mutateAsync: deleteInquiry } = useDeleteInquiry();
  const { user } = useAuth();
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    text: string | null;
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
      <div className="p-[20px] sm:px-[30px] sm:py-[20px] text-gray-700 flex flex-col gap-[30px]">
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
                  <span className="text-sm text-[#999999]">
                    {dateFormat(data?.created_at as string, "Y-m-d H:i")}
                  </span>
                </div>
              </div>
              <div className="px-[20px] sm:px-0 sm:mx-7 min-h-[200px] h-full justify-between py-3 border-b-[1px] border-[#EBEDF4] overflow-y-auto flex flex-col sm:gap-3">
                <div className="flex flex-col">
                {data?.documents?.question?.length?
                <>
                  <span className="font-medium">
                    첨부파일 총 {data?.documents?.question?.length ?? 0} 건
                  </span>
                  <div className="flex gap-2 pb-[30px]">
                    {data?.documents?.question?.map((v, i) => {
                      return (
                        <button
                          onClick={() => download(v)}
                          key={i}
                          className="px-2 py-1 text-xs bg-gray-200 rounded shadow hover:bg-gray-300 transition-all duration-200"
                        >
                          {getFileName(v)}
                        </button>
                      );
                    })}
                  </div>
                </>
                : null
                }
                  <div className="">{data?.inquiry_question}</div>
                </div>
                
                <div className="mt-3 flex justify-end gap-2 !text-sm">
                  {data?.inquiry_answer !== null ? (
                    <span className="font-bold text-blue-700">답변완료</span>
                  ) : (
                    <>
                      <Link
                        href={`/dashboard/customer-service/inquire/form/${id}`}
                      >
                        <span className="text-gray-400">수정</span>
                      </Link>
                      <button
                        className="text-gray-400"
                        onClick={() => {
                          deleteModal.open = true;
                          if (!deleteModal.text) {
                            deleteModal.text =
                              '<div className="font-semibold text-blue-600">게시물 삭제</div>';
                            deleteModal.text +=
                              '<div className="font-semibold">게시물을 정말 삭제하시겠습니까?</div>';
                          }
                          setDeleteModal({ ...deleteModal });
                        }}
                      >
                        삭제
                      </button>
                      <span className="font-bold text-red-600">답변 전</span>
                    </>
                  )}
                </div>
              </div>
              <div className="p-[0] sm:px-4 sm:py-[20px] max-h-96 overflow-y-auto">
                <div className="bg-blue-50 p-4 flex flex-col gap-3 bg-[#E1ECFF40]">
                  {data?.inquiry_answer !== null ? (
                    <>
                      <div className="flex justify-between gap-3 text-sm">
                        <div className="flex flex-col gap-2">
                          <span>
                            첨부파일 총 {data?.documents?.answer?.length ?? 0}{" "}
                            건
                          </span>
                          <div className="flex gap-2">
                            {data?.documents?.answer?.map((v, i) => {
                              return (
                                <button
                                  onClick={() => download(v)}
                                  key={i}
                                  className="px-2 py-1 text-xs bg-gray-200 rounded shadow hover:bg-gray-300 transition-all duration-200"
                                >
                                  {getFileName(v)}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          {dateFormat(data?.updated_at as string, "Y-m-d H:i")}
                        </div>
                      </div>
                      <div>{data?.inquiry_answer}</div>
                    </>
                  ) : (
                    <div className="flex p-5 justify-center">
                      작성된 답변이 없습니다.
                    </div>
                  )}
                </div>
              </div>
              <div className="sm:py-[25px] p-[20px] pb-7 flex justify-between sm:justify-around items-center gap-5 border-t">
                <Link href={data?.prev !== null ? `${data?.prev}` : "#"} className="hover:no-underline text-[#2C324C] hover:!text-[#2F48D1]">
                  <button
                    disabled={data?.prev === null}
                    type="button"
                    className="flex items-center disabled:font-normal disabled:hover:font-normal disabled:text-gray-200 disabled:hover:text-gray-200 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ChevronLeftIcon className="w-[20px] h-[20px]" /> 이전글
                  </button>
                </Link>
                <Link href={`/dashboard/customer-service/inquire`} className="hidden sm:block">
                  <button
                    type="button"
                    className="px-10 py-2 border-solid border-[1px] border-[#2F48D1] hover:bg-blue-600 hover:text-gray-50 transition-all duration-200"
                  >
                    목록
                  </button>
                </Link>
                <Link href={data?.next !== null ? `${data?.next}` : "#"} className="hover:no-underline text-[#2C324C] hover:!text-[#2F48D1]">
                  <button
                    disabled={data?.next === null}
                    type="button"
                    className="flex items-center disabled:font-normal disabled:hover:font-normal disabled:text-gray-200 disabled:cursor-not-allowed disabled:hover:text-gray-200 transition-all duration-200"
                  >
                    다음글 <ChevronRightIcon className="w-[20px] h-[20px] " />
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
