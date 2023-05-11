import React from "react";
import styles from './style.module.css';

export default function Advertising() {
  return (
    <>
      <div className={styles.adStatus}>
        <div className={styles.titleWrap}>
          <div className={styles.title}>
            <span>Advertising status</span>
          </div>
          <div className={styles.line}></div>
          <div className={styles.text}>
            <span>As of 12:00 am on March 10, 2023</span>
          </div>
        </div>
      </div>
      <div className={styles.adContents}>
        <div className={styles.cards}>
      {/*    <div className={styles.title}>*/}
          <div className={styles.itemTitle}>
            <span>registered advertisement</span>
          </div>
          <div className={styles.value}>
            <span>-</span>
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.itemTitle}>
            <span>total vehicle</span>
          </div>
          <div className={styles.value}>
            <span>20s</span>
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.itemTitle}>
            <span> running</span>
          </div>
          <div className={styles.value}>
            <span>15th</span>
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.itemTitle}>
            <span>Suspension</span>
          </div>
          <div className={styles.value}>
            <span>5 generations</span>
          </div>
        </div>
      </div>
    </>
  );
}
