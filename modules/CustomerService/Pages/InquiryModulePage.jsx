import { Card, CircularProgress, Pagination, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Head from "next/head";
import { useRouter } from "next/router";
import { getInquiryData } from "@/store/api/inquiryApi";
import { dateFormat } from "@/utils/Helpers";

export default function AnnouncementModulePage() {
  const [page, setPage] = useState(1);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getData(page);
  }, [page]);

  const getData = async (page) => {
    setLoading(true);
    try {
      const res = await getInquiryData(page);
      setDatas(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getDetail = (id) => {
    router.push(`/inquire/${id}`);
  }

  return (
    <>
      <Head>
        <title>Inquiry</title>
      </Head>
      <div className="p-8 text-gray-700 flex flex-col gap-5">
        <div className="flex gap-5 items-center">
          <Link href={`/inquire`}><button className="font-bold text-lg text-blue-700">문의내역확인</button></Link>
          <Link href={`/inquire/form`}><button>문의하기</button></Link>
        </div>
        <Card variant="elevation" elevation={1} className="flex flex-col gap-2">
          {loading ? (
            <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
              <CircularProgress color="primary" />
            </div>
          ) : ((datas?.data !== undefined && datas?.data?.length > 0) ?
            <Table width={`100%`}>
              <TableHead className="bg-blue-100">
                <TableRow>
                  <TableCell className="!text-center !py-3">No</TableCell>
                  <TableCell className="!text-center !py-3">분류</TableCell>
                  <TableCell className="!text-center !py-3">제목</TableCell>
                  <TableCell className="!text-center !py-3">작성일</TableCell>
                  <TableCell className="!text-center !py-3">상태</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y">
                {datas?.data?.map((v, i) => {
                  return (
                    <TableRow key={i} onClick={() => getDetail(v.id)} className="cursor-pointer hover:bg-blue-50 transform transition-all duration-200">
                      <TableCell className="!text-center">{i + 1 + (page - 1) * 10}</TableCell>
                      <TableCell className="!text-center">
                        {v.inquiry_type}
                      </TableCell>
                      <TableCell>
                        {v.inquiry_title}
                      </TableCell>
                      <TableCell className="!text-center">
                        {dateFormat(v.created_at, 'Y-m-d H:i') ?? '2023-04-19'}
                      </TableCell>
                      <TableCell className="!text-center">
                        {v.inquiry_answer ? <span className="text-blue-700">답변완료</span> : <span className="text-red-700">답변전</span>}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table> : <div className="flex p-3 justify-center items-center">데이터를 찾을 수 없습니다!</div>
          )}
          {datas?.data?.length > 0 && (
            <div className="p-3 pb-10 flex justify-center">
              <Pagination
                count={datas.last_page}
                variant="outlined"
                shape="rounded"
                onChange={(e, val) => setPage(val)}
              />
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
