import {
  Card,
  CircularProgress,
  Pagination,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowBack from "@src/components/icons/ArrowBack";
import { useIcarusContext } from "@src/hooks/useIcarusContext";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Head from "next/head";
import { useRouter } from "next/router";
import { dateFormat } from "@src/helpers";
import { useGetInquiries } from "@src/apis/inquiry";
import styles from "./styles.module.scss";
import useAuth from "@src/hooks/useAuth";

function InquirePage() {
  const [page, setPage] = useState(1);
  const { setPageTitle } = useIcarusContext();
  const { data, isLoading } = useGetInquiries({ page });
  const { user, dictionary: { inquiryPage } } = useAuth();
  const inquiries = data?.data;
  const router = useRouter();

  const paginationStyles = {
    ".MuiButtonBase-root": {
      backgroundColor: "#EEEEEE",
      color: "#000",
      border: "transparent",
      "border-radius": "5px",
    },
    ".Mui-selected": {
      backgroundColor: "#4D5E80 !important",
      color: "#fff",
    },
  };
  const getDetail = (id: number) => {
    router.push(`inquire/${id}`);
  };
  const InquiryType = inquiryPage.inquiryType

  const onBack = () => {
    router.back();
  };

  useEffect(() => {
    setPageTitle(inquiryPage.pageTitle);
  }, []);
  return (
    <>
      <Head>
        <title>{inquiryPage.title}</title>
      </Head>
      <div className="p-[20px] sm:px-[30px] sm:py-[20px] text-gray-700 flex flex-col gap-[30px] only-pc">
        <div className="flex gap-[20px] items-center p-[20px] sm:p-[0]">
          <Link href={`/dashboard/customer-service/inquire`}>
            <button className="font-bold text-[20px] text-secondary">
              {inquiryPage.checkInquiryDetailsBtn}
            </button>
          </Link>
          {user?.role === "Advertiser" && (
            <Link href={`inquire/form`}>
              <button className="text-[16px] text-[#2C324C]">{inquiryPage.contactUsBtn}</button>
            </Link>
          )}
        </div>
        <Card
          variant="elevation"
          elevation={1}
          className="flex flex-col gap-2 sm:min-h-[560px] h-full justify-between"
        >
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
              <CircularProgress color="primary" />
            </div>
          ) : (
            <Table width={`100%`} className="m-0 !text-[16px]">
              <TableHead className="bg-[#E1ECFF]">
                <TableRow className={"!h-[3rem]"}>
                  <TableCell className="!text-center !bg-[#E1ECFF]">
                  {inquiryPage.columns[0]}
                  </TableCell>
                  <TableCell className="!text-center !bg-[#E1ECFF]">
                  {inquiryPage.columns[1]}
                  </TableCell>
                  <TableCell className="!text-center !bg-[#E1ECFF]">
                  {inquiryPage.columns[2]}
                  </TableCell>
                  <TableCell className="!text-center !bg-[#E1ECFF]">
                  {inquiryPage.columns[3]}
                  </TableCell>
                  <TableCell className="!text-center !bg-[#E1ECFF]">
                  {inquiryPage.columns[4]}
                  </TableCell>
                </TableRow>
              </TableHead>
              {inquiries?.length ? (
                <TableBody className="divide-y">
                  {inquiries?.map((inq: any, index: number) => {
                    return (
                      <TableRow
                        key={index}
                        onClick={() => getDetail(inq.id)}
                        className="cursor-pointer hover:bg-blue-50 transform transition-all duration-200
                                            !h-[50px]"
                      >
                        <TableCell className="!text-center !text-[16px] !w-[150px]">
                          {index + 1 + (page - 1) * 10}
                        </TableCell>
                        <TableCell className="!text-center !text-[16px] !w-[150px]">
                          {InquiryType[inq.inquiry_type]}
                        </TableCell>
                        <TableCell className="!text-[16px]">
                          {inq.inquiry_title}
                        </TableCell>
                        <TableCell className="!text-center !text-[16px]  !text-[#999999] !w-[200px]">
                          {dateFormat(inq.created_at as string, "Y-m-d") ??
                            "2023-04-19"}
                        </TableCell>
                        <TableCell className="!text-center !text-[16px] w-[150px]">
                          {inq.inquiry_answer ? (
                            <span className="text-[#2F48D1]">{inquiryPage.answerCompletedBtn}</span>
                          ) : (
                            <span className="!text-[#D12953]">{inquiryPage.answerBtn}</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              ) : (
                <></>
              )}
            </Table>
          )}

          {!isLoading && !inquiries?.length ? (
            <div
              className={
                "text-center flex flex-col justify-center items-center"
              }
            >
              <span className={styles["no-register-inquires"]}>
                {inquiryPage.noRegInquiriesMsg}
              </span>
              <div
                className={styles["contact-us-body"]}
                onClick={() =>
                  router.push("/dashboard/customer-service/inquire/form")
                }
              >
                <span className={styles["contact-us"]}>{inquiryPage.contactUsBtn}</span>
              </div>
            </div>
          ) : (
            <></>
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
          ) : (
            <div></div>
          )}
        </Card>
      </div>

      <div className={"only-mb"}>
        <div className={`${styles["mobile-top-header"]} mt-4 mb-[32px]`}>
          <ArrowBack handleAction={onBack} className={"ml-5"} />
          <div className={styles["header"]}>{inquiryPage.pageTitle}</div>
          <div></div>
        </div>

        <div className="flex gap-[18px] items-center p-[20px] pt-0 pb-[16px] sm:p-[0]">
          <Link href={`/dashboard/customer-service/inquire`}>
            <span className={styles["tab1-mb"]}>{inquiryPage.checkInquiryDetailsBtn}</span>
          </Link>
          {user?.role === "Advertiser" && (
            <Link href={`inquire/form`}>
              <span className={styles["tab2-mb"]}>{inquiryPage.contactUsBtn}</span>
            </Link>
          )}
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
            <CircularProgress color="primary" />
          </div>
        ) : (
          <></>
        )}
        {inquiries?.map((inq, index) => {
          return (
            <div
              onClick={() => getDetail(inq.id)}
              key={index}
              className={
                "border-b border-[#ebedf4] flex justify-between items-center space-x-3 h-[70px] pl-[20px] pr-[15px]"
              }
            >
              <div className={"flex flex-col space-y-1"}>
                <div className={"flex space-x-3"}>
                  <span className={clsx(styles["classification-mb"])}>
                    {" "}
                    {InquiryType[inq.inquiry_type]}
                  </span>
                  <span className={clsx(styles["date-mb"])}>
                    {" "}
                    {dateFormat(inq.created_at as string, "Y-m-d") ??
                      "2023-04-19"}
                  </span>
                </div>
                <span className={styles["title-mb"]}>{inq.inquiry_title}</span>
              </div>
              <div style={{ width: "98px" }} className={"flex justify-end"}>
                {inq.inquiry_answer ? (
                  <span className="text-[#2F48D1]">{inquiryPage.answerCompletedBtn}</span>
                ) : (
                  <span className="!text-[#D12953]">{inquiryPage.answerBtn}</span>
                )}
              </div>
            </div>
          );
        })}

        {!isLoading && !inquiries?.length ? (
          <div className={styles["no-data-layout"]}>
            <span className={styles["no-data-mb"]}>
              {inquiryPage.noRegInquiriesMsg}
            </span>
          </div>
        ) : (
          <></>
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
      </div>
    </>
  );
}

export default InquirePage;
