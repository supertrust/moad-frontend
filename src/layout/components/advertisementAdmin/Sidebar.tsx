import {
    IcarusSvgLogo,
    Icon1, Icon2, Icon3, Icon4, Icon5, Icon6,
    Icon7
} from "@src/components/icons/admin/advertisement/sidebar";
import { useRouter } from "next/router";
import React, { useState } from 'react';

const allRoutes = {
    dashboard: "/admin/dashboard",
    memberList: "/admin/member-inquiry",
    advertisement: "/admin/advertisement-management",
    manageStat: "/admin/manage-statistics",
    postManagement: "/admin/post-management",
    withdrawalManagement: "/admin/withdrawal-management"
}


const Sidebar = () => {
    const router = useRouter();
    const path = router.pathname


    const handleRouting = (route) => {
        if (route?.length === 0)
            return;
        router.push(route)
    }

    return (
        <div className={'h-screen h-[100%] w-[119px] border border-r'} style={{ background: "white" }}>
            <div className={'flex justify-center items-center h-[75px]'}>
                <IcarusSvgLogo/>
            </div>
            <div className={'flex flex-col space-y-4 w-full items-center pt-[65.9px]'}>
                <div className={'cursor-pointer'} onClick={() => {
                    handleRouting(allRoutes.dashboard)
                }}><Icon1 isSelected={path?.includes(allRoutes.dashboard)}/></div>
                <div className={'cursor-pointer'} onClick={() => {
                    handleRouting(allRoutes.memberList)
                }}><Icon2 isSelected={path?.includes(allRoutes.memberList)}/></div>
                <div className={'cursor-pointer'} onClick={() => {
                    handleRouting(allRoutes.advertisement)
                }}><Icon3 isSelected={path?.includes(allRoutes.advertisement)}/></div>
                <div className={'cursor-pointer'} onClick={() => {
                    handleRouting(allRoutes.manageStat)
                }}><Icon4 isSelected={path?.includes(allRoutes.manageStat)}/></div>
                <div className={'cursor-pointer'} onClick={() => {
                    handleRouting(`${allRoutes.withdrawalManagement}/cargo-owner-photo-history`)
                }}><Icon5 isSelected={path.includes(allRoutes.withdrawalManagement)}/></div>
                <div className={'cursor-pointer'} onClick={() => {
                    handleRouting(`${allRoutes.postManagement}/inquiry`)
                }}><Icon6 isSelected={path.includes(allRoutes.postManagement)}/></div>
                <div className={'cursor-pointer'} onClick={() => {
                    handleRouting("")
                }}><Icon7 isSelected={path === ""}/></div>
            </div>
        </div>
    );
};

export default Sidebar;