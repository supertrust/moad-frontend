import { useGetAdvertisementImages, useGetVehicleDetail, } from "@src/apis/advertisement";
import { API_BASE_URL } from "@src/config";
import { useIcarusContext } from "@src/hooks/useIcarusContext";
import { styles } from "@src/sections/vehicle-info";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";

const imageStyle = {
  objectFit: "cover",
  width: "100%",
  height: "100%",
};

export default function VehicleInfoScreen() {
  const { query } = useRouter();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const {pageTitle,setPageTitle} = useIcarusContext()
  const advertisementId = query.ad_id as string;
  const vehicleId   = query.vehicle_id as string;
  const { data: advertisement } = useGetVehicleDetail({
    advertisement_id: advertisementId,
    cargo_vehicle_id: vehicleId
  }) as { data: any };
  const { data: advertisementImages } = useGetAdvertisementImages({
    advertisement_id: advertisementId,
  }) as { data: any };

  useEffect(()=>
  {
    setPageTitle("차량정보")
  },[])


  return (
      <div>
        <div className={styles.container}>
          <div className={styles.board_content}>
            <div className={styles.vehicle_information_content}>
              <div className={styles.page_link}>
                <a href="/ad-management" className={styles.link}>
                  광고관리
                </a>
                <span className={styles.link}>&gt;</span>
                <a href="/ad-detail-list" className={styles.link}>
                  신제품 홍보 출시기념
                </a>
                <span className={styles.link}>&gt;</span>
                <div className={styles.link}>차량정보</div>
              </div>

              <div className={styles.content_inner}>
                <div className={`${styles.slide_box} ${styles.content_body}`}>
                  <Swiper
                      spaceBetween={10}
                      navigation={true}
                      thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className={styles.slider}
                  >
                    <SwiperSlide>
                      <div className={styles.badge}>
                        <div className={styles.text}>옆면</div>
                        <div className={styles.text_sub}>(운전석)</div>
                      </div>
                      <Image
                          className={styles.img}
                          src={
                              advertisementImages &&
                              `${API_BASE_URL}${advertisementImages[0]?.image_path}`
                          }
                          alt={
                              advertisementImages &&
                              advertisementImages[0]?.image_title
                          }
                          width={500}
                          height={500}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className={styles.badge}>
                        <div className={styles.text}>옆면</div>
                        <div className={styles.text_sub}>(운전석)</div>
                      </div>
                      <Image
                          src={
                              advertisementImages &&
                              `${API_BASE_URL}${advertisementImages[1]?.image_path}`
                          }
                          alt={
                              advertisementImages &&
                              advertisementImages[1]?.image_title
                          }
                          className={styles.img}
                          width={500}
                          height={500}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className={styles.badge}>
                        <div className={styles.text}>옆면</div>
                        <div className={styles.text_sub}>(운전석)</div>
                      </div>
                      <Image
                          src={
                              advertisementImages &&
                              `${API_BASE_URL}${advertisementImages[2]?.image_path}`
                          }
                          alt={
                              advertisementImages &&
                              advertisementImages[2]?.image_title
                          }
                          className={styles.img}
                          width={500}
                          height={500}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className={styles.badge}>
                        <div className={styles.text}>옆면</div>
                        <div className={styles.text_sub}>(운전석)</div>
                      </div>
                      <Image
                          src={
                              advertisementImages &&
                              `${API_BASE_URL}${advertisementImages[3]?.image_path}`
                          }
                          alt={
                              advertisementImages &&
                              advertisementImages[3]?.image_title
                          }
                          className={styles.img}
                          width={500}
                          height={500}
                      />
                    </SwiperSlide>
                  </Swiper>
                  <Swiper
                      onSwiper={setThumbsSwiper}
                      spaceBetween={10}
                      slidesPerView={4}
                      freeMode={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className={styles.thumbs_slider}
                  >
                    <SwiperSlide className={styles.swiperslide}>
                      <Image
                          src={
                              advertisementImages &&
                              `${API_BASE_URL}${advertisementImages[0]?.image_path}`
                          }
                          alt={
                              advertisementImages &&
                              advertisementImages[0]?.image_title
                          }
                          width={500}
                          height={500}
                      />
                    </SwiperSlide>
                    <SwiperSlide className={styles.swiperslide}>
                      <Image
                          src={
                              advertisementImages &&
                              `${API_BASE_URL}${advertisementImages[1]?.image_path}`
                          }
                          alt={
                              advertisementImages &&
                              advertisementImages[1]?.image_title
                          }
                          width={500}
                          height={500}
                      />
                    </SwiperSlide>
                    <SwiperSlide className={styles.swiperslide}>
                      <Image
                          src={
                              advertisementImages &&
                              `${API_BASE_URL}${advertisementImages[2]?.image_path}`
                          }
                          alt={
                              advertisementImages &&
                              advertisementImages[2]?.image_title
                          }
                          width={500}
                          height={500}
                      />
                    </SwiperSlide>
                    <SwiperSlide className={styles.swiperslide}>
                      <Image
                          src={
                              advertisementImages &&
                              `${API_BASE_URL}${advertisementImages[3]?.image_path}`
                          }
                          alt={
                              advertisementImages &&
                              advertisementImages[3]?.image_title
                          }
                          width={500}
                          height={500}
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>

                <div className={`${styles.table_box} ${styles.content_body}`}>
                  <div className="vehicle_number">
                    제 {advertisement?.car_number} 호
                    <style jsx>{`
                    .vehicle_number {
                      padding: 38px 30px;
                      font-weight: 700;
                      font-size: 22px;
                      line-height: 32px;
                      color: #2c324c;
                    }
                  `}</style>
                  </div>
                  <ul className={styles.list_wrap}>
                    <li className={styles.list}>
                      <div className={`${styles.title} ${styles.text}`}>
                        차량종류
                      </div>
                      <div className={`${styles.value} ${styles.text}`}>
                        {
                          advertisement?.vehicle
                              ?.vehicle_type
                        }
                      </div>
                    </li>
                    <li className={styles.list}>
                      <div className={`${styles.title} ${styles.text}`}>
                        평균 운행거리 (월)
                      </div>
                      <div className={`${styles.value} ${styles.text}`}>
                        {
                          advertisement
                              ?.estimated_driving_distance
                        }
                      </div>
                    </li>
                    <li className={styles.list}>
                      <div className={`${styles.title} ${styles.text}`}>
                        평균 운행일수 (월)
                      </div>
                      <div className={`${styles.value} ${styles.text}`}>
                        {
                          advertisement
                              ?.monthly_avg_operating_days
                        }
                      </div>
                    </li>
                    <li className={styles.list}>
                      <div className={`${styles.title} ${styles.text}`}>
                        일평균 운행시간 (일)
                      </div>
                      <div className={`${styles.value} ${styles.text}`}>
                        일{" "}
                        {advertisement?.daily_avg_drive_time}{" "}
                        시간
                      </div>
                    </li>
                    {advertisement?.fixed_destination ==
                        "Yes" && (
                            <>
                              <li className={styles.list}>
                                <div className={`${styles.title} ${styles.text}`}>
                                  고정 출발지
                                </div>
                                <div className={`${styles.title} ${styles.text}`}>
                                  {
                                    advertisement
                                        ?.start_point
                                  }
                                </div>
                                <div className={`${styles.value} ${styles.text}`}>
                                  -
                                </div>
                              </li>
                              <li className={styles.list}>
                                <div className={`${styles.title} ${styles.text}`}>
                                  고정 도착지
                                </div>
                                <div className={`${styles.value} ${styles.text}`}>
                                  {advertisement?.end_point}
                                </div>
                              </li>
                            </>
                        )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
