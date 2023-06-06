import React,{useState} from "react";

const Apply = ({ onButtonClick }:{onButtonClick: any}) => {
  return (
    <>
    <div className="bg-[#F5F7FB] flex flex-col min-h-screen">
     <div className="container h-full bg-white max-w-[600px] mx-auto px-[20px] min-h-screen">
        <div className="text-center my-6 text-[#373737] text-lg font-bold">
          산업융합 규제샌드박스 제도<br />
          산업융합 규제샌드박스 제도
        </div>
        <div className="border rounded-lg p-8 mb-4">
          <div className="flex items-center gap-4 mb-2.5">
            <label className="min-w-[60px] text-[#999999] font-normal">신청차량</label>
            <span>10150122호</span>
          </div>
          <div className="flex items-center gap-4 mb-2.5">
            <label className="min-w-[60px] text-[#999999] font-normal">신청일</label>
            <span>2023.04.13</span>
          </div>
          <div className="flex items-center gap-4 mb-2.5">
            <label className="min-w-[60px] text-[#999999] font-normal">모집기간</label>
            <span>2023.04.12 ~ 2023.04.18</span>
          </div>
          <div className="flex items-center gap-4 mb-2.5">
            <label className="min-w-[60px] text-[#999999] font-normal">광고기간</label>
            <span>2023.04.12 ~ 2023.04.18</span>
          </div>
          <div className="flex items-center gap-4 mb-2.5">
            <label className="min-w-[60px] text-[#999999] font-normal">차량종류</label>
            <span><strong>1t</strong></span>
          </div>
          <div className="flex items-center gap-4">
            <label className="min-w-[60px] text-[#999999] font-normal">활동지역</label>
            <span>경기, 서울</span>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <input id="default-checkbox" type="checkbox" value="" className="border-[1px] border-gray-100 h-4 w-4 text-[#ECECEC] rounded" />
            <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium dark:text-gray-300">신청완료 후 취소 불가에 동의합니다.</label>
          </div>
        </div>
        <div className="fixed bottom-5  max-w-[560px] gap-2.5 flex flex-col left-0 right-0 w-[calc(100%-40px)]">
          <button onClick={() => onButtonClick('pagethree')}
           className="w-full h-12 bg-[#0868FD] flex items-center justify-center text-white border-[1px] border-blue-600">신청 진행하기</button>
          <button onClick={() => onButtonClick('pageone')}
           className="w-full h-12 flex items-center justify-center bg-white text-[#0868FD] border-[1px] border-blue-600">취소하기</button>
        </div>
      </div> 
      </div>
    </>
  );
};

export default Apply;
