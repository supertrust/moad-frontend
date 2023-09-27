import React from "react";
import Image from "next/image";
import mainImg from "../../../../public/images/landing/aboutus/img-banner.svg";
import logIntro from "../../../../public/images/landing/aboutus/logo-introduction.png";
import Footer from "./component/footer/footer";
import HeaderComp from "./component/header/header";

const AboutComp = () => {
  return (
    <div className='_about-page-root'>
      <HeaderComp />
      <main
        id='about'
        className='page'>
        <div className='page-title-text'>
          이카루스는 고객사를
          <br />
          최우선으로 생각합니다
        </div>
        <div className='about-content'>
          <section className='about-section about-banner'>
            <div className='about-banner-bg'></div>
            <h2 className='about-banner-text'>회사소개</h2>
            <div className='about-banner-img'>
              <div className='banner-img-inner'>
                <Image
                  className='_img'
                  src={mainImg}
                  alt=''
                />
              </div>
            </div>
          </section>

          <section className='about-section about-introduction'>
            <div className='introduction-logo'>
              <>
                <Image
                  className='_img'
                  src={logIntro}
                  alt=''
                />
              </>
            </div>

            <div className='introduction-text introduction-text-pc'>
              수 많은 광고 매체들 중 가장 효율적인 마케팅이 무엇인지 고민해온
              이카루스는
              <br />
              <span>축적된 노하우와 일원화된 시스템</span>을 바탕으로
              <br />
              <span>가장 합리적인 광고 솔루션</span>을 고객사에게 제공합니다.
              <br />
              <br />
              아울러 이카루스는 앞선 경영과 고객사의{" "}
              <span>브랜드 가치를 높이고</span> 더 나아가
              <br />
              <span>매출 증대로 이루어질 수 있도록</span> 파트너로서 최선을
              다하도록 하겠습니다.
            </div>

            <div className='introduction-text introduction-text-mb'>
              수 많은 광고 매체들 중 가장 효율적인 마케팅이
              <br />
              무엇인지 고민해온 이카루스는 <span>축적된 노하우와</span>
              <br />
              <span>일원화된 시스템</span>을 바탕으로 <span>가장 합리적인</span>
              <br />
              <span>광고 솔루션</span>을 고객사에게 제공합니다.
              <br />
              <br />
              아울러 이카루스는 앞선 경영과
              <br />
              고객사의 <span>브랜드 가치를 높이고</span> 더 나아가
              <br />
              <span>매출 증대로 이루어질 수 있도록</span>
              <br />
              파트너로서 최선을 다하도록 하겠습니다.
            </div>
          </section>

          <section className='about-section about-flowing-banner'>
            <div className='flowing-banner-text flowing-banner-text1'>
              Cargo Wrapping Advertising Service Cargo Wrapping Advertising
              Service Cargo Wrapping Advertising Service Cargo Wrapping
              Advertising Service Cargo Wrapping Advertising Service Cargo
              Wrapping Advertising Service
            </div>
            <div className='flowing-banner-text flowing-banner-text2'>
              We increase the value of your brand We increase the value of your
              brand We increase the value of your brand We increase the value of
              your brand We increase the value of your brand We increase the
              value of your brand We increase the value of your brand
            </div>
            <div className='flowing-banner-img flowing-banner-img1'>
              <div className='img-inner img1-inner'></div>
            </div>
            <div className='flowing-banner-img flowing-banner-img2'>
              <div className='img-inner img2-inner'></div>
            </div>
          </section>

          <section className='about-section about-info-list'>
            <div className='info-list-title-wrap'>
              <h2 className='info-list-sub'>이카루스</h2>
              <h2 className='info-list-title'>삶의 1년과 기원</h2>
            </div>
            <div className='info-list-grid-wrap'>
              <div className='info-list-grid'>
                <div className='list-grid-num list-grid-num1'></div>
                <h3 className='list-grid-title'>제1장 : 기원 (작년 -1년)</h3>
                <div className='list-grid-text'>
                  이카루스의 창립은 광고 산업의 혁신에 의한 것입니다.
                  <br />
                  창립자들은 고객과 광고주 간 연결을 혁신하고자 플랫폼을 만들기
                  위해 떠났습니다.
                </div>
              </div>
              <div className='info-list-grid'>
                <div className='list-grid-num list-grid-num2'></div>
                <h3 className='list-grid-title'>제2장 : 출발 (작년 - 올해)</h3>
                <div className='list-grid-text'>
                  이카루스 팀은 업계 경험이 풍부한 전문가들로 구성되었고,
                  <br />
                  초기 자금을 확보하여 플랫폼 개발에 착수했습니다.
                </div>
              </div>
              <div className='info-list-grid'>
                <div className='list-grid-num list-grid-num3'></div>
                <h3 className='list-grid-title'>제3장 : 성장 (올해)</h3>
                <div className='list-grid-text'>
                  이카루스는 공식 출시 후 사용자 및 클라이언트 피드백을 수용하여
                  성장하였고,
                  <br />
                  다양한 광고 솔루션을 제공하며 파트너와의 협업을
                  강화하였습니다.
                </div>
              </div>
              <div className='info-list-grid'>
                <div className='list-grid-num list-grid-num4'></div>
                <h3 className='list-grid-title'>제4장 : 도전과 극복 (올해)</h3>
                <div className='list-grid-text'>
                  1년 동안의 도전과 어려움은 이카루스 팀의 민첩성과 합리적인
                  대응으로
                  <br />
                  극복되었으며, 이로써 회사의 전략을 발전시켰습니다.
                </div>
              </div>
              <div className='info-list-grid'>
                <div className='list-grid-num list-grid-num5'></div>
                <h3 className='list-grid-title'>
                  제5장 : 성장과 미래 (올해와 그 이후)
                </h3>
                <div className='list-grid-text'>
                  이카루스는 성과를 경험하고 미래에 대한 버전을 제시하며 계속
                  성장합니다.
                </div>
              </div>
              <div className='info-list-grid'>
                <div className='list-grid-num list-grid-num6'></div>
                <h3 className='list-grid-title'>제6장 : 회고 (올해)</h3>
                <div className='list-grid-text'>
                  지난 1년 동안의 회사 성과와 고객, 사용자 평가에 대한 회고와{" "}
                  <br />
                  감사 인사가 포함됩니다.
                </div>
              </div>
            </div>
          </section>

          <section className='about-section about-app-wrap'>
            <div className='about-app-container'>
              <div className='about-app-title'>
                차량광고 중개 플랫폼
                <br />
                이카루스와 함께 하세요
              </div>
              <div className='about-app-btns'>
                <a
                  href=''
                  className='about-app-btn about-google-store'>
                  <i className='about-app-icon'></i>
                  <div className='about-app-link-text'>
                    <div className='about-app-text'>화물주 전용앱</div>
                    <div className='about-app-down-text'>
                      다운로드 <span className='about-app-down-text'></span>
                    </div>
                  </div>
                </a>
                <a
                  href=''
                  className='about-app-btn about-app-store'>
                  <i className='about-app-icon'></i>
                  <div className='about-app-link-text'>
                    <div className='about-app-text'>화물주 전용앱</div>
                    <div className='about-app-down-text'>
                      다운로드 <span className='about-app-down-text'></span>
                    </div>
                  </div>
                </a>
                <a
                  href=''
                  className='about-app-btn about-system'>
                  <i className='about-app-icon'></i>
                  <div className='about-app-link-text'>
                    <div className='about-app-text'>광고주 시스템</div>
                    <div className='about-app-down-text'>
                      다운로드 <span className='about-app-down-text'></span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutComp;
