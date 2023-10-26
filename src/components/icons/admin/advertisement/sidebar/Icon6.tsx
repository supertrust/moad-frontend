import { IconType } from "@src/types/icon";
import React from 'react';

const Icon6 = ({ isSelected = false} : IconType) => {
    const background = isSelected ? "#EFF4FD" : "white";
    const color = isSelected ? "#3772FF" : "#9CA3AF"
    return (
        <svg width="50" height="32" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="32" rx="8" fill={background}/>
            <g clip-path="url(#clip0_1802_122679)">
                <path d="M17.5002 11V24.3333H32.5002V26H17.5002C17.0581 26 16.6342 25.8244 16.3217 25.5119C16.0091 25.1993 15.8335 24.7754 15.8335 24.3333V11H17.5002ZM28.3335 13.5H32.9168L28.3335 8.91667V13.5ZM20.8335 7.66667H29.1668L34.1668 12.6667V21C34.1668 21.442 33.9912 21.866 33.6787 22.1785C33.3661 22.4911 32.9422 22.6667 32.5002 22.6667H20.8335C20.3915 22.6667 19.9675 22.4911 19.655 22.1785C19.3424 21.866 19.1668 21.442 19.1668 21V9.33334C19.1668 8.89131 19.3424 8.46739 19.655 8.15483C19.9675 7.84227 20.3915 7.66667 20.8335 7.66667ZM20.8335 9.33334V21H32.5002V15.1667H26.6668V9.33334H20.8335Z" fill={color}/>
            </g>
            <defs>
                <clipPath id="clip0_1802_122679">
                    <rect width="20" height="20" fill={background} transform="translate(15 6)"/>
                </clipPath>
            </defs>
        </svg>

    );
};

export default Icon6;