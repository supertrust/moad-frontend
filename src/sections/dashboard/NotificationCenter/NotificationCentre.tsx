import React, { useEffect } from "react";
import styles from './style.module.css'
import Link from "next/link";
import { useGetAllNotification } from "@src/apis/notice";
import { getHoursAgoByDate } from "@src/helpers/index"
export default function NotificationCentre() {
  const { data: notifications}=useGetAllNotification();
  useEffect(()=>{
    console.log("here is the notifications api data",notifications);
  },[notifications])
  return (
    <>
        <div className={styles.titleWrap}>
          <div className={styles.title}>
            <span>notification center</span>
          </div>
          <div className={styles.line}></div>
          <Link href="dashboard/notification" className={`${styles.text} ${styles.viewText}`}>
            view all
          </Link>
        </div>
        <div className={styles.notificationContent}>
          <a href="src/sections/dashboard#">
            <ul className={styles.contentWrap}>
              {
                notifications && notifications.map((each)=>
                      <li className={styles.list}>
                        <div className={styles.textWrap}>
                          <div className={`${styles.itemTitle} ${styles.text}`}>
                            <span>{each?.title}</span>
                          </div>
                          <div className={styles.text}>
                            <span>{each?.content}</span>
                          </div>
                        </div>
                        <div className={styles.timestamp}>
                          <span>{ getHoursAgoByDate(each?.created_at) }</span>
                        </div>
                      </li>
                  )

              }

            </ul>
          </a>
        </div>
    </>
  );
}
