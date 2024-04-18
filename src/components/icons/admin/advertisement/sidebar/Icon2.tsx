import { IconType } from "@src/types/icon";
import React from 'react';

const Icon2 = ({ isSelected = false} : IconType) => {
    const background = isSelected ? "#EFF4FD" : "white";
    const color = isSelected ? "var(--primary-color)" : "#9CA3AF"
    return (
        <svg width="50" height="32" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="32" rx="8" fill={background}/>
            <path d="M17.499 22.1319C17.499 19.7414 18.8423 17.8032 20.499 17.8032H23.499C25.1558 17.8032 26.499 19.7414 26.499 22.1319" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M23.8552 10.637C24.8803 11.6621 24.8803 13.3242 23.8552 14.3493C22.8301 15.3745 21.168 15.3745 20.1429 14.3493C19.1177 13.3242 19.1177 11.6621 20.1429 10.637C21.168 9.61188 22.8301 9.61188 23.8552 10.637" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M28.001 17.1074H30.251C31.4937 17.1074 32.501 18.4779 32.501 20.1689" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M30.4498 11.1673C31.1821 11.8996 31.1821 13.0868 30.4498 13.819C29.7176 14.5512 28.5304 14.5512 27.7982 13.819C27.066 13.0868 27.066 11.8996 27.7982 11.1673C28.5304 10.4351 29.7176 10.4351 30.4498 11.1673" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
};

export default Icon2;