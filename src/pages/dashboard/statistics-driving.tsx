import React, { useState } from "react";
import { rows, columns, rowData } from '@src/sections/statistics-driving/tabelData';
import DataTable from '@src/components/DataGrid/DataGrid';
import { styles } from "@src/sections/statistics-driving";
import { DateRangePicker } from 'rsuite';
import { startOfDay, endOfDay, addDays, subDays } from 'date-fns';

export default function StatisticsScreen() {

  const Ranges = [
    {
      // Today
      label: '오늘',
      value: [startOfDay(new Date()), endOfDay(new Date())]
    },
    {
      // yesterday
      label: '어제',
      value: [startOfDay(addDays(new Date(), -1)), endOfDay(addDays(new Date(), -1))]
    },
    {
      // last7Days
      label: '지난 7일',
      value: [startOfDay(subDays(new Date(), 6)), endOfDay(new Date())]
    },
    {
      // last30Days
      label: '지난 30일',
      value: [startOfDay(subDays(new Date(), 29)), endOfDay(new Date())],
    },
  ];
  return (
    <>
      <div
        id={styles.statistics_driving}
        className={styles.statistics_driving_page}
      >
        <div className={styles.container}>
          <div className={styles.board_content}>
            <div className={styles.statistics_driving_content}>
              <div className={styles.only_pc}>
                <div className={styles.page_link}>
                  <a href="/statistics" className={styles.link}>
                    통계
                  </a>
                  <span className={styles.link}>&gt;</span>
                  <a href="/statistics-driving" className={styles.link}>
                    이카루스 서비스 오픈 출시 기념
                  </a>
                </div>
              </div>
              <div className={styles.only_mb}>
                <div className={styles.title_wrap}>
                  <div className={styles.title}>운행차량</div>
                  <div className={styles.line}></div>
                </div>
              </div>
              <div className={styles.calendar_content}>
                <div className={styles.date_wrap}>
                  <button
                    type="button"
                    className={`${styles.icons} ${styles.ic_arrow_prev}`}
                  ></button>
                  <button
                    type="button"
                    id={styles.date_select}
                    className={styles.date}
                  >
                    <DateRangePicker className={styles.text}
                      format="yyyy-MM-dd"
                      ranges={Ranges} 
                      locale={{
                        sunday: '일',
                        monday: '월',
                        tuesday: '화',
                        wednesday: '수',
                        thursday: '목',
                        friday: '금',
                        saturday: '토',
                        ok: '적용',
                        today: '오늘',
                        yesterday: '어제',
                        Last_7_day: '지난 7일',
                      }}
                    />
                  </button>
                  <button
                    type="button"
                    className={`${styles.icons} ${styles.ic_arrow_next}`}
                  ></button>
                </div>

                <div className={styles.date_info}>
                  보고서는 실시간이 아닙니다. 2023. 03. 28 14:59 기준 ,
                  2023.03.28 11: 00 시간까지 업데이트된 지표입니다.
                </div>

                <div id={styles.hidden_date} className={styles.calendar_inner}>
                  <div className={styles.calendar}>
                    <iframe
                      id={styles.ifram_date}
                      frameBorder="0"
                      height="230px"
                    ></iframe>
                    <div className={styles.only_mb}>
                      <div className={styles.mb_top}>
                        <button
                          type="button"
                          className={styles.close_btn}
                        ></button>
                        <div className={styles.title}>날짜선택</div>
                      </div>
                    </div>

                    <div className={styles.top}>
                      <button type="button" className={styles.text}>
                        오늘
                      </button>
                      <button type="button" className={styles.text}>
                        어제
                      </button>
                      <button type="button" className={styles.text}>
                        이번주
                      </button>
                      <button type="button" className={styles.text}>
                        이번달
                      </button>
                      <button type="button" className={styles.text}>
                        지난 30일
                      </button>
                      <button type="button" className={styles.text}>
                        지난 7일
                      </button>
                      <button type="button" className={styles.text}>
                        지난 달
                      </button>
                      <button type="button" className={styles.text}>
                        지난 주
                      </button>
                      <button type="button" className={styles.text}>
                        전체
                      </button>
                    </div>
                    <div className={styles.datepicker}>
                      <div className={styles.text_wrap}>
                        <div className={styles.text}>시작일</div>
                        <div className={styles.text}>종료일</div>
                      </div>
                      <div className={styles.calendar_wrap}>
                        <div
                          className={`${styles.calendar} ${styles.start_date}`}
                        >
                          <input
                            type="text"
                            name="start_date"
                            id="start_date"
                            value=""
                          />
                          <div
                            className="date"
                            data-altfield="#start_date"
                          ></div>
                        </div>
                        <div
                          className={`${styles.calendar} ${styles.end_date}`}
                        >
                          <input
                            type="text"
                            name="end_date"
                            id="end_date"
                            value=""
                          />
                          <div
                            className={styles.date}
                            data-altfield="#end_date"
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.bottom}>
                      <div className={styles.date_text}>
                        2023. 03. 15 ~ 2023. 03. 15 (1일간)
                      </div>
                      <div className={styles.btn_wrap}>
                        <button
                          type="button"
                          id="apply_btn"
                          className={`${styles.btns} ${styles.apply_btn}`}
                        >
                          적용
                        </button>
                        <button
                          type="button"
                          id="close_btn"
                          className={`${styles.btns} ${styles.close_btn}`}
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className={styles.driving_wrap}>
                <div className={styles.hd_wrap}>
                  <ul className={styles.list_wrap}>
                    <li className={styles.list}>
                      <div className={styles.text_wrap}>
                        <div className={styles.text}>no</div>
                      </div>
                      <div className={styles.text_wrap}>
                        <div className={styles.text}>등록번호</div>
                      </div>
                      <div className={styles.text_wrap}>
                        <div className={styles.text}>차량종류</div>
                      </div>
                      <div className={styles.text_wrap}>
                        <div className={styles.text}>운행거리</div>
                      </div>
                      <div className={styles.text_wrap}>
                        <div className={styles.text}>운행시간</div>
                      </div>
                      <div className={styles.text_wrap}>
                        <div className={styles.text}>달성률</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className={styles.list_content}>
                  <ul className={styles.list_wrap}>
                    <li className={styles.list}>
                      <div className={`${styles.text_wrap} ${styles.num_wrap}`}>
                        <div className={styles.text}>1</div>
                      </div>
                      <div className={styles.text_wrap}>
                        <div className={`${styles.only_mb} ${styles.text}`}>
                          등록번호
                        </div>
                        <div className={styles.text}>10150122</div>
                      </div>
                      <div className={styles.text_wrap}>
                        <div className={`${styles.only_mb} ${styles.text}`}>
                          차량종류
                        </div>
                        <div className={styles.text}>윙바디 1t</div>
                      </div>
                      <div className={styles.text_wrap}>
                        <div className={`${styles.only_mb} ${styles.text}`}>
                          운행거리
                        </div>
                        <div className={styles.text}>500km</div>
                      </div>
                      <div className={styles.text_wrap}>
                        <div className={`${styles.only_mb} ${styles.text}`}>
                          운행시간
                        </div>
                        <div className={styles.text}>50시간</div>
                      </div>
                      <div className={styles.text_wrap}>
                        <div className={`${styles.only_mb} ${styles.text}`}>
                          달성률
                        </div>
                        <div className={styles.text}>80%</div>
                      </div>
                    </li>
                    <li className={styles.list}>
                      <div className={`${styles.text_wrap} ${styles.num_wrap}`}>
                        <div className={styles.text}>2</div>
                      </div>
                      <div className={styles.text_wrap}>
                        <div className={`${styles.only_mb} ${styles.text}`}>
                          등록번호
                        </div>
                        <div className={styles.text}>10150122</div>
                      </div>
                      <div className={styles.text_wrap}>
                        <div className={`${styles.only_mb} ${styles.text}`}>
                          차량종류
                        </div>
                        <div className={styles.text}>윙바디 1t</div>
                      </div>
                      <div className={styles.text_wrap}>
                        <div className={`${styles.only_mb} ${styles.text}`}>
                          운행거리
                        </div>
                        <div className={styles.text}>500km</div>
                      </div>
                      <div className={styles.text_wrap}>
                        <div className={`${styles.only_mb} ${styles.text}`}>
                          운행시간
                        </div>
                        <div className={styles.text}>50시간</div>
                      </div>
                      <div className={styles.text_wrap}>
                        <div className={`${styles.only_mb} ${styles.text}`}>
                          달성률
                        </div>
                        <div className={styles.text}>80%</div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className={styles.pagination_wrap}>
                  <button
                    type="button"
                    className={`${styles.arrow} ${styles.prev}`}
                  ></button>
                  <ul className={styles.num_wrap}>
                    <li className={`${styles.number} ${styles.active}`}>1</li>
                    <li className={styles.number}>2</li>
                    <li className={styles.number}>3</li>
                    <li className={styles.number}>4</li>
                    <li className={styles.number}>5</li>
                  </ul>
                  <button
                    type="button"
                    className={`${styles.arrow} ${styles.next}`}
                    disabled={undefined}
                  ></button>
                </div>
              </div> */}
              <DataTable columns={columns} rows={rows} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}