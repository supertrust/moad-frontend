import React, { useCallback, useState } from 'react'
import { DataFilter } from './components'
import { Button, Pagination, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { GetPostType, IPost } from '@src/types/admin/posts';
import { useGetPosts } from '@src/apis/admin/post';
import { AdvancedSearch } from '../InquiryListPage/components';


function AdminAnnoucementListPage() {

    const [filters, setFilters] = useState<GetPostType>({ page: 1, type: 'notices' });

    const { data: postData, isLoading } = useGetPosts(filters);
    const { data: postList, current_page, total, per_page , last_page } = postData || {};


    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>();
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const columns: ColumnsType<IPost> = [
        {
            title: 'NO',
            dataIndex: 'no',
            width: 45,
            className: "text-center",
            render: (_, __, index) =>  index + 1
        },
        {
            title: '유형',
            dataIndex: 'type',
            width: "10%",
            className: "text-center",
        },
        {
            title: '답변상태',
            dataIndex: 'title',
            width: "50%",
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
            title: '문의 등록일시',
            dataIndex: 'notice_registration_date',
            width: 150,
            className: 'text-center',
            render: (value: string) => {
                const date = value.split('T')
                return <span>{date[0]} {date[1].split('.').shift()}</span>
            },
        }
    ];

    const sumWidth = useCallback(() => {
        return columns.reduce((totalWidth, column) => totalWidth + (Number(column.width) || 0), 0);
    }, []);


    return (
        <div className='m-4'>
            <AdvancedSearch
                className='mb-16'
                value={filters}
                onSearch={setFilters}
            />
            <DataFilter 
                total={total || 0}
                resultTotal={(last_page || 0) * (per_page || 0) }
                className='pb-3 border-b border-b-admin-stroke mb-2' 
            />
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row gap-1'>
                    <Button
                        className='bg-admin-button-1 text-admin-gray-2 font-medium text-base'
                        size='large'
                        // icon={}
                    // onClick={() => handleSearch()}
                    > 게시글 등록 </Button>
                    <Button
                        className='bg-admin-button-1 text-admin-gray-2 font-medium text-base'
                        size='large'
                    // onClick={() => handleSearch()}
                    > 고정공지순서변경 </Button>
                </div>
                <div className='flex flex-row justify-end mb-3 items-center gap-1'>
                    <div className='flex flex-row text-admin-sub mr-2'>
                        <span>선택</span>
                        <span className='text-admin-primary mx-1'>{selectedRowKeys?.length || 0}</span>
                        <span>개 </span>
                    </div>
                    <Button
                        className='bg-admin-button-1 text-admin-gray-2 font-medium text-base'
                        size='large'
                    // onClick={() => handleSearch()}
                    >
                        게시글 삭제
                    </Button>
                    <Button
                        className='bg-admin-button-1 text-admin-gray-2 font-medium text-base'
                        size='large'
                    // onClick={() => handleSearch()}
                    >
                        공지고정등록
                    </Button>
                    <Button
                        className='bg-admin-button-1 text-admin-gray-2 font-medium text-base'
                        size='large'
                    // onClick={() => handleSearch()}
                    >
                        공지고정해제
                    </Button>
                </div>
            </div>
            <div>
                <div>
                    <Table
                        loading={isLoading}
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
                    current={current_page}
                    total={total}
                    onChange={(page) =>  setFilters({ ...filters, page })}
                />
            </div>
        </div>
    )
}

export default AdminAnnoucementListPage