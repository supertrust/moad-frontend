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

export default function InquireDetailScreen() {
  const id = useRouter().query.id as string;
  const { data, isLoading } = useGetInquiryDetail({ id });
  const { mutateAsync: deleteInquiry } = useDeleteInquiry();
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
          router.push("/inquire");
        },
      }
    );
  };
  return (
    <>
      <Head>
        <title>
          {isLoading
            ? "Loading page ..."
            : data !== null
            ? `[${data?.inquiry_type}] ${data?.inquiry_title}`
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
      <div className="p-7 text-gray-700 flex flex-col gap-5">
        <div className="flex gap-5 items-center">
          <Link href={`/inquire`}>
            <button className="font-bold text-lg text-blue-700">
              문의내역확인
            </button>
          </Link>
          <Link href={`/dashboard/inquire/form`}>
            <button>문의하기</button>
          </Link>
        </div>
        <Card
          variant="elevation"
          elevation={1}
          className="flex flex-col gap-2 relative"
        >
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
              <CircularProgress color="primary" />
            </div>
          ) : data !== null ? (
            <>
              <div className="px-7 py-3 border-b flex gap-2 justify-between items-center">
                <span>
                  [{data?.inquiry_type}] {data?.inquiry_title}
                </span>
                <div className="flex gap-3 justify-end text-sm">
                  <span>
                    {dateFormat(data?.created_at as string, "Y-m-d H:i")}
                  </span>
                </div>
              </div>
              <div className="px-7 py-3 max-h-96 overflow-y-auto flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <span>
                    첨부파일 총 {data?.documents?.question?.length ?? 0} 건
                  </span>
                  <div className="flex gap-2">
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
                </div>
                <div>{data?.inquiry_question}</div>
                <div className="mt-3 flex justify-end gap-2 !text-sm">
                  {data?.inquiry_answer !== null ? (
                    <span className="font-bold text-blue-700">답변완료</span>
                  ) : (
                    <>
                      <Link href={`/dashboard/inquire/form/${id}`}>
                        <span className="text-gray-400">수정</span>
                      </Link>
                      <button
                        className="text-gray-400"
                        onClick={() => {
                          deleteModal.open = true;
                          if (deleteModal.text) {
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
              <hr />
              <div className="px-4 py-3 max-h-96 overflow-y-auto">
                <div className="bg-blue-50 p-4 flex flex-col gap-3">
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
              <div className="px-7 py-5 pb-7 flex justify-around items-center gap-5 border-t">
                <Link
                  href={data?.prev !== null ? `/inquire/${data?.prev}` : "#"}
                >
                  <button
                    disabled={data?.prev === null}
                    type="button"
                    className="flex items-center disabled:font-normal disabled:hover:font-normal disabled:text-gray-200 disabled:hover:text-gray-200 hover:font-bold hover:text-blue-600 transition-all duration-200"
                  >
                    <ChevronLeftIcon className="w-7 h-7" /> 이전글
                  </button>
                </Link>
                <Link href={`/inquire`}>
                  <button
                    type="button"
                    className="px-10 py-2 border border-blue-600 hover:bg-blue-600 hover:text-gray-50 transition-all duration-200"
                  >
                    목록
                  </button>
                </Link>
                <Link
                  href={data?.next !== null ? `/inquire/${data?.next}` : "#"}
                >
                  <button
                    disabled={data?.next === null}
                    type="button"
                    className="flex items-center disabled:font-normal disabled:hover:font-normal disabled:text-gray-200 disabled:hover:text-gray-200 hover:font-bold hover:text-blue-600 transition-all duration-200"
                  >
                    다음글 <ChevronRightIcon className="w-7 h-7" />
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
