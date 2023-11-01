
import { Button } from '@src/components/common';
import { DateIcon } from '@src/components/icons';
import { AdStatusType, AdTypeType, GetCompanyAdListType } from '@src/types/admin/advertisment';
import { Checkbox, DatePicker, Select, Input } from 'antd';
import { clsx } from 'clsx';
import React, { ReactNode, useState } from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)


const searchOptions = [
    // { value: 'terms', label: "광고명순" },
    { value: 'ad_name', label: "광고명" },
    { value: 'company_name', label: "회사명" },
  ]

interface AdvancedSearchProps {
    className?: string
    value: GetCompanyAdListType,
    onSearch: (value: GetCompanyAdListType) => void
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

const DateButton = ({
    title, selected, onClick 
}: {title:string, selected: boolean, onClick: VoidFunction}) => {
    return( 
        <span  
            onClick={onClick}
            className={clsx(
            'py-2 px-3 rounded border cursor-pointer text-admin-gray-1',
            selected && 'bg-admin-primary border-admin-primary text-white'
        )}>{title}</span>
    )
}
const AdvancedSearch = ({ className, value, onSearch }: AdvancedSearchProps) => {

    const [filters, setFilters] = useState<GetCompanyAdListType>(value);
    const { 
        adPeriod, adApplication, adStatus, 
        adSearchBy,  adSearch, adType ,
        startDateAdApplication, endDateAdApplication,
        endDateAdPeriod, startDateAdPeriod
    } = filters;

    const handleChange = (field: keyof typeof  value , value: any) => {
        setFilters({
            ...filters,
            [field]: value
        })
    }

    const handleChangeStatus = (value: AdStatusType) => {
        if(!value){
            return handleChange('adStatus', [value])
        } 
        const values = adStatus?.filter(status =>  !status);
        const newValues = 
        adStatus?.includes(value) ? 
            values?.filter(status =>  status !== value):
            [...values || [], value ]
        handleChange(
            'adStatus', 
            newValues?.length ? newValues : []
        )
    }


    const handleSearch = () => onSearch({...filters, page: 1});

    const handleReset = () => {
        const filters :GetCompanyAdListType  = {
            page: 1,
            adPeriod:'',
            adApplication: '',
            adSearchBy:'ad_name',
            adStatus: [''],
            adType: ['']
        }
        setFilters(filters);
        onSearch(filters);
    }

    return (
        <div className={className}>
            <h3>광고목록조회</h3>
            <table className='mt-3 w-full text-[16px]'  >
                <SearchLine title='게시글 등록일'>
                    <div className=' lg:flex lg:flex-row' >
                        <div className='m-1 flex flex-row gap-1 mr-1' >
                            <DateButton 
                                title='전체' 
                                selected={!adPeriod}
                                onClick={() => handleChange('adPeriod' , '')}
                            />
                            <DateButton 
                                title='오늘' selected={adPeriod == 'today'}
                                onClick={() => handleChange('adPeriod' , 'today')}
                            />
                            <DateButton 
                                title='1주' selected={adPeriod == '1week'}
                                onClick={() => handleChange('adPeriod' , '1week')}
                            />
                            <DateButton 
                                title='3개월' selected={adPeriod == '3months'}
                                onClick={() => handleChange('adPeriod' , '3months')}
                            />
                            <DateButton 
                                title='6개월' selected={adPeriod == '6months'}
                                onClick={() => handleChange('adPeriod' , '6months')}
                            />
                        </div>
                        <div className='flex flex-grow flex-row gap-1 m-1' >
                            <DatePicker 
                                className='flex-grow h-[40px] lg:h-auto'
                                suffixIcon={<DateIcon/>}
                                placeholder='날짜선택'
                                format={"YYYY-MM-DD"}
                                value={startDateAdPeriod ? dayjs(startDateAdPeriod, 'YYYY-MM-DD') : undefined}
                                onChange={(date) => handleChange('startDateAdPeriod', date?.format('YYYY-MM-DD') )}

                            />
                            <span className='flex items-center'>~</span>
                            <DatePicker 
                                suffixIcon={<DateIcon/>}
                                className='flex-grow h-[40px] lg:h-auto'
                                placeholder='날짜선택'
                                format={"YYYY-MM-DD"}
                                value={endDateAdPeriod ? dayjs(endDateAdPeriod, 'YYYY-MM-DD') : undefined}
                                onChange={(date) => handleChange('endDateAdPeriod', date?.format('YYYY-MM-DD') )}
                            />
                        </div>
                    </div>
                </SearchLine>
                <SearchLine title='카테고리'>
                    <div className="mx-4">
                        <label className='mr-4'>
                            <Checkbox  
                                checked={!adStatus?.length}  
                                onChange={() => handleChangeStatus('')}
                            /> 전체
                        </label>
                        <label className='mr-4'>
                            <Checkbox 
                                checked={adStatus?.includes('applyingForAdvertisement')}  
                                onChange={() => handleChangeStatus('applyingForAdvertisement')}
                            /> 서비스이용
                        </label>
                        <label className='mr-4'>
                            <Checkbox 
                                checked={adStatus?.includes('adReviewing')}  
                                onChange={() => handleChangeStatus('adReviewing')}
                            />  결제/환불
                        </label>
                        <label className='mr-4'>
                            <Checkbox 
                                checked={adStatus?.includes('focusingOnRecruitingCargoOwners')} 
                                onChange={() => handleChangeStatus('focusingOnRecruitingCargoOwners')}
                            /> 기타
                        </label>
                    </div>
                </SearchLine>
                <SearchLine title='검색'>
                    <div className="flex flex-row mx-1 gap-1">
                        <Select 
                            placeholder='검색어 선택' 
                            size='large' 
                            rootClassName='rounded-sm min-w-[200px] w-[15%]'
                            options={searchOptions}
                            value={adSearchBy}
                            onChange={(value) => handleChange('adSearchBy', value)}
                        /> 
                        <Input 
                            size="large" 
                            placeholder="검색어를 입력해주세요." 
                            className='rounded-md'
                            value={adSearch}
                            onChange={(e) => handleChange('adSearch', e.target.value)}
                        />
                    </div>
                </SearchLine>
            </table>
            <div className='flex flex-row justify-center mt-4 gap-2'>
                <Button 
                    className='border border-admin-primary text-admin-primary py-2 px-5 font-medium text-base'
                    onClick={handleReset}
                >초기화</Button>
                <Button 
                    className='bg-admin-primary text-white border-admin-primary py-2 px-5 font-medium text-base'
                    onClick={() => handleSearch()}
                >
                    검색
                </Button>

            </div>
        </div>
    )
}

export default AdvancedSearch