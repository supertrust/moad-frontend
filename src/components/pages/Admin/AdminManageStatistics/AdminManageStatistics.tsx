import { DropdownIcon } from "@src/components/icons/admin/advertisement";
import { FilterAndSearchSection } from "@src/components/pages/Admin/AdminManageStatistics/components";
import { formatNumberWithCommas } from "@src/utils/formatter";
import { Pagination, Select, SelectProps, Table } from "antd";
import clsx from "clsx";
import Link from "next/link";
import React, { useCallback, useMemo, useState } from 'react';
import styles from "./styles.module.scss";
export declare type AlignType = 'left' | 'center' | 'right';

const colGeneral = {
}

const AdminManageStatistics = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

   const manageStatisticsList =  Array(20).fill({ no: 1, employee_email : "mufincrew@mail.com",sector : "온라인투자연계금융업",
       company_name : "머스트핀테크",
       ad_in_progress : "유", no_of_vehicle : "230",ad_amount_monthly : "123,456,789", date_time_last_ad : "2023.07.01 09:00:00"});
    const handleFieldChange = (value: string | string[]) => {
        console.log(`Selected: ${value}`);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const fieldOptions: SelectProps['options'] = [
        {
            value: '1',
            label: '회사명순',
        },
        {
            value: '2',
            label: '운행차량수순',
        },
        {
            value: '3',
            label: '광고금액순',
        },
        {
            value: '4',
            label: '광고등록일시순',
        }
    ];


    const columns = useMemo(
        () => [
            {
                title: "No",
                dataIndex: "no",
                width: 45,
                ...colGeneral,
                render: (text, record, index) => {
                    return <>{index + 1}</>;
                },
            },
            {
                title: "아이디",
                dataIndex: "employee_email",
                width: 200,
                ...colGeneral,
                render: (text, record, index) => {
                    return (
                        <Link
                            className="underline text-[#1D2025]"
                            href={`/admin/member-detail/${record?.user_id}`}
                        >
                            {text}
                        </Link>
                    );
                },
            },
            {
                title: "업종",
                dataIndex: "sector",
                width: 180,
                ...colGeneral,
            },
            {
                title: "회사명",
                dataIndex: "company_name",
                width: 185,
                ...colGeneral,
                render: (text, record, index) => {
                    return (
                        <Link
                            className="underline text-[#1D2025]"
                            href={`/admin/member-detail/${record?.user_id}`}
                        >
                            {text}
                        </Link>
                    );
                },
            },
            {
                title: "진행중인광고",
                dataIndex: "ad_in_progress",
                width: 120,
                ...colGeneral,
            },
            {
                title: "운행차량수",
                dataIndex: "no_of_vehicle",
                width: 180,
                ...colGeneral,
                render: (text, record, index) => {
                    return (
                        <Link
                            className="underline text-[#1D2025]"
                            href={`/admin/member-detail/${record?.user_id}`}
                        >
                            {text}{"대"}
                        </Link>
                    );
                },
            },
            {
                title: "광고금액 (월)",
                dataIndex: "ad_amount_monthly",
                width: 205,
                align : "right" as AlignType,
                ...colGeneral,
                render: (text, record) => {
                    return (
                        <Link
                            className="underline text-[#1D2025]"
                            href={`/admin/member-detail/${record?.user_id}`}
                        >
                            {text}{"원"}
                        </Link>
                    );
                },
            },
            {
                title: "마지막광고등록일시",
                dataIndex: "date_time_last_ad",
                width: 176,
                ...colGeneral,
            },

        ],
        []
    );

    const sumWidth = useCallback(() => {
        return columns.reduce(
            (totalWidth, column) => totalWidth + (column.width || 0),
            0
        );
    }, []);



    const topValues = [
        {
            title : "총 차량수",
            value : 11390,
            suffix : "대"
        },
        {
            title : "운행차량",
            value : 5000,
            suffix : "대"
        },
        {
            title : "운행예정",
            value : 990,
            suffix : "대"
        },
        {
            title : "종료예정",
            value : 2450,
            suffix : "대"
        },
        {
            title : "종료",
            value : 2950,
            suffix : "대"
        },

    ]
    return (
        <div className={'flex flex-col mx-[24px]'}>
            <div className={styles['top-value-body']}>

                {
                    topValues.map((obj,key)=>{
                        return <>
                            <div key={key} className={clsx(styles['top-value'])}>
                                <div className={styles['tob-value-title']}>
                                <span>
                                    {obj.title}
                                </span>
                                </div>
                                <div className={styles['tob-value-number']}>
                                <span>
                                    {formatNumberWithCommas(obj.value)}
                                </span>
                                    <span>
                                    {obj.suffix}
                                </span>
                                </div>
                            </div>
                        </>
                    })
                }

            </div>

            <FilterAndSearchSection/>

            <div className={"flex items-center justify-between mt-[64px] mb-3"}>
                <div className={"flex items-center space-x-4"}>
                    <span className={styles["title"]}>통계목록</span>
                    <p className={styles["sub-title"]}>
                        전체 <span className={'underline'}>150</span> 명 (검색결과 총 <span className={'underline'}>0</span> 명)
                    </p>
                </div>
                <div className={"flex space-x-1"}>
                    <div>
                        <Select
                            popupClassName={"admin-advertisement-select"}
                            size={"large"}
                            // placeholder={<span className={styles['dropdown-text']}>가입일시순</span>}
                            onChange={handleFieldChange}
                            style={{ width: 160 }}
                            suffixIcon={
                                <div className={"pr-1"}>
                                    <DropdownIcon />
                                </div>
                            }
                            options={fieldOptions}
                            defaultValue={"1"}
                        />
                    </div>
                    <div className={styles["excel-button"]}>
                        <span>엑셀다운로드</span>
                    </div>
                </div>
            </div>

            <div>
                <Table
                    locale={{
                        emptyText: "조회 결과가 없습니다.",
                    }}
                    pagination={false}
                    scroll={{ x: sumWidth() + 50 }}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={manageStatisticsList}
                    components={{
                        header: {
                            cell: ({ style: cellStyle, ...cellProps }: any) => {
                                return (
                                    <th
                                        {...cellProps}
                                        style={{
                                            ...cellStyle,
                                            height: "45px",
                                            color: "#6b7280",
                                            padding: "0px",
                                            fontWeight: 500,
                                            background: "#f8faff",
                                            textAlign: "center",
                                        }}
                                    />
                                );
                            },
                        },
                        body: {
                            cell: ({ style: cellStyle, ...cellProps }: any) => {
                                return (
                                    <td
                                        {...cellProps}
                                        style={{
                                            textAlign: "center",
                                            ...cellStyle,
                                            height: "40px",
                                            padding: 0,
                                            lineHeight: "1.43",
                                            color: "#1d2025"
                                        }}
                                    />
                                );
                            },
                        },
                    }}
                />
            </div>



            {manageStatisticsList?.length>0 && (
                <div className={"flex justify-center py-[54px]"}>
                    <Pagination
                        className={"admin-members-inquiry-pagination"}
                        defaultCurrent={1}
                        total={10}
                    />
                </div>
            )}

        </div>
    );
};

export default AdminManageStatistics;