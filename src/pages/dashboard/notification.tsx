import { CircularProgress } from "@mui/material";
import { useGetAllNotification } from "@src/apis/notice";
import { styles } from "@src/sections/notification";
import { Pagination } from "antd";
import React, { useState } from "react";


export default function DashboardScreen() {

    const { data, isLoading } = useGetAllNotification();
    const { data :notifications } = data || {}

    // pagination
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const totalItems = 8; // Total number of items
    const totalPages = Math.ceil(totalItems / itemsPerPage); // Total number of pages

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getNotificationCreatedTime = (date) => {
        if (!date)
            return date;
        const registerDate = new Date(date);
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - registerDate.getTime();
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        if (24 > hoursDifference)
            return `${hoursDifference}시간 전`


        return `${registerDate.getFullYear()}년 ${String((registerDate.getMonth() + 1)).padStart(2, '0')}월 ${String(registerDate.getDate()).padStart(2, '0')}일 ${String(registerDate.getHours()).padStart(2, '0')}:${String(registerDate.getMinutes()).padStart(2, '0')}`;
    }

    if (isLoading)
        return <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
            <CircularProgress color="primary"/>
        </div>


    return (
        <>
            <div className={styles.notification_center_content}>
                <div className={styles.only_pc}>
                    <ul className={styles.notification_wrap}>
                        {notifications
                            ?.map((data, index) => (
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
                                    <div className={styles.date}>{getNotificationCreatedTime(data.created_at)}</div>
                                </li>
                            ))}
                    </ul>
                </div>

                <div className={styles.only_mb}>
                    <ul className={styles.notification_wrap}>
                        {notifications
                            ?.map((data, index) => (
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
                                    <div className={styles.date}>{getNotificationCreatedTime(data.created_at)}</div>
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
