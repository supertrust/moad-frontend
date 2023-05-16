import React from 'react'
import { useState, Suspense } from "react";
import { Carousel } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { styles } from "@src/sections/advertisement-detail";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/autoplay';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import TruckModel from '@src/models/truck';
import { useRouter } from 'next/router';
import { useGetAdvertisementDetail } from '@src/apis/advertisement';

function AdvertisementDetailScreen() {
  const { query } = useRouter();
  const advertisementId = query.id as string;
  const { data: advertisement } = useGetAdvertisementDetail({ id: advertisementId });
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
      'value': advertisement?.ad_name
    },
    {
      'title': '광고기간',
      'value': (advertisement?.start_date && advertisement?.end_date) ? `${advertisement?.start_date} ~ ${advertisement?.end_date} (${advertisement.ad_period}개월)` : "--"
    },
    {
      'title': '광고유형',
      'value': advertisement?.type.replace("_"," ").toUpperCase()
    },
    {
      'title': '광고상태',
      'value': advertisement?.status
    },
    {
      'title': '광고지역',
      'value': '서울, 경기, 인천, 대전, 세종, 충남, 충북, 광주, 전남,전북, 대구, 경북, 부산, 울산, 경남, 강원, 제주'
    },
    {
      'title': '광고금액',
      'value': `${advertisement?.amount}원`
    }];
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex: any, e: any) => {
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
      formatter: (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
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
      <div id={styles.ad_detail_list} className="ad-detail-list page">
        <div className={styles.container}>
          <div className={styles.board_content}>
            <div className={styles.ad_detail_list_content}>
              <div className="page-link">
                <a href="/ad-management" className="link">광고관리</a><span className="link"></span><span className="link"></span><a href="/ad-detail-list" className="link">{title}</a>
              </div>

              <div className={styles.detail_content}>
                <div className={styles.slide_box}>
                  <div className={`${model === 'image' ? styles.active : ""} ${styles.detail_slide} ${styles.box}`} id="div3d">
                    <div className={styles.swiper_wrapper}>

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
                  <div className={`${model === 'model' ? styles.active : ""} ${styles.detail_3d} ${styles.box}`} id="div2d" >
                    <Canvas
                      camera={{ fov: 75, position: [0, 0, 3000] }}
                      style={{
                        backgroundColor: 'white',
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <ambientLight intensity={1.25} />
                      <ambientLight intensity={0.1} />
                      <directionalLight intensity={0.4} />
                      <Suspense fallback={null}>
                        {/* @ts-ignore */}
                        <Center>
                          <TruckModel />
                        </Center>
                      </Suspense>
                      <OrbitControls maxDistance={750} minDistance={500} autoRotate />
                    </Canvas>
                  </div>
                  <Swiper
                    direction={"vertical"}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Autoplay]}
                    slidesPerView={1}
                    autoplay={{ delay: 1000 }}
                    className={styles.mySwiper}
                    onClick={openBox}
                  >
                    <SwiperSlide><img className={styles.img} src={`/images/ad-detail-list/ic-3d-rotation.svg`} alt="" /></SwiperSlide>
                    <SwiperSlide><img className={styles.img} src={`/images/ad-detail-list/ic-img.png`} alt="" /></SwiperSlide>
                  </Swiper>

                  <div className={`${swiper ? styles.active : ""} ${styles.mockup_btn}`} >
                    <button onClick={() => { openModel('model') }} type="button" id="3d_btn" className={styles.btns}>
                      <i className={`${styles.ic_3d_rotation} ${styles.icons}`}></i> <span className={styles.text}>360°로 돌려보기</span>
                    </button>
                    <button onClick={() => { openModel('image') }} type="button" id="img_btn" className={styles.btns}>
                      <i className={`${styles.ic_img} ${styles.icons}`}></i> <span className={styles.text}>이미지로 보기</span>
                    </button>
                  </div>

                </div>

                <div className={styles.table_box}>
                  {
                    ad_detail_arr.map((data, index) => (
                      <div key={index} className={styles.table_line}>
                        <div className={styles.title}>{data.title}</div>
                        <div className={styles.text}>{data.value}</div>
                      </div>
                    ))
                  }
                </div>
              </div>

              <div className={styles.ad_contents}>
                <div className={styles.tab_menu}>
                  <div className={`${styles.tab_01} ${styles.tab_title} ${styles.active}`}>전체</div>
                  <div className={`${styles.tab_02} ${styles.tab_title}`}>운행중</div>
                  <div className={`${styles.tab_03} ${styles.tab_title}`}>운행정지</div>
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
      </div >
    </>
  )
}

export default AdvertisementDetailScreen