import React from "react";
import styles from './style.module.css'
import Link from "next/link";

export default function NotificationCentre() {
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
              <li className={styles.list}>
                <div className={styles.textWrap}>
                  <div className={`${styles.itemTitle} ${styles.text}`}>
                    <span>[Promotion of new Icarus products]</span>
                  </div>
                  <div className={styles.text}>
                    <span>Vehicle No. 10150122 has started operating.</span>
                  </div>
                </div>
                <div className={styles.timestamp}>
                  <span>3 hours ago</span>
                </div>
              </li>
            </ul>
          </a>
        </div>
    </>
  );
}
