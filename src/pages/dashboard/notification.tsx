import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Pagination } from "antd";
import {
  AdList,
  AdModel,
  Advertising,
  NotificationCentre,
} from "@src/sections/dashboard";
import { styles } from "@src/sections/notification";
export default function DashboardScreen() {
  const driving_list = [
    {
      title: "이카루스 신제품 홍보 이카루스 신제품 홍보 이카루스 신제품 홍보",
      msg: "제10220122호 차량이 운행이 시작되었습니다.",
      status: true,
      date: "2022년 12월 01일 08:00",
    },
    {
      title: "이카루스 신제품 홍보",
      msg: "제10220122호 차량이 운행이 시작되었습니다.",
      status: false,
      date: "23시간 전",
    },
    {
      title: "이카루스 신제품 홍보",
      msg: "제10220122호 차량이 운행이 시작되었습니다.",
      status: false,
      date: "23시간 전",
    },
    {
      title: "이카루스 신제품 홍보",
      msg: "제10220122호 차량이 운행이 시작되었습니다.",
      status: false,
      date: "23시간 전",
    },
    {
      title: "이카루스 신제품 홍보",
      msg: "제10220122호 차량이 운행이 시작되었습니다.",
      status: false,
      date: "23시간 전",
    },
    {
      title: "이카루스 신제품 홍보",
      msg: "제10220122호 차량이 운행이 시작되었습니다.",
      status: false,
      date: "23시간 전",
    },
    {
      title: "이카루스 신제품 홍보",
      msg: "제10220122호 차량이 운행이 시작되었습니다.",
      status: false,
      date: "23시간 전",
    },
  ];

  // pagination
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const totalItems = driving_list.length; // Total number of items
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Total number of pages

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className={styles.notification_center_content}>
        <div className={styles.only_pc}>
          <ul className={styles.notification_wrap}>
            {driving_list
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((data, index) => (
                <li key={index} className={styles.list}>
                  <div className={styles.info}>
                    <div className={styles.title}>{data.title}</div>
                    <div className={styles.text}>{data.msg}</div>
                    <div className={styles.badge_wrap}>
                      <div
                        className={`${
                          data.status ? styles.driving : styles.stop
                        } ${styles.badge}`}
                      >
                        {data.status ? "운행시작" : "운행정지"}
                      </div>
                    </div>
                  </div>
                  <div className={styles.date}>{data.date}</div>
                </li>
              ))}
          </ul>
        </div>

        <div className={styles.only_mb}>
          <ul className={styles.notification_wrap}>
            {driving_list
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((data, index) => (
                <li key={index} className={styles.list}>
                  <div className={styles.info}>
                    <div className={styles.title}>{data.title}</div>
                    <div className={styles.text}>{data.msg}</div>
                    <div className={styles.badge_wrap}>
                      <div
                        className={`${
                          data.status ? styles.driving : styles.stop
                        } ${styles.badge}`}
                      >
                        {data.status ? "운행시작" : "운행정지"}
                      </div>
                    </div>
                  </div>
                  <div className={styles.date}>{data.date}</div>
                </li>
              ))}
          </ul>
        </div>

        {/* Render the Pagination component */}
        <div className="flex justify-center">
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}
