import { IconType } from "@src/types/icon";
import React from 'react';

const Icon3 = ({ isSelected = false} : IconType) => {
    const background = isSelected ? "#EFF4FD" : "white";
    const color = isSelected ? "#3772FF" : "#9CA3AF"
    return (
        <svg width="50" height="32" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="32" rx="8" fill={background}/>
            <path d="M21.6665 19.3333H31.6665V11H21.6665V19.3333ZM21.6665 21C21.2082 21 20.8157 20.8367 20.489 20.51C20.1623 20.1833 19.9993 19.7911 19.9998 19.3333V9.33332C19.9998 8.87499 20.1632 8.48249 20.4898 8.15582C20.8165 7.82916 21.2087 7.6661 21.6665 7.66666H31.6665C32.1248 7.66666 32.5173 7.82999 32.844 8.15666C33.1707 8.48332 33.3337 8.87555 33.3332 9.33332V19.3333C33.3332 19.7917 33.1698 20.1842 32.8432 20.5108C32.5165 20.8375 32.1243 21.0005 31.6665 21H21.6665ZM18.3332 24.3333C17.8748 24.3333 17.4823 24.17 17.1557 23.8433C16.829 23.5167 16.6659 23.1244 16.6665 22.6667V11H18.3332V22.6667H29.9998V24.3333H18.3332Z" fill={color}/>
        </svg>

    );
};

export default Icon3;