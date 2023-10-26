import {
    IcarusSvgLogo,
    Icon1, Icon2, Icon3, Icon4, Icon5, Icon6,
    Icon7
} from "@src/components/icons/admin/advertisement/sidebar";
import React, { useState } from 'react';

const Sidebar = () => {
    const [tab,setTab] = useState<number>(1);
    return (
        <div className={'h-screen h-[100%] w-[119px] border border-r'} style={{background : "white"}}>
            <div className={'flex justify-center items-center h-[75px]'}>
                <IcarusSvgLogo/>
            </div>
            <div className={'flex flex-col space-y-4 w-full items-center pt-[65.9px]'}>
                <div className={'cursor-pointer'} onClick = {()=>{setTab(1)}}><Icon1 isSelected={tab===1}/></div>
                <div className={'cursor-pointer'} onClick = {()=>{setTab(2)}}><Icon2 isSelected={tab===2}/></div>
                <div className={'cursor-pointer'} onClick = {()=>{setTab(3)}}><Icon3 isSelected={tab===3}/></div>
                <div className={'cursor-pointer'} onClick = {()=>{setTab(4)}}><Icon4 isSelected={tab===4}/></div>
                <div className={'cursor-pointer'} onClick = {()=>{setTab(5)}}><Icon5 isSelected={tab===5}/></div>
                <div className={'cursor-pointer'} onClick = {()=>{setTab(6)}}><Icon6 isSelected={tab===6}/></div>
                <div className={'cursor-pointer'} onClick = {()=>{setTab(7)}}><Icon7 isSelected={tab===7}/></div>
            </div>
        </div>
    );
};

export default Sidebar;