import { Button } from '@src/components/common'
import { Select } from 'antd'
import React, { useState } from 'react'

interface DataFilterProps {
    className?: string
    total?: number,
    resultTotal?: number,
    // onChange: () => void
}

const statusOptions = [
    { value: 'answer', label: "답변상태 전체" },
    { value: 'answer', label: "답변대기" },
    { value: 'answered', label: "답변완료" },
]

const orderOptions = [
    { value: 'notice_registration_date', label: "등록일시순" },
    { value: 'author', label: "작성자명순" },
]

function DataFilter({ className, total = 150, resultTotal = 100 } : DataFilterProps) {

    return (
        <div className={className}>
            <div className='md:flex md:flex-row justify-between items-center'>
                <div className='flex flex-row items-center gap-3'>
                    <h4>공지사항관리</h4>
                    <div className='text-admin-sub'>
                        <span>전체 </span> 
                        <span className='text-admin-primary underline'>{total}</span>
                        <span> 건 (검색결과 총 </span>
                        <span className='text-admin-primary underline'>{resultTotal}</span>
                        <span> 건)</span>
                    </div>
                </div>
                <div className='flex flex-row gap-1'>
                    <Select 
                        popupClassName={"admin-advertisement-select"}
                        placeholder='광고진행상태' 
                        size='large' 
                        rootClassName='rounded-sm min-w-[160px] w-[15%]'
                        className='!rounded-sm'
                        options={statusOptions}
                    /> 
                    <Select 
                        popupClassName={"admin-advertisement-select"}
                        placeholder='등록일시순' 
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