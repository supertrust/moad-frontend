import React from "react";
import Link from "next/link";
import { styles } from "./index";
export default function NotificationCentre() {
  const drive_list = [
    {
      'title': '이카루스 신제품 홍보',
      'text': '제10150122호 차량 운행이 시작되었습니다.',
    },
    {
      'title': '이카루스 신제품 홍보',
      'text': '제10150122호 차량 운행이 시작되었습니다.',
    },
  ];
  const DriveList = ({ data }) => {
    if (!data.length) {
      return (
        <div className={styles.none_notification}>
          알림이 없습니다.
        </div>
      )
    }

    return (
      <a href={styles.notification_center}>
          <ul className={styles.content_wrap}>
            {drive_list.map((data,index) => (
              <li key={index} className={styles.list}>
              <div className={styles.text_wrap}>
                <div className={`${styles.title} ${styles.text}`}>{data.title}</div>
                <div className={styles.text}>{data.text}</div>
              </div>
              <div className={styles.timestamp}>3시간 전</div>
            </li>
            ))}
          </ul>
        </a>
    )
  }
  return (
    <>
      <div className={styles.notification}>
        <div className={styles.title_wrap}>
          <div className={styles.title}>알림 센터</div>
          <div className={styles.line}></div>
          <a href="/notification-center" className={styles.text}>view all</a>
        </div>
        <div className={`${!drive_list.length ? styles.none : ""} ${styles.notification_content}`}>
          <DriveList data={drive_list} />
        </div>
      </div>
    </>
  );
}
