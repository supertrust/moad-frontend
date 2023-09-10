import React from 'react';
import styles from '../style.module.css';
import Image from 'next/image';
import { clsx } from 'clsx';

interface DrawerProps {
  open: boolean
  handleClose: VoidFunction
}

function Drawer({ open, handleClose}: DrawerProps) {
  return (
    <div>
      <div className={styles.button_wrap}>
        <button
          type="button"
          id="location_detail_btn"
          // className={`${styles.arrow_wrap} ${open ? styles.btn_closed : styles.btn_open
          //   }`} 
          className={clsx(styles.arrow_wrap, open ? styles.btn_closed : styles.btn_open)} 
          onClick={handleClose}
        >
          <i className={styles.ic_arrrow}></i>
        </button>
      </div>
      <div className={styles.vehicle_location_content}>
        <div className={clsx(styles.location_detail_wrap, open ? styles.closed : styles.open)} >
          <div className={styles.address}>안산시 상록구 월피동</div>
          <div className={styles.content_inner}>
            <div className={styles.inner}>
              <div className={`${styles.section} ${styles.now_location}`}>
                <div className={styles.title}>지금 이곳은?</div>
                <Image
                  src="/images/img-location.png"
                  alt=""
                  className={styles.img}
                  width={300}
                  height={300}
                  priority
                />
                <div className={styles.location_name}>영동고속도로</div>
                <div className={styles.text_wrap}>
                  <div className={styles.text}>평균(일) 통과차량</div>
                  <div className={styles.text}>상행 : 26800대</div>
                  <div className={styles.text}>하행 : 18900대</div>
                </div>
              </div>

              <div className={clsx(styles.section, styles.operation_history)}>
                <div className={styles.text}>운행내역</div>
                <ul className={styles.history}>
                  <li className={styles.list}>
                    <i className={`${styles.icons} ${styles.ic_start}`}></i>
                    <div className={styles.data}>08:00</div>
                    <div className={styles.text}>운행시작</div>
                  </li>
                  <li className={styles.list}>
                    <i className={`${styles.icons} ${styles.ic_end}`}></i>
                    <div className={styles.data}>18:00</div>
                    <div className={styles.text}>운행종료</div>
                  </li>
                  <li className={styles.list}>
                    <i className={`${styles.icons} ${styles.ic_drive}`}></i>
                    <div className={styles.data}>100km</div>
                    <div className={styles.text}>운행거리</div>
                  </li>
                </ul>
              </div>

              <div
                className={`${styles.section} ${styles.accomplishment_rate}`}
              >
                <div className={styles.title}>운행 달성률</div>
                <ul className={styles.list_wrap}>
                  <li className={styles.list}>
                    <div className={styles.bar_wrap}>
                      <div className={`${styles.text} ${styles.km}`}>
                        100km
                      </div>
                      <div className={`${styles.bar} ${styles.today}`}></div>
                    </div>
                    <div className={`${styles.text} ${styles.desc}`}>
                      오늘 운행거리
                    </div>
                  </li>
                  <li className={styles.list}>
                    <div className={styles.bar_wrap}>
                      <div className={`${styles.text} ${styles.km}`}>
                        800km
                      </div>
                      <div className={`${styles.bar} ${styles.total}`}></div>
                    </div>
                    <div className={`${styles.text} ${styles.desc}`}>
                      총 운행거리
                    </div>
                  </li>
                  <li className={styles.list}>
                    <div className={styles.bar_wrap}>
                      <div className={`${styles.text} ${styles.km}`}>
                        1500km
                      </div>
                      <div
                        className={`${styles.bar} ${styles.average}`}
                      ></div>
                    </div>
                    <div className={`${styles.text} ${styles.desc}`}>
                      평균 월 운행거리
                    </div>
                  </li>
                </ul>
              </div>
              <div className={styles.standard}>
                2023.03.01 ~ 2023.03.28 기준
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Drawer