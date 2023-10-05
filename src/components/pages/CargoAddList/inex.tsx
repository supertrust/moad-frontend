import { useIcarusContext } from '@src/hooks/useIcarusCargoContext'
import Image from 'next/image';
import React, { useEffect } from 'react';
import { Button } from '@src/components/common';
import { FilterAltOutlined } from '@mui/icons-material';
import BarnerImage from '@images/cargo-owner-ad-list/adapply.jpg';
import Cardbox from '@images/cargo-owner-ad-list/cardbox.jpg';
import Truck from '@images/cargo-owner-ad-list/truck.png';

const CargoAddList = () => {
    const { setPageTitle, setShowOnlyTitle } = useIcarusContext();

    useEffect(() => {
        setPageTitle("광고리스트");
        setShowOnlyTitle(true);
    }, [])

    return (
        <div>
            <div className='px-3 py-4 border-[#F5F7FB] border-b-[10px]' >
                <Image src={BarnerImage} alt='' className='w-full rounded'/>
            </div>
            <div className='px-3 py-4'>
                <div className='flex flex-row justify-between'>
                    <Button className='border border-[#EBEDF4] !rounded-full py-2 px-3'>
                        전체
                    </Button>
                    <Button className='bg-[#F5F7FB] text-primary px-3 py-2 rounded-md'>
                        <FilterAltOutlined fontSize='small' />
                        필터
                    </Button>
                </div>
            </div>
            <div className="border border-[#EBEDF4] rounded-t-lg mx-3 p-3">

                <Image  src={Cardbox} alt='' className='w-full rounded-lg mb-2'/>
                <div className='my-4'>
                    산업융합 규제샌드박스 제도 홍보 캠페인 3_추가모집<br/>
                    (2줄 자동 줄바뀜)
                </div>
                <div className='mb-4'>
                    <Button className='border border-[#EBEDF4] !rounded-full py-3 px-2'>
                        <Image src={Truck} alt='' width={25} />
                    </Button>
                </div>
                <div className='flex flex-row gap-2 mb-20'>
                    <Button className='bg-[#F5F7FB] px-3 py-2 rounded-md'>
                        서울
                    </Button>
                    <Button className='bg-[#F5F7FB] px-3 py-2 rounded-md'>
                        경기
                    </Button>
                </div>

                
                <Button className='bg-[#F5F7FB] px-3 py-4 rounded-md w-full '>
                    <div className='text-center w-full'>종료된 광고</div>
                </Button>
            </div>
        </div>
    )
}

export default CargoAddList 