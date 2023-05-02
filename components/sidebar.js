import Link from "next/link";
import { useState } from "react";

function Sidebar({ msg }) {
  const [status, setStatus] = useState("");

  const barStatus = (status) => {
    setStatus("active");
    msg(status);
  };
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
              <div className="name">
                <Link
                  href="/Advertisement"
                  onClick={() => {
                    barStatus("Advertising Management");
                  }}
                >
                  Advertising management
                </Link>
              </div>
            </div>
          </li>
          <li className="menu-list">
            <div className="link">
              <i class="icon">
                <img src="/images/ic-statistics.png" />
              </i>
              <div className="name">
                <Link
                  href="/Statics"
                  onClick={() => {
                    barStatus("Statics");
                  }}
                >
                  Statics
                </Link>
              </div>
            </div>
          </li>
          <li className="menu-list">
            <div className="link">
              <i class="icon">
                <img src="/images/ic-mypage.png" />
              </i>
              <div className="name">
                <Link
                  href="/MyPage"
                  onClick={() => {
                    barStatus("My Info");
                  }}
                >
                  My Page
                </Link>
              </div>
            </div>
          </li>
          <li className="menu-list">
            <div className="link">
              <i class="icon">
                <img src="/images/ic-mypage.png" />
              </i>
              <div className="name">
                <Link
                  href="/notice"
                  onClick={() => {
                    barStatus("Notice");
                  }}
                >
                  Notice
                </Link>
              </div>
            </div>
          </li>
          <li className="menu-list">
            <div className="link">
              <i class="icon">
                <img src="/images/ic-inquire.png" />
              </i>
              <div className="name">
                <Link
                  href="/CustomerService"
                  onClick={() => {
                    barStatus("Anouncement");
                  }}
                >
                  Customer Service Center
                </Link>
              </div>
            </div>
          </li>
          <li className="menu-list">
            <div className="link">
              <div className="name">
                <Link
                  href="/Announcement"
                  onClick={() => {
                    barStatus("Anouncement");
                  }}
                >
                  Announcement
                </Link>
              </div>
            </div>
          </li>
          <li className="menu-list">
            <div className="link">
              <div className="name">
                <Link
                  href="/Guide"
                  onClick={() => {
                    barStatus("Guide");
                  }}
                >
                  Guide
                </Link>
              </div>
            </div>
          </li>
          <li className="menu-list">
            <div className="link">
              <div className="name">
                <Link
                  href="/Faq"
                  onClick={() => {
                    barStatus("Faq");
                  }}
                >
                  Faq
                </Link>
              </div>
            </div>
          </li>
          <li className="menu-list">
            <div className="link">
              <div className="name">
                <Link
                  href="/Enquiry"
                  onClick={() => {
                    barStatus("Enquiry");
                  }}
                >
                  Enquiry
                </Link>
              </div>
            </div>
          </li>
          <li className="menu-list">
            <div className="link">
              <div className="name">
                <Link
                  href="/policies"
                  onClick={() => {
                    barStatus("Policies and Terms");
                  }}
                >
                  Policies and Terms
                </Link>
              </div>
            </div>
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
