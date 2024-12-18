import { XMarkIcon } from '@heroicons/react/24/solid';
import { useGetCargoVehicleImages, useGetVehicleDetail, } from "@src/apis/advertisement";
import ArrowBack from "@src/components/icons/ArrowBack";
import Loader from "@src/components/Loader";
import useAuth from '@src/hooks/useAuth';
import { useIcarusContext } from "@src/hooks/useIcarusContext";
import { styles } from "@src/sections/vehicle-info";
import { ICargoVehicleImage } from "@src/types/advertisement";
import { formatPhoneNumber } from "@src/utils/formatter";
import { Breadcrumb } from "antd";
import { clsx } from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Carousel, Modal } from "react-bootstrap";
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

const titles = [
    "driver_side_of_vehicle",
    "passenger_side_of_vehicle",
    "back_side_of_vehicle",
    "dashboard_of_vehicle"
];


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
  const { data: advertisementImages, isLoading: isImagesLoading } = useGetCargoVehicleImages({
    cargo_vehicle_id: Number(vehicleId)
  }) ;

  const [fullSize, showFullSize ] = useState(false);
  const vehicleImages =  advertisementImages || [undefined, undefined, undefined, undefined];

    const images = useMemo(() => {

        if( vehicleImages?.length<2 || (vehicleImages?.length && vehicleImages[0]===undefined))
            return vehicleImages;

        return [...vehicleImages].sort((a, b) => {
            if (!a || !b) return 0;
            return titles.indexOf(a.file_title) - titles.indexOf(b.file_title);
        });
    }, [vehicleImages]);

    useEffect(()=>{
        setPageTitle(adVehicleDetailsPage.title)
    },[isKorean])

    const showImage = (image?:  ICargoVehicleImage) => {
        const size = 500;
        return (
            <Image
                className={clsx(styles.img, 'rounded-md object-center')}
                src={image?.file_path || '/images/ad-detail-list/no-image.png'}
                alt={image?.file_title || ''}
                width={size}
                height={size}
            />
        )
    }

  const showFullImage = (image?:  ICargoVehicleImage) => {
        const size = 1000;
        return (
            <Image
                className={clsx('rounded-md mx-auto')} // `mx-auto` to center, `rounded-md` for rounded corners
                src={image?.file_path || '/images/ad-detail-list/no-image.png'}
                alt={image?.file_title || ''}
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
                      src={!isImagesLoading && images?.length && images[0]?.file_path || '/images/ad-detail-list/no-image.png'}
                      alt={!isImagesLoading  && images?.length && images[0]?.file_title || ''}
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
                  title: advertisement?.ad_name || "-"
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



                   {!isImagesLoading && images?.length && images[0]?.file_path ?
                    <React.Fragment>
                    <div className={`${styles.badge} hidden sm:block`}>
                      <div className={styles.text}>{adVehicleDetailsPage.imageBadge[0]}</div>
                    </div>
                      <Image
                        className={`${styles.img} ${styles.main_img} hidden sm:block`}
                        src={images[0]?.file_path }
                        alt={images[0]?.file_title || ''}
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
                  <div className="flex overflow-x-scroll justify-between gap-2">

                    {[0,1,2,3].map((data,index) =>
                        <ShowNoImage key={index} classname={'min-h-[136px]'}/>
                      )}
                  </div>
                )
                  }

                </div>

                <div className={`${styles.table_box} ${styles.content_body}`}>
                  <div className="vehicle_number">
                    {advertisement?.car_number}
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
                          <span className={'!font-bold pr-[6px]'}>{advertisement?.user_cargo?.name}</span> {adVehicleDetailsPage.sir}
                      </div>
                    </li>
                    <li className={styles.list}>
                      <div className={`${styles.title} ${styles.text}`}>
                        {adVehicleDetailsPage.listItemsLabels[2]}
                      </div>
                      <div className={`${styles.value} ${styles.text}`}>
                        {formatPhoneNumber(advertisement?.user_cargo?.phone_number) || "-"}
                      </div>
                    </li>
                    <li className={styles.list}>
                      <div className={`${styles.title} ${styles.text}`}>
                      {adVehicleDetailsPage.listItemsLabels[3]}
                      </div>
                      <div className={`${styles.value} ${styles.text}`}>
                        {advertisement?.vehicle?.vehicle_type}
                      </div>
                    </li>
                    <li className={styles.list}>
                      <div className={`${styles.title} ${styles.text}`}>
                        {adVehicleDetailsPage.listItemsLabels[4]}
                      </div>
                      <div className={`${styles.value} ${styles.text}`}>
                        {( advertisement
                            ?.monthly_avg_operating_days ?? '---') + ( advertisement
                            ?.monthly_avg_operating_days ? 'km' : '')}
                      </div>
                    </li>
                    <li className={styles.list}>
                      <div className={`${styles.title} ${styles.text}`}>
                      {adVehicleDetailsPage.listItemsLabels[5]}
                      </div>
                      <div className={`${styles.value} ${styles.text}`}>
                          {
                              //@ts-ignore
                              advertisement?.daily_avg_drive_time }{ isKorean? "일" : ""}
                      </div>
                    </li>
                    <li className={styles.list}>
                      <div className={`${styles.title} ${styles.text}`}>
                      {adVehicleDetailsPage.listItemsLabels[6]}
                      </div>
                      <div className={`${styles.value} ${styles.text}`}>
                      {adVehicleDetailsPage.listItemsLabels[7][0]}{" "}
                        {advertisement?.average_daily_hours_operation}{" "}
                        {adVehicleDetailsPage.listItemsLabels[7][1]}
                      </div>
                    </li>
                    <li className={styles.list}>
                      <div className={`${styles.title} ${styles.text}`}>
                      {adVehicleDetailsPage.listItemsLabels[8]}
                      </div>
                      <div className={`${styles.value} ${styles.text}`}>
                        {advertisement?.start_point}
                      </div>
                    </li>
                    <li className={styles.list}>
                      <div className={`${styles.title} ${styles.text}`}>
                      {adVehicleDetailsPage.listItemsLabels[9]}
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
