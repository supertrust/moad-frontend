import React from 'react'
import { Pagination as AntdPaginatinon, PaginationProps } from 'antd';
import styles from "./styles.module.scss";
import clsx from 'clsx';


function Pagination({ className, ...rest }:  PaginationProps) {
  return (
    <AntdPaginatinon 
        {...rest}
        className={clsx(styles.adminPagination, className)}
    />
  )
}

export default Pagination