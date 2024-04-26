import { getSidebarIconColor } from "@src/components/icons/sidebar/icon1";
import React from 'react';

const Icon2 = ({ selected = false }) => {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM16 16H2V2H16V16ZM4 7H6V14H4V7ZM8 4H10V14H8V4ZM12 10H14V14H12V10Z" fill={getSidebarIconColor(selected)}/>
        </svg>
    );
};

export default Icon2;