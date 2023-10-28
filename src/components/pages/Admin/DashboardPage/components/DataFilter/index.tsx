import { Button } from '@src/components/common'
import { Select } from 'antd'
import React, { useState } from 'react'

interface DataFilterProps {
    className?: string
    // onChange: () => void
}

const progressOptions = [
    { value: 'progress', label: "광고진행상태" },
    { value: 'application', label: "광고신청중" },
    { value: 'reviewing', label: "광고검수중" },
    { value: 'freight', label: "화물주모집중" },
    { value: 'in_progress', label: "광고진행중" },
    { value: 'end', label: "광고진행중" },
]

const orderOptions = [
    { value: 'ad_name', label: "광고명순" },
    { value: 'company_name', label: "회사명순" },
    { value: 'ad_period', label: "광고기간순" },
    { value: 'date_asc', label: "광고신청일시순" },
]

function DataFilter({ className } : DataFilterProps) {

    return (
        <div className={className}>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center gap-3'>
                    <h4>광고목록</h4>
                    <div className='text-admin-sub'>
                        <span>전체 </span> 
                        <span className='text-admin-primary underline'>150</span>
                        <span> 건 (검색결과 총 </span>
                        <span className='text-admin-primary underline'>100</span>
                        <span> 건)</span>
                    </div>
                </div>
                <div className='flex flex-row gap-1'>
                    <Select 
                        placeholder='광고진행상태' 
                        size='large' 
                        rootClassName='rounded-sm min-w-[160px] w-[15%]'
                        className='!rounded-sm'
                        options={progressOptions}
                    /> 
                    <Select 
                        placeholder='광고명순' 
                        size='large' 
                        rootClassName='rounded-sm min-w-[160px] w-[15%]'
                        options={orderOptions}
                    /> 
                    <Button 
                        className='border bg-admin-gray-2 border-admin-gray-1 text-admin-gray-1'
                    >
                        엑셀다운로드
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DataFilter