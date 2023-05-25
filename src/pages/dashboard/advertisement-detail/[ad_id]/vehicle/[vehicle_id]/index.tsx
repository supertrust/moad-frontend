import React, { useRef, useState } from "react";
import { styles } from "@src/sections/vehicle-info";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useRouter } from "next/router";
import Image from "next/image";

const imageStyle = {
  objectFit: "cover",
  width: "100%",
  height: "100%",
};

export default function VehicleInfoScreen() {
  const { query } = useRouter();
  const { ad_id, vehicle_id } = query;

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div id={styles.vehicle_information}>
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
                      src={`/images/vehicle_info/img-mockup-sample-01.png`}
                      alt=""
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
                      src={`/images/vehicle_info/img-mockup-sample-02.png`}
                      alt=""
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
                      src={`/images/vehicle_info/img-mockup-sample-03.png`}
                      alt=""
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
                      src={`/images/vehicle_info/img-mockup-sample-04.png`}
                      alt=""
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
                      src={`/images/vehicle_info/img-mockup-sample-01.png`}
                      alt=''
                      width={500}
                      height={500}
                    />
                  </SwiperSlide>
                  <SwiperSlide className={styles.swiperslide}>
                    <Image
                      src={`/images/vehicle_info/img-mockup-sample-02.png`}
                      alt=''
                      width={500}
                      height={500}
                    />
                  </SwiperSlide>
                  <SwiperSlide className={styles.swiperslide}>
                    <Image
                      src={`/images/vehicle_info/img-mockup-sample-03.png`}
                      alt=''
                      width={500}
                      height={500}
                    />
                  </SwiperSlide>
                  <SwiperSlide className={styles.swiperslide}>
                    <Image
                      src={`/images/vehicle_info/img-mockup-sample-04.png`}
                      alt=''
                      width={500}
                      height={500}
                    />
                  </SwiperSlide>
                </Swiper>
              </div>

              <div className={`${styles.table_box} ${styles.content_body}`}>
                <div className="vehicle_number">
                  제 22101301호
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
                      윙바디 1.5t
                    </div>
                  </li>
                  <li className={styles.list}>
                    <div className={`${styles.title} ${styles.text}`}>
                      평균 운행거리 (월)
                    </div>
                    <div className={`${styles.value} ${styles.text}`}>
                      1500km
                    </div>
                  </li>
                  <li className={styles.list}>
                    <div className={`${styles.title} ${styles.text}`}>
                      평균 운행일수 (월)
                    </div>
                    <div className={`${styles.value} ${styles.text}`}>25일</div>
                  </li>
                  <li className={styles.list}>
                    <div className={`${styles.title} ${styles.text}`}>
                      일평균 운행시간 (일)
                    </div>
                    <div className={`${styles.value} ${styles.text}`}>
                      일 7시간
                    </div>
                  </li>
                  <li className={styles.list}>
                    <div className={`${styles.title} ${styles.text}`}>
                      고정 출발지
                    </div>
                    <div className={`${styles.value} ${styles.text}`}>-</div>
                  </li>
                  <li className={styles.list}>
                    <div className={`${styles.title} ${styles.text}`}>
                      고정 도착지
                    </div>
                    <div className={`${styles.value} ${styles.text}`}>
                      경기도 안산시 상록구 월피동
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
