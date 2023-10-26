import { SearchIcon } from "@src/components/icons/admin/advertisement";
import React from 'react';
import styles from "./styles.module.scss";

const Search = () => {


    return (
        <div style={{display : "flex", borderRadius : "8px"}}>
            <input className={styles['search']} placeholder={"검색어를 입력해주세요."}>
            </input>
            <div className={styles['search-icon']}>
                <SearchIcon/>
            </div>
        </div>

    );
};

export default Search;