import { DropDownIcon, HumanLogo, LogoutIcon, NotificationIcon } from "@src/components/icons/admin/advertisement/header"
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import React from 'react';
import { Search } from "./Search";

const Header = () => {
    return (
        <div className={'w-full h-[64px] flex items-center justify-between px-6'} style={{ background : "white" }}>
                <Search/>
            <div className={'flex items-center space-x-2'}>
                <HumanLogo/>
                <Dropdown menu={{ items }} placement="bottom" arrow className={'pr-4'}>
                    <div  style={{display : "flex",gap : "10px",alignItems:"center" }}>
                        <span>김관리 님</span>
                        <DropDownIcon/>
                    </div >
                </Dropdown>
                <NotificationIcon/>
                <LogoutIcon/>
            </div>
        </div>
    );
};

export default Header;

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        ),
    }
];