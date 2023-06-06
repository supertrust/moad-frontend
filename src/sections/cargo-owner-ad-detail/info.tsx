import React,{useState} from "react";
import Image from "next/image";

const Info = ({ onButtonClick }:{onButtonClick: any}) => {
  return (
    <>
     <div className="bg-[#F5F7FB] flex flex-col ">
        <div className="container bg-white max-w-[600px] mx-auto px-[20px]">
          <div className="py-2.5">
            <div className="mb-2.5">
              <div className="relative">
                <div className="absolute left-5 top-5">
                  <h6 className="text-white font-normal">산업융합</h6>
                  <h4 className="text-white font-medium text-2xl">규제샌드박스</h4>
                </div>
                <Image className="w-full rounded-[6px]" src="/images/cargo-owner-ad-list/cardbox.jpg" alt='cardbox' priority={false}  width={150} height={50} />
              </div>
            </div>

            <div className="form_info demo">
              <strong>
                산업융합 규제샌드박스 제도 홍보 캠페인 3_추가모집
              </strong>
              <div className="form_details">
                <div className="form-name flex gap-4 py-2">
                  <p className="w-[100px]">
                    광고주
                  </p>
                  <span className="min-w-[calc(100%-124px)]">
                    한국산업기술진흥원(KIAT)
                  </span>
                </div>

                <div className="form-name flex gap-4 py-2">
                  <p className="min-w-[100px]">
                    모집기간
                  </p>
                  <span className="min-w-[calc(100%-124px)]">
                    2023.04.12 ~ 2023.04.18
                  </span>
                </div>

                <div className="form-name flex gap-4 py-2">
                  <p className="min-w-[100px]">
                    모집차량
                  </p>
                  <span className="min-w-[calc(100%-124px)]">
                    <div className="flex gap-1 mb-2 items-center">
                      <div className="min-w-[40px]"><strong>1t</strong></div>
                      <div className="min-w-[60px]">10/120</div>
                      <div className="ml-auto"></div>
                    </div>
                    <div className="flex gap-1 mb-2 items-center">
                      <div className="min-w-[40px]"><strong className="text-[#999999]">2.5t</strong></div>
                      <div className="min-w-[60px] text-[#999999]">10/10</div>
                      <div className="ml-auto">
                        <button className="bg-[#F5F7FB] min-w-[44px] w-full h-6 text-[12px] text-[#878787] flex items-center justify-center">
                          마감
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-2 items-center">
                      <div className="min-w-[40px]"><strong className="text-[#999999]">5t</strong></div>
                      <div className="min-w-[60px] text-[#999999]">5/5</div>
                      <div className="ml-auto">
                        <button className="bg-[#F5F7FB] min-w-[44px] w-full h-6 text-[12px] text-[#878787] flex items-center justify-center">
                          마감
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-2 items-center">
                      <div className="min-w-[40px]"><strong>11t</strong></div>
                      <div className="min-w-[60px]">10/120</div>
                      <div className="ml-auto">

                      </div>
                    </div>
                  </span>

                </div>

                <div className="form-name flex gap-4 py-2">
                  <p className="min-w-[100px]">
                    광고기간
                  </p>
                  <span className="min-w-[calc(100%-124px)]">
                    2023.04.12 ~ 2023.04.18
                  </span>
                </div>

                <div className="form-name flex gap-4 py-2">
                  <p className="min-w-[100px]">
                    신청가능지역
                  </p>
                  <span className="min-w-[calc(100%-124px)]">
                    <div className="area_wrp ">
                      <ul className="flex flex-wrap w-11/12">
                        <li> 지역,</li>
                        <li>지역,</li>
                        <li>지역,</li>
                        <li>지역,</li>
                        <li>지역,</li>
                      </ul>
                    </div>
                  </span>
                </div>

                <div className="form-name flex gap-4 py-2">
                  <p className="min-w-[100px]">
                    지역기준
                  </p>
                  <span className="min-w-[calc(100%-124px)]">
                    차량운행지
                  </span>
                </div>

                <div className="form-name flex gap-4 py-2">
                  <p className="min-w-[100px]">
                    스티커 부착 위치
                  </p>
                  <span className="min-w-[calc(100%-124px)]">
                    오른쪽, 왼쪽, 뒷면
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="container bg-[#fff] p-2.5 max-w-[600px] mx-auto btn_wrp mt-2.5 px-[20px]">
          <button onClick={() => onButtonClick('pagetwo')} className="bg-white border-2 border-blue-600  text-blue-600 w-full py-3 px-11 text-center gap-0 flex justify-center">
            신청하기
          </button>
          <p>
            조수석 앞쪽/뒤쪽 도어에 30일간 부착하는
          </p>
        </div>
      </div>
    </>
  );
};

export default Info;
