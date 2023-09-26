import React from 'react';

const NextIcon = ({ className="",width ="20",height ="21"} : {className? : string,
width? : string | number,height? : string | number}) => {
    return (
        <svg width={width} height={height} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"
        className={className}>
            <path d="M6.14055 18.0124C6.54889 18.4207 7.20722 18.4207 7.61555 18.0124L14.5406 11.0874C14.8656 10.7624 14.8656 10.2374 14.5406 9.9124L7.61555 2.9874C7.20722 2.57907 6.54889 2.57907 6.14055 2.9874C5.73222 3.39574 5.73222 4.05407 6.14055 4.4624L12.1739 10.5041L6.13222 16.5457C5.73222 16.9457 5.73222 17.6124 6.14055 18.0124Z" fill="#2C324C"/>
        </svg>
    );
};

export default NextIcon;