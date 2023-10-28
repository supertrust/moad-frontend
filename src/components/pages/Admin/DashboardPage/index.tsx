import React, { useState } from 'react'
import {AdvancedSearch, DataFilter} from './components'
import { Checkbox } from 'antd';
import Pagination from '@src/components/Pagination';


function Dashboard() {

  const [filters, setFilters] = useState();


  return (
    <div className='m-4'>
      <AdvancedSearch className='mb-16' />
      <DataFilter className='mb-3' />
      <div>
        <table className='border border-admin-stroke w-full'>
            <thead className='bg-admin-gray-2 border border-admin-stroke text-center'>
              <tr className='h-11'>
                <td><Checkbox/></td>
                <td>NO</td>
                <td>광고명</td>
                <td>차량종 </td>
                <td>회사명</td>
                <td>광고모집기간</td>
                <td>모집차량수</td>
                <td>운행차량수</td>
                <td>운행차량수</td>
              </tr>
            </thead>
            <tbody className='text-center'>
              <tr className='border border-admin-stroke h-11'>
                <td> <Checkbox/></td>
                <td>1</td>
                <td className='text-left underline'>이카루스 서비스 오픈 출시 기념</td>
                <td>온라인투자연계금융업 </td>
                <td className='underline'>머스트핀테크</td>
                <td>광고모집기간</td>
                <td>2023.07.01 ~ 2023.07.31</td>
                <td className='underline'>50대</td>
                <td className='underline'>20/50</td>
              </tr>
              <tr className='border border-admin-stroke h-11'>
                <td><Checkbox/> </td>
                <td>2</td>
                <td className='text-left underline'>이카루스 서비스 오픈 출시 기념</td>
                <td>온라인투자연계금융업 </td>
                <td className='underline'>머스트핀테크</td>
                <td>광고모집기간</td>
                <td>2023.07.01 ~ 2023.07.31</td>
                <td className='underline'>50대</td>
                <td className='underline-offset-4'>20/50</td>
              </tr>
              <tr className='border border-admin-stroke h-11'>
                <td><Checkbox/></td>
                <td>3</td>
                <td className='text-left underline'>이카루스 서비스 오픈 출시 기념</td>
                <td>온라인투자연계금융업 </td>
                <td className='underline'>머스트핀테크</td>
                <td>광고모집기간</td>
                <td>2023.07.01 ~ 2023.07.31</td>
                <td className='underline'>50대</td>
                <td className='underline'>20/50</td>
              </tr>
            </tbody>
        </table>
      </div>
      <div className='flex flex-row mt-5 justify-center'>
        <Pagination
          current={1}
          total={5}
          
        />

      </div>
    </div>
  )
}

export default Dashboard