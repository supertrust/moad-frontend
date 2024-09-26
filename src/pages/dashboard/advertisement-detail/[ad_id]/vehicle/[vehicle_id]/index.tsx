import { XMarkIcon } from '@heroicons/react/24/solid';
import { useGetCargoImage, useGetVehicleDetail, } from "@src/apis/advertisement";
import ArrowBack from "@src/components/icons/ArrowBack";
import Loader from "@src/components/Loader";
import useAuth from '@src/hooks/useAuth';
import { useIcarusContext } from "@src/hooks/useIcarusContext";
import { styles } from "@src/sections/vehicle-info";
import { ICargoImage } from "@src/types/advertisement";
import { Breadcrumb } from "antd";
import { clsx } from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Carousel,Modal } from "react-bootstrap";
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
  const { dictionary: { adVehicleDetailsPage,pageTitle },isKorean,isPcOnly } = useAuth();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const {setPageTitle} = useIcarusContext()
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
        setPageTitle(adVehicleDetailsPage.title)
    },[isKorean])

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

  const showFullImage = (image?:  ICargoImage) => {
        const size = 1000;
        return (
            <Image
                className={clsx('rounded-md mx-auto')} // `mx-auto` to center, `rounded-md` for rounded corners
                src={image?.image_path || '/images/ad-detail-list/no-image.png'}
                alt={image?.image_title || ''}
                width={1000}
                height={1000}
            />

        )
    }

  const ShowNoImage = ({ classname = "" }: { classname?: string }) => {
    return (
      <div
        className={`${classname} p-[37px] flex flex-col justify-center items-center bg-[#FFFFFF] border-[1px] border-[#EBEDF4] rounded-md	`}
      >
        <Image
          className={clsx(styles.img, "rounded-md object-center !w-6 !h-6")}
          src={"/images/ad-detail-list/no_image_found.svg"}
          alt={"no-image"}
          width={24}
          height={24}
        />
        <p className="text-center pt-1 font-medium text-[#9E9E9E]">
          {adVehicleDetailsPage.imagesAreScheduled}
        </p>
      </div>
    );
  };

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
                <div className={styles["header"]}>{adVehicleDetailsPage.header}</div>
                <div></div>
              </div>
            </div>
            <div className={`${styles.slide_box} ${styles.mobile_slider} ${styles.content_body}`}>
                  <div  className={styles.slider}>

                  <div className={`${styles.badge} hidden sm:block`}>
                      <div className={styles.text}>{adVehicleDetailsPage.badge.text}</div>
                      <div className={styles.text_sub}>({adVehicleDetailsPage.badge.subText})</div>
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
                      <div className={styles.text}>{adVehicleDetailsPage?.imageBadge[index]}</div>
                      {/*<div className={styles.text_sub}>({adVehicleDetailsPage.badge.subText})</div>*/}
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
                  title: adVehicleDetailsPage.breadcrumb[0],
                },  {
                  href: `/dashboard/advertisement-detail/${advertisementId}`,
                  title: adVehicleDetailsPage.breadcrumb[1],
                },{
                  title: adVehicleDetailsPage.breadcrumb[2],
                }
              ]}
              className={`text-[#2c324c] mb-[25px] ${styles.breadcrumb}`}
            />

            {isLoading ?
              <Loader size="lg" className="flex flex-row"/> :
              <div className={styles.content_inner}>
                <div className={`${styles.slide_box} ${styles.pc_slider} ${styles.content_body} flex flex-col !gap-5`}>
                  <div  className={styles.slider}>



                   {!isImagesLoading && images?.length && images[0]?.image_path ?
                    <React.Fragment>
                    <div className={`${styles.badge} hidden sm:block`}>
                      <div className={styles.text}>{adVehicleDetailsPage.imageBadge[0]}</div>
                    </div>
                      <Image
                        className={`${styles.img} ${styles.main_img} hidden sm:block`}
                        src={images[0]?.image_path }
                        alt={images[0]?.image_title || ''}
                        width={500}
                        height={500}
                        onClick={() => showFullSize(true)}
                      />
                   </React.Fragment>
                    :
                    <ShowNoImage classname={'min-h-[428px]'}/>

                  }
                  </div>
                  {images.length > 0 ?
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
                    <div className={styles.text}>{adVehicleDetailsPage.badge.text}</div>
                    <div className={styles.text_sub}>({adVehicleDetailsPage.badge.subText})</div>
                  </div> */}
                      {showImage(image)}
                    </SwiperSlide>
                  )
                }
                </Swiper>
                : (
                  <div className="flex justify-between gap-2">

                    {[0,1,2,3].map((data,index) =>
                        <ShowNoImage key={index} classname={'min-h-[136px]'}/>
                      )}
                  </div>
                )
                  }

                </div>

                <div className={`${styles.table_box} ${styles.content_body}`}>
                  <div className="vehicle_number">
                    {adVehicleDetailsPage.listItemsLabels[0][0]} {advertisement?.car_number} {adVehicleDetailsPage.listItemsLabels[0][1]}
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
                      {adVehicleDetailsPage.listItemsLabels[1]}
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
                        {adVehicleDetailsPage.listItemsLabels[2]}
                      </div>
                      <div className={`${styles.value} ${styles.text}`}>
                        {(advertisement?.estimated_driving_distance ?? '---') + (advertisement?.estimated_driving_distance ? 'km' : '')}
                      </div>
                    </li>
                    <li className={styles.list}>
                      <div className={`${styles.title} ${styles.text}`}>
                      {adVehicleDetailsPage.listItemsLabels[3]}
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
                      {adVehicleDetailsPage.listItemsLabels[4]}
                      </div>
                      <div className={`${styles.value} ${styles.text}`}>
                      {adVehicleDetailsPage.listItemsLabels[5][0]}{" "}
                        {advertisement?.daily_avg_drive_time}{" "}
                        {adVehicleDetailsPage.listItemsLabels[5][1]}
                      </div>
                    </li>
                    <li className={styles.list}>
                      <div className={`${styles.title} ${styles.text}`}>
                      {adVehicleDetailsPage.listItemsLabels[6]}
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
                      {adVehicleDetailsPage.listItemsLabels[7]}
                      </div>
                      <div className={`${styles.value} ${styles.text}`}>
                        {advertisement?.end_point}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
        {/*<Modal*/}
        {/*    title="Modal 1000px width"*/}
        {/*    centered*/}
        {/*    open={fullSize && !!advertisementImages?.length}*/}
        {/*    onOk={() => showFullSize(false)}*/}
        {/*    onCancel={() => showFullSize(false)}*/}
        {/*    width={500}*/}
        {/*    height={50}*/}
        {/*>*/}
        {/*    <XMarkIcon*/}
        {/*        width={25}*/}
        {/*        className="p-1 bg-[#000] bg-opacity-70 text-white absolute right-6 top-6 z-50 rounded-sm cursor-pointer"*/}
        {/*        onClick={() => showFullSize(false)}*/}
        {/*    />*/}
        {/*    <Carousel>*/}
        {/*        {images.map((item, index) => (*/}
        {/*            <Carousel.Item key={index}>*/}
        {/*                <div className={styles.badge}>*/}
        {/*                    <div className={styles.text}>{adVehicleDetailsPage.badge.text}</div>*/}
        {/*                    <div className={styles.text_sub}>({adVehicleDetailsPage.badge.subText})</div>*/}
        {/*                </div>*/}
        {/*                {showImage(item)}*/}
        {/*            </Carousel.Item>*/}
        {/*        ))}*/}
        {/*    </Carousel>*/}
        {/*</Modal>*/}
        <Modal
          show={fullSize && !!advertisementImages?.length}
          centered
          className="gallery"
          contentClassName="bg-transparent m-0 border-none"
        >
          <Modal.Body className="m-0 flex-1" style={{minWidth : isPcOnly ? "500px" : "30s0px"}}>
            <XMarkIcon
              width={25}
              className="p-1 bg-[#000] bg-opacity-70 text-white absolute right-6 top-6 z-50 rounded-sm cursor-pointer"
              onClick={() => showFullSize(false)}
            />
            <Carousel>
              {images.map((item, index) => (
                  <Carousel.Item key={index}>
                    <div className={styles.badge}>
                      <div className={styles.text}>{adVehicleDetailsPage.imageBadge[index]}</div>
                    </div>
                    {showFullImage(item)}
                  </Carousel.Item>
              ))}
            </Carousel>
          </Modal.Body>
        </Modal>
    </div>
  );
}
