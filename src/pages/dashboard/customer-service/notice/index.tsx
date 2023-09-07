import { Card, CircularProgress, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Pagination } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { PushPin } from '@mui/icons-material';
import { useGetNotices } from "@src/apis/notice";
import Head from "next/head";

export default function NoticeScreen() {
  const [page, setPage] = useState(1);
  const [pin, setPin] = useState<number | null>(null);
  const { data, isLoading } = useGetNotices({ page });

  const setImportant = (id: number) => {
    setPin(id)
    data?.forEach((v, i) => {
      if (v.id === id) {
        data[i].important = !v.important;
      }
    });
  };
  // Pagination
  const itemsPerPage = 10;

    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const totalItems = data?.length?? 0; // Total number of items
    const totalPages = Math.ceil(totalItems / itemsPerPage); // Total number of pages
    const prevItems = (currentPage - 1) * itemsPerPage;
    const currentItems = currentPage * itemsPerPage;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
  return (
    <>
      <Head>
        <title>Notice</title>
      </Head>
      <div className="px-[30px] pt-[20px] pb-[35px] text-gray-700 flex flex-col gap-[20px]">
        <div className="font-bold text-[20px] text-[#373737]">이카루스에서 알려드립니다.</div>
        <Card variant="elevation" elevation={3} className="flex flex-col justify-between min-h-[660px] h-full gap-2 !shadow-[0px_2px_8px_0px_rgba(38,51,77,0.05)]">
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
              <CircularProgress color="primary" />
            </div>
          ) : (
            <Table width={`100%`} className="mb-[0px] relative" id="notice-table">
              {/* <TableHead className={`bg-sky-100 bg-[#E1ECFF] ${pin?'table-head-notice' : ''}`}> */}
              <TableHead className={`bg-sky-100 bg-[#E1ECFF]`}>
                <TableRow>
                  <TableCell className="!text-center">no</TableCell>
                  <TableCell className="!text-center">제목</TableCell>
                  <TableCell className="!text-center">작성일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y">
                {data?.length ? data.slice(prevItems,currentItems).map((notice, index) => {
                  return (
                    <TableRow key={index} >
                      <TableCell className="!text-center !py-[14px]">
                        <div
                          className="flex items-center cursor-pointer justify-center"
                          onClick={() => setImportant(notice.id)}
                        >
                          {notice.id === pin? (
                            <PushPin className="!w-4" />
                          ) : (
                            // data.slice(prevItems,currentItems).length - i 
                            totalItems - index - (currentPage - 1) * itemsPerPage 
                            //- data?.filter((v) => notice.important == true)
                            //   .length +
                            // (page - 1) * 10
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="!py-[14px]">
                        <Link
                          href={`notice/${notice.id}`}
                          className="text-[#2C324C] hover:no-underline transition-colors duration-200"
                        >
                          {notice.title}
                        </Link>
                      </TableCell>
                      <TableCell className="!text-center !py-[14px] !text-[#999999]">{notice.created_at?.split('T')[0]}</TableCell>
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
            // <div className="p-3 pb-10 flex justify-center">
            //   <Pagination
            //     // count={(data?.total || 0) / 10}
            //     variant="outlined"
            //     shape="rounded"
            //     onChange={(e, val) => setPage(val)}
            //   />
            // </div>
            
          <div className="flex justify-center py-[30px] notification_pagination">
            <Pagination
                current={currentPage}
                total={totalItems}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
            />
          </div>
          ) : null}
        </Card>
      </div>
    </>
  );
}
