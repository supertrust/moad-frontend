import { IconType } from "@src/types/icon";
import React from 'react';

const Icon1 = ({ isSelected = false} : IconType) => {
    const background = isSelected ? "#EFF4FD" : "white";
    const color = isSelected ? "var(--primary-color)" : "#9CA3AF"
    return (
            <svg width="50" height="32" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="50" height="32" rx="8" fill={background}/>
                <path d="M18.125 14.2812V23.5C18.125 23.6658 18.1908 23.8247 18.3081 23.9419C18.4253 24.0592 18.5842 24.125 18.75 24.125H22.5V18.8125C22.5 18.5639 22.5988 18.3254 22.7746 18.1496C22.9504 17.9738 23.1889 17.875 23.4375 17.875H26.5625C26.8111 17.875 27.0496 17.9738 27.2254 18.1496C27.4012 18.3254 27.5 18.5639 27.5 18.8125V24.125H31.25C31.4158 24.125 31.5747 24.0592 31.6919 23.9419C31.8092 23.8247 31.875 23.6658 31.875 23.5V14.2812" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M33.75 16L25.4254 8.0313C25.2301 7.82505 24.7734 7.82271 24.5746 8.0313L16.25 16M30.625 12.9922V8.50005H28.75V11.1954"  stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
    );
};

export default Icon1;