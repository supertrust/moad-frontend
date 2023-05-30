import * as React from 'react';

export interface rowData {
  key: React.Key;
  no: string;
  registration_number: number;
  vehicle_type: string;
  driving_distance: number;
  achievement_rate: string;
  operating_time: string;
}

export const columns = [
  { dataIndex: 'no', title: 'no'},
  { dataIndex: 'registration_number', title: '등록번호' },
  { dataIndex: 'vehicle_type', title: '차량종류', sortable: false },
  {
    dataIndex: 'driving_distance',
    title: '운행거리',
  },
  {
    dataIndex: 'achievement_rate',
    title: '운행시간',
  },
  {
    dataIndex: 'operating_time',
    title: '달성률',
  },

];

export const rows: rowData[] = [
  { key: 1, no: "1", registration_number: 123, vehicle_type: "10", driving_distance: 6, achievement_rate: "active",operating_time:"test" },
];