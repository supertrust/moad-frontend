import { Card, CircularProgress, Pagination, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { PushPin } from '@mui/icons-material';
import { useGetNotices } from "@src/apis/notice";
import Head from "next/head";

export default function NoticeScreen() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetNotices({ page });

  const setImportant = (id: number) => {
    data?.forEach((v, i) => {
      if (v.id === id) {
        data[i].important = !v.important;
      }
    });
  };

  return (
    <>
      <Head>
        <title>Notice</title>
      </Head>
      <div className="px-[30px] pt-[20px] pb-[35px] text-gray-700 flex flex-col gap-[20px]">
        <div className="font-bold text-[20px] text-[#373737]">이카루스에서 알려드립니다.</div>
        <Card variant="elevation" elevation={3} className="flex flex-col gap-2 !shadow-[0px_2px_8px_0px_rgba(38,51,77,0.05)]">
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
              <CircularProgress color="primary" />
            </div>
          ) : (
            <Table width={`100%`}>
              <TableHead className="bg-sky-100 bg-[#E1ECFF]">
                <TableRow>
                  <TableCell className="!text-center">no</TableCell>
                  <TableCell className="!text-center">제목</TableCell>
                  <TableCell className="!text-center">작성일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y">
                {data?.length ? data.map((v, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell className="!text-center">
                        <div
                          className="flex items-center cursor-pointer justify-center"
                          onClick={() => setImportant(v.id)}
                        >
                          {v.important === true ? (
                            <PushPin className="!w-4" />
                          ) : (
                            i +
                            1 -
                            data?.filter((v) => v.important == true)
                              .length +
                            (page - 1) * 10
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`notice/${v.id}`}
                          className="hover:text-sky-600 transition-colors duration-200"
                        >
                          {v.title}
                        </Link>
                      </TableCell>
                      <TableCell className="!text-center">{v.created_at}</TableCell>
                    </TableRow>
                  );
                }) 
                : 
                <TableRow>
                      <TableCell colSpan={3} className="!text-center !text-[#999] border-0 !p-[200px]">등록된 공지사항이 없습니다.</TableCell>
                </TableRow>
                }
                
              </TableBody>
            </Table>
          )}
          {data?.length ? (
            <div className="p-3 pb-10 flex justify-center">
              <Pagination
                // count={(data?.total || 0) / 10}
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
