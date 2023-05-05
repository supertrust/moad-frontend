import React,{useState } from "react";
import {Form } from "react-bootstrap";
import AdModel from "./AdModel";

export default function AdListModule() {
  const [showModal, setShowModal] = useState(false);
const openModal = () => {
    setShowModal(true);
  };
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
              <font>entire</font>
            </div>
            <div className="tab-02 tab-title">
              <font>Proceeding</font>
            </div>
            <div className="tab-02 tab-title">
              <font>Applying</font>
            </div>
            <div className="tab-02 tab-title">
              <font>end</font>
            </div>
          </div>
          <div className="right-menu">
            <button onClick={openModal} className="ad-add-btn">
              <img src="/images/add-icon.png" alt="add"></img>
              Advertisement registration
            </button>
            <button className="ad-delet-btn">delete</button>
            <div className="select-box only-pc">
              <Form.Select aria-label="Default select example">
                <option>Choose your campaign type</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
          </div>
        </div>
        <div className="tab-wrap">
          <div className="list-hd list-flex">
            <div className="chk-box hd-all-chk">
              <input
                type="checkbox"
                name="all_chk"
                id="all_chk"
                className="all-chk"
                value=""
              />
            </div>
            <div className="grid">
              <div className="grid-box type-wrap hd-type">ad name</div>
              <div className="grid-box title-wrap hd-name">ad name</div>
              <div className="grid-box car-wrap hd-car only-pc">ad name</div>
              <div className="grid-box car-wrap hd-car only-mb">ad name</div>
              <div className="grid-box date-wrap hd-date">ad name</div>
            </div>
          </div>
          <div className="list-hd list-flex">
            <div className="chk-box hd-all-chk">
              <input
                type="checkbox"
                name="all_chk"
                id="all_chk"
                className="all-chk"
                value=""
              />
            </div>
            <div className="grid">
              <div className="grid-box type-wrap hd-type">ad name</div>
              <div className="grid-box title-wrap hd-name">
                Celebrating the opening of the Icarus service. 25 characters
              </div>
              <div className="grid-box car-wrap hd-car only-pc">ad name</div>
              <div className="grid-box car-wrap hd-car only-mb">ad name</div>
              <div className="grid-box date-wrap hd-date">ad name</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
