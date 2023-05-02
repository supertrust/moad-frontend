import { getNoticeDetail } from '@/store/api/noticeApi';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Card, CircularProgress } from '@mui/material'
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function SingleNoticeModulePage() {
  const router = useRouter();
  const [dataId, setDataId] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDataId(router.query.id);
    getData(dataId);
  }, [dataId, router.query.id]);

  const getData = async (id) => {
    setLoading(true);
    try {
      const res = await getNoticeDetail(id);
      setData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>{loading ? "Loading page ..." : data?.content?.title}</title>
      </Head>
      <div className="p-7 text-gray-700 flex flex-col gap-5">
        <div className="font-bold">이카루스에서 알려드립니다.</div>
        <Card
          variant="elevation"
          elevation={2}
          className="flex flex-col gap-2 relative"
        >
          {loading ? (
            <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
              <CircularProgress color="primary" />
            </div>
          ) : (
            <>
              <div className="px-7 py-3 border-b flex gap-2 justify-between items-center">
                <span>[Notice] {data?.content?.title}</span>
                <div className="flex gap-3 justify-end text-sm">
                  <span className="font-semibold">By. 이카루스</span>
                  <span>{data?.content?.date}</span>
                </div>
              </div>
              <div className="px-7 py-3 max-h-96 overflow-y-auto flex flex-col gap-2">
                {data?.content?.image !== null && (
                  <img src={data?.content?.image} className="w-full" />
                )}
                <div>{data?.content?.content}</div>
              </div>
              <div className="px-7 py-5 pb-7 flex justify-around items-center gap-5 border-t">
                <Link
                  href={data?.prev !== null ? `/notice/${data?.prev}` : "#"}
                >
                  <button
                    disabled={data?.prev === null}
                    type="button"
                    className="flex items-center disabled:font-normal disabled:hover:font-normal disabled:text-gray-200 disabled:hover:text-gray-200 hover:font-bold hover:text-blue-600 transition-all duration-200"
                  >
                    <ChevronLeftIcon className="w-7 h-7" /> 이전글
                  </button>
                </Link>
                <Link href={`/notice`}>
                  <button
                    type="button"
                    className="px-10 py-2 border border-blue-600 hover:bg-blue-600 hover:text-gray-50 transition-all duration-200"
                  >
                    목록
                  </button>
                </Link>
                <Link
                  href={data?.next !== null ? `/notice/${data?.next}` : "#"}
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
          )}
        </Card>
      </div>
    </>
  );
}
