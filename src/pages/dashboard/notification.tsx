import { CircularProgress } from "@mui/material";
import { useGetAllNotification } from "@src/apis/notice";
import { getHoursAgoByDate } from "@src/helpers";
import { styles } from "@src/sections/notification";
import { Pagination } from "antd";
import ArrowBack from "@src/components/icons/ArrowBack";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAuth from "@src/hooks/useAuth";

export default function NotificationScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const {  user } = useAuth();
  const { data, refetch, isLoading } = useGetAllNotification({
    user_id:user?.id,
    page: currentPage
  });

  const { data: notifications } = data || {};
  const router = useRouter();
useEffect(()=>{
  refetch()
}, [currentPage])
  // pagination
  const itemsPerPage = window.innerWidth > 767 ? 12 : 5;
   // Current page number
  // const totalItems = notifications?.length ?? 0; // Total number of items
  // const totalPages = Math.ceil(totalItems / itemsPerPage); // Total number of pages
  // const prevItems = (currentPage - 1) * itemsPerPage;
  // const currentItems = currentPage * itemsPerPage;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getNotificationCreatedTime = (date) => {
    if (!date) return date;
    const registerDate = new Date(date);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - registerDate.getTime();
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    if (24 > hoursDifference) return `${hoursDifference}시간 전`;

    return `${registerDate.getFullYear()}년 ${String(
      registerDate.getMonth() + 1
    ).padStart(2, "0")}월 ${String(registerDate.getDate()).padStart(
      2,
      "0"
    )}일 ${String(registerDate.getHours()).padStart(2, "0")}:${String(
      registerDate.getMinutes()
    ).padStart(2, "0")}`;
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
        <CircularProgress color="primary" />
      </div>
    );
  const onBack = () => {
    router.back();
  };

  return (
    <>
      <div className={`${styles.notification_center_content} ${!notifications?.length && '!h-full flex justify-center items-center'}`}>
        <div className={styles.only_pc}>
          <ul className={`${styles.notification_wrap} ${!notifications?.length && '!hidden'} `}>
            {notifications?.length ? notifications?.map(
              (data, index) =>
                // index >= prevItems &&
                // index < currentItems && 
                (
                  <li key={index} className={styles.list}>
                    <div className={styles.info}>
                      <div className={styles.title}>{data.title}</div>
                      <div className={styles.text}>{data.content}</div>
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
                    <div className={styles.date}>
                      {getHoursAgoByDate(data.created_at)}
                    </div>
                  </li>
                )
            )
          : ''
          }
          </ul>
          {!notifications?.length ? 
           (<div className="text-center p-[100px]">알림이 없습니다.</div>)
          : ''
          }
        </div>

        <div className={styles.only_mb}>
          <div className={`only-mb`}>
            <div className={`${styles["mobile-top-header"]}`}>
              <ArrowBack handleAction={onBack} />
              <div className={styles["header"]}>알림센터</div>
              <div></div>
            </div>
          </div>
          <ul className={styles.notification_wrap}>
            {notifications?.map(
              (data, index) =>
                // index >= prevItems &&
                // index < currentItems &&
                 (
                  <li key={index} className={styles.list}>
                    <div className={styles.info}>
                      <div className={styles.title}>{data.title}</div>
                      <div className={styles.text}>{data.content}</div>
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
                    <div className={styles.date}>
                      {getHoursAgoByDate(data.created_at)}
                    </div>
                  </li>
                )
            )}
          </ul>
        </div>

        {/* Render the Pagination component */}
        {
          notifications?.length ? 
        <div className="flex justify-center mt-[40px] notification_pagination">
          <Pagination
            current={currentPage}
            total={data?.total}
            pageSize={data?.per_page}
            onChange={handlePageChange}
          />
        </div>
          
          : ''
        }
      </div>
    </>
  );
}
