import React, { useEffect, useState } from "react";
import { styles } from "@src/sections/cargo-owner-signup";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "next/image";
import {Button} from "antd";

import BarnerImage from '@images/cargo-owner-ad-list/adapply.jpg';
import Cardbox from '@images/cargo-owner-ad-list/cardbox.jpg';
import Truck from '@images/cargo-owner-ad-list/truck.png';
import Filter  from '@images/cargo-owner-ad-list/filter.svg'
import { useIcarusContext } from "@src/hooks/useIcarusCargoContext";
import { useGetCargAdvertisementList } from "@src/apis/cargo";
import Loader from "@src/components/Loader";
import { ICargoAdvertisement } from "@src/types/cargo";


const ad_type_names = {
  fixed_ad : '고정형 광고',
  national_ad: '전국형 광고',
  spot_ad: '스팟광고',
}

export default function CargOwnerAdList() {
  const [filter, setFilter] = useState("전체");
  const { setPageTitle , setShowOnlyTitle } = useIcarusContext();
  useEffect(() => {
      setPageTitle("광고리스트");
      setShowOnlyTitle(true);
  }, []);

  const { data: ads, isLoading } = useGetCargAdvertisementList({});

  function FilterModel({ name, ...props }: { name: any, placement: any }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const choices = [
      { text: "전체", value: "전체" },
      { text: "모집중", value: "모집중" },
      { text: "종료된 광고", value: "종료된 광고" },
    ];
    const handleChange = (event) => {
      setFilter(event.target.value);
    };
    return (
      <>
        <p onClick={handleShow} className="p-0">
          필터
        </p>
        <Offcanvas
          show={show}
          onHide={handleClose}
          {...props}
          className={styles.Offcanvas}
        >
          <Offcanvas.Header closeButton className={styles.offcanvasheader}>
            <Offcanvas.Title>필터</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="flex flex-col pt-0">
            {choices.map((choice, index) => (
              <label key={index} className="py-2 text-lg">
                <input
                  type="radio"
                  name="filter"
                  value={choice.value}
                  key={index}
                  // checked={selected === choice.value}
                  onChange={(e) => handleChange(e)}
                  className="opacity-0"
                />
                {choice.text}
              </label>
            ))}
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }

  const renderAd = (ad: ICargoAdvertisement) => {
    return (
        <div className="p-3.5 border rounded-[8px]">
          <div className="mb-2.5">
            <div className="relative">
              <div className="absolute left-5 top-5">
                <h6 className="text-white font-normal">{ad.ad_name}</h6>
                <h4 className="text-white font-medium text-2xl">{ad_type_names[ad.type]}</h4>
              </div>
              <Image className="w-full rounded-[6px]" src={Cardbox} alt='cardbox' width={150} height={50} />
            </div>
          </div>
          <h4 className="text-[#373737] mb-2.5 font-medium text-xs">
            {ad.ad_name} - 
            <span>{ad_type_names[ad.type]}</span>
          </h4>
          <div className="w-[40px] h-[40px] border rounded-full flex items-center justify-center mb-3">
            <Image src={Truck} alt='adapply-pc' width={30} />
          </div>
          <div className="flex items-center gap-2 mb-24">
            <span className="bg-[#E1ECFF] text-[#0868FD] flex items-center justify-center w-[47px] h-[25px]">
              서울
            </span>
            <span className="bg-[#E1ECFF] text-[#0868FD] flex items-center justify-center w-[47px] h-[25px] rounded-[4px]">
              경기
            </span>
          </div>
          <div className="flex items-center mb-4">
            <Button type="primary" block size="large" className="h-[48px] rounded-none w-full bg-[#EFEEF0] text-[#C8C5CB] flex items-center justify-center">종료된 광고</Button>
          </div>
        </div>
    )
  }
  
  return (
    <div className="bg-[#F5F7FB]">
      <div className="container bg-[#fff] max-w-[600px] mx-auto py-6">
        <div>
          <Image className="w-full lg:d-none" src={BarnerImage} alt='event' width={335} height={50} />
        </div>
      </div>
      {isLoading ? <Loader  />: 
        <> 
          <div className="container bg-[#fff] max-w-[600px] mx-auto mt-3">
            <div className="flex items-center justify-between pt-6 pb-3">
              <p className="rounded-[100px] w-[auto] h-[30px] px-3.5 py-2.5 flex items-center justify-center border">
                {
                filter === "전체" 
                ? 
                filter
                :
                <span className="flex gap-1.5">
                  <Image onClick={() => {setFilter("전체")}} className="w-3.5" src="/images/cargo-owner-ad-list/close.svg" alt='close' width={150} height={50} />
                  {filter}</span>
                }
              </p>
              <div className="bg-[#F5F7FB] border-[#F5F7FB] rounded-[4px] w-[61px] h-[30px] flex items-center justify-center text-[#0868FD] gap-1">
                <span>
                  <Image className="w-full" src={Filter} alt='filter' width={150} height={50} />
                </span>
                <span className="text-[#0868FD]"> {['bottom'].map((placement, idx) => (
                  <FilterModel key={idx} placement={placement} name={placement} />
                ))}</span>

              </div>
            </div>
          </div>
          <div className={`${styles.ad_list_section} container bg-[#fff] max-w-[600px] mx-auto mb-2 `}>
          {ads?.map(ad =>  renderAd(ad))}
          </div>
        </>
      }
    </div>
  );
}
