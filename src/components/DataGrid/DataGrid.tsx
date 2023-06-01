import React, { useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
// import { rows, columns, rowData } from '@src/sections/statistics/tabelData';
import { useRouter } from "next/router";

interface TableProps {
  columns: any;
  rows: any;
}
const App: React.FC<TableProps> = ({ columns, rows }) => {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [top, setTop] = useState("topLeft");
  const [bottom, setBottom] = useState("bottomRight");

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
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
          let newSelectedRowKeys = [];
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
          let newSelectedRowKeys = [];
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

  const handleRowClick = (row: any) => {
    const columnData = row.columnName;
    console.log("Clicked column:", row);

    if (row.vehicle_information === 'vehicle_information') {
      console.log(
        "🚀 ~ file: DataGrid.tsx:67 ~ handleRowClick ~ vehicle_information:",
        row.vehicle_information
      );

      // router.push("/page1"); // Replace '/page1' with the actual URL of the first link
    } else if (row.vehicle_location) {
      console.log(
        "🚀 ~ file: DataGrid.tsx:71 ~ handleRowClick ~ row.vehicle_location:",
        row.vehicle_location
      );
      // router.push(""); // Replace '/page2' with the actual URL of the second link
    }
  };

  return (
    <Table
      rowSelection={rowSelection}
      // onRow={(record, rowIndex) => ({
      //   onClick: () => handleRowClick(record),
      //   className: "cursor-pointer", // Add any necessary CSS classes to the rows
      // })}
      pagination={{
        position: ["bottomCenter"],
        pageSize: 5,
        itemRender: renderPaginationItem,
        className: "flex justify-end",
      }}
      columns={columns}
      dataSource={rows}
    />
  );
};

export default App;

const renderPaginationItem = (page: number, type: any, element: any) => {
  if (type === "page") {
    const isActive = page === (element as any).props.current;
    const activeStyles: React.CSSProperties = isActive
      ? { backgroundColor: "red", color: "#ffffff" }
      : {};

    return (
      <button
        className={`bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-gray-800 px-3 rounded`}
        style={activeStyles}
      >
        {page}
      </button>
    );
  }

  return element;
};

// className="active:border-2 active:bg-red-600 bg-gray-200 active:text-white text-[18px] font-semibold hover:text-pink-800 py-1 px-3 rounded"
