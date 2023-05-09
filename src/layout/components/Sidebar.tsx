import useAuth from "@src/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";

interface SidebarProps {
  msg: (msg: string) => void;
}

function Sidebar({ msg }: SidebarProps) {
  const { logout } = useAuth();
  const [tab, setTab] = useState("Advertising Management");

  const barStatus = (status: string) => {
    setTab(status);
    msg(status);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

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
          <li
            className={
              tab === "Advertising Management"
                ? "menu-list active"
                : "menu-list"
            }
          >
            <Link
              href={"/dashboard"}
              className="link"
              onClick={() => {
                barStatus("Advertising Management");
              }}
            >
              <i className="icon">
                <img
                  src={`/images/ic-dashboard${tab == "Advertising Management" ? "-active" : ""
                    }.png`}
                  alt=""
                />
              </i>
              <div className="name">Advertising management</div>
            </Link>
            <ul className="sub-wrap"></ul>
          </li>
          <li
            className={tab === "Statistics" ? "menu-list active" : "menu-list"}
          >
            <Link
              href={"/dashboard/statistics"}
              className="link"
              onClick={() => {
                barStatus("Statistics");
              }}
            >
              <i className="icon statistics">
                <img
                  src={`/images/ic-statistics${tab == "Statistics" ? "-active" : ""
                    }.png`}
                />
              </i>
              <div className="name">Statistics</div>
            </Link>
            <ul className="sub-wrap"></ul>
          </li>
          <li className={tab === "My Page" ? "menu-list active" : "menu-list"}>
            <Link
              href={"/dashboard/my-info"}
              className="link"
              onClick={() => {
                barStatus("My Page");
              }}
            >
              <i className="icon mypage">
                {" "}
                <img
                  src={`/images/ic-mypage${tab == "My Info" ? "-active" : ""
                    }.png`}
                />
              </i>
              <div className="name">My page</div>
            </Link>
            <ul className="sub-wrap nav"></ul>
          </li>
          <li
            className={
              tab === "Announcement" ||
                tab === "Guide" ||
                tab === "FAQ" ||
                tab === "Inquiry" ||
                tab === "Policies and Terms"
                ? "menu-list active"
                : "menu-list"
            }
          >
            <Link
              className="link"
              href={"/dashboard/notice"}
              onClick={() => {
                barStatus("Announcement");
              }}
            >
              <i className="icon center">
                <img
                  src={`/images/ic-inquire${tab === "Inquiry" ||
                    tab === "Policies and Terms" ||
                    tab === "FAQ" ||
                    tab === "Announcement" ||
                    tab === "Guide"
                    ? "-active"
                    : ""
                    }.png`}
                />
              </i>
              <div className="name">Customer Service Center</div>
            </Link>
            <ul className="sub-wrap ">
              <li className="sub-list notice ">
                <Link
                  href={"/dashboard/notice"}
                  className={
                    tab === "Announcement"
                      ? "sub-link active"
                      : "sub-link "
                  }
                  onClick={() => {
                    barStatus("Announcement");
                  }}
                >
                  announcement
                </Link>
              </li>
              <li className="sub-list guide ">
                <Link
                  href={"/dashboard/guide"}
                  className={
                    tab === "Guide"
                      ? "sub-link active"
                      : "sub-link "
                  }
                  onClick={() => {
                    barStatus("Guide");
                  }}
                >
                  guide
                </Link>
              </li>
              <li className="sub-list faq ">
                <Link
                  href={"/dashboard/faq"}
                  className={
                    tab === "FAQ"
                      ? "sub-link active"
                      : "sub-link "
                  }
                  onClick={() => {
                    barStatus("FAQ");
                  }}
                >
                  FAQ
                </Link>
              </li>
              <li className="sub-list inquire active">
                <Link
                  href={"/dashboard/inquire"}
                  className={
                    tab === "Inquiry"
                      ? "sub-link active"
                      : "sub-link "
                  }
                  onClick={() => {
                    barStatus("Inquiry");
                  }}
                >
                  1:1 inquiry
                </Link>
              </li>
              <li className="sub-list terms ">
                <Link
                  href={"/dashboard/terms"}
                  className={
                    tab === "Policies and Terms"
                      ? "sub-link active"
                      : "sub-link "
                  }
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
