import { Skeleton } from "@mui/material";
import { Icon1, Icon2, Icon3, Icon4 } from "@src/components/icons";
import LogoPc from "@src/components/icons/LogoPc";
import useAuth from "@src/hooks/useAuth";
import { PageRouting } from "@src/utils/values";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface SidebarProps {
    msg: (msg: string) => void;
}

const sideBarPath = {
    "/dashboard": "top_bar_dashboard",
    "/dashboard/my-info": "top_bar_my_page",
    "/dashboard/ad-management": "top_bar_ad_management",
    "/dashboard/statistics/[id]": "top_bar_statistics",
    "/dashboard/statistics": "top_bar_statistics",
    "/dashboard/customer-service/notice": "top_bar_announcement",
    "/dashboard/customer-service/notice/[id]": "top_bar_announcement",
    "/dashboard/customer-service/guide": "top_bar_guide",
    "/dashboard/customer-service/faq": "top_bar_faq",
    "/dashboard/customer-service/inquire": "top_bar_inquiry",
    "/dashboard/customer-service/inquire/[id]": "top_bar_inquiry",
    "/dashboard/customer-service/inquire/form": "top_bar_inquiry",
    "/dashboard/customer-service/terms": "top_bar_policies_and_terms"
}

function Sidebar({ msg }: SidebarProps) {
    const { logout, user, dictionary } = useAuth();
    const [tab, setTab] = useState("top_bar_dashboard");
    const router = useRouter();

    const barStatus = (status: string) => {
        setTab(status);
        msg(dictionary?.pageTitle[status]);
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const Tabs = {
        "fixed_ad": '고정',
        "national_ad": '전국',
        "spot_ad": "스팟"
    };


    useEffect(() => {
        if (router.pathname && sideBarPath[router.pathname]) {

            setTab(sideBarPath[router.pathname])
            barStatus(sideBarPath[router.pathname]);
            msg(dictionary.pageTitle[sideBarPath[router.pathname]]);
        }
    }, [])

    return (
        <div className="content">
            <h1 className="side-logo cursor-pointer" onClick={() => router.push("/dashboard")}>
              <div className={'flex justify-center h-[51px]'}>
                  <LogoPc/>
              </div>
            </h1>
            <div className="sidemenu-wrap">
                <ul className="menu-wrap">
                    {
                        !user && [1, 2, 3, 4].map((each, index) => {
                            return <li key={index} className={"menu-list"}>
                                <p className="link">
                                    <Skeleton className={'icon'} variant={"rectangular"} width={25} height={25}></Skeleton>
                                    <Skeleton variant={"text"} sx={{ fontSize: "14px" }} width={80} height={25}></Skeleton>
                                </p>
                            </li>
                        })
                    }


                    {user?.role === "Advertiser" && (
                        <>
                            <li
                                className={
                                    tab === "top_bar_ad_management" || tab === "top_bar_dashboard" ? "menu-list active" : "menu-list"
                                }
                            >
                                <Link
                                    href={PageRouting.dashboard}
                                    className="link"
                                    onClick={() => {
                                        barStatus("top_bar_ad_management");
                                        //msg("광고관리");
                                    }}
                                >
                                    <Icon1 selected={tab === "top_bar_ad_management" || tab === "top_bar_dashboard"}/>
                                    <div className="name">{dictionary.sidebar.advertisementManagement}</div>
                                </Link>
                                <ul className="sub-wrap"></ul>
                            </li>
                            <li
                                className={
                                    tab === "top_bar_statistics" ? "menu-list active" : "menu-list"
                                }
                            >
                                <Link
                                    href={PageRouting.statistics}
                                    className="link"
                                    onClick={() => {
                                        barStatus("top_bar_statistics");
                                        //msg("통계");
                                    }}
                                >
                                    {/*<i className="icon statistics"></i>*/}
                                    <Icon2 selected={tab === "top_bar_statistics"}/>
                                    <div className="name">{dictionary.sidebar.statistics}</div>
                                </Link>
                                <ul className="sub-wrap"></ul>
                            </li>
                            <li
                                className={tab === "top_bar_my_page" ? "menu-list active" : "menu-list"}
                            >
                                <Link
                                    href={PageRouting.myInfo}
                                    className="link"
                                    onClick={() => {
                                        barStatus("top_bar_my_page");
                                        //msg("내 정보");
                                    }}
                                >
                                    <Icon3 selected={tab === "top_bar_my_page"}/>
                                    <div className="name">{dictionary.sidebar.myInfo}</div>
                                </Link>
                                <ul className="sub-wrap nav"></ul>
                            </li>
                            <li
                                className={
                                    tab === "top_bar_announcement" ||
                                    tab === "top_bar_guide" ||
                                    tab === "top_bar_faq" ||
                                    tab === "top_bar_inquiry" ||
                                    tab === "top_bar_policies_and_terms"
                                        ? "menu-list active"
                                        : "menu-list"
                                }
                            >
                                <Link
                                    className="link"
                                    href={PageRouting.notice}
                                    onClick={() => {
                                        barStatus("top_bar_announcement");
                                        //msg("공지사항");
                                    }}
                                >
                                   <Icon4 selected={tab === "top_bar_announcement" ||
                                       tab === "top_bar_guide" || tab === "top_bar_faq" ||
                                       tab === "top_bar_inquiry" || tab === "top_bar_policies_and_terms"}/>
                                    <div className="name">{dictionary.sidebar.customerService}</div>
                                </Link>
                                <ul className="sub-wrap ">
                                    <li className="sub-list notice ">
                                        <Link
                                            href={PageRouting.notice}
                                            className={
                                                tab === "top_bar_announcement" ? "sub-link active" : "sub-link "
                                            }
                                            onClick={() => {
                                                barStatus("top_bar_announcement");
                                                //msg("공지사항");
                                            }}
                                        >
                                            {dictionary.sidebar.notice}
                                        </Link>
                                    </li>
                                    <li className="sub-list guide ">
                                        <Link
                                            href={PageRouting.guide}
                                            className={
                                                tab === "top_bar_guide" ? "sub-link active" : "sub-link "
                                            }
                                            onClick={() => {
                                                barStatus("top_bar_guide");
                                                //msg("가이드");
                                            }}
                                        >
                                            {dictionary.sidebar.guide}
                                        </Link>
                                    </li>
                                    <li className="sub-list faq ">
                                        <Link
                                            href={PageRouting.faq}
                                            className={
                                                tab === "top_bar_faq" ? "sub-link active" : "sub-link "
                                            }
                                            onClick={() => {
                                                barStatus("top_bar_faq");
                                                //msg("FAQ");
                                            }}
                                        >
                                            {dictionary.sidebar.faq}
                                        </Link>
                                    </li>
                                    <li className="sub-list inquire active">
                                        <Link
                                            href={PageRouting.inquire}
                                            className={
                                                tab === "top_bar_inquiry" ? "sub-link active" : "sub-link "
                                            }
                                            onClick={() => {
                                                barStatus("top_bar_inquiry");
                                                //msg("문의내역");
                                            }}
                                        >
                                            {dictionary.sidebar.inquiry}
                                        </Link>
                                    </li>
                                    <li className="sub-list terms ">
                                        <Link
                                            href={PageRouting.terms}
                                            className={
                                                tab === "top_bar_policies_and_terms"
                                                    ? "sub-link active"
                                                    : "sub-link "
                                            }
                                            onClick={() => {
                                                barStatus("top_bar_policies_and_terms");
                                                //msg("정책 및 약관");
                                            }}
                                        >
                                            {dictionary.sidebar.termsAndPolicies}
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            <div className="side-logout d-flex align-items-center cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">
                <a onClick={handleLogout} className="logout-btn">
                    <i className="ic-logout"></i>
                    <div className="text-white">{dictionary.sidebar.logout}</div>
                </a>
            </div>
        </div>
    );
}

export default Sidebar;
