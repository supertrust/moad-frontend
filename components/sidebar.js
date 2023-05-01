import Link from "next/link";
// import { useState } from "react";

function Sidebar() {
  return (
    <div className="content">
      <h1 className="side-logo">
        <img src="/images/logo-pc.svg" />
      </h1>
      <div className="sidemenu-wrap">
        <ul className="menu-wrap">
          <li className="menu-list active">
            <div className="link">
              <i class="icon">
                <img src="/images/ic-dashboard-active.png" />
              </i>
              <div className="name"><Link href="/Advertisement" >Advertising management</Link></div>
            </div>
          </li>
          <li className="menu-list">
            <div className="link">
              <i class="icon"><img src="/images/ic-statistics.png" /></i>
              <div className="name"><Link href="/Statics">Statics</Link></div>
            </div>
            <ul className="sub-wrap"></ul>
          </li>
          <li className="menu-list">
            <div className="link">
              <i class="icon"><img src="/images/ic-mypage.png" /></i>
              <div className="name">My Page</div>
            </div>
            <ul className="sub-wrap"></ul>
          </li>
          <li className="menu-list">
            <div className="link">
              <i class="icon"><img src="/images/ic-inquire.png" /></i>
              <div className="name">Customer Service Center</div>
            </div>
            <ul className="sub-wrap"></ul>
          </li>
        </ul>
      </div>
      <div className="side-logout">
        <div className="logout-btn">
          <div className="text">log out</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
