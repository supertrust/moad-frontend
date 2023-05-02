import React from "react";

export default function AdvertisingModule() {
  return (
    <>
      <div className="ad-status">
        <div className="title-wrap">
          <div className="title">
            <font>Advertising status</font>
          </div>
          <div className="line"></div>
          <div className="text">
            <font>As of 12:00 am on March 10, 2023</font>
          </div>
        </div>
      </div>
      <div className="ad-content">
        <div className="cards">
          <div className="title">
            <font>registered advertisement</font>
          </div>
          <div className="value">
            <font>-</font>
          </div>
        </div>
        <div className="cards">
          <div className="title">
            <font>total vehicle</font>
          </div>
          <div className="value">
            <font>20s</font>
          </div>
        </div>
        <div className="cards">
          <div className="title">
            <font> running</font>
          </div>
          <div className="value">
            <font>15th</font>
          </div>
        </div>
        <div className="cards">
          <div className="title">
            <font>Suspension</font>
          </div>
          <div className="value">
            <font>5 generations</font>
          </div>
        </div>
      </div>
    </>
  );
}
