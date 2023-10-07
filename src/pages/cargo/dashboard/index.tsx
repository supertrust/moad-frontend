import React from "react";
import { styles } from "@src/components/pages/cargo";
import { Button, Carousel } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useGetCargoAdvertisementList } from "@src/apis/cargo/submitted-advertisement";
import { useGetCargoSubmittedAdvertisementList } from "@src/apis/cargo";

const CargoOwnerDashboardScreen = () => {
  const { data: advertisements } = useGetCargoSubmittedAdvertisementList();
  console.log("advertisements", advertisements);
  const Types = {
    fixed_ad: "고정",
    national_ad: "국가",
    spot_ad: "스팟",
  };
  const contentStyle: React.CSSProperties = {
    display: "inline-block",
    height: "108px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    width: "100%",
  };
  return (
    <div>
      <div className="px-[20px]">
        <div className="hidden">
          <div className="mb-16">
            <h4 className="text-[20px] mb-[9px] text-[#373737]">
              제 10150122호
            </h4>
            <h2 className="text-[30px] font-normal leading-normal text-[#373737]">
              지금 진행중인
              <br />
              광고가 없습니다.
            </h2>
          </div>
          <div className="flex justify-center items-center w-full">
            <div className="w-[160px] h-[160px] rounded-full bg-[#057AFB] flex items-center justify-center flex-col">
              <h5 className="text-white font-[350] text-[26px] mb-[12px]">
                운행
              </h5>
              <h2 className="text-white font-medium text-[45px]">시작</h2>
            </div>
          </div>
        </div>
        <div className="mb-[20px]">
          <div className="mb-[16px]">
            <h4 className="text-sm text-[#373737] font-medium mb-1">
              환영합니다,
              <span className="text-base text-[#373737] font-bold">
                제 10150122호 님 👋🏻
              </span>
            </h4>
            <h3 className="text-xl text-[#373737] font-medium mb-3">
              지금은 <span className="text-[#6F57FF]">운행중</span>입니다.
            </h3>
            <div className="text-sm text-[#6B7280] font-normal">
              <div className="flex items-center gap-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M16.2562 12.075C16.8012 11.0516 17.0854 9.90953 17.0837 8.75002C17.0837 4.83794 13.9124 1.66669 10.0003 1.66669C6.08825 1.66669 2.917 4.83794 2.917 8.75002C2.91414 10.421 3.50479 12.0386 4.58367 13.3146L4.592 13.325C4.59492 13.3275 4.59742 13.3309 4.5995 13.3334H4.58367L8.787 17.7959C8.94282 17.9613 9.13082 18.093 9.33944 18.1831C9.54805 18.2732 9.77289 18.3197 10.0001 18.3197C10.2274 18.3197 10.4522 18.2732 10.6608 18.1831C10.8694 18.093 11.0574 17.9613 11.2133 17.7959L15.417 13.3334H15.4012L15.4078 13.3254L15.4087 13.3246C15.4387 13.2888 15.4687 13.2529 15.4983 13.2163C15.7873 12.8611 16.0412 12.4787 16.2566 12.0746L16.2562 12.075ZM10.002 11.4584C9.33896 11.4584 8.70308 11.195 8.23424 10.7261C7.76539 10.2573 7.502 9.62139 7.502 8.95835C7.502 8.29531 7.76539 7.65943 8.23424 7.19059C8.70308 6.72175 9.33896 6.45835 10.002 6.45835C10.665 6.45835 11.3009 6.72175 11.7698 7.19059C12.2386 7.65943 12.502 8.29531 12.502 8.95835C12.502 9.62139 12.2386 10.2573 11.7698 10.7261C11.3009 11.195 10.665 11.4584 10.002 11.4584Z"
                      fill="#3772FF"
                    />
                  </svg>
                </div>
                <div>서울시 강남구 개포2동</div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_5000_1916)">
                      <path
                        d="M7.77224 14.04C7.77099 14.037 7.76799 14.035 7.76622 14.0325L6.32997 11.7877C6.22797 11.6202 6.00672 11.5607 5.83422 11.6547L5.70621 11.7335C5.53422 11.8272 5.53797 12.07 5.63972 12.2375L6.56046 13.6657C6.48196 13.6485 6.40271 13.6345 6.32521 13.6142C4.71296 13.1925 3.34872 12.1012 2.58247 10.6205C1.85847 9.22173 1.72247 7.62525 2.19947 6.1245C2.67622 4.62375 3.75846 3.3985 5.15721 2.67475C5.39546 2.5515 5.48846 2.2585 5.36521 2.02075C5.24221 1.78225 4.94896 1.68901 4.71122 1.81251C3.08197 2.65551 1.82997 4.08251 1.27421 5.83051C0.718709 7.57826 0.876959 9.43803 1.72021 11.067C2.61296 12.791 4.20196 14.0618 6.07996 14.5535C6.10121 14.559 6.12346 14.5623 6.14496 14.5678L4.87447 15.212C4.70247 15.3063 4.64546 15.5188 4.74747 15.6863L4.79672 15.814C4.89922 15.9815 5.07547 16.041 5.24696 15.947L7.57246 14.7563C7.57547 14.7543 7.57847 14.7548 7.58149 14.7528L7.73749 14.6675C7.82374 14.6203 7.88074 14.543 7.90349 14.4565C7.92724 14.3702 7.91622 14.2743 7.86524 14.191L7.77224 14.04ZM14.28 5.01272C13.3885 3.28922 11.849 2.0185 9.97121 1.5265C9.83746 1.4915 9.70072 1.46425 9.56421 1.43725L10.8115 0.804747C10.9835 0.710482 11.086 0.497997 10.984 0.330232L10.9347 0.202732C10.8322 0.0349818 10.6104 -0.0242682 10.439 0.0694818L8.11371 1.26023C8.11096 1.26198 8.10771 1.26148 8.10469 1.26348L7.94896 1.34898C7.86244 1.39648 7.80571 1.47347 7.78296 1.55997C7.75921 1.64622 7.77021 1.74197 7.82146 1.82522L7.91396 1.97697C7.91546 1.97997 7.91821 1.98173 7.91996 1.98473L9.35621 4.22923C9.45796 4.39698 9.67946 4.45623 9.85171 4.36225L9.96446 4.28373C10.1365 4.18998 10.1477 3.94723 10.0462 3.77998L9.12119 2.34473C9.32444 2.37598 9.52694 2.41373 9.72469 2.46598C11.3377 2.88848 12.6527 3.97948 13.4184 5.45923C14.1422 6.85797 14.2782 8.45447 13.8009 9.95498C13.3242 11.4557 12.2907 12.6807 10.892 13.4052C10.654 13.5285 10.5612 13.821 10.6845 14.0595C10.7707 14.2257 10.9397 14.3215 11.1157 14.3215C11.1907 14.3215 11.2667 14.3039 11.3387 14.2669C12.968 13.4242 14.1707 11.997 14.7265 10.2495C15.2817 8.50097 15.1232 6.6412 14.28 5.01272Z"
                        fill="#5F7FB9"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_5000_1916">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-[20px] bg-[#F5F7FB] w-full lg:flex">
        {/* <div
          className={`mx-[20px] ${styles.blue_card} flex p-[16px] pb-[16px] flex-col mb-[16px]`}
        > */}
        <div className="lg:w-[50%]">
          <ul>
            {advertisements?.map((data, index) => (
              <li key={index}>
                <Link href={`/cargo/dashboard/cargo-location/${data.cargo_to_advertisers}/vehicle/${data.cargo_vehicle_id}`} >
                  <div
                    className={`mx-[20px] ${styles.blue_card} flex flex-row justify-between	p-[16px] pb-[16px] mb-[16px] text-white`}
                  >
                    <div>{data.ad_name}</div>
                    <div>({Types[data.type]})</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div  className="lg:w-[50%]">
          <div className="mb-[20px] mx-[20px]">
            <Carousel autoplay={false}>
              <div className={`${styles.banner_1} ${styles.banner} `}>
                <div className={`${styles.banner_content}`}>
                  <p>서브텍스트 서브텍스트</p>
                  <p className="text-[#346764] text-[16px] font-bold	">
                    특별 이벤트!
                  </p>
                </div>
              </div>
              <div>
                <div className={`${styles.banner_2} ${styles.banner}`}>
                  <div className={`${styles.banner_content}`}>
                    <p>24시간 긴급출동 서비스</p>
                    <p className="!text-[#0868FD] !text-[14px] font-bold	">
                      HELP CAR 서비스 출동
                    </p>
                  </div>
                </div>
              </div>
            </Carousel>
          </div>
          {/*<div className={`${styles.btnmbwrap} mx-[20px]`}>
            <Button className={`${styles.btnmb}`}>운행시작</Button>
            <Button className={`${styles.btnmb} !text-[#F24747]`}>
              운행종료
            </Button>
          </div>*/}
        </div>
        {/* <h4 className="text-sm text-[#152D51] mb-1">진행중인 광고</h4>
          <h3 className="text-[20px] text-white">진행중인 광고가 없습니다.</h3>
          <h4 className="text-sm text-[#152D51] mb-1">광고진행일</h4>
          <h4 className="text-sm text-[#152D51] mb-1">사진 업로드일</h4>
          <h4 className="text-sm text-[#152D51]">입금일</h4> */}
        {/* </div> */}
        {/* <div className={`${styles.horizontal_scroll} flex mb-[20px]`}>
          <div className={`${styles.horizontal_scroll_box} flex flex-col`}>
            <h4>오늘 운행시간</h4>
            <h6>04:02</h6>
          </div>
          <div className={`${styles.horizontal_scroll_box} flex flex-col`}>
            <h4>오늘 운행거리</h4>
            <h6>
              1600 <span>km</span>
            </h6>
          </div>
          <div className={`${styles.horizontal_scroll_box} flex flex-col`}>
            <h4>총 운행거리</h4>
            <h6>
              30,000 <span>km</span>
            </h6>
          </div>
          <div className={`${styles.horizontal_scroll_box} flex flex-col`}>
            <h4>예상 운행시간(월)</h4>
            <h6>
              150 <span>시간</span>
            </h6>
          </div>
          <div className={`${styles.horizontal_scroll_box} flex flex-col`}>
            <h4>예상 운행거리(월)</h4>
            <h6>
              30,000 <span>km</span>
            </h6>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CargoOwnerDashboardScreen;
