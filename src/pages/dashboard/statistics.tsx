import React from 'react'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { styles } from "@src/sections/statistics";

export default function StatisticsScreen() {
  const date_start = '2023. 03. 01';
  const date_end = '2023. 03. 08';
  const ad_amount = '123,456,789';
  const driving_vehicle = [
    {
      'title': '모든 차량수',
      'data': '120',
    },
    {
      'title': '운행차량',
      'data': '120',
    },
    {
      'title': '운행예정',
      'data': '',
    },
    {
      'title': '종료예정',
      'data': '60',
    },
    {
      'title': '종료',
      'data': '20',
    },
  ];
  const data =[
    { id: 1, ad_type: "item1",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
    { id: 2, ad_type: "item2",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
    { id: 3, ad_type: "item3",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
    { id: 4, ad_type: "item4",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
    { id: 10, ad_type: "item5",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
    { id: 20, ad_type: "item6",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
    { id: 30, ad_type: "item7",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
    { id: 40, ad_type: "item8",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
    { id: 11, ad_type: "item9",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
    { id: 12, ad_type: "item10",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
    { id: 13, ad_type: "item11",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
    { id: 14, ad_type: "item12",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
    { id: 21, ad_type: "item13",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
    { id: 22, ad_type: "item14",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
    { id: 23, ad_type: "item15",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
    { id: 24, ad_type: "item16",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
  ] 
  
  const columns = [
    {
      dataField: "ad_type",
      text: "광고 유형",
      sort: true,
      headerStyle: { backgroundColor: 'rgb(244 247 251)' }
    },
    {
      dataField: "advertising_name",
      text: "광고 이름",
      sort: true,
      headerStyle: { backgroundColor: 'rgb(244 247 251)' }
    },
    {
      dataField: "vehicles",
      text: "운행 차량수",
      headerStyle: { backgroundColor: 'rgb(244 247 251)' }
    },
    {
      dataField: "period",
      text: "기간",
      headerStyle: { backgroundColor: 'rgb(244 247 251)' }
    },
    {
      dataField: "status",
      text: "상태",
      headerStyle: { backgroundColor: 'rgb(244 247 251)' }
    }
  ];
  return (
    <>
      <div id={styles.statistics} className={`${styles.page} ${styles.statistics}`}>
        <div className={styles.container}>
          <div className={styles.board_content}>
            <div className={styles.statistics_content}>
              <div className={styles.step_01}>
                <div className={styles.ad_amount}>
                  <div className={styles.title_wrap}>
                    <div className={styles.title}>광고 금액</div>
                    <div className={styles.line}></div>
                    <a href="/ad-amount" className={styles.text}>view all</a>
                  </div>
                  <div className={styles.ad_amount_box}>
                    <div className={styles.box_wrap}>
                      <div className={styles.date}>{date_start} ~ {date_end}</div>
                      <div className={styles.amount}>{ad_amount ? ad_amount : '-'}</div>
                    </div>
                  </div>
                </div>

                <div className={styles.driving_vehicle}>
                  <div className={styles.title_wrap}>
                    <div className={styles.title}>운행차량</div>
                    <div className={styles.line}></div>
                  </div>
                  <div className={styles.driving_vehicle_box}>
                    <ul className={styles.list_wrap}>
                      {
                        driving_vehicle.map((data) =>
                          <li className={styles.list}>
                            <div className={styles.title}>{data.title}</div>
                            <div className={styles.data}>{data.data ? data.data + '대' : '-'}</div>
                          </li>
                        )
                      }
                    </ul>
                  </div>
                </div>
              </div>
              <div className={styles.step_02}>
                <div className={styles.title_wrap}>
                  <div className={styles.title}>운행거리/운행시간</div>
                  <div className={styles.line}></div>
                </div>
                <BootstrapTable
                  keyField="id"
                  data={ data }
                  columns={ columns }
                  pagination={ paginationFactory({hideSizePerPage : true,sizePerPage: 6}) }
                  selectRow={ { mode: 'checkbox', clickToSelect: true } }
                  noDataIndication={'진행중인 광고가 없습니다.' }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--TODO 삭제버튼을 눌렀을때 : 종료된 광고가 아닐때 출력--> */}
      {/* <!--TODO Output when active className is added to confirm-modal className--> */}
      <div id="check_modal" className={`${styles.check_modal} ${styles.confirm_modal}`}>
        <div className={styles.check_modal_wrap}>
          <div className={styles.title}>확인사항</div>
          <div className={styles.text}>
            종료된 광고만<br/>
              삭제하실 수 있습니다
          </div>
          <div className={styles.btn_wrap}>
            <button type="button" className={`${styles.check_close_btn} ${styles.active_btn}`}>확인</button>
          </div>
        </div>
      </div>

      {/* <!--TODO 삭베버튼을 눌렀을때 : 종료된 광고가 삭제 되기전 출력 -->
      <!--TODO Output when active className is added to remove-ads-modal className--> */}
      <div id="remove_ads_modal" className={`${styles.check_modal} ${styles.remove_ads_modal}`}>
        <div className={styles.check_modal_wrap}>
          <div className={styles.title}>광고삭제</div>
          <div className={styles.text}>
            삭제시 복구할 수 없으며<br/>
              광고에 대한 정보를 확인하실 수 없습니다.
          </div>
          <div className={styles.btn_wrap}>
            <button type="button" className={`${styles.check_close_btn} ${styles.line_btn}`}>취소</button>
            <button type="button" id="remove_ads_modal_confirm" className={styles.active_btn}>삭제</button>
          </div>
        </div>
      </div>
    </>
  )
}
