import { Checkbox, DatePicker, Select, SelectProps } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import clsx from "clsx";
import React, { useState } from 'react';
import Search from "../../../../../../layout/components/advertisementAdmin/Search/Search";
import DropdownIcon from "../../../../../icons/admin/advertisement/dropdownIcon";
import DateIcon from "../../../../../icons/DateIcon";
import styles from "./styles.module.scss";

interface RadioButtonType {
    label: string,
    value: string,
    selectedValue: string,
    onChange: (value: string) => void
}

const RadioButton = ({ label, value, selectedValue, onChange }: RadioButtonType) => {

    return <div className={clsx(styles['radio'], value === selectedValue && styles['active'])}
                onClick={() => onChange(value)}>
            <span className={styles['radio-label']}>
                {label}
            </span>
    </div>
}

const DateInput = () => {
    return <div>

    </div>
}


interface DayFilterType {
    value: string,
    label: string
}

const dayFilter: DayFilterType[] = [

    {
        value: "today",
        label: "전체"
    },
    {
        value: "tomorrow",
        label: "오늘"
    },
    {
        value: "1 week",
        label: "1주"
    },
    {
        value: "1 month",
        label: "1개월"
    },
    {
        value: "3 month",
        label: "3개월"
    },
    {
        value: "6 month",
        label: "6개월"
    }

]

const memberStatusFilter = [
    {
        label : "전체",
        value : "전체"
    },
    {
        label : "정상",
        value : "정상"
    },
    {
        label : "휴면상태",
        value : "휴면상태"
    },
    {
        label : "블랙리스트",
        value : "블랙리스트"
    }
]

const FilterAndSearchSection = () => {

    const [filterData, setFilterData] = useState({
        day: "",
        field : ""
    })

    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const fieldOptions : SelectProps['options'] = [
        {
            value: '1',
            label: '광고명',
        },
        {
            value: '2',
            label: '회사명',
        }
    ];

    const handleFieldChange = (value: string | string[]) => {
        console.log(`Selected: ${value}`);
    };





    return (
        <div>
            <span className={styles['title']}>
                광고인증사진관리
            </span>
            <div className={styles['filter-body']}>
                <div className={'flex items-center'}>
                    <div className={styles['filter-label']}>
                        <span className={styles['filter-key']}>광고기간</span>
                    </div>
                    <div className={'flex space-x-[2px] items-center'}>
                        {
                            dayFilter.map((obj, key) => {
                                return <RadioButton key={key} label={obj.label} value={obj.value}
                                                 selectedValue={filterData.day} onChange={(value) => setFilterData({
                                    ...filterData,
                                    day: value
                                })}/>
                            })
                        }

                    </div>
                    <div className={'flex-1 flex items-center px-1'}>
                        <div className={'flex-1'}>
                            <DatePicker suffixIcon={<DateIcon/>} popupClassName={"admin-advertisement-date-picker"} placeholder={"날짜선택"} className={styles['date-selector']} onChange={()=>{}} />
                        </div>
                        <div className={'px-2'}>
                            <span>
                            ~
                        </span>
                        </div>
                       <div className={'flex-1'}>
                           <DatePicker suffixIcon={<DateIcon/>} placeholder={"날짜선택"} className={clsx(styles['date-selector'])} popupClassName={"admin-advertisement-date-picker"} onChange={()=>{}} />
                       </div>
                    </div>
                </div>

                <div className={clsx(styles['border-top'],"flex items-center")}>
                    <div className={styles['filter-label']}>
                        <span className={styles['filter-key']}>검색</span>
                    </div>
                    <div className={'flex w-[100%] flex-1 px-1'}>


                        <div className={'flex-1 flex space-x-2'}>
                            <Select
                                popupClassName={"admin-advertisement-select"}
                                size={"large"}
                                placeholder={<span className={styles['dropdown-text']}>검색어 선택</span>}
                                onChange={handleFieldChange}
                                style={{ width: 200}}
                                suffixIcon={<div className={'pr-1'}><DropdownIcon/></div>}
                                options={fieldOptions}
                            />

                            <Search className={'flex-1'} inputClass={`flex-1 bg-white ${styles['search-border-color']}`}
                                    iconClass={`bg-white ${styles['search-icon-border-color']}`}/>

                        </div>

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


