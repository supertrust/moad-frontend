import { Checkbox, Select, SelectProps } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import clsx from "clsx";
import React, { useState } from 'react';
import Search from "../../../../../../layout/components/advertisementAdmin/Search/Search";
import DropdownIcon from "../../../../../icons/admin/advertisement/dropdownIcon";
import styles from "./styles.module.scss";

const memberStatusFilter = [
    {
        value: '1',
        label: '전체',
    },
    {
        value: '2',
        label: '유',
    },
    {
        value: '3',
        label: '무',
    }
]

const FilterAndSearchSection = () => {

    const [filterData, setFilterData] = useState({
        day: "",
        field: ""
    })

    const onChange = (e: CheckboxChangeEvent) => {
    };

    const fieldOptions: SelectProps['options'] = [
        {
            value: '1',
            label: '아이디',
        },
        {
            value: '2',
            label: '업종',
        },
        {
            value: '3',
            label: '회사명',
        }
    ];

    const handleFieldChange = (value: string | string[]) => {
    };


    return (
        <div>
            <span className={styles['title']}>
                통계목록조회
            </span>
            <div className={styles['filter-body']}>
                <div className={clsx(styles['border-top'], "flex items-center")}>
                    <div className={styles['filter-label']}>
                        <span className={styles['filter-key']}>검색</span>
                    </div>
                    <div className={'flex w-[100%] flex-1 px-1'}>


                        <div className={'flex-1 flex space-x-2'}>
                            <Select
                                popupClassName={"admin-advertisement-select"}
                                size={"large"}
                                placeholder={<span className={styles['dropdown-text']}>전체 검색</span>}
                                onChange={handleFieldChange}
                                style={{ width: 200 }}
                                suffixIcon={<div className={'pr-1'}><DropdownIcon/></div>}
                                options={fieldOptions}
                            />

                            <Search className={'flex-1'} inputClass={`flex-1 bg-white ${styles['search-border-color']}`}
                                    iconClass={`bg-white ${styles['search-icon-border-color']}`}/>

                        </div>

                    </div>
                </div>
                <div className={clsx(styles['border-top'], 'flex items-center')}>
                    <div className={styles['filter-label']}>
                        <span className={styles['filter-key']}>진행중인광고유무</span>
                    </div>
                    <div className={'flex space-x-4 pl-5'}>
                        {
                            memberStatusFilter.map((obj, key) => {
                                return <Checkbox className={'text-[16px]'} key={key} onChange={onChange}>{obj.label}</Checkbox>;
                            })
                        }
                    </div>
                </div>


            </div>

            <div className={'flex items-center justify-center space-x-2 pt-6'}>
                <div className={styles['reset-button']}>
                    <span>
                        초기화
                    </span>
                </div>
                <div className={styles['search-button']}>
                    <span>
                        검색
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FilterAndSearchSection;


