import React from "react";

export default function Advertising() {
  return (
    <>
      <div className="ad-status">
        <div className="title-wrap">
          <div className="title">
            <span>Advertising status</span>
          </div>
          <div className="line"></div>
          <div className="text">
            <span>As of 12:00 am on March 10, 2023</span>
          </div>
        </div>
      </div>
      <div className="ad-content">
        <div className="cards">
          <div className="title">
            <span>registered advertisement</span>
          </div>
          <div className="value">
            <span>-</span>
          </div>
        </div>
        <div className="cards">
          <div className="title">
            <span>total vehicle</span>
          </div>
          <div className="value">
            <span>20s</span>
          </div>
        </div>
        <div className="cards">
          <div className="title">
            <span> running</span>
          </div>
          <div className="value">
            <span>15th</span>
          </div>
        </div>
        <div className="cards">
          <div className="title">
            <span>Suspension</span>
          </div>
          <div className="value">
            <span>5 generations</span>
          </div>
        </div>
      </div>
    </>
  );
}
