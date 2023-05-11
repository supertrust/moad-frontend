import React from "react";
import { styles } from "./index";

export default function Advertising() {
  const ad_current =
  {
    '등록된 광고': '6대',
    '총 운행차량': '20대',
    '운행중': '15대',
    '운행정지': '5대',
    '총 진행거리': '150km',
    '총 진행시간': '1,460시간',
  }
  return (
    <>
      <div className={styles.ad_status}>
        <div className={styles.title_wrap}>
          <div className={styles.title}>광고 현황</div>
          <div className={styles.line}></div>
          <div className={styles.text}>2023. 03. 10 오전 12:00 기준</div>
        </div>
        <div className={styles.ad_contents}>
          {
            Object.entries(ad_current).map(([key, value]) => (
              <div className={styles.card}>
                <div className={styles.title}>
                  {key}
                </div>
                <div className={styles.value}>{value ? value : '-'}</div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}
