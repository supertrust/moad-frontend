import { DropdownIcon } from "@src/components/icons/admin/advertisement";
import { AlignType } from "@src/types/global";
import { Pagination, Select, SelectProps, Table } from "antd";
import Link from "next/link";
import React, { useCallback, useMemo, useState } from 'react';
import styles from "./styles.module.scss";
import { FilterAndSearchSection } from "./components";

const colGeneral={};

const AdminCargoOwnerPhotoHistory = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const cargoOwnerPhotoHistories =  Array(20).fill({ no: 1, advertisement_name : "이카루스 서비스 오픈 출시 기념",sector : "온라인투자연계금융업",
        company_name : "머스트핀테크",
        advertisement_period : "2023.07.12 ~ 2023.11.11", vehicle_count : "50",vehicle_count_of_photo : "40"});
    const handleFieldChange = (value: string | string[]) => {
        
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
            label: '광고명순',
        },
        {
            value: '2',
            label: '회사명순',
        },
        {
            value: '3',
            label: '광고기간순',
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
                title: "광고명",
                dataIndex: "advertisement_name",
                width: 340,
                ...colGeneral,
                align : "left" as AlignType,
                render: (text, record, index) => {
                    return (
                        <div className={'pl-4'}>
                            <Link
                                className="underline text-[#1D2025]"
                                href={`/admin/member-detail/${record?.user_id}`}
                            >
                                {text}
                            </Link>
                        </div>
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
                title: "진행중인광고",
                dataIndex: "advertisement_period",
                width: 205,
                ...colGeneral,
            },
            {
                title: "운행차량수",
                dataIndex: "vehicle_count",
                width: 120,
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
                title: "사진인증완료차량수",
                dataIndex: "vehicle_count_of_photo",
                width: 140,
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
            }

        ],
        []
    );

    const sumWidth = useCallback(() => {
        return columns.reduce(
            (totalWidth, column) => totalWidth + (column.width || 0),
            0
        );
    }, []);

    return (
        <div className={'flex flex-col mx-[24px] my-[30px]'}>
   <FilterAndSearchSection/>
            <div className={"flex items-center justify-between mt-[64px] mb-3"}>
                <div className={"flex items-center space-x-4"}>
                    <span className={styles["title"]}>광고인증사진목록</span>
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
                    scroll={{ x: sumWidth()  }}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={cargoOwnerPhotoHistories}
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



            {cargoOwnerPhotoHistories?.length>0 && (
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

export default AdminCargoOwnerPhotoHistory;