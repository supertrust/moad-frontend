import { useGetCargoImage, useGetVehicleDetail, } from "@src/apis/advertisement";
import Loader from "@src/components/Loader";
import { useIcarusContext } from "@src/hooks/useIcarusContext";
import { styles } from "@src/sections/vehicle-info";
import { ICargoImage } from "@src/types/advertisement";
import { Breadcrumb, Skeleton } from "antd";
import { clsx } from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Carousel, Modal } from "react-bootstrap";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import { XMarkIcon } from '@heroicons/react/24/solid';
import ArrowBack from "@src/components/icons/ArrowBack";

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
  const { data: advertisement , isLoading } = useGetVehicleDetail({
    advertisement_id: advertisementId,
    cargo_vehicle_id: vehicleId
  }) ;
  const { data: advertisementImages, isLoading: isImagesLoading } = useGetCargoImage({
    advertisement_id: Number(advertisementId),
    cargo_vehicle_id: Number(vehicleId)
  }) ;

  const [fullSize, showFullSize ] = useState(false);
  const images =  advertisementImages || [undefined, undefined, undefined, undefined];

  useEffect(()=>{
    setPageTitle("차량정보")
  },[])

  const showImage = (image?:  ICargoImage) => {
    const size = 500;
    return (
      <Image
        className={clsx(styles.img, 'rounded-md object-center')}
        src={image?.image_path || '/images/ad-detail-list/no-image.png'}
        alt={image?.image_title || ''}
        width={size}
        height={size}
      />
    )
  }
  const router = useRouter();
  const onBack = () => {
    router.back();
  };

  return (
    <div className="vehicle_information page" id={styles.vehicle_information}>
      <div className={styles.container}>
        <div className={styles.board_content}>
        <div className={`only-mb`}>
              <div className={`${styles["mobile-top-header"]}`}>
                <ArrowBack handleAction={onBack} />
                <div className={styles["header"]}>가이드</div>
                <div></div>
              </div>
            </div>
            <div className={`${styles.slide_box} ${styles.mobile_slider} ${styles.content_body}`}>
                  <div  className={styles.slider}>

                  <div className={`${styles.badge} hidden sm:block`}>
                      <div className={styles.text}>옆면</div>
                      <div className={styles.text_sub}>(운전석)</div>
                    </div>
                    
                    <Image
                      className={`${styles.img} ${styles.main_img} hidden sm:block`}
                      src={!isImagesLoading && images?.length && images[0]?.image_path || '/images/ad-detail-list/no-image.png'}
                      alt={!isImagesLoading  && images?.length && images[0]?.image_title || ''}
                      width={500}
                      height={500}
                      onClick={() => showFullSize(true)}
                    />
                  </div>
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={1}
                    breakpoints={{
                      640: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                      },
                      768: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                      },
                      1024: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                      },
                    }}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className={styles.thumbs_slider}
                  >
                    {images.map( (image, index) => 
                      <SwiperSlide className={styles.swiperslide}  
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          showFullSize(true)
                        }}
                      >
                        <div className={styles.badge}>
                      <div className={styles.text}>옆면</div>
                      <div className={styles.text_sub}>(운전석)</div>
                    </div>
                        {showImage(image)}
                      </SwiperSlide>
                    )}
                  </Swiper>
                </div>
          <div className={styles.vehicle_information_content}>
            <Breadcrumb 
              separator='>'
              items={[
                {
                  href: "/dashboard/ad-management",
                  title: "광고관리",
                },  {
                  href: `/dashboard/advertisement-detail/${advertisementId}`,
                  title: "이카루스 신제품 출시",
                },{
                  title: "차량정보",
                }
              ]}
              className={`text-[#2c324c] mb-[25px] ${styles.breadcrumb}`}
            />

            {isLoading ? 
              <Loader size="lg" className="flex flex-row"/> :
              <div className={styles.content_inner}>
                <div className={`${styles.slide_box} ${styles.pc_slider} ${styles.content_body}`}>
                  <div  className={styles.slider}>

                  <div className={`${styles.badge} hidden sm:block`}>
                      <div className={styles.text}>옆면</div>
                      <div className={styles.text_sub}>(운전석)</div>
                    </div>
                    
                    <Image
                      className={`${styles.img} ${styles.main_img} hidden sm:block`}
                      src={!isImagesLoading && images?.length && images[0]?.image_path || '/images/ad-detail-list/no-image.png'}
                      alt={!isImagesLoading  && images?.length && images[0]?.image_title || ''}
                      width={500}
                      height={500}
                      onClick={() => showFullSize(true)}
                    />
                  </div>
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={1}
                    breakpoints={{
                      640: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                      },
                      768: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                      },
                      1024: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                      },
                    }}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className={styles.thumbs_slider}
                  >
                    {images.map( (image, index) => 
                      <SwiperSlide className={styles.swiperslide}  
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          showFullSize(true)
                        }}
                      >
                        {/* <div className={styles.badge}>
                      <div className={styles.text}>옆면</div>
                      <div className={styles.text_sub}>(운전석)</div>
                    </div> */}
                        {showImage(image)}
                      </SwiperSlide>
                    )}
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
                                <div className={`${styles.value} ${styles.text}`}>
                                  {
                                    advertisement
                                        ?.start_point
                                  }
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
            }
          </div>
        </div>
      </div>
        <Modal 
          show={fullSize && !!advertisementImages?.length} 
          centered size="lg" 
          className="gallery"
          contentClassName="bg-transparent m-0 border-none"
        >
          <Modal.Body className="m-0 flex-1">
            <XMarkIcon 
              width={25} 
              className="p-1 bg-[#000] bg-opacity-70 text-white absolute right-6 top-6 z-50 rounded-sm cursor-pointer"
              onClick={() => showFullSize(false)} 
            />
            <Carousel>
              {images.map((item, index) => (
                  <Carousel.Item key={index}>
                    <div className={styles.badge}>
                      <div className={styles.text}>옆면</div>
                      <div className={styles.text_sub}>(운전석)</div>
                    </div>
                    {showImage(item)}
                  </Carousel.Item>
              ))}
            </Carousel>
          </Modal.Body>
        </Modal>
    </div>
  );
}
