import React, { useCallback, useState } from 'react'
import { AdvancedSearch, DataFilter } from './components'
import { Button, Pagination, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { GetPostType, IPost } from '@src/types/admin/posts';
import { useGetPosts } from '@src/apis/admin/post';
import { formatDate } from '@src/utils/formatter';


function AdminPostList() {

    const [filters, setFilters] = useState<GetPostType>({ page: 1, type: 'inquiry' });

    const { data: postData, isLoading } = useGetPosts(filters);
    const { data: postList, current_page, total, per_page , last_page } = postData || {};

    console.log("PostData =>", postData);
    // console.log("Post=>", postList);

    // const postList = [];


    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>();
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const columns: ColumnsType<IPost> = [
        {
            title: 'No',
            dataIndex: 'no',
            width: 45,
            className: "text-center",
            render: (_, __, index) =>  index + 1
        },
        {
            title: '유형',
            dataIndex: 'types',
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
            dataIndex: 'title',
            className: 'text-left',
            width: 450,
            render: (value) => {
                return <span className='underline text-ellipsis overflow-hidden'>{value}</span>
            },
        },
        {
            title: '답변',
            dataIndex: 'inquiry_answer',
            width: 350,
            className: 'text-left',
        },
        {
            title: '답변작성자',
            dataIndex: 'answerer',
            width: 150,
            className: 'text-center',
        },
        {
            title: '문의 등록일시',
            dataIndex: 'registration_date',
            width: 150,
            className: 'text-center',
            render: (value) => value && formatDate(value, true),
        },
        {
            title: '답변 등록일시',
            dataIndex: 'updated_date',
            width: 150,
            className: 'text-center',
            render: (value) => value && formatDate(value, true),
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
                // total={total || 0}
                // resultTotal={(last_page || 0) * (per_page || 0) }
                className='pb-3 border-b border-b-admin-stroke mb-2' 
            />
            <div className='flex flex-row justify-end mb-3 items-center'>
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
            </div>
            <div>
                <div>
                    <Table
                        // loading={isLoading}
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
                                                padding: "0px 5px",
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
                    // current={current_page}
                    // total={total}
                />
            </div>
        </div>
    )
}

export default AdminPostList