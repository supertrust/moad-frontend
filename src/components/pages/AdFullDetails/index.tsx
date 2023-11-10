import Loader from '@src/components/Loader';
import { DataRow } from '@src/components/common';
import HeaderLine from '@src/components/common/HeaderLine';
import { useIcarusContext } from '@src/hooks/useIcarusContext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import style from './style.module';
import { useGetAdvertisementDetail } from '@src/apis/advertisement';
import AdImage from '../Admin/AdminAdvertisementDetailsPage/components/Image';
import { API_BASE_URL } from '@src/config';
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Carousel } from "react-bootstrap";
import Image from 'next/image';


const Types = {
    fixed_ad: '고정',
    national_ad: '국가',
    spot_ad: '스팟',
};

const TypeOfVechicle = [
    {text :"카고",value :"cargo"},
    {text :"탑",value :"tower"},
    {text :"윙바디",value :"loaded"},
  ];

function AdFullDetails() {

    const { query } = useRouter();
    const advertisementId = query.ad_id as string;
    const {
        data: advertisement,
        isLoading: isAdvertisementLoading
    } = useGetAdvertisementDetail({ id: advertisementId });

    const title = '광고관리';
    const { pageTitle, setPageTitle } = useIcarusContext();
    const [viewopen, setViewOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex: any, e: any) => {
        setIndex(selectedIndex);
      };
      
    useEffect(() => { pageTitle !== title && setPageTitle(title) }, [])

    const getVehicleTypeCount = (type: string) => {
        if(!advertisement?.vehicles_in_operation) return "0대"
        const vType = advertisement?.vehicles_in_operation?.filter(value => value.vehicle_type == type);
        return `${vType.length ? vType[0].number_of_vehicles : 0}대`
    }
    const modalstyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        borderRadius: "8px",
        boxShadow: 24,
      };
    return (
        <div className='px-4 py-3'>
            <HeaderLine title='광고 상세' />
            {isAdvertisementLoading ?
                <Loader /> :
                <table className='mt-3 w-full text-[16px]'  >
                    <DataRow
                        title='광고진행상태'
                        className={style.className}
                        firstColumClass={style.firstColumnClass}
                        colSpan={2}
                    >
                        {advertisement?.status}
                    </DataRow>
                    <DataRow
                        title='광고유형'
                        className={style.className}
                        firstColumClass={style.firstColumnClass}
                        colSpan={2}
                    >
                        {advertisement?.type && Types[advertisement?.type]}
                    </DataRow>
                    <DataRow
                        title='광고이름'
                        className={style.className}
                        firstColumClass={style.firstColumnClass}
                        colSpan={2}
                    >
                        {advertisement?.ad_name}
                    </DataRow>
                    <DataRow
                        title='광고내용'
                        className={style.className}
                        firstColumClass={style.firstColumnClass}
                        colSpan={2}
                    >
                        <textarea 
                            readOnly 
                            rows={5}
                            className={style.textArea}
                        >{advertisement?.content}</textarea>
                    </DataRow>
                    <DataRow
                        title='차량모집기간'
                        className={style.className}
                        firstColumClass={style.firstColumnClass}
                        colSpan={2}
                    >
                        {
                        advertisement?.recruitment_period_start_date ?
                        advertisement?.recruitment_period_start_date +'~'+ advertisement?.recruitment_period_end_date
                        :
                        '--'
                        }
                        
                    </DataRow>
                    <DataRow
                        title='차량종류'
                        className={style.className}
                        firstColumClass={style.firstColumnClass}
                        colSpan={2}
                    >
                        {advertisement?.vehicle_type && 
                            (TypeOfVechicle.find(type =>  type.value === advertisement?.vehicle_type))?.text
                        }
                    </DataRow>
                    <DataRow
                        title='모집차량수'
                        className={style.className}
                        firstColumClass={style.firstColumnClass}
                        colSpan={2}
                    >
                        {advertisement?.number_of_cargo || 0}대
                    </DataRow>
                    <DataRow
                        title='운행차량수'
                        className={style.className}
                        firstColumClass={style.firstColumnClass}
                        colSpan={1}
                        rowSpan={4}
                        additionalColumn={[{
                            title: "1t",
                            className: style.additionalColumClass
                        }]}
                    >
                        { getVehicleTypeCount('1t') }
                    </DataRow>
                    {['2.5t', '5t', '11t'].map(type => 
                        <DataRow
                            key={type}
                            title={type}
                            className={style.className}
                            firstColumClass={style.additionalColumClass}
                        > {getVehicleTypeCount(type) }</DataRow>
                    )}
                    <DataRow
                        title='광고기간'
                        className={style.className}
                        firstColumClass={style.firstColumnClass}
                        colSpan={2}
                    >
                         {advertisement?.start_date} ~ {advertisement?.end_date}
                    </DataRow>
                    <DataRow
                        title='운행지역'
                        className={style.className}
                        firstColumClass={style.firstColumnClass}
                        colSpan={2}
                    >
                        {advertisement?.operating_areas?.toString()}
                    </DataRow>
                    <DataRow
                        title='광고이미지'
                        className={style.className}
                        firstColumClass={style.firstColumnClass}
                        colSpan={2}
                    >
                        <div className='sm:flex sm:flex-row gap-1'>
                            {advertisement?.images.map((value, key) => (
                                <AdImage
                                    src={API_BASE_URL + value.image_path}
                                    key={key}
                                    onView={()=>{setIndex(key);setViewOpen(true);}}
                                />
                            ))}

                        </div>

                    </DataRow>
                </table>
            }
            <Modal
                open={viewopen}
                onClose={() => setViewOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                
                <Box component="div" sx={modalstyle}>
                <Box component="div">
                    <CloseIcon
                        onClick={()=>setViewOpen(false)}
                        sx={{
                        position: "absolute",
                        top: "0px",
                        right: "-30px",
                        background: "#2C324C",
                        cursor: "pointer",
                        color: "#fff",
                        zIndex: "99",
                        }}
                    />
                </Box>
                <Box component={'div'}>
                <Carousel className='advertisment_full_detail ' activeIndex={index} interval={null} onSelect={handleSelect}>
                {advertisement?.images.map((value, key) => (
                          <Carousel.Item key={key}>
                            <Image
                               src={API_BASE_URL + value.image_path}
                              alt="slides"
                              width={668}
                              height={500}
                            />
                            <Carousel.Caption className="valu-text">
                            </Carousel.Caption>
                          </Carousel.Item>
                        ))}
                      </Carousel>
                </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default AdFullDetails