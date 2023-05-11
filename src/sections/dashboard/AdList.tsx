import React, { useState } from "react";
import { Form } from "react-bootstrap";
import AdModel from "./AdModel";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { styles } from './index'
export default function AdListModule() {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const data = [
    { id: 1, ad_type: "item1", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
    { id: 2, ad_type: "item2", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
    { id: 3, ad_type: "item3", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
    { id: 4, ad_type: "item4", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
    { id: 10, ad_type: "item5", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
    { id: 20, ad_type: "item6", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
    { id: 30, ad_type: "item7", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
    { id: 40, ad_type: "item8", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
    { id: 11, ad_type: "item9", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
    { id: 12, ad_type: "item10", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
    { id: 13, ad_type: "item11", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
    { id: 14, ad_type: "item12", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
    { id: 21, ad_type: "item13", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
    { id: 22, ad_type: "item14", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
    { id: 23, ad_type: "item15", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
    { id: 24, ad_type: "item16", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
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
      <div className={styles.title_wrap}>
        <div className={styles.title}>광고 목록</div>
        <div className={styles.line}></div>
      </div>
      {showModal ? <AdModel setShowModal={setShowModal} /> : null}
      <div className="ad-contents">
        <div className="menu-hd">
          <div className="tab-menu">
            <div className="tab-01 tab-title active">
              <span>전체</span>
            </div>
            <div className="tab-02 tab-title">
              <span>진행중</span>
            </div>
            <div className="tab-02 tab-title">
              <span>신청중</span>
            </div>
            <div className="tab-02 tab-title">
              <span>종료</span>
            </div>
          </div>
          <div className="right-menu">
            <button onClick={openModal} className="ad-add-btn">
              <img src="/images/add-icon.png" alt="add"></img>
              <p>
                Advertisement registration
              </p>
            </button>
            <button className="ad-delet-btn">
              <p>
                delete
              </p>
            </button>
            <div className="select-box only-pc">
              <Form.Select aria-label="Default select example">
                <option>Choose your campaign type</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
            {/* <div className="filter-wrp">
              <img
                    src={"/images/statistics/filter.png"}
                  />
                </div> */}
          </div>
        </div>
        <BootstrapTable
          keyField="id"
          data={data}
          columns={columns}
          pagination={paginationFactory({ hideSizePerPage: true, sizePerPage: 6 })}
          selectRow={{ mode: 'checkbox', clickToSelect: true }}
          noDataIndication={'진행중인 광고가 없습니다.'}
        />
      </div>
    </>
  );
}
