import React, { useCallback, useMemo, useState } from 'react'
import { AdvancedSearch, DataFilter } from './components'
import { Button, Checkbox, Pagination, Table } from 'antd';
import { useCompanyAdList } from '@src/apis/admin/advertisement';
import { GetCompanyAdListType, ICompanyAdList } from '@src/types/admin/advertisment';
import { ColumnsType } from 'antd/es/table';


function AdminPostList() {

    const [filters, setFilters] = useState<GetCompanyAdListType>({
        page: 1,
        adPeriod: '',
        adApplication: '',
        adSearchBy: 'ad_name',
        adStatus: [],
        adType: []
    });

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>();
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const columns: ColumnsType<any> = [
        {
            title: 'No',
            dataIndex: 'no',
            width: 45,
            className: "text-center",
            render: (value, record, index) => {
                return index + 1
            }
        },
        {
            title: '유형',
            dataIndex: 'type',
            width: 100,
            className: "text-center",
        },
        {
            title: '답변상태',
            dataIndex: 'status',
            width: 100,
            className: "text-center",
            render: (value) => {
                return (
                    <span className={`bg-admin-${value}-bg text-admin-${value} text-sm px-2 py-1 rounded`}>
                        답변대기
                    </span>
                )
            },
        },
        {
            title: '문의작성자',
            dataIndex: 'author',
            width: 100,
            className: "text-center",
            render: (value) => {
                return <span className='underline'>{value}</span>
            },
        },
        {
            title: '문의내용',
            dataIndex: 'content',
            className: 'text-left',
            width: 450,
            render: (value) => {
                return <span className='underline'>{value}</span>
            },
        },
        {
            title: '답변',
            dataIndex: 'answer',
            width: 350,
            className: 'text-left',
            render: (value) => {
                return <span className='underline'>{value}</span>
            },
        },
        {
            title: '답변작성자',
            dataIndex: 'answerer',
            width: 150,
            className: 'text-center',
        },
        {
            title: '문의 등록일시',
            dataIndex: 'date_inquiry',
            width: 150,
            className: 'text-center',
        },
        {
            title: '답변 등록일시',
            dataIndex: 'reply_date',
            width: 150,
            className: 'text-center',
        }
    ];

    const sumWidth = useCallback(() => {
        return columns.reduce((totalWidth, column) => totalWidth + (Number(column.width) || 0), 0);
    }, []);
    
    let postList:any[] = [];
    for (let index = 0; index < 40; index++) {
        postList.push({
            id: index,
            type: '결제 및 환불',
            status: 'success',
            author: "머스트핀테크",
            content: "2023.05.24일에 신청한 광고신청 취소하고 빠른시일 내에 환불받 ...",
            answer: "-",
            answerer: "-",
            date_inquiry :"2023.07.01 09:00:00",
            reply_date: "2023.07.01 09:00:00",
        });
    }

    return (
        <div className='m-4'>
            <AdvancedSearch
                className='mb-16'
                value={filters}
                onSearch={setFilters}
            />
            <DataFilter className='pb-3 border-b border-b-admin-stroke mb-2 ' />
            <div className='flex flex-row justify-end mb-3 items-center'>
                <div className='flex flex-row text-admin-sub mr-2'>
                    <span>선택</span>
                    <span className='text-admin-primary mx-1'>{selectedRowKeys?.length || 0} </span>
                    <span>개 </span>
                </div>
                <Button
                    className='bg-admin-button-1 text-admin-gray-2 font-medium text-base'
                    size='large'
                // onClick={() => handleSearch()}
                >
                    게시글 삭제
                </Button>
            </div>
            <div>
                <div>
                    <Table
                        pagination={false}
                        scroll={{ x: sumWidth() + 50 }}
                        rowKey={(row) => row.id}
                        rowSelection={{
                            selectedRowKeys,
                            onChange: onSelectChange,
                        }}
                        columns={columns}
                        dataSource={postList}
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
                                            }}
                                        />
                                    );
                                }
                            }
                        }}
                        className='border border-admin-stroke'
                    />
                </div>
            </div>
            <div className='flex flex-row mt-5 justify-center'>
                <Pagination
                    className='admin-members-inquiry-pagination'
                    current={1}
                    total={50}
                />
            </div>
        </div>
    )
}

export default AdminPostList