import {
    IcarusSvgLogo, IcarusFullLogo,
    Icon1, Icon2, Icon3, Icon4, Icon5, Icon6,
    Icon7
} from "@src/components/icons/admin/advertisement/sidebar";
import { clsx } from "clsx";
import { useRouter } from "next/router";
import React, { useState } from 'react';
import MenuItem from "./MenuItem";

const allRoutes = {
     dashboard: "/admin/dashboard",
    memberList: "/admin/member-inquiry",
    advertisement: "/admin/advertisement-management",
     manageStat: "/admin/manage-statistics",
    postManagement: "/admin/post-management",
    settings: "/admin/settings",
    withdrawalManagement: "/admin/withdrawal-management"
}

const className = {
    menuText: "text-admin-primary ml-2",

}


const Sidebar = () => {
    const router = useRouter();
    const path = router.pathname


    const handleRouting = (route: string) => {
        if (route?.length === 0)
            return;
        router.push(route)
    }

    return (
        <div className={'h-screen  w-[119px] lg:w-[257px] border border-r bg-white'} >
            <div className={'flex justify-center items-center h-[75px] z-[500]'}>
                <span className="lg:hidden"><IcarusSvgLogo /></span>
                <span className="hidden  lg:block"><IcarusFullLogo /> </span>
            </div>
            <div className={clsx(
                'flex flex-col space-y-4 pt-[65.9px]',
                "w-full items-center lg:items-start px-3 "
            )}>

                <MenuItem 
                    title="대시보드"
                    selected={path.includes(allRoutes.dashboard)}
                    icon={<Icon1 isSelected={path?.includes(allRoutes.dashboard)}/>}
                    onClick={() =>  handleRouting(allRoutes.dashboard)}
                />

                <MenuItem 
                    title="회원관리"
                    selected={path?.includes(allRoutes.memberList)}
                    icon={<Icon2 isSelected={path?.includes(allRoutes.memberList)}/>}
                    subMenus={[
                        {
                            title:"회원목록조회",
                            href:allRoutes.memberList
                        },
                        {
                            title:"탈퇴회원조회",
                        },
                        {
                            title:"블랙리스트회원조회",
                        }
                    ]}
                />

                <MenuItem 
                    title="광고관리"
                    selected={path.includes(allRoutes.advertisement)}
                    icon={<Icon3 isSelected={path?.includes(allRoutes.advertisement)}/>}
                    // onClick={() => handleRouting(allRoutes.advertisement)} 
                    subMenus={[
                        {
                            title:"광고목록조회",
                            href:allRoutes.advertisement
                        },
                        {
                            title:"광고신청목록조회",
                        },
                    ]}
                />
                
                <MenuItem 
                    title="통계관리"
                    selected={path?.includes(allRoutes.manageStat)}
                    icon={<Icon4 isSelected={path?.includes(allRoutes.manageStat)}/>}
                    onClick={() => handleRouting(allRoutes.manageStat)}
                    subMenus={[
                        {
                            title:"광고인증사진내역",
                        },
                        {
                            title:"지급목록조회",
                        }
                    ]}
                />

                <MenuItem 
                    title="출금내역관리"
                    selected={path.includes(allRoutes.withdrawalManagement)}
                    icon={<Icon5 isSelected={path.includes(allRoutes.withdrawalManagement)}/>}
                    onClick={() =>  handleRouting(`${allRoutes.withdrawalManagement}/cargo-owner-photo-history`)}
                    subMenus={[
                        {
                            title:"광고인증사진내역",
                            href:`${allRoutes.withdrawalManagement}/cargo-owner-photo-history`
                        },
                        {
                            title:"지급목록조회",
                        }
                    ]}
                />

                <MenuItem 
                    title="게시물관리"
                    selected={path.includes(allRoutes.postManagement)}
                    icon={<Icon6 isSelected={path.includes(allRoutes.postManagement)}/>}
                    onClick={() => handleRouting(`${allRoutes.postManagement}/inquiry`)}
                    subMenus={[
                        {
                            title:"FAQ관리",
                            href: "/admin/post-management/faq"
                        },
                        {
                            title:"1:1문의내역조회",
                            href: "/admin/post-management/inquiry"
                        },
                        {
                            title:"공지사항관리",
                            href: "/admin/post-management/notice"
                        },
                        {
                            title:"가이드관리",
                        }
                    ]}
                />

                <MenuItem 
                    title="설정"
                    selected={path.includes(allRoutes.settings)}
                    icon={<Icon7 isSelected={path.includes(allRoutes.settings)}/>}
                    // onClick={() => handleRouting(allRoutes.settings)}
                    subMenus={[
                        {
                            title:"관리자계정관리",
                        },
                        {
                            title:"내정보관리",
                            href:allRoutes.settings
                        }
                    ]}
                />
            </div>
        </div>
    );
};

export default Sidebar;