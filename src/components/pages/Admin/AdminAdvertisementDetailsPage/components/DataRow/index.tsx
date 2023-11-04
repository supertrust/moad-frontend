

import React from 'react';
import styles from "../../styles.module.scss";
import { clsx } from 'clsx';

const DataRow = ({ keyValue, children, borderBottom = true, className = '' }: {
    keyValue: string, className?: string,
    borderBottom?: boolean,
    children: React.ReactNode
}) => {
    return (
        <div className={clsx("flex items-center", borderBottom && styles['border-bottom'])}>
            <div className={clsx(styles['key-field'], className)}>
                <span>{keyValue}</span>
            </div>
            <div className="px-1 flex-1">{children}</div>
        </div>
    );
};

export default DataRow