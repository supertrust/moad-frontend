import { Skeleton } from "@mui/material";
import useAuth from "@src/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface SidebarProps {
  msg: (msg: string) => void;
}

const sideBarPath = {
  "/dashboard" : {en:"dashboard",ko : '광고관리'},
  "/dashboard/my-info" : "My Page",
  "/dashboard/ad-management" : "Ad Management",
  "/dashboard/statistics/[id]" : "Statistics",
  "/dashboard/statistics" : "Statistics",
  "/dashboard/customer-service/notice" : "Announcement",
  "/dashboard/customer-service/guide" : "Guide",
  "/dashboard/customer-service/faq" : "FAQ",
  "/dashboard/customer-service/inquire" : "Inquiry",
  "/dashboard/customer-service/inquire/form" : "Inquiry",
  "/dashboard/customer-service/terms" : "Policies and Terms"
}

function Sidebar({ msg }: SidebarProps) {
  const { logout, user } = useAuth();
  const [tab, setTab] = useState("Advertising Management");
  const router = useRouter();

  const barStatus = (status: string) => {
    setTab(status);
    // msg(status);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const Tabs = {
    "fixed_ad" : '고정',
    "national_ad" : '국가',
    "spot_ad" : "스팟"
  };


  useEffect(()=>
  {
    if(router.pathname && sideBarPath[router.pathname])
    {

      setTab(sideBarPath[router.pathname]?.en || sideBarPath[router.pathname])
      barStatus(sideBarPath[router.pathname]?.en || sideBarPath[router.pathname]);
      // msg(sideBarPath[router.pathname].ko || sideBarPath[router.pathname]);
    }
  },[router.pathname])


  console.log('tab',tab)


  return (
    <div className="content">
      <h1 className="side-logo cursor-pointer" onClick = {()=>router.push("/dashboard")}>
        <Image
          src="/images/logo-pc.svg"
          alt="logo-pc"
          width={150}
          height={50}
        />
      </h1>
      <div className="sidemenu-wrap">
        <ul className="menu-wrap">
          {
              !user &&    [1,2,3,4].map((each, index) =>{
                return <li key={index} className={"menu-list"}>
                  <p className="link">
                    <Skeleton className={'icon'} variant={"rectangular"} width={25} height={25}></Skeleton>
                    <Skeleton variant={"text"} sx={{fontSize : "14px"}} width={80} height={25}></Skeleton>
                  </p>
                </li>
              })
          }

          {user?.role === "Cargo" && ( <li className={
              tab === "cargo dashboard" ? "menu-list active" : "menu-list"
            }
          >
            <Link
              href={"/dashboard/cargo"}
              className="link"
              onClick={() => {
                barStatus("cargo dashboard");
                msg("cargo dashboard");
              }}
            >
              <i className="icon home"></i>
              <div className="name">Cargo</div>
            </Link>
            {/* <ul className="sub-wrap"></ul> */}
          </li>
          )}
          {user?.role === "Admin" && (
            <li
              className={tab === "Inquiry" ? "menu-list active" : "menu-list "}
            >
              <Link
                href={"/dashboard/customer-service/inquire"}
                className="link"
                onClick={() => {
                  barStatus("Inquiry");
                  msg("Inquiry");
                }}
              >
                <i className="icon center"></i>
                1:1문의
              </Link>
            </li>
          )}
          {user?.role === "Advertiser" && (
            <>
              <li
                className={
                  tab === "Ad Management" || tab === "dashboard" ? "menu-list active" : "menu-list"
                }
              >
                <Link
                  href={"/dashboard"}
                  className="link"
                  onClick={() => {
                    barStatus("Ad Management");
                    msg("광고관리");
                  }}
                >
                  <i className="icon home"></i>
                  <div className="name">광고관리</div>
                </Link>
                <ul className="sub-wrap"></ul>
              </li>
              <li
                className={
                  tab === "Statistics" ? "menu-list active" : "menu-list"
                }
              >
                <Link
                  href={"/dashboard/statistics"}
                  className="link"
                  onClick={() => {
                    barStatus("Statistics");
                    msg("통계");
                  }}
                >
                  <i className="icon statistics"></i>
                  <div className="name">통계</div>
                </Link>
                <ul className="sub-wrap"></ul>
              </li>
              <li
                className={tab === "My Page" ? "menu-list active" : "menu-list"}
              >
                <Link
                  href={"/dashboard/my-info"}
                  className="link"
                  onClick={() => {
                    barStatus("My Page");
                    msg("내 정보");
                  }}
                >
                  <i className="icon mypage"></i>
                  <div className="name">마이페이지</div>
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
                    msg("공지사항");
                  }}
                >
                  <i className="icon center"></i>
                  <div className="name">고객센터</div>
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
                        msg("공지사항");
                      }}
                    >
                      고객센터
                    </Link>
                  </li>
                  <li className="sub-list guide ">
                    <Link
                      href={"/dashboard/customer-service/guide"}
                      className={
                        tab === "Guide" ? "sub-link active" : "sub-link "
                      }
                      onClick={() => {
                        barStatus("Guide");
                        msg("가이드");
                      }}
                    >
                      가이드
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
                        msg("FAQ");
                      }}
                    >
                      FAQ
                    </Link>
                  </li>
                  <li className="sub-list inquire active">
                    <Link
                      href={"/dashboard/customer-service/inquire"}
                      className={
                        tab === "Inquiry" ? "sub-link active" : "sub-link "
                      }
                      onClick={() => {
                        barStatus("Inquiry");
                        msg("문의내역");
                      }}
                    >
                      1:1문의
                    </Link>
                  </li>
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
                        msg("정책 및 약관");
                      }}
                    >
                      정책 및 약관
                    </Link>
                  </li>
                </ul>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="side-logout d-flex align-items-center">
        <a  onClick={handleLogout} className="logout-btn">
          <i className="ic-logout"></i>
          <div className="text-white">로그아웃</div>
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
