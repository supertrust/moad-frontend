import React, { useEffect, useState } from "react";
import { styles } from "@src/sections/cargo-owner-signup";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "next/image";

import BarnerImage from '@images/cargo-owner-ad-list/adapply.jpg';
import Filter  from '@images/cargo-owner-ad-list/filter.svg'
import { useIcarusContext } from "@src/hooks/useIcarusCargoContext";
import { useGetCargAdvertisementList } from "@src/apis/cargo";
import Loader from "@src/components/Loader";
import CargoAdItem from "@src/components/pages/CargoAdList/AdItem";


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
          {ads?.map(ad =>  <CargoAdItem ad={ad} key={ad.id}/> )}
          </div>
        </>
      }
    </div>
  );
}
