import * as React from 'react';

export interface rowData {
  key: React.Key;
  ad_type: string;
  advertising_name: string;
  vehicles: number;
  period: number;
  status: string;
}

export const columns = [
  { dataIndex: 'ad_type', title: '광고 유형', render: (text: string) => <a>{text}</a>, },
  { dataIndex: 'advertising_name', title: '광고 이름' },
  { dataIndex: 'vehicles', title: '운행 차량수', sortable: false },
  {
    dataIndex: 'period',
    title: '기간',
  },
  {
    dataIndex: 'status',
    title: '상태',
  },

];

export const rows: rowData[] = [
  { key: 1, ad_type: "item1", advertising_name: "이카루스 서비스 오픈 출시 기념", vehicles: 10, period: 6, status: "active" },
  { key: 2, ad_type: "item2", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
  { key: 3, ad_type: "item3", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
  { key: 4, ad_type: "item4", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
  { key: 10, ad_type: "item5", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
  { key: 20, ad_type: "item6", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
  { key: 30, ad_type: "item7", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
  { key: 40, ad_type: "item8", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
  { key: 11, ad_type: "item9", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
  { key: 12, ad_type: "item10", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
  { key: 13, ad_type: "item11", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
  { key: 14, ad_type: "item12", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
  { key: 21, ad_type: "item13", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
  { key: 22, ad_type: "item14", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
  { key: 23, ad_type: "item15", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
  { key: 24, ad_type: "item16", advertising_name: "f_item", vehicles: 10, period: 6, status: "active" },
];


