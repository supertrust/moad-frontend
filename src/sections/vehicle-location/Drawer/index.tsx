import React from 'react';
import styles from '../style.module.css';
import Image from 'next/image';
import { clsx } from 'clsx';
import CaretUp from '@images/vehicle_location/ic-arrow-up.png'
import { IVehicleLocationDetails } from '@src/types/map';
import Loader from '@src/components/Loader';

interface DrawerProps {
  open: boolean
  handleClose: VoidFunction
  isLoading: boolean
  vehicle?:IVehicleLocationDetails
}


function Drawer({ open, handleClose , isLoading, vehicle }: DrawerProps) {

  const {
    passing_vehicle_descent, 
    passing_vehicle_up ,
    start_time,
    // end_time,
    avarageMonthlyDistane,
    todayDistance,
    totalDistance,
  } = vehicle || {}
  
  let start = start_time ? start_time.split('T')[1].split(':') : null 

  return (
    <div>
      <div className={`${styles.button_wrap} z-50`}>
        <button
          type="button"
          id="location_detail_btn"
          className={clsx(styles.arrow_wrap, open ? styles.btn_closed : styles.btn_open )} 
          onClick={handleClose}
        >
          <i className={styles.ic_arrrow}></i>
        </button>
      </div>

      <div className='block sm:hidden mt-[-20px]'>
        <div className='flex flex-row justify-center bg-transparent z-[200] relative'>
            <div className='bg-white rounded-t-md px-3 py-[8px] cursor-pointer' onClick={handleClose}>
              <Image  src={CaretUp} width={13} alt='' />
            </div>
        </div>
        <div className='px-2 py-3 text-secondary font-bold bg-white'>
          안산시 상록구 월피동
        </div>
      </div>
      <div className={styles.vehicle_location_content}>
        <div className={clsx(styles.location_detail_wrap, open ? styles.closed : styles.open)} >
          <div className={styles.address}>안산시 상록구 월피동</div>
          <div className={styles.content_inner}>
            {isLoading ?

              <Loader size="lg" className='h-full w-full items-center justify-center flex flex-row '/> :
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
                    <div className={styles.text}>상행 : {passing_vehicle_up || '- '}대</div>
                    <div className={styles.text}>하행 : {passing_vehicle_descent || '- '}대</div>
                  </div>
                </div>

                <div className={clsx(styles.section, styles.operation_history)}>
                  <div className={`${styles.text}  mb-[16px]`}>운행내역</div>
                  <ul className={styles.history}>
                    <li className={styles.list}>
                      <i className={`${styles.icons} ${styles.ic_start}`}></i>
                      <div className={styles.data}>{start ? `${start[0]}:${start[1]}` : '-'}</div>
                      <div className={styles.text}>운행시작</div>
                    </li>
                    <li className={styles.list}>
                      <i className={`${styles.icons} ${styles.ic_end}`}></i>
                      <div className={styles.data}>

                      {`${totalDistance || 0}km`}
                      </div>
                      <div className={styles.text}>운행종료</div>
                    </li>
                    <li className={styles.list}>
                      <i className={`${styles.icons} ${styles.ic_drive}`}></i>
                      <div className={styles.data}>{`${todayDistance || 0}km`}</div>
                      <div className={styles.text}>운행거리</div>
                    </li>
                  </ul>
                </div>

                <div
                  className={`${styles.section} ${styles.accomplishment_rate}`}
                >
                  <div className={`${styles.title} !mb-[7px]`}>운행 달성률</div>
                  <ul className={styles.list_wrap}>
                    <li className={styles.list}>
                      <div className={styles.bar_wrap}>
                        <div className={`${styles.text} ${styles.km}`}>
                          {`${todayDistance || 0}km`}
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
                          {`${totalDistance || 0}km`}
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
                          {`${avarageMonthlyDistane || 0}km`}
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
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Drawer