import { IconType } from "@src/types/icon";
import React from 'react';

const Icon4 = ({ isSelected = false} : IconType) => {
    const background = isSelected ? "#EFF4FD" : "white";
    const color = isSelected ? "var(--primary-color)" : "#9CA3AF"
    return (
        <svg width="50" height="32" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="32" rx="8" fill={background}/>
            <path d="M30.8333 8.5H19.1667C18.25 8.5 17.5 9.25 17.5 10.1667V21.8333C17.5 22.75 18.25 23.5 19.1667 23.5H30.8333C31.75 23.5 32.5 22.75 32.5 21.8333V10.1667C32.5 9.25 31.75 8.5 30.8333 8.5ZM30.8333 21.8333H19.1667V10.1667H30.8333V21.8333ZM20.8333 14.3333H22.5V20.1667H20.8333V14.3333ZM24.1667 11.8333H25.8333V20.1667H24.1667V11.8333ZM27.5 16.8333H29.1667V20.1667H27.5V16.8333Z" fill={color}/>
        </svg>

    );
};

export default Icon4;