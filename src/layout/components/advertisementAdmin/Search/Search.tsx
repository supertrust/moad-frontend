import { SearchIcon } from "@src/components/icons/admin/advertisement";
import clsx from "clsx";
import React from 'react';
import styles from "./styles.module.scss";

const Search = ({ className = "", inputClass = "", iconClass = "", placeholder = "검색어를 입력해주세요." }: {
    className?: string, inputClass?: string, iconClass?: string,
    placeholder?: string
}) => {


    return (
        <div style={{ display: "flex", borderRadius: "8px" }} className={className}>
            <input className={clsx(styles['search'], inputClass)} placeholder={placeholder}>
            </input>
            <div className={clsx(styles['search-icon'], iconClass)}>
                <SearchIcon/>
            </div>
        </div>

    );
};

export default Search;