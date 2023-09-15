import React from "react";

import logo from "../../../../public/images/landing/header/logo-pc.svg"
import logoMb from "../../../../public/images/landing/header/logo-mb.svg"
import sec1Img from "../../../../public/images/landing/main/img-section-1.svg"

import Image from "next/image";

const Landing = () => {
  return (
    <div id="landing_">
      <header id="header" className="header">
        <div className="header-continer">
          <h1 className="logo">
            <a href="#" className="logo-pc">
              {/* <img src="../../../../public/images/landing/header/logo-pc.svg" alt=""  /> */}
              <Image src={logo} alt="" className="_img" />

            </a>
            <a href="#" className="logo-mb">
              <Image src={logoMb} alt="" />
            </a>
          </h1>
          <button className="menu-mb-btn only-mb" id="menu_mb_btn"></button>
          <nav id="nav" className="nav">
            <div className="menu-mb-top only-mb">
              <h1 className="menu-logo">
                <a href="#" className="logo-mb">
                    <Image src={logoMb} alt="" />
                </a>
              </h1>
              <button className="menu-close-btn" id="menu_close_btn"></button>
            </div>
            <ul className="menu">
              <li className="menu-pl-list main active">
                <a href="main" className="menu-link">
                  서비스소개
                </a>
              </li>
              <li className="menu-pl-list about-us">
                <a href="about-us" className="menu-link">
                  회사소개
                </a>
              </li>
              <li className="menu-pl-list inquire">
                <a href="inquire" className="menu-link">
                  문의하기
                </a>
              </li>
            </ul>
            <div className="menu-terms-wrap only-mb">
              <a href="#" className="pl-text">
                이용약관
              </a>
              <a href="#" className="pl-text">
                개인정보처리방침
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main id="mian">
        <section className="section01">
          <div className="section01-container">
            <div className="container">
              <div className="title">
                <strong>이카루스</strong>
                움직이는 광고판,
                <br />
                전국광고의 시작
              </div>
              <a href="inquire" className="inquire-link">
                서비스 문의하기
              </a>
            </div>
            <div className="section01-img">
              <Image src={sec1Img} alt="" className="img" />
            </div>
          </div>
        </section>
        <section className="section02">
          <div className="pl-text">최고를 지향하며 사명감과 신념으로</div>
          <div className="pl-text">
            <p className="pl-text pl-text-black">차량광고</p>의 선두주자로 여러분의
            곁에 서고자 하는
          </div>
          <div className="pl-text pl-text-black">
            우리는 <p className="pl-text pl-text-blue">이카루스</p>입니다.
          </div>
          <div className="sub-pl-text">
            시인성, 이동성, 경제성 모든 것을 만족시키고, 효율과 능률적인 면에서
            최고를 지향합니다.
          </div>
        </section>
        <section className="section03">
          <div className="container">
          <div className="pl-text">
                    움직이는 광고판,<br />
                    <strong className="pl-text-2">차량 랩핑광고를 소개합니다.</strong> 
                </div>
            <ul className="pl-list-wrap">
              <li className="pl-list">
                <div className="pl-list-title">기업의 가치와 품위</div>
                <div className="pl-list-pl-text">
                  브랜드 광고를 통한 기업의 가치와 품위를 높여줍니다.
                </div>
              </li>
              <li className="pl-list">
                <div className="pl-list-title">좋은 시인성과 이동성</div>
                <div className="pl-list-pl-text">
                  뛰어난 시인성으로 고객을 사로잡아 강하게 인식시킵니다.
                </div>
              </li>
              <li className="pl-list">
                <div className="pl-list-title">적은 비용으로 최대의 효과</div>
                <div className="pl-list-pl-text">
                  면적 대비 저렴한 비용과 뛰어난 노출 효과로 최대의 효율을
                  발휘합니다.
                </div>
              </li>
            </ul>
            <div className="mb-slide">
              <ul className="pl-list-wrap">
                <li className="pl-list">
                  <div className="pl-list-num">01</div>
                  <div className="pl-list-title">기업의 가치와 품위</div>
                  <div className="pl-list-pl-text">
                    브랜드 광고를 통한 기업의 가치와 품위를 높여줍니다.
                  </div>
                </li>
                <li className="pl-list">
                  <div className="pl-list-num">02</div>
                  <div className="pl-list-title">좋은 시인성과 이동성</div>
                  <div className="pl-list-pl-text">
                    뛰어난 시인성으로 고객을 사로잡아 강하게 인식시킵니다.
                  </div>
                </li>
                <li className="pl-list">
                  <div className="pl-list-num">03</div>
                  <div className="pl-list-title">적은 비용으로 최대의 효과</div>
                  <div className="pl-list-pl-text">
                    면적 대비 저렴한 비용과 뛰어난 노출 효과로 최대의 효율을
                    발휘합니다.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="section04">
          <div className="container">
            <div className="title-wrap">
              <div className="title">
                화물 랩핑광고
                <br />
                어디서 어떻게
                <br className="only-pc" />
                시작해야 할까요?
              </div>
              <div className="sub-pl-text">
                원하는 차량 선택부터 광고리포트까지
                <br />
                모두 이카루스에서!
              </div>
              <div className="pl-text">
                원하는 차량 선택부터 광고리포트까지
                <br />
                모두 이카루스에서!
              </div>
            </div>
            <ul className="pl-list-wrap">
              <li className="pl-list">
                <div className="pl-text-wrap">
                  <div className="pl-text">
                    내가 원하는 차량을 직접 선택할 수 있으며,
                    <br />
                    
                    <strong className="pl-text">차량과의 계약부터 정산 진행까지</strong>
                    <strong className="pl-text">이카루스에서 도와드립니다.</strong>
                  </div>
                </div>
              </li>
              <li className="pl-list">
                <div className="pl-text-wrap">
                  <div className="pl-text">
                    디자인 시안이 없어도 OK, 걱정하지 마세요!
                    <br />
                    직종에 맞는 최상의 디자인을 제작해드립니다.
                  </div>
                </div>
              </li>
              <li className="pl-list">
                <div className="pl-text-wrap">
                  <div className="pl-text">
                    실시간 광고 현황은 물론
                    <br />
                    광고 리포트까지 확인하실 수 있어요.
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section className="section05">
          <div className="container">
            <div className="title">
              차량광고 중개 플랫폼
              <br />
              이카루스와 함께 하세요
            </div>
            <div className="btns">
              <a href="" className="btn google-store">
                <i className="icon"></i>
                <div className="link-pl-text">
                  <div className="pl-text">화물주 전용앱</div>
                  <div className="down-pl-text">
                    다운로드 <span className="down-pl-text"></span>
                  </div>
                </div>
              </a>
              <a href="" className="btn app-store">
                <i className="icon"></i>
                <div className="link-pl-text">
                  <div className="pl-text">화물주 전용앱</div>
                  <div className="down-pl-text">
                    다운로드 <span className="down-pl-text"></span>
                  </div>
                </div>
              </a>
              <a href="" className="btn system">
                <i className="icon"></i>
                <div className="link-pl-text">
                  <div className="pl-text">광고주 시스템</div>
                  <div className="down-pl-text">
                    다운로드 <span className="down-pl-text"></span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer">
        <div className="container">
          <div className="terms-line">
            <ul className="pl-list-wrap">
              <li className="pl-list">
                <a href="" className="link">
                  이용약관
                </a>
              </li>
              <li className="pl-list">
                <a href="" className="link">
                  개인정보처리방침
                </a>
              </li>
            </ul>
          </div>
          <div className="company-line">
            <span className="pl-text">주식회사 애드메타</span>
            <span className="bar">ㅣ</span>
            <span className="pl-text">대표자 : 이진희</span>
          </div>
          <div className="company-num">
            <span className="pl-text">
              세종특별자치시 남세종로 454, 8층 802호 에이864호 (보람동,
              강남제일타워)
            </span>
            <span className="bar">ㅣ</span>
            <span className="pl-text">사업자등록번호 559-87-02646</span>
            <span className="bar">ㅣ</span>
          </div>
          <div className="copyright pl-text">
            Copyright 2022 ICARUS All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
