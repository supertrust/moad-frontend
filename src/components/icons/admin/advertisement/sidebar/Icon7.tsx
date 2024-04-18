import { IconType } from "@src/types/icon";
import React from 'react';

const Icon7 = ({ isSelected = false} : IconType) => {
    const background = isSelected ? "#EFF4FD" : "white";
    const color = isSelected ? "var(--primary-color)" : "#9CA3AF"
    return (
        <svg width="50" height="32" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="32" rx="8" fill={background}/>
            <path d="M25 18.5C26.3807 18.5 27.5 17.3807 27.5 16C27.5 14.6193 26.3807 13.5 25 13.5C23.6193 13.5 22.5 14.6193 22.5 16C22.5 17.3807 23.6193 18.5 25 18.5Z" stroke="#9CA3AF" stroke-width="1.5"/>
            <path d="M26.4707 7.79333C26.1649 7.66666 25.7766 7.66666 24.9999 7.66666C24.2232 7.66666 23.8349 7.66666 23.5291 7.79333C23.3267 7.87709 23.1428 7.99991 22.988 8.15477C22.8331 8.30962 22.7103 8.49348 22.6266 8.69583C22.5499 8.88166 22.5191 9.09916 22.5074 9.415C22.5022 9.64332 22.4391 9.86658 22.3239 10.0638C22.2087 10.261 22.0453 10.4258 21.8491 10.5425C21.6498 10.6542 21.4254 10.7134 21.197 10.7146C20.9686 10.7157 20.7436 10.6588 20.5432 10.5492C20.2632 10.4008 20.0607 10.3192 19.8599 10.2925C19.4218 10.2349 18.9788 10.3536 18.6282 10.6225C18.3666 10.825 18.1716 11.1608 17.7832 11.8333C17.3949 12.5058 17.1999 12.8417 17.1574 13.1708C17.1287 13.3879 17.1432 13.6084 17.1998 13.8199C17.2564 14.0314 17.3541 14.2296 17.4874 14.4033C17.6107 14.5633 17.7832 14.6975 18.0507 14.8658C18.4449 15.1133 18.6982 15.535 18.6982 16C18.6982 16.465 18.4449 16.8867 18.0507 17.1333C17.7832 17.3025 17.6099 17.4367 17.4874 17.5967C17.3541 17.7704 17.2564 17.9686 17.1998 18.1801C17.1432 18.3916 17.1287 18.6121 17.1574 18.8292C17.2007 19.1575 17.3949 19.4942 17.7824 20.1667C18.1716 20.8392 18.3657 21.175 18.6282 21.3775C18.8019 21.5108 19.0002 21.6085 19.2116 21.6651C19.4231 21.7217 19.6437 21.7361 19.8607 21.7075C20.0607 21.6808 20.2632 21.5992 20.5432 21.4508C20.7436 21.3412 20.9686 21.2842 21.197 21.2854C21.4254 21.2866 21.6498 21.3458 21.8491 21.4575C22.2516 21.6908 22.4907 22.12 22.5074 22.585C22.5191 22.9017 22.5491 23.1183 22.6266 23.3042C22.7103 23.5065 22.8331 23.6904 22.988 23.8452C23.1428 24.0001 23.3267 24.1229 23.5291 24.2067C23.8349 24.3333 24.2232 24.3333 24.9999 24.3333C25.7766 24.3333 26.1649 24.3333 26.4707 24.2067C26.6731 24.1229 26.8569 24.0001 27.0118 23.8452C27.1666 23.6904 27.2895 23.5065 27.3732 23.3042C27.4499 23.1183 27.4807 22.9017 27.4924 22.585C27.5091 22.12 27.7482 21.69 28.1507 21.4575C28.35 21.3458 28.5744 21.2866 28.8028 21.2854C29.0312 21.2842 29.2562 21.3412 29.4566 21.4508C29.7366 21.5992 29.9391 21.6808 30.1391 21.7075C30.3561 21.7361 30.5767 21.7217 30.7881 21.6651C30.9996 21.6085 31.1979 21.5108 31.3716 21.3775C31.6341 21.1758 31.8282 20.8392 32.2166 20.1667C32.6049 19.4942 32.7999 19.1583 32.8424 18.8292C32.871 18.6121 32.8566 18.3916 32.8 18.1801C32.7434 17.9686 32.6456 17.7704 32.5124 17.5967C32.3891 17.4367 32.2166 17.3025 31.9491 17.1342C31.7538 17.0155 31.592 16.8492 31.4787 16.6508C31.3655 16.4524 31.3045 16.2284 31.3016 16C31.3016 15.535 31.5549 15.1133 31.9491 14.8667C32.2166 14.6975 32.3899 14.5633 32.5124 14.4033C32.6456 14.2296 32.7434 14.0314 32.8 13.8199C32.8566 13.6084 32.871 13.3879 32.8424 13.1708C32.7991 12.8425 32.6049 12.5058 32.2174 11.8333C31.8282 11.1608 31.6341 10.825 31.3716 10.6225C31.1979 10.4892 30.9996 10.3915 30.7881 10.3349C30.5767 10.2783 30.3561 10.2639 30.1391 10.2925C29.9391 10.3192 29.7366 10.4008 29.4557 10.5492C29.2554 10.6587 29.0306 10.7155 28.8024 10.7144C28.5741 10.7132 28.3499 10.6541 28.1507 10.5425C27.9544 10.4258 27.791 10.261 27.6759 10.0638C27.5607 9.86658 27.4976 9.64332 27.4924 9.415C27.4807 9.09833 27.4507 8.88166 27.3732 8.69583C27.2895 8.49348 27.1666 8.30962 27.0118 8.15477C26.8569 7.99991 26.6731 7.87709 26.4707 7.79333Z" stroke={color} stroke-width="1.5"/>
        </svg>

    );
};

export default Icon7;