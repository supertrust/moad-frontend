import React, { useState } from "react";
import { Form } from "react-bootstrap";
import AdModel from "./AdModel";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
export default function AdListModule() {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const data = quantity => {
    const items = [
      { id: 1, ad_type: "item1",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
      { id: 2, ad_type: "item2",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
      { id: 3, ad_type: "item3",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
      { id: 4, ad_type: "item4",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
      { id: 1, ad_type: "item1",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
      { id: 2, ad_type: "item2",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
      { id: 3, ad_type: "item3",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
      { id: 4, ad_type: "item4",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
      { id: 1, ad_type: "item1",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
      { id: 2, ad_type: "item2",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
      { id: 3, ad_type: "item3",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
      { id: 4, ad_type: "item4",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
      { id: 1, ad_type: "item1",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
      { id: 2, ad_type: "item2",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
      { id: 3, ad_type: "item3",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
      { id: 4, ad_type: "item4",advertising_name: "f_item", vehicles: 10,period:6,status: "active" },
    ];
    
    return items;
  };
  
  const products = data();
  
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
      <div className="ad-list">
        <h4>ad list</h4>{" "}
      </div>
      {showModal ? <AdModel setShowModal={setShowModal} /> : null}
      <div className="ad-contents">
        <div className="menu-hd">
          <div className="tab-menu">
            <div className="tab-01 tab-title active">
              <span>entire</span>
            </div>
            <div className="tab-02 tab-title">
              <span>Proceeding</span>
            </div>
            <div className="tab-02 tab-title">
              <span>Applying</span>
            </div>
            <div className="tab-02 tab-title">
              <span>end</span>
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
                  data={ products }
                  columns={ columns }
                  pagination={ paginationFactory({hideSizePerPage : true,sizePerPage: 6}) }
                  selectRow={ { mode: 'checkbox', clickToSelect: true } }
                  noDataIndication={'진행중인 광고가 없습니다.' }
                />
      </div>
    </>
  );
}
