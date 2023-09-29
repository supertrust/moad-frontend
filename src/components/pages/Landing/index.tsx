import React from "react";

import logo from "../../../../public/images/landing/header/logo-pc.svg";
import logoMb from "../../../../public/images/landing/header/logo-mb.svg";
import sec1Img from "../../../../public/images/landing/main/img-section-1.svg";
import mbImg1 from "../../../../public/images/landing/main/bg-section-1-mb.png";
import { useState } from "react";

import Image from "next/image";
import "animate.css";
import "animate.css/animate.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import HeaderComp from "./component/header/header";

const Landing = () => {
  const [isShowMobileNav, setIsShowMobileNav] = useState<Boolean>(false);
  const navClassName = isShowMobileNav ? "_nav active" : "_nav";

  const toggleMobileNav = () => {
    setIsShowMobileNav(!isShowMobileNav);
  };
  return (
    <div id='landing_'>
      <HeaderComp />
      <main id='mian'>
        <section className='section01'>
          <div className='section01-container'>
            <div className='container'>
              <div className='_title'>
                <strong className='pc-point'>이카루스</strong>
                <br />
                <strong className='mb-point'>움직이는 광고판,</strong>
                <br />
                전국광고의 시작
              </div>
              <a
                href='inquire'
                className='inquire-link'>
                서비스 문의하기
              </a>
            </div>
            <div className='section01-img'>
              <Image
                src={sec1Img}
                alt=''
                className='img'
              />
            </div>
            <div className='section01-mb-bg'>
              {/* <img src="./images/main/bg-section-1-mb.png" alt=""> */}
              <Image
                src={mbImg1}
                alt='image'
              />
            </div>
          </div>
        </section>
        <section className='section02'>
          <div className='_text'>
            최고를 지향하며 사명감과 신념으로 <br />
            <p className='_text text-black'>차량광고</p>의 선두주자로 여러분의
            곁에
            <br className='only-mb' /> 서고자 하는 <br className='only-pc' />
            <p className='_text text-black'>우리는</p>{" "}
            <p className='_text text-blue'>이카루스</p>
            <p className='_text text-black'>입니다.</p>
          </div>
          <div className='_sub-text'>
            시인성, 이동성, 경제성 모든 것을 만족시키고,
            <br className='only-mb' /> 효율과 능률적인 면에서 최고를 지향합니다.
          </div>
        </section>
        <section className='section03'>
          <div className='container'>
            <div className='_text'>
              움직이는 광고판,
              <br />
              <strong className='_text'>차량 랩핑광고</strong>를 소개합니다.
            </div>
            <ul className='_list-wrap'>
              <li className='_list'>
                <div className='list-title'>기업의 가치와 품위</div>
                <div className='list-text'>
                  브랜드 광고를 통한 기업의 가치와 품위를 높여줍니다.
                </div>
              </li>
              <li className='_list'>
                <div className='list-title'>좋은 시인성과 이동성</div>
                <div className='list-text'>
                  뛰어난 시인성으로 고객을 사로잡아 강하게 인식시킵니다.
                </div>
              </li>
              <li className='_list'>
                <div className='list-title'>적은 비용으로 최대의 효과</div>
                <div className='list-text'>
                  면적 대비 저렴한 비용과 뛰어난 노출 효과로 최대의 효율을
                  발휘합니다.
                </div>
              </li>
            </ul>
            <div
              className='swiper mb-slide'
              id='mb_slide'>
              <Swiper
                className='list-wrap-mb swiper-wrapper'
                spaceBetween={10}
                slidesPerView={1.1}
                // onSlideChange={() => console.log("slide change")}
                // onSwiper={(swiper) => console.log(swiper)}
              >
                <SwiperSlide className="_list swiper-slide'">
                  <div className='list-num'>01</div>
                  <div className='list-title'>기업의 가치와 품위</div>
                  <div className='list-text'>
                    브랜드 광고를 통한 기업의 가치와 품위를 높여줍니다.
                  </div>
                </SwiperSlide>

                <SwiperSlide className="_list swiper-slide'">
                  <div className='list-num'>02</div>
                  <div className='list-title'> 좋은 시인성과 이동성</div>
                  <div className='list-text'>
                    뛰어난 시인성으로 고객을 사로잡아 강하게 인식시킵니다.
                  </div>
                </SwiperSlide>

                <SwiperSlide className="_list swiper-slide'">
                  <div className='list-num'>03</div>
                  <div className='list-title'>적은 비용으로 최대의 효과</div>
                  <div className='list-text'>
                    면적 대비 저렴한 비용과 뛰어난 노출 효과로 최대의 효율을
                    발휘합니다.
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </section>
        <section className='section04'>
          <div className='container'>
            <div className='_title-wrap'>
              <div className='_title'>
                화물 랩핑광고
                <br className='only-pc' />
                어디서 어떻게
                <br />
                시작해야 할까요?
              </div>
              <div className='_sub-text'>
                원하는 차량 선택부터 광고리포트까지
                <br />
                모두 이카루스에서!
              </div>
            </div>
            <ul className='_list-wrap'>
              <li className='_list'>
                <div className='_text-wrap'>
                  <div className='_text'>
                    내가 원하는 차량을 직접 선택할 수{" "}
                    <br className='d-none-desktop' />
                    있으며,
                    <br className='d-none-mobile' />
                    차량과의{" "}
                    <strong className='_text'>계약부터 정산 진행까지</strong>
                    <br />
                    <strong className='_text'>
                      이카루스에서 도와드립니다.
                    </strong>
                  </div>
                </div>
              </li>
              <li className='_list'>
                <div className='_text-wrap'>
                  <div className='_text'>
                    <strong className='_text'>
                      디자인 시안이 없어도 OK, 걱정하지
                      <br className='d-none-desktop' />
                      마세요!
                    </strong>
                    <br className='d-none-mobile' />
                    직종에 맞는 최상의 디자인을{" "}
                    <br className='d-none-desktop' /> 제작해드립니다.
                  </div>
                </div>
              </li>
              <li className='_list'>
                <div className='_text-wrap'>
                  <div className='_text'>
                    실시간 <strong className='_text'>광고 현황</strong>은 물론
                    <br />
                    <strong className='_text'>광고 리포트까지 확인</strong>하실
                    수 있어요.
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section className='section05'>
          <div className='container'>
            <div className='_title'>
              차량광고 중개 플랫폼
              <br />
              이카루스와 함께 하세요
            </div>
            <div className='btns'>
              <a
                href=''
                className='btn google-store'>
                <i className='icon'></i>
                <div className='link-text'>
                  <div className='_text'>화물주 전용앱</div>
                  <div className='down-text'>
                    다운로드 <span className='down-text'></span>
                  </div>
                </div>
              </a>
              <a
                href=''
                className='btn app-store'>
                <i className='icon'></i>
                <div className='link-text'>
                  <div className='_text'>화물주 전용앱</div>
                  <div className='down-text'>
                    다운로드 <span className='down-text'></span>
                  </div>
                </div>
              </a>
              <a
                href=''
                className='btn system'>
                <i className='icon'></i>
                <div className='link-text'>
                  <div className='_text'>광고주 시스템</div>
                  <div className='down-text'>
                    다운로드 <span className='down-text'></span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer id='footer'>
        <div className='container'>
          <div className='terms-line'>
            <ul className='_list-wrap'>
              <li className='_list'>
                <a
                  href=''
                  className='link'>
                  이용약관
                </a>
              </li>
              <li className='_list'>
                <a
                  href=''
                  className='link'>
                  개인정보처리방침
                </a>
              </li>
            </ul>
          </div>
          <div className='company-line'>
            <span className='_text'>주식회사 애드메타</span>
            <span className='bar'>ㅣ</span>
            <span className='_text'>대표자 : 이진희</span>
          </div>
          <div className='company-num'>
            <span className='_text'>
              세종특별자치시 남세종로 454, 8층 802호 에이864호 (보람동,
              강남제일타워)
            </span>
            <span className='bar'>ㅣ</span>
            <span className='_text'>사업자등록번호 559-87-02646</span>
            <span className='bar'>ㅣ</span>
          </div>
          <div className='copyright _text'>
            Copyright 2022 ICARUS All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
