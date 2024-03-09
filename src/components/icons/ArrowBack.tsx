import clsx from "clsx";
import React from 'react';

const ArrowBack = ({
    handleAction,
    className="",
    width = 24 ,
    height = 24,
    background = '#2C324C'
} : {
    handleAction : (()=>void) | ((e: any) => void),
    className?: string,
    height? : number,
    width?: number,
    background?: string
}) => {
    return (
        <svg onClick = {handleAction} className={clsx('cursor-pointer',className)} width={width} height={height} viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.3725 2.98493C16.8825 2.49493 16.0925 2.49493 15.6025 2.98493L7.2925 11.2949C6.9025 11.6849 6.9025 12.3149 7.2925 12.7049L15.6025 21.0149C16.0925 21.5049 16.8825 21.5049 17.3725 21.0149C17.8625 20.5249 17.8625 19.7349 17.3725 19.2449L10.1325 11.9949L17.3825 4.74493C17.8625 4.26493 17.8625 3.46493 17.3725 2.98493Z" fill={background}/>
        </svg>

    );
};

export default ArrowBack;
