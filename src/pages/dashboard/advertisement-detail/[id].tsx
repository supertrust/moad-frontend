import React from 'react'
import { useState } from "react";
import { Carousel } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/autoplay';

function AdvertisementDetailScreen() {
  const title = '신제품 홍보 출시기념';
  const mockup_arr = [
    {
      'badge_text': '옆면',
      'badge_text2': '(운전석)',
      'img': '/images/ad-detail-list/img-left-mockup.png',
      'default_img': '/images/ad-detail-list/img-left-default.png',
    },
    {
      'badge_text': '옆면',
      'badge_text2': '(조수석)',
      'img': '/images/ad-detail-list/img-right-mockup.png',
      'default_img': '/images/ad-detail-list/img-right-default.png',
    },
    {
      'badge_text': '후면',
      'badge_text2': '',
      'img': '',
      'default_img': '/images/ad-detail-list/img-back-default.png',
    },
  ];
  const ad_detail_arr = [
    {
      'title': '광고이름',
      'value': '이카루스 서비스 오픈 출시기념'
    },
    {
      'title': '광고기간',
      'value': '2023.03.01 ~ 2023.05.31 (3개월)'
    },
    {
      'title': '광고유형',
      'value': '고정형'
    },
    {
      'title': '광고상태',
      'value': '광고검수중'
    },
    {
      'title': '광고지역',
      'value': '서울, 경기, 인천, 대전, 세종, 충남, 충북, 광주, 전남,전북, 대구, 경북, 부산, 울산, 경남, 강원, 제주'
    },
    {
      'title': '광고금액',
      'value': '2,100,000원'
    }];
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const data = [
    { id: 1, registration_number: "10150122호", vehicle_type: "윙바디 1t", operation_vehicle_location: "운행중", vehicle_information: "보기", vehicle_location: "보기" },
    { id: 2, registration_number: "10150122호", vehicle_type: "윙바디 1t", operation_vehicle_location: "운행중", vehicle_information: "보기", vehicle_location: "보기" },
    { id: 3, registration_number: "10150122호", vehicle_type: "윙바디 1t", operation_vehicle_location: "운행중", vehicle_information: "보기", vehicle_location: "보기" },
    { id: 4, registration_number: "10150122호", vehicle_type: "윙바디 1t", operation_vehicle_location: "운행중", vehicle_information: "보기", vehicle_location: "보기" },
    { id: 5, registration_number: "10150122호", vehicle_type: "윙바디 1t", operation_vehicle_location: "운행중", vehicle_information: "보기", vehicle_location: "보기" },

  ]
  const columns = [
    {
      dataField: 'sl.no',
      text: 'no',
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return rowIndex + 1;
      },
      sort: true,
      headerStyle: {
        backgroundColor: 'rgb(244 247 251)', paddingTop: "20px",
        paddingBottom: "20px"
      }
    },
    {
      dataField: "registration_number",
      text: "등록번호",
      sort: true,
      headerStyle: {
        backgroundColor: 'rgb(244 247 251)', paddingTop: "20px",
        paddingBottom: "20px"
      }
    },
    {
      dataField: "vehicle_type",
      text: "차량종류",
      headerStyle: {
        backgroundColor: 'rgb(244 247 251)', paddingTop: "20px",
        paddingBottom: "20px"
      }
    },
    {
      dataField: "operation_vehicle_location",
      text: "운행여부",
      headerStyle: {
        backgroundColor: 'rgb(244 247 251)', paddingTop: "20px",
        paddingBottom: "20px"
      }
    },
    {
      dataField: "vehicle_information",
      text: "차량정보",
      headerStyle: {
        backgroundColor: 'rgb(244 247 251)', paddingTop: "20px",
        paddingBottom: "20px"
      }
    },
    {
      dataField: "vehicle_location",
      text: "차량위치",
      headerStyle: {
        backgroundColor: 'rgb(244 247 251)', paddingTop: "20px",
        paddingBottom: "20px"
      }
    }
  ];
  const [swiper, setSwiper] = useState(false);
  const openBox = () => {
    setSwiper(!swiper);
  }
  const [model, setModel] = useState('image');
  const openModel = (modeltab: string) => {
    setModel(modeltab);
    setSwiper(false);
  }
  return (
    <>
      <div id="ad_detail_list" className="ad-detail-list page">
        <div className="container">
          <div className="sidemenu-wrap">
            {/* <?php
                get_template_part('templates/part/side-menu', null, $args);
            ?> */}
          </div>
          <div className="board-content">
            <div className="inner-header-wrap">
              {/* <?php
                    get_template_part('templates/part/inner-header', null, $args);
                ?> */}
            </div>
            <div className="ad-detail-list-content">
              <div className="page-link">
                <a href="/ad-management" className="link">광고관리</a><span className="link"></span><span className="link"></span><a href="/ad-detail-list" className="link">{title}</a>
              </div>

              <div className="detail-content">
                <div className="slide-box">
                  <div className={model === 'image' ? "detail-slide active" : "detail-slide box"} id="div3d">
                    <div className="swiper-wrapper">

                      <Carousel activeIndex={index} onSelect={handleSelect}>
                        {mockup_arr.map((item, index) => (
                          <Carousel.Item key={index} interval={undefined}>
                            <img src={item.img ? item.img : item.default_img} alt="slides" />
                            <Carousel.Caption className='valu-text'>
                              <h3>{item.badge_text}{item.badge_text2}</h3>
                            </Carousel.Caption>
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    </div>
                  </div>
                  <div className={model === 'model' ? "detail-3d active box" : "detail-3d box"} id="div2d" >
                    <div>
                      3D Model
                    </div>

                  </div>
                  <Swiper
                    direction={"vertical"}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Autoplay]}
                    slidesPerView={1}
                    autoplay={{ delay: 1000 }}
                    className="mySwiper"
                    onClick={openBox}
                  >
                    <SwiperSlide><img src={`/images/ad-detail-list/ic-3d-rotation.svg`} alt="" /></SwiperSlide>
                    <SwiperSlide><img src={`/images/ad-detail-list/ic-img.png`} alt="" /></SwiperSlide>
                  </Swiper>




                  <div className={swiper ? "mockup-btn active" : "mockup-btn"} >
                    <button onClick={() => { openModel('model') }} type="button" id="3d_btn" className="btns">
                      <i className="ic-3d-rotation icons"></i> <span className="text">360°로 돌려보기</span>
                    </button>
                    <button onClick={() => { openModel('image') }} type="button" id="img_btn" className="btns">
                      <i className="ic-img icons"></i> <span className="text">이미지로 보기</span>
                    </button>
                  </div>

                </div>

                <div className="table-box">
                  {/* <?php foreach($ad_detail_arr as $detail):?>
                        <div className="table-line">
                            <div className="title"><?= $detail['title'] ?></div>
                            <div className="text"><?= $detail['value'] ?></div>
                        </div>
                        <?php endforeach; ?> */}
                  {
                    ad_detail_arr.map((data, index) => (
                      <div key={index} className="table-line">
                        <div className="title">{data.title}</div>
                        <div className="text">{data.value}</div>
                      </div>
                    ))
                  }
                </div>
              </div>

              <div className="ad-contents">
                <div className="tab-menu">
                  <div className="tab-01 tab-title active">전체</div>
                  <div className="tab-02 tab-title">운행중</div>
                  <div className="tab-03 tab-title">운행정지</div>
                </div>

                <BootstrapTable
                  keyField="id"
                  data={data}
                  columns={columns}
                  pagination={paginationFactory({ hideSizePerPage: true, sizePerPage: 6 })}
                  noDataIndication={'진행중인 광고가 없습니다.'}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default AdvertisementDetailScreen