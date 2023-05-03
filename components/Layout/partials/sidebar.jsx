import authService from "@/services/auth/authService";
import { HttpService } from "@/utils/HttpService";
import { Http } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";

function Sidebar({ msg }) {
  const [status, setStatus] = useState("");

  const barStatus = (status) => {
    setStatus("active");
    msg(status);
  };

  const handleLogout = async () => {
    const res = await authService.logout();
    console.log(res);
    if (res.data.success) {
      // dispatch(removeAuthData([]));
      HttpService.removeToken();
    }
  };
  return (
    <div className="content">
      <h1 className="side-logo">
        <img src="/images/logo-pc.svg" />
      </h1>
      <div className="sidemenu-wrap">
        {/* <ul className="menu-wrap">
          <li className="menu-list active">
            <div className="link">
              <i className="icon">
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
              <i className="icon">
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
              <i className="icon">
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
              <i className="icon">
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
              <i className="icon">
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
        </ul> */}
        <ul className="menu-wrap">
          <li className="menu-list active">
            <Link
              href={"/"}
              className="link"
              onClick={() => {
                barStatus("Advertising Management");
              }}
            >
              <i className="icon home"></i>
              <div className="name">Advertising management</div>
            </Link>
            <ul className="sub-wrap"></ul>
          </li>
          <li className="menu-list ">
            <Link
              href={"/statistics"}
              className="link"
              onClick={() => {
                barStatus("Statistics");
              }}
            >
              <i className="icon statistics"></i>
              <div className="name">Statistics</div>
            </Link>
            <ul className="sub-wrap"></ul>
          </li>
          <li className="menu-list ">
            <Link
              href={"/my-info"}
              className="link"
              onClick={() => {
                barStatus("My Page");
              }}
            >
              <i className="icon mypage"></i>
              <div className="name">My page</div>
            </Link>
            <ul className="sub-wrap"></ul>
          </li>
          <li className="menu-list">
            <a className="link">
              <i className="icon center"></i>
              <div className="name">Customer Service Center</div>
            </a>
            <ul className="sub-wrap">
              <li className="sub-list notice ">
                <Link
                  href={"/notice"}
                  className="sub-link"
                  onClick={() => {
                    barStatus("Announcement");
                  }}
                >
                  announcement
                </Link>
              </li>
              <li className="sub-list guide ">
                <Link
                  href={"/guide"}
                  className="sub-link"
                  onClick={() => {
                    barStatus("Guide");
                  }}
                >
                  guide
                </Link>
              </li>
              <li className="sub-list faq ">
                <Link
                  href={"/faq"}
                  className="sub-link"
                  onClick={() => {
                    barStatus("FAQ");
                  }}
                >
                  FAQ
                </Link>
              </li>
              <li className="sub-list inquire active">
                <Link
                  href={"/inquire"}
                  className="sub-link"
                  onClick={() => {
                    barStatus("Inquiry");
                  }}
                >
                  1:1 inquiry
                </Link>
              </li>
              <li className="sub-list terms ">
                <Link
                  href={"/terms"}
                  className="sub-link"
                  onClick={() => {
                    barStatus("Policies and Terms");
                  }}
                >
                  Policies and Terms
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="side-logout">
        <button onClick={handleLogout} className="logout-btn">
          <div className="text">log out</div>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
