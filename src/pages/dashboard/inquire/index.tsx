import { Card, CircularProgress, Pagination, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Head from "next/head";
import { useRouter } from "next/router";
import { dateFormat } from "@src/helpers";
import { useGetInquiries } from "@src/apis/inquiry";

export default function InquireScreen() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetInquiries({ page })
  const router = useRouter();

  const getDetail = (id: string) => {
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
          <Link href={`/dashboard/inquire/form`}><button>문의하기</button></Link>
        </div>
        <Card variant="elevation" elevation={1} className="flex flex-col gap-2">
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
              <CircularProgress color="primary" />
            </div>
          ) : ((data?.data?.length) ?
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
                {data?.data.map((v, i) => {
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
                        {dateFormat(v.created_at as string, 'Y-m-d H:i') ?? '2023-04-19'}
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
          {data?.data?.length ? (
            <div className="p-3 pb-10 flex justify-center">
              <Pagination
                count={data?.last_page}
                variant="outlined"
                shape="rounded"
                onChange={(e, val) => setPage(val)}
              />
            </div>
          ) : null}
        </Card>
      </div>
    </>
  );
}
