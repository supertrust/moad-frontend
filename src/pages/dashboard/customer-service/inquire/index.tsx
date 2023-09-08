import {
  Card,
  CircularProgress,
  Pagination,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Head from "next/head";
import { useRouter } from "next/router";
import { dateFormat } from "@src/helpers";
import { useGetInquiries } from "@src/apis/inquiry";
import useAuth from "@src/hooks/useAuth";

export default function InquireScreen() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetInquiries({ page });
  const { user } = useAuth();
  const inquiries = data?.data;
  const router = useRouter();

  const paginationStyles = {
    '.MuiButtonBase-root':{
      backgroundColor: '#EEEEEE',
      color : '#000',
      border: 'transparent',
      "border-radius" : '5px',
    },
    '.Mui-selected': {
      backgroundColor: '#4D5E80 !important',
      color : '#fff'
    },
  };
  const getDetail = (id: number) => {
    router.push(`inquire/${id}`);
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
        <title>Inquiry</title>
      </Head>
      <div className="p-[20px] sm:px-[30px] sm:py-[20px] text-gray-700 flex flex-col gap-[30px]">
        <div className="flex gap-[20px] items-center p-[20px] sm:p-[0]">
          <Link href={`/dashboard/customer-service/inquire`}>
            <button className="font-bold text-[20px] text-blue-700">
              문의내역확인
            </button>
          </Link>
          {user?.role === "Advertiser" && (
            <Link href={`inquire/form`}>
              <button className="text-[16px]">문의하기</button>
            </Link>
          )}
        </div>
        <Card variant="elevation" elevation={1} className="flex flex-col gap-2 sm:min-h-[560px] h-full justify-between">
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
              <CircularProgress color="primary" />
            </div>
          ) : inquiries?.length ? (
            <Table width={`100%`} className="m-0 !text-[16px]">
              <TableHead className="bg-[#E1ECFF]">
                <TableRow>
                  <TableCell className="!text-center !py-[14px]">no</TableCell>
                  <TableCell className="!text-center !py-[14px]">분류</TableCell>
                  <TableCell className="!text-center !py-[14px]">제목</TableCell>
                  <TableCell className="!text-center !py-[14px]">작성일</TableCell>
                  <TableCell className="!text-center !py-[14px]">상태</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y">
                {inquiries?.map((inq: any, index: number) => {
                  return (
                    <TableRow
                      key={index}
                      onClick={() => getDetail(inq.id)}
                      className="cursor-pointer hover:bg-blue-50 transform transition-all duration-200"
                    >
                      <TableCell className="!text-center !text-[16px] !py-[14px]">
                        {index + 1 + (page - 1) * 10}
                      </TableCell>
                      <TableCell className="!text-center !text-[16px] !py-[14px]">
                        {InquiryType[inq.inquiry_type]}
                      </TableCell>
                      <TableCell className="!py-[14px] !text-[16px]">{inq.inquiry_title}</TableCell>
                      <TableCell className="!text-center !text-[16px] !py-[14px] !text-[#999999]">
                        {dateFormat(inq.created_at as string, "Y-m-d") ??
                          "2023-04-19"}
                      </TableCell>
                      <TableCell className="!text-center !text-[16px] !py-[14px]">
                        {inq.inquiry_answer ? (
                          <span className="text-[#2F48D1]">답변완료</span>
                        ) : (
                          <span className="!text-[#D12953]">답변전</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="flex p-3 justify-center items-center">
              데이터를 찾을 수 없습니다!
            </div>
          )}
          {inquiries?.length ? (
            <div className="py-[50px] flex justify-center">
              <Pagination
                count={data?.last_page}
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={(e, val) => setPage(val)}
                sx={paginationStyles}
              />
            </div>
          ) : null}
        </Card>
      </div>
    </>
  );
}
