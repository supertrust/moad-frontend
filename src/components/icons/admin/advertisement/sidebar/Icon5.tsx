import { IconType } from "@src/types/icon";
import React from 'react';

const Icon5 = ({ isSelected = false} : IconType) => {
    const background = isSelected ? "#EFF4FD" : "white";
    const color = isSelected ? "var(--primary-color)" : "#9CA3AF"
    return (
        <svg width="50" height="32" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="32" rx="8" fill={background}/>
            <path d="M30.8332 16C30.8332 16.221 30.7454 16.433 30.5891 16.5892C30.4328 16.7455 30.2209 16.8333 29.9998 16.8333C29.7788 16.8333 29.5669 16.7455 29.4106 16.5892C29.2543 16.433 29.1665 16.221 29.1665 16C29.1665 15.779 29.2543 15.567 29.4106 15.4107C29.5669 15.2545 29.7788 15.1667 29.9998 15.1667C30.2209 15.1667 30.4328 15.2545 30.5891 15.4107C30.7454 15.567 30.8332 15.779 30.8332 16Z" fill="#9CA3AF"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.2865 8.70833H25.8798C27.4115 8.70833 28.6248 8.70833 29.574 8.83583C30.5507 8.9675 31.3415 9.24416 31.9657 9.86749C32.7357 10.6383 32.9815 11.67 33.0707 13.0092C33.5515 13.22 33.9148 13.6675 33.954 14.2342C33.9582 14.285 33.9582 14.3392 33.9582 14.3892V17.6108C33.9582 17.6608 33.9582 17.715 33.9548 17.765C33.9148 18.3317 33.5515 18.78 33.0707 18.9917C32.9815 20.33 32.7357 21.3617 31.9657 22.1325C31.3415 22.7558 30.5507 23.0325 29.574 23.1642C28.624 23.2917 27.4115 23.2917 25.8798 23.2917H23.2865C21.7548 23.2917 20.5415 23.2917 19.5923 23.1642C18.6157 23.0325 17.8248 22.7558 17.2007 22.1325C16.5773 21.5083 16.3007 20.7175 16.169 19.7408C16.0415 18.7908 16.0415 17.5783 16.0415 16.0467V15.9533C16.0415 14.4217 16.0415 13.2083 16.169 12.2592C16.3007 11.2825 16.5773 10.4917 17.2007 9.86749C17.8248 9.24416 18.6157 8.9675 19.5923 8.83583C20.5423 8.70833 21.7548 8.70833 23.2865 8.70833ZM31.8065 19.125H30.1915C28.404 19.125 26.874 17.7683 26.874 16C26.874 14.2317 28.404 12.875 30.1907 12.875H31.8057C31.7107 11.7575 31.4965 11.1667 31.0807 10.7517C30.7282 10.3992 30.2448 10.1875 29.4065 10.075C28.5507 9.95999 27.4215 9.95833 25.8323 9.95833H23.3323C21.7432 9.95833 20.6148 9.95999 19.7573 10.075C18.9198 10.1875 18.4365 10.3992 18.084 10.7517C17.7315 11.1042 17.5198 11.5875 17.4073 12.4258C17.2923 13.2825 17.2907 14.4108 17.2907 16C17.2907 17.5892 17.2923 18.7175 17.4073 19.575C17.5198 20.4125 17.7315 20.8958 18.084 21.2483C18.4365 21.6008 18.9198 21.8125 19.7582 21.925C20.6148 22.04 21.7432 22.0417 23.3323 22.0417H25.8323C27.4215 22.0417 28.5507 22.04 29.4073 21.925C30.2448 21.8125 30.7282 21.6008 31.0807 21.2483C31.4965 20.8333 31.7115 20.2433 31.8065 19.125ZM19.3748 12.6667C19.3748 12.5009 19.4407 12.3419 19.5579 12.2247C19.6751 12.1075 19.8341 12.0417 19.9998 12.0417H23.3332C23.4989 12.0417 23.6579 12.1075 23.7751 12.2247C23.8923 12.3419 23.9582 12.5009 23.9582 12.6667C23.9582 12.8324 23.8923 12.9914 23.7751 13.1086C23.6579 13.2258 23.4989 13.2917 23.3332 13.2917H19.9998C19.8341 13.2917 19.6751 13.2258 19.5579 13.1086C19.4407 12.9914 19.3748 12.8324 19.3748 12.6667ZM32.4365 14.125H30.1915C29.0048 14.125 28.124 15.0075 28.124 16C28.124 16.9925 29.0048 17.875 30.1907 17.875H32.4557C32.6273 17.8642 32.7015 17.7483 32.7073 17.6783V14.3217C32.7015 14.2517 32.6273 14.1358 32.4557 14.1258H32.4357L32.4365 14.125Z" fill={color}/>
        </svg>

    );
};

export default Icon5;