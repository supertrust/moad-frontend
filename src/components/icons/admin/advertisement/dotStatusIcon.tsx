import React from 'react';

const DotStatusIcon = ({fill="#5991FF"} : {fill?: string}) => {
    return (
        <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" width="6" height="6" rx="2" fill={fill}/>
        </svg>
    );
};

export default DotStatusIcon;