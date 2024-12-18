import React from 'react';

const ArrowIcon = ( { rotation =0} : {rotation?: number}) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.6s ease' }}
        >
            <path
                d="M8.1249 15.0005L12.0049 11.1205L15.8849 15.0005C16.2749 15.3905 16.9049 15.3905 17.2949 15.0005C17.6849 14.6105 17.6849 13.9805 17.2949 13.5905L12.7049 9.00047C12.3149 8.61047 11.6849 8.61047 11.2949 9.00047L6.7049 13.5905C6.3149 13.9805 6.3149 14.6105 6.7049 15.0005C7.0949 15.3805 7.7349 15.3905 8.1249 15.0005Z"
                fill="#99A0AE"
            />
        </svg>

    );
};

export default ArrowIcon;