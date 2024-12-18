import React, { useState } from "react";
import { Pagination, Table } from "antd";
import type { TableRowSelection } from "antd/es/table/interface";
// import { rows, columns, rowData } from '@src/sections/statistics/tabelData';
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface TableProps {
  columns: any;
  rows: any;
  selection?: boolean;
  loading?: boolean;
  showPagination?: boolean;
  currentPage?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onChangePage?: (page: number) => void;
  [key: string]: any;
}

const DataGrid: React.FC<TableProps> = ({
  columns,
  rows,
  selection,
  loading,
  showPagination,
  currentPage,
  totalItems,
  itemsPerPage,
  onChangePage,
  additionalTableProps,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys: any[] = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys: any[] = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <>
      <Table
          className={'advertiser-ant-table-container'}
        rowSelection={selection ? rowSelection : undefined}
        pagination={false}
        columns={columns}
        dataSource={rows}
        bordered
        loading={loading ? { indicator: antIcon } : undefined}
        {...additionalTableProps}
      />
      {showPagination && (
        <div className="flex justify-center py-[30px] notification_pagination">
          <Pagination
              className={'notification_pagination'}
            current={currentPage || 1}
            total={totalItems || 1}
            pageSize={itemsPerPage || 1}
            onChange={onChangePage}
          />
        </div>
      )}
    </>
  );
};

export default DataGrid;
