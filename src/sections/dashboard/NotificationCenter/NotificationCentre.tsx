import React from "react";
import styles from "./style.module.css";
import Link from "next/link";
import { useGetAllNotification } from "@src/apis/notice";
import { getHoursAgoByDate } from "@src/helpers/index";
import { clsx } from "clsx";


export default function NotificationCentre() {
  const { data: response } = useGetAllNotification();

  const { data: notifications } = response || {} ;

  return (
    <>
      <div className={`${styles.titleWrap} gap-[8px]`}>
        <div className={`${styles.title} p-0`}>
          <span>알림 센터</span>
        </div>
        <div className={styles.line}></div>
        <Link
          href="dashboard/notification"
          className={`${styles.text} ${styles.viewText} p-0`}
        >
          view all
        </Link>
      </div>
      <div className={styles.notificationContent}>
        <Link href="dashboard/notification">
          <ul className={styles.contentWrap}>
            {notifications &&
              notifications.map((each, index) => index < 4 && (
                <li className={clsx(styles.list, index == 3 && '!border-b-0')} key={index}>
                  <div className={styles.textWrap}>
                    <div className={`${styles.itemTitle} ${styles.text}`}>
                      <span>{each?.title}</span>
                    </div>
                    <div className={styles.text}>
                      <span>{each?.content}</span>
                    </div>
                  </div>
                  <div className={styles.timestamp}>
                    <span>{getHoursAgoByDate(each?.created_at)}</span>
                  </div>
                </li>
              ))}
          </ul>
        </Link>
      </div>
    </>
  );
}
