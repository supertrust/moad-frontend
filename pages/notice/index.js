import { Card, Pagination, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { PushPin } from '@mui/icons-material';
import { getNoticeData } from "@/store/api/noticeApi";
import Head from "next/head";

export default function Index() {
  const [page, setPage] = useState(1);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    getData(page, 10);
  }, [page]);

  const getData = async (page, perPage) => {
    try {
      const res = await getNoticeData(page, perPage);
      setDatas(res.data.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  const setImportant = (id) => {
    datas?.data?.forEach((v, i) => {
      if (v.id === id) {
        datas.data[i].important = !v.important;
      }
    });

    datas?.data?.sort((a, b) => a.id - b.id);
    datas?.data?.sort((a, b) => b.important - a.important);

    setDatas({ ...datas });
  }

  return (
    <>
      <Head>
        <title>Notice</title>
      </Head>
      <div className="p-5 text-gray-700 flex flex-col gap-5">
        <div className="font-bold">이카루스에서 알려드립니다.</div>
        <Card variant="elevation" elevation={3} className="flex flex-col gap-2">
          <Table width={`100%`}>
            <TableHead className="bg-sky-100">
              <TableRow>
                <TableCell className="!text-center">No</TableCell>
                <TableCell className="!text-center">Title</TableCell>
                <TableCell className="!text-center">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {datas?.data?.map((v, i) => {
                return <TableRow key={i}>
                  <TableCell className="!text-center">
                    <div className="flex items-center cursor-pointer justify-center" onClick={() => setImportant(v.id)}>
                      {v.important === true ? <PushPin className="!w-4" /> : i + 1 - (datas?.data.filter(v => v.important == true).length) + (page - 1) * 10}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link href={`/notice/${v.id}`} className="hover:text-sky-600 transition-colors duration-200">{v.title}</Link>
                  </TableCell>
                  <TableCell className="!text-center">{v.date}</TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>
          <div className="p-3 pb-10 flex justify-center">
            <Pagination count={datas?.total / 10} variant="outlined" shape="rounded" onChange={(e, val) => setPage(val)} />
          </div>
        </Card>
      </div>
    </>
  )
}
