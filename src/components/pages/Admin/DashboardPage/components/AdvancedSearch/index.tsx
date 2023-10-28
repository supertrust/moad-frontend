
import { Button } from '@src/components/common';
import { Checkbox, DatePicker, Select, Input } from 'antd';
import React, { ReactNode } from 'react';

interface AdvancedSearchProps {
    className?: string
}

const SearchLine = ({title , children}:{title: string, children: ReactNode}) => {
    return (
        <tr className='h-[48px]'>
            <td className='bg-admin-light w-[35%] sm:w-[25%] md:w-[15%] px-3 border border-admin-stroke font-medium'>
                {title}
            </td>
            <td className='w-[90%] border border-admin-stroke'>{children}</td>
        </tr>
    )
}

const AdvancedSearch = ({ className }: AdvancedSearchProps) => {


    return (
        <div className={className}>
            <h3>광고목록조회</h3>
            <table className='mt-3 w-full text-[16px]'  >
                <SearchLine title='광고기간'>
                    <div className=' lg:flex lg:flex-row' >
                        <div className='m-1 flex flex-row gap-1 mr-1' >
                            <span className='py-2 px-3 rounded text-white border bg-admin-primary border-admin-primary'>
                                전체
                            </span>
                            <span className='py-2 px-3 ponter rounded border border-admin-stroke text-admin-sub'>
                                오늘
                            </span>
                            <span className='py-2 px-3  rounded border  border-admin-stroke text-admin-sub'>
                                1주
                            </span>
                            <span className='py-2 px-3  rounded border border-admin-stroke text-admin-sub'>
                                3개월
                            </span>
                            <span className='py-2 px-3 rounded border border-admin-stroke text-admin-sub'>
                                6개월
                            </span>
                        </div>
                        <div className='flex flex-grow flex-row gap-1 m-1' >
                            <DatePicker 
                                className='flex-grow h-[40px] lg:h-auto'
                                placeholder='날짜선택'
                            />
                            <span className='flex items-center'>~</span>
                            <DatePicker 
                                className='flex-grow h-[40px] lg:h-auto'
                                placeholder='날짜선택'
                            />
                        </div>
                    </div>
                </SearchLine>
                <SearchLine title='광고신청일'>
                    <div className=' lg:flex lg:flex-row' >
                        <div className='m-1 flex flex-row gap-1 mr-1' >
                            <span className='py-2 px-3 rounded text-white border bg-admin-primary border-admin-primary'>
                                전체
                            </span>
                            <span className='py-2 px-3 ponter rounded border border-admin-stroke text-admin-sub'>
                                오늘
                            </span>
                            <span className='py-2 px-3  rounded border  border-admin-stroke text-admin-sub'>
                                1주
                            </span>
                            <span className='py-2 px-3  rounded border border-admin-stroke text-admin-sub'>
                                3개월
                            </span>
                            <span className='py-2 px-3 rounded border border-admin-stroke text-admin-sub'>
                                6개월
                            </span>
                        </div>
                        <div className='flex flex-grow flex-row gap-1 m-1' >
                            <DatePicker 
                                className='flex-grow h-[40px] lg:h-auto'
                                placeholder='날짜선택'
                            />
                            <span className='flex items-center'>~</span>
                            <DatePicker 
                                className='flex-grow h-[40px] lg:h-auto'
                                placeholder='날짜선택'
                            />
                        </div>
                    </div>
                </SearchLine>
                <SearchLine title='광고상태'>
                    <div className="mx-4">
                        <label className='mr-4'>
                            <Checkbox /> 전체
                        </label>
                        <label className='mr-4'>
                            <Checkbox /> 광고신청중
                        </label>
                        <label className='mr-4'>
                            <Checkbox /> 광고검수중
                        </label>
                        <label className='mr-4'>
                            <Checkbox /> 화물주모집중
                        </label>
                        <label className='mr-4'>
                            <Checkbox /> 광고진행중
                        </label>
                        <label className='mr-4'>
                            <Checkbox /> 광고종료
                        </label>
                    </div>
                </SearchLine>
                <SearchLine title='광고유형'>
                    <div className="mx-4">
                        <label className='mr-4'>
                            <Checkbox /> 전체
                        </label>
                        <label className='mr-4'>
                            <Checkbox /> 고정형
                        </label>
                        <label className='mr-4'>
                            <Checkbox /> 전국형
                        </label>
                        <label className='mr-4'>
                            <Checkbox /> 스팟형
                        </label>
                    </div>
                </SearchLine>
                <SearchLine title='검색'>
                    <div className="flex flex-row mx-1 gap-1">
                        <Select 
                            placeholder='검색어 선택' 
                            size='large' 
                            rootClassName='rounded-sm min-w-[200px] w-[15%]'
                        /> 
                        <Input 
                            size="large" 
                            placeholder="검색어를 입력해주세요." 
                            className='rounded-md'
                        />
                    </div>
                </SearchLine>
            </table>
            <div className='flex flex-row justify-center mt-4 gap-2'>
                <Button 
                    className='border border-admin-primary text-admin-primary py-2 px-5 font-medium text-base'
                >초기화</Button>
                <Button 
                    className='bg-admin-primary text-white border-admin-primary py-2 px-5 font-medium text-base'
                >
                    검색
                </Button>

            </div>
        </div>
    )
}

export default AdvancedSearch