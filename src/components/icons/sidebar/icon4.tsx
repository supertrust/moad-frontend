import { getSidebarIconColor } from "@src/components/icons/sidebar/icon1";
import React from 'react';

const Icon4 = ({ selected = false }) => {
    return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.93384 8.5H16.9338V10.5H18.9338V4.5C18.9338 3.4 18.0338 2.5 16.9338 2.5H15.9338V0.5H13.9338V2.5H5.93384V0.5H3.93384V2.5H2.93384C1.82384 2.5 0.943838 3.4 0.943838 4.5L0.933838 18.5C0.933838 19.6 1.82384 20.5 2.93384 20.5H9.93384V18.5H2.93384V8.5ZM2.93384 4.5H16.9338V6.5H2.93384V4.5ZM20.7738 14.78L20.0638 15.49L17.9438 13.37L18.6538 12.66C19.0438 12.27 19.6738 12.27 20.0638 12.66L20.7738 13.37C21.1638 13.76 21.1638 14.39 20.7738 14.78ZM17.2338 14.08L19.3538 16.2L14.0538 21.5H11.9338V19.38L17.2338 14.08Z" fill={getSidebarIconColor(selected)}/>
        </svg>

    );
};

export default Icon4;