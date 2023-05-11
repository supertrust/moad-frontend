import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { AdList, AdModel, Advertising, NotificationCentre } from '@src/sections/dashboard';
import { styles } from "@src/sections/notification";
export default function DashboardScreen() {
  const driving_list = [
    {
      'title': '이카루스 신제품 홍보 이카루스 신제품 홍보 이카루스 신제품 홍보',
      'msg': '제10220122호 차량이 운행이 시작되었습니다.',
      'status': true,
      'date': '2022년 12월 01일 08:00',
    },
    {
      'title': '이카루스 신제품 홍보',
      'msg': '제10220122호 차량이 운행이 시작되었습니다.',
      'status': false,
      'date': '23시간 전',
    },
    {
      'title': '이카루스 신제품 홍보',
      'msg': '제10220122호 차량이 운행이 시작되었습니다.',
      'status': false,
      'date': '23시간 전',
    },
    {
      'title': '이카루스 신제품 홍보',
      'msg': '제10220122호 차량이 운행이 시작되었습니다.',
      'status': false,
      'date': '23시간 전',
    },
    {
      'title': '이카루스 신제품 홍보',
      'msg': '제10220122호 차량이 운행이 시작되었습니다.',
      'status': false,
      'date': '23시간 전',
    },
    {
      'title': '이카루스 신제품 홍보',
      'msg': '제10220122호 차량이 운행이 시작되었습니다.',
      'status': false,
      'date': '23시간 전',
    },
    {
      'title': '이카루스 신제품 홍보',
      'msg': '제10220122호 차량이 운행이 시작되었습니다.',
      'status': false,
      'date': '23시간 전',
    },
  ]
  return (
    <>
      <div className={styles.notification_center_content}>
        <div className={styles.only_pc}>
          <ul className={styles.notification_wrap}>
          {
              driving_list.map((data, index) => (
                <li key={index} className={styles.list}>
                  <div className={styles.info}>
                    <div className={styles.title}>{data.title}</div>
                    <div className={styles.text}>
                      {data.msg}
                    </div>
                    <div className={styles.badge_wrap}>
                      <div className={`${data.status ? styles.driving : styles.stop} ${styles.badge}`}>{data.status ? "운행시작" : "운행정지"}</div>
                    </div>
                  </div>
                  <div className={styles.date}>
                    {data.date}
                  </div>
                </li>
              ))
            }
          </ul>
        </div>

        <div className={styles.only_mb}>
        <ul className={styles.notification_wrap}>
            {
              driving_list.map((data, index) => (
                <li key={index} className={styles.list}>
                  <div className={styles.info}>
                    <div className={styles.title}>{data.title}</div>
                    <div className={styles.text}>
                      {data.msg}
                    </div>
                    <div className={styles.badge_wrap}>
                      <div className={`${data.status ? styles.driving : styles.stop} ${styles.badge}`}>{data.status ? "운행시작" : "운행정지"}</div>
                    </div>
                  </div>
                  <div className={styles.date}>
                    {data.date}
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
        <div className={styles.pagination_wrap}>
          <button type="button" className={`${styles.arrow} ${styles.prev}`}></button>
          <ul className={styles.num_wrap}>
            <li className={`${styles.number} ${styles.active}`}>1</li>
            <li className={styles.number}>2</li>
            <li className={styles.number}>3</li>
            <li className={styles.number}>4</li>
            <li className={styles.number}>5</li>
          </ul>
          <button type="button" className={`${styles.arrow} ${styles.next}`} disabled></button>
        </div>
      </div>
    </>
  );
}
