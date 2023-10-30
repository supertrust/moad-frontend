import React, { useCallback, useMemo, useState } from 'react'
import { AdvancedSearch, DataFilter } from './components'
import { Checkbox, Pagination, Table } from 'antd';
import { useCompanyAdList } from '@src/apis/admin/advertisement';
import { ICompanyAdList } from '@src/types/admin/advertisment';
import { ColumnsType } from 'antd/es/table';


function Dashboard() {

  const [filters, setFilters] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>();
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const { data: adList } = useCompanyAdList({ page: 1 });

  const adDatas = useMemo(() =>
    !adList?.length  ? [] : adList?.map((item, index) => ({...item, no : index + 1 })),
  [adList]);

  const colGeneral = {}
  const columns: ColumnsType<ICompanyAdList> = [
    {
      title: 'No',
      dataIndex: 'no',
      width: 45,
      className:"text-center",
      render: (value, record, index) =>{
        return index + 1
      }
    },
    {
      title: '광고명',
      dataIndex: 'ad_name',
      width: 350,
      render: (value) => {
        return <span className='underline'>{value}</span>
      },
    },
    {
      title: '업종',
      dataIndex: 'sector',
      width: 180,
      className:"text-center",
    },
    {
      title: '회사명',
      dataIndex: 'company_name',
      width: 185,
      className:"text-center",
    },
    {
      title: '광고모집기간',
      dataIndex: 'recruitment_period',
      className: 'text-center',
      width: 150,
    },
    {
      title: '모집차량수',
      dataIndex: 'number_of_vehicle_recruited',
      width: 150,
      className: 'text-center',
      render: (value) => {
        return <span className='underline'>{value}</span>
      },
    },
    {
      title: '광고진행상태',
      dataIndex: 'number_of_vehicle_in_operation',
      width: 150,
      className: 'text-center',
      render: (value) => {
        return <span className='underline'>{value}</span>
      },
    },
    {
      title: '광고기간',
      dataIndex: '',
      width: 150,
      className: 'text-center',
    },
    {
      title: '광고유형',
      dataIndex: 'contact_email',
      width: 200,
      className: 'text-center',
    },
    {
      title: '총 광고건수',
      dataIndex: 'total_ad_no',
      width: 120,
      className: 'text-center',
    },
    {
      title: '블랙리스트 및 휴면상태',
      dataIndex: 'dormant_state',
      width: 180,
      className: 'text-center',
    },
    {
      title: '가입일시',
      dataIndex: 'registration_date',
      width: 176,
      className: 'text-center',
    },
  ];

  const sumWidth = useCallback(() => {
    return columns.reduce((totalWidth, column) => totalWidth + (Number(column.width) || 0), 0);
  }, []);


  return (
    <div className='m-4'>
      <AdvancedSearch className='mb-16' />
      <DataFilter className='mb-3' />
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
            dataSource={adList}
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
                cell: ({style: cellStyle, ...cellProps }: any) => {
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

export default Dashboard