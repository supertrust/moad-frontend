import useAuth from "@src/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
interface SidebarProps {
  msg: (msg: string) => void;
}

function Sidebar({ msg }: SidebarProps) {
  const { logout, user } = useAuth();
  const [tab, setTab] = useState("Advertising Management");

  const barStatus = (status: string) => {
    setTab(status);
    msg(status);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="content">
      <h1 className="side-logo">
        <Image
          src="/images/logo-pc.svg"
          alt="logo-pc"
          width={150}
          height={50}
        />
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
                <Image
                  src={`/images/ic-dashboard${
                    tab == "Advertising Management" ? "-active" : ""
                  }.png`}
                  alt=""
                  width={25}
                  height={25}
                />
              </i>
              <div className="name">Advertising management</div>
            </Link>
            <ul className="sub-wrap"></ul>
          </li>
          {user?.role === "Advertiser" && (
            <li
              className={
                tab === "Ad Management" ? "menu-list active" : "menu-list"
              }
            >
              <Link
                href={"/dashboard/ad-management"}
                className="link"
                onClick={() => {
                  barStatus("Ad Management");
                }}
              >
                <i className="icon">
                  <Image
                    src={`/images/ic-dashboard${
                      tab == "Ad Management" ? "-active" : ""
                    }.png`}
                    alt=""
                    width={25}
                    height={25}
                  />
                </i>
                <div className="name">Ad Management</div>
              </Link>
              <ul className="sub-wrap"></ul>
            </li>
          )}
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
                <Image
                  src={`/images/ic-statistics${
                    tab == "Statistics" ? "-active" : ""
                  }.png`}
                  width={25}
                  height={25}
                  alt=""
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
                <Image
                  src={`/images/ic-mypage${
                    tab == "My Info" ? "-active" : ""
                  }.png`}
                  alt="my-info"
                  width={25}
                  height={25}
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
              href={"/dashboard/customer-service/notice"}
              onClick={() => {
                barStatus("Announcement");
              }}
            >
              <i className="icon center">
                <Image
                  src={`/images/ic-inquire${
                    tab === "Inquiry" ||
                    tab === "Policies and Terms" ||
                    tab === "FAQ" ||
                    tab === "Announcement" ||
                    tab === "Guide"
                      ? "-active"
                      : ""
                  }.png`}
                  width={25}
                  height={25}
                  alt=""
                />
              </i>
              <div className="name">Customer Service Center</div>
            </Link>
            <ul className="sub-wrap ">
              <li className="sub-list notice ">
                <Link
                  href={"/dashboard/customer-service/notice"}
                  className={
                    tab === "Announcement" ? "sub-link active" : "sub-link "
                  }
                  onClick={() => {
                    barStatus("Announcement");
                  }}
                >
                  announcement
                </Link>
              </li>
              {user?.role === "Advertiser" && (
                <>
                  <li className="sub-list guide ">
                    <Link
                      href={"/dashboard/customer-service/guide"}
                      className={
                        tab === "Guide" ? "sub-link active" : "sub-link "
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
                      href={"/dashboard/customer-service/faq"}
                      className={
                        tab === "FAQ" ? "sub-link active" : "sub-link "
                      }
                      onClick={() => {
                        barStatus("FAQ");
                      }}
                    >
                      FAQ
                    </Link>
                  </li>
                </>
              )}
              <li className="sub-list inquire active">
                <Link
                  href={"/dashboard/customer-service/inquire"}
                  className={
                    tab === "Inquiry" ? "sub-link active" : "sub-link "
                  }
                  onClick={() => {
                    barStatus("Inquiry");
                  }}
                >
                  1:1 inquiry
                </Link>
              </li>
              {user?.role === "Advertiser" && (
                <li className="sub-list terms ">
                  <Link
                    href={"/dashboard/customer-service/terms"}
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
              )}
            </ul>
          </li>
        </ul>
      </div>
      <div className="side-logout d-flex align-items-center">
        <a href="#" onClick={handleLogout} className="logout-btn">
          <i className="ic-logout"></i>
          <div className="text-white">로그아웃</div>
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
