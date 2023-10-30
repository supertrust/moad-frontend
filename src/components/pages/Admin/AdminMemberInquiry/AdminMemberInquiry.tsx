import { DropdownIcon } from "@src/components/icons/admin/advertisement";
import FilterAndSearchSection
    from "@src/components/pages/Admin/AdminMemberInquiry/component/filterAndSearchSection/filterAndSearchSection";
import React, { useCallback, useState } from 'react';
import styles from "./styles.module.scss";
import { Button, ConfigProvider, Pagination, Select, SelectProps, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

type DataType = {
    key: number;
    no: number;
    email: string;
    sectors: string;
    company_name: string;
    company_phone: string;
    manager: string;
    contact_person: string;
    contact_person_no: string;
    contact_email: string;
    total_ad_no: string;
    dormant_state: string;
    registration_date: string;
};

const colGeneral = {}

const columns = [
    {
        title: 'No',
        dataIndex: 'no',
        width: 45,
        ...colGeneral
    },
    {
        title: '아이디',
        dataIndex: 'email',
        width: 200,
        ...colGeneral
    },
    {
        title: '업종',
        dataIndex: 'sectors',
        width: 180,
        ...colGeneral
    },
    {
        title: '회사명',
        dataIndex: 'company_name',
        width: 185,
        ...colGeneral
    },
    {
        title: '회사 전화번호',
        dataIndex: 'company_phone',
        width: 150,
        ...colGeneral
    },
    {
        title: '담당자',
        dataIndex: 'manager',
        width: 150,
        ...colGeneral
    },
    {
        title: '담당자 직위',
        dataIndex: 'contact_person',
        width: 150,
        ...colGeneral
    },
    {
        title: '담당자 휴대폰번호',
        dataIndex: 'contact_person_no',
        width: 150,
        ...colGeneral
    },
    {
        title: '담당자 이메일',
        dataIndex: 'contact_email',
        width: 200,
        ...colGeneral
    },
    {
        title: '총 광고건수',
        dataIndex: 'total_ad_no',
        width: 120,
        ...colGeneral
    },
    {
        title: '블랙리스트 및 휴면상태',
        dataIndex: 'dormant_state',
        width: 180,
        ...colGeneral
    },
    {
        title: '가입일시',
        dataIndex: 'registration_date',
        width: 176,
        ...colGeneral
    },
];

const data: DataType[] = [];
for (let i = 0; i < 20; i++) {
    data.push({
        key: i,
        no: i + 1,
        email: "mufincrew@mail.com",
        sectors: "온라인투자연계금융업",
        company_name: "머스트핀테크",
        company_phone: "02-123-4567",
        manager: "홍길동",
        contact_person: "사원",
        contact_person_no: "010-1234-5678",
        contact_email: "must@mufin.co.kr",
        total_ad_no: "20건",
        dormant_state: "정상",
        registration_date: "2023.07.01 09:00:00"
    });
}


const AdminMemberInquiry = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const sumWidth = useCallback(() => {
        return columns.reduce((totalWidth, column) => totalWidth + (column.width || 0), 0);
    }, []);


    const fieldOptions: SelectProps['options'] = [
        {
            value: '1',
            label: '가입일시순',
        },
        {
            value: '2',
            label: '회사명순',
        },
    ];

    const handleFieldChange = (value: string | string[]) => {
        console.log(`Selected: ${value}`);
    };


    console.log('sum', sumWidth())


    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
        <div className={styles['body']}>
            <FilterAndSearchSection/>


            <div className={'flex items-center justify-between mt-[64px]'}>
                <div className={'flex items-center space-x-4'}>
                    <span className={styles['title']}>
                        회원목록
                    </span>
                    <p className={styles['sub-title']}>
                        전체 <span>150</span> 명 (검색결과 총 <span>0</span> 명)
                    </p>
                </div>
                <div className={'flex space-x-1'}>
                    <div>
                        <Select
                            popupClassName={"admin-advertisement-select"}
                            size={"large"}
                            // placeholder={<span className={styles['dropdown-text']}>가입일시순</span>}
                            onChange={handleFieldChange}
                            style={{ width: 160 }}
                            suffixIcon={<div className={'pr-1'}><DropdownIcon/></div>}
                            options={fieldOptions}
                            defaultValue={"1"}

                        />
                    </div>
                    <div className={styles['excel-button']}>
                        <span>
                            엑셀다운로드
                        </span>
                    </div>
                </div>
            </div>

            <div>
                <Table
                    pagination={false} scroll={{ x: sumWidth() + 50 }}
                    rowSelection={rowSelection} columns={columns} dataSource={data}


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
                                            textAlign: "center"
                                        }}
                                    />
                                );
                            }
                        },
                        body: {

                            cell: ({ style: cellStyle, ...cellProps }: any) => {
                                return (
                                    <td
                                        {...cellProps}
                                        style={{
                                            ...cellStyle,
                                            height: "40px",
                                            padding: 0,
                                            textAlign: 'center'
                                        }}
                                    />
                                );
                            }
                        }
                    }}
                />
            </div>

            <div className={'flex justify-center py-[54px]'}>


                <Pagination className={'admin-members-inquiry-pagination'} defaultCurrent={1} total={50}/>

            </div>


        </div>
    );
};

export default AdminMemberInquiry;