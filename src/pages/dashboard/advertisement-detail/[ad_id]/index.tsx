import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import { Center, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  useGetAdvertisementCargoList,
  useGetAdvertisementDetail,
  useGetAdvertisementOperationArea,
  useGetCargoVerificationImages,
  useGetDraftAdvertisementImages,
} from "@src/apis/advertisement";
import { DataGrid } from "@src/components/common";
import { DateIcon } from "@src/components/icons";
import ArrowBack from "@src/components/icons/ArrowBack";
import { OperatingAreaTranslation } from "@src/constants";
import RoleBasedGuard from "@src/guards/RoleBasedGuard";
import useAuth from '@src/hooks/useAuth';
import { useIcarusContext } from "@src/hooks/useIcarusContext";
import TruckModel from "@src/models/truck";
import { styles } from "@src/sections/advertisement-detail";
import { allStatuses } from "@src/sections/dashboard/AdList/AdList";
import { IAdvertisementCargo } from "@src/types/advertisement";
import { formatDate } from "@src/utils/formatter";
import { Breadcrumb, DatePicker, Modal } from "antd";
import { clsx } from "clsx";
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent, Suspense, useEffect, useMemo, useState, } from "react";
import { Carousel } from "react-bootstrap";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

interface ICargoColumns extends IAdvertisementCargo {
  vehicle_information: "바라보다";
  vehicle_location: "바라보다";
}

const Types = {
  fixed_ad: "고정",
  national_ad: "전국",
  spot_ad: "스팟",
};

const OperationStatus = {
  active: "운행대기중",
  service: "점검중",
  suspended: "강제종료",
  running: "운행중",
  end: "종료됨"
};

const DisabledButton = ({ children }) => {
  return <div className={'flex justify-center'}><button disabled={true} className={'text-[black] !opacity-80'}>{children}</button></div>
}

function AdvertisementDetailScreen() {
  const router = useRouter();
  const [isAllCargoButtonShow,setIsAllCargoButtonShow] = useState(false);
  const { dictionary: { types, view, operationStatus, adDetailsPage, common,operatingAreas : operatingAreasTrans } } = useAuth();
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<{ page: number; status: string }>({
    page: 1,
    status: "",
  });
  const { query } = useRouter();
  const { setPageTitle } = useIcarusContext();
  const advertisementId = query.ad_id as string;
  const { data: advertisement, isLoading: isAdvertisementLoading } =
    useGetAdvertisementDetail({
      id: advertisementId,
    });
  const {
    data: draftAdvertisementImages,
    isLoading: isDraftAdvertisementImagesLoading,
  } = useGetDraftAdvertisementImages(advertisementId);

  const { data: operationAreas, isLoading: isOperationAreasLoading } =
    useGetAdvertisementOperationArea({
      advertisement_id: advertisementId,
    });

  const { data: cargoList, isLoading, isFetchedAfterMount } = useGetAdvertisementCargoList({
    advertisement_id: advertisementId,
    ...filters,
  });
  const {
    data: cargoItems,
    currentPage,
    per_page,
    totalRecords,
  } = cargoList || {};
  const [verifyPicturesModalData, setVerifyPicturesModalData] = useState<{
    advertisement_id: number;
    cargo_vehicle_id: number;
  }>({ advertisement_id: 0, cargo_vehicle_id: 0 });

  const [modelImages, setModelImages] = useState({
    left: "https://dev-static.moad.live/left.png",
    right:
      "https://dev-static.moad.live/right.png",
    doorLeft:
      "https://dev-static.moad.live/rear-left.png",
    doorRight:
      "https://dev-static.moad.live/rear-right.png",
  });

  useEffect(()=>{
     if(isFetchedAfterMount && totalRecords) {
       setIsAllCargoButtonShow(true);
     }
  },[isFetchedAfterMount])

  useEffect(() => {
    const modalImagesArr = modelImages;
    const propertyMap = {
      0: 'left',
      1: 'right',
      2: 'doorLeft',
      3: 'doorRight',
    };

    draftAdvertisementImages?.map((data, index) => {
      if (data?.is_3d == "0") {
        const propertyName = propertyMap[index];
        if (propertyName) {
          modalImagesArr[propertyName] = data?.completed_url;
        }
      }

      setModelImages(modalImagesArr);
    });

    if (!isDraftAdvertisementImagesLoading && !draftAdvertisementImages?.length)
      openModel("model");
  }, [isDraftAdvertisementImagesLoading, draftAdvertisementImages]);


  useEffect(() => {
    if (advertisement?.ad_name) setPageTitle(advertisement?.ad_name);
    else setPageTitle("");
  }, [advertisement?.ad_name]);

  const CarouselWrapper = styled.div`
    .carousel.slide {
      height: 395px;
    }
  `;

  const mockup_arr = [
    {
      badge_text: "옆면",
      badge_text2: "(운전석)",
      img: "/images/ad-detail-list/img-left-mockup.png",
      default_img: "/images/ad-detail-list/img-left-default.png",
    },
    {
      badge_text: "옆면",
      badge_text2: "(조수석)",
      img: "/images/ad-detail-list/img-right-mockup.png",
      default_img: "/images/ad-detail-list/img-right-default.png",
    },
    {
      badge_text: "후면",
      badge_text2: "",
      img: "",
      default_img: "/images/ad-detail-list/img-back-default.png",
    },
  ];
  const ad_detail_arr = [
    {
      title: adDetailsPage.adDetailColumns[0],
      value: advertisement?.ad_name,
    },
    {
      title: adDetailsPage.adDetailColumns[1],
      value:
        advertisement?.start_date && advertisement?.end_date
          ? `${advertisement?.start_date} ~ ${advertisement?.end_date} (${advertisement.ad_period}개월)`
          : "--",
    },
    {
      title: adDetailsPage.adDetailColumns[2],
      value: advertisement?.type
        ? types[advertisement.type]
        : advertisement?.type,
    },
    {
      title: adDetailsPage.adDetailColumns[3],
      value: advertisement?.status
        ? allStatuses.find((status) => advertisement?.status === status.value)
          ?.label
        : advertisement?.status,
    },
    {
      title: adDetailsPage.adDetailColumns[4],
      value:  <div className={'flex gap-1 flex-wrap h-[100%]'}>
        {operationAreas?.map(({ area }, idx) => {
          return (
            <span key={idx}>
              {OperatingAreaTranslation[area]
                ? operatingAreasTrans[OperatingAreaTranslation[area]]
                : area.replace('_', ' ').toUpperCase()
              }
            {operationAreas?.length - 1 !== idx ? ' , ' : ''}
            </span>
          );
        })}
      </div>
    },
    {
      title: adDetailsPage.adDetailColumns[5],
      value: `${advertisement?.total_cost?.toLocaleString() || 0} 원`,
    },
    {
      title: adDetailsPage.adDetailColumns[6],
      value: advertisement?.advertising_contract
        ? <button className="bg-advertiser-deep px-4 py-2 text-center justify-center rounded-md h-9 text-white">
          <a target={"_blank"} className={'!no-underline !text-[#FFFFFF]'} href={advertisement?.advertising_contract}>{common?.download}</a>
        </button>
        : "-",
    },

  ];

  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex: any, e: any) => {
    setIndex(selectedIndex);
  };

  const vehiclesData = useMemo(
    () =>
      !cargoItems?.length
        ? []
        : cargoItems?.filter(item => item?.user_cargo).map((item) => ({
          key: item.id,
          no: item.id,
          car_number: item?.user_cargo?.car_number,
          vehicle_type: item.vehicle?.vehicle_type,
          vehicle_status: item.status,
          vehicle_information: view,
          vehicle_location: view,
          show_links: item.status == null ? false : true,
          cargo_vehicle_id: item.cargo_vehicle_id,
          advertisement_id: item.advertisement_id,
        })),
    [cargoItems, view]
  );

  const columns = [
    {
      dataIndex: "no",
      title: adDetailsPage.columns[0],
      formatter: (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        return rowIndex + 1;
      },
      sort: true,
      headerStyle: {
        backgroundColor: "rgb(244 247 251)",
        paddingTop: "20px",
        paddingBottom: "20px",
        borderStartStartRadius: "0px",
      },
    },
    {
      dataIndex: "car_number",
      title: adDetailsPage.columns[1],
      sort: true,
      headerStyle: {
        backgroundColor: "rgb(244 247 251)",
        paddingTop: "20px",
        paddingBottom: "20px",
      },
    },
    {
      dataIndex: "vehicle_type",
      title: adDetailsPage.columns[2],
      headerStyle: {
        backgroundColor: "rgb(244 247 251)",
        paddingTop: "20px",
        paddingBottom: "20px",
      },
    },
    {
      title: adDetailsPage.columns[3],
      headerStyle: {
        backgroundColor: "rgb(244 247 251)",
        paddingTop: "20px",
        paddingBottom: "20px",
      },
      render: ({ vehicle_status }) => {
        return vehicle_status && operationStatus[vehicle_status.toLowerCase()];
      },
    },
    {
      dataIndex: "vehicle_information",
      title: adDetailsPage.columns[4],
      headerStyle: {
        backgroundColor: "rgb(244 247 251)",
        paddingTop: "20px",
        paddingBottom: "20px",
      },
      render: (text: any, record: any) => (
        record?.vehicle_status === "end" ? <DisabledButton>{text}</DisabledButton> : <Link
          legacyBehavior
          href={`/dashboard/advertisement-detail/${record.advertisement_id}/vehicle/${record.cargo_vehicle_id}`}
        >
          <a className="text-advertiser-primary hover:no-underline">
            {text}
          </a>
        </Link>
      ),
    },
    {
      dataIndex: "vehicle_location",
      title: adDetailsPage.columns[5],
      headerStyle: {
        backgroundColor: "rgb(244 247 251)",
        paddingTop: "20px",
        paddingBottom: "20px",
      },
      render: (text: any, record: any) => (
        record?.vehicle_status === "end" ? <DisabledButton>{text}</DisabledButton> :
          <Link
            legacyBehavior
            href={`/dashboard/advertisement-detail/${record.advertisement_id}/vehicle-location/${record.cargo_vehicle_id}`}
          >
            <a className="text-advertiser-primary hover:no-underline">
              {text}
            </a>
          </Link>

      ),
    },
    {
      dataIndex: "vehicle_location",
      title: adDetailsPage.columns[6],
      headerStyle: {
        backgroundColor: "rgb(244 247 251)",
        paddingTop: "20px",
        paddingBottom: "20px",
      },
      render: (text: any, record: any) => (
        record?.vehicle_status === "end" ? <DisabledButton>{text}</DisabledButton> :
          <div
            className="text-advertiser-primary cursor-pointer"
            onClick={() => {
              setVerifyPicturesModalData({
                advertisement_id: record.advertisement_id,
                cargo_vehicle_id: record.cargo_vehicle_id
              })
              setOpen(true)
            }}
          >
            {text}
          </div>
      ),
    },
  ];
  if (window.innerWidth < 767) {
    columns.splice(0, 1);
    columns.splice(1, 1);
  }
  const [swiper, setSwiper] = useState(false);
  const openBox = () => {
    setSwiper(!swiper);
  };
  const [model, setModel] = useState("image");
  const openModel = (modeltab: string) => {
    setModel(modeltab);
    setSwiper(false);
  };

  // const imageObj = draftAdvertisementImages?.map((data,index) => {
  //   if(data?.is_3d == '0'){
  //     const updatedModelImages = {
  //       ...modelImages,
  //       left: index === 0 ? data?.completed_url : modelImages.left,
  //       right: index === 1 ? data?.completed_url : modelImages.right,
  //       doorLeft: index === 2 ? data?.completed_url : modelImages.doorLeft,
  //       doorRight: index === 3 ? data?.completed_url : modelImages.doorRight,
  //     };
  //     setModelImages(updatedModelImages)
  //   }
  // })
  const handleModelImageChange =
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setModelImages((old) => ({ ...old, [key]: URL.createObjectURL(file) }));
      }
    };

  if (isAdvertisementLoading && isOperationAreasLoading)
    return (
      <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
        <CircularProgress color="primary" />
      </div>
    );
  const onBack = () => {
    router.back();
  };

  return (
    <>
      {open &&
        <VerifyPicturesModal
          open={open}
          close={() => setOpen(false)}
          verifyPicturesModalData={verifyPicturesModalData}
        />
      }
      <div id={styles.ad_detail_list} className="ad-detail-list page">
        <div className={styles.container}>
          <div className={styles.board_content}>
            <div className={`only-mb`}>
              <div className={`${styles["mobile-top-header"]}`}>
                <ArrowBack handleAction={onBack} />
                <div className={styles["header"]}>{advertisement?.ad_name}</div>
                <div></div>
              </div>
            </div>
            <div className={styles.ad_detail_list_content}>
              <Breadcrumb
                separator=">"
                items={[
                  {
                    href: "/dashboard",
                    title: adDetailsPage.breadCrumb[0],
                  },
                  {
                    title: adDetailsPage.breadCrumb[1],
                  },
                ]}
                className="text-[#2c324c] mb-[20px] hidden sm:block"
              />
             <div className={'flex flex-col gap-[10px]'}>
              <div className={clsx(styles.detail_content,'h-[100%] w-[100%]')}>
                <div className={styles.slide_box}>
                  {draftAdvertisementImages?.length ? (
                    <div
                      className={`${model === "image" ? styles.active : ""} ${styles.detail_slide
                        } ${styles.box}`}
                      id="div3d"
                    >
                      <CarouselWrapper className={styles.swiper_wrapper}>
                        <Carousel activeIndex={index} onSelect={handleSelect}>
                          {draftAdvertisementImages?.map((item, index) => (
                            <Carousel.Item key={index}>
                              <Image
                                src={item.completed_url}
                                alt="slides"
                                width={550}
                                height={500}
                              />
                              {/* <Carousel.Caption className="valu-text">
                              <h3>
                                {item.badge_text}
                                {item.badge_text2}
                              </h3>
                            </Carousel.Caption> */}
                            </Carousel.Item>
                          ))}
                        </Carousel>
                      </CarouselWrapper>
                    </div>
                  ) : null}
                  <div
                    className={`${model === "model" ? styles.active : ""} ${styles.detail_3d
                      } ${styles.box}`}
                    id="div2d"
                  >
                    <Canvas
                      camera={{ fov: 75, position: [0, 0, 7] }}
                      style={{
                        backgroundColor: "white",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <ambientLight intensity={1.25} />
                      <ambientLight intensity={0.1} />
                      <directionalLight intensity={0.4} />
                      <Suspense fallback={null}>
                        {/* @ts-ignore */}
                        <Center>
                          <TruckModel
                            Image3D={
                              draftAdvertisementImages
                                ? draftAdvertisementImages.find(
                                  (item) => item?.is_3d == "1"
                                )?.completed_url
                                : ""
                            }
                            images={modelImages}
                          />
                        </Center>
                      </Suspense>
                      <OrbitControls
                        maxDistance={15}
                        minDistance={5}
                        autoRotate
                      />
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
                    <SwiperSlide>
                      <Image
                        className={styles.img}
                        src={`/images/ad-detail-list/ic-3d-rotation.svg`}
                        alt=""
                        width={18}
                        height={18}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        className={styles.img}
                        src={`/images/ad-detail-list/ic-img.png`}
                        alt=""
                        width={18}
                        height={18}
                      />
                    </SwiperSlide>
                  </Swiper>

                  <div
                    className={`${swiper ? styles.active : ""} ${styles.mockup_btn
                      }`}
                  >
                    <button
                      onClick={() => {
                        openModel("model");
                      }}
                      type="button"
                      id="3d_btn"
                      className={styles.btns}
                    >
                      <i
                        className={`${styles.ic_3d_rotation} ${styles.icons}`}
                      ></i>{" "}
                      <span className={styles.text}>{adDetailsPage.mockupOptions[0]}</span>
                    </button>
                    <button
                      onClick={() => {
                        openModel("image");
                      }}
                      type="button"
                      id="img_btn"
                      className={styles.btns}
                    >
                      <i className={`${styles.ic_img} ${styles.icons}`}></i>{" "}
                      <span className={styles.text}>{adDetailsPage.mockupOptions[1]}</span>
                    </button>
                  </div>
                </div>
                <div className={styles.right_side}>
                {/* <table className={`border-collapse border lg:h-[393px] w-[100%] bg-white rounded`}>
                    {ad_detail_arr.map((data, index) =>
                      <tr key={index} className={`${styles.table_line} lg:h-[49px]`}>
                        <td className={`${styles.title} lg:px-[30px] font-bold border`}>{data.title}</td>
                        <td className={`${styles.text} lg:pl-[30px] border`}>{data.value}</td>
                      </tr>
                    )}
                  </table> */}
                  <div className={`${styles.table_box} h-[100%]`}>
                    {ad_detail_arr.map((data, index) => (
                      <div key={index} className={`${styles.table_line} w-[100%] h-[100%]`}>
                        <div className={`${styles.title} lg:w-[120px] w-[90px] h-[100%] lg:px-[30px] text-center`}>{data.title}</div>
                        <div className={`${data.title === adDetailsPage.adDetailColumns[4] ? "overflow-y-auto" : ""} ${styles.text} lg:pl-[20px] sm:pl-[12px] py-2 h-[100%]`}>
                          {data.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

               {/*{*/}

               {/*        <div className={clsx('flex justify-end w-[100%] pt-[70px]',  isAllCargoButtonShow ?*/}
               {/*        "pt-[100px] 2xl:pt-[70px]" : "")}>*/}
               {/*          {*/}
               {/*            isAllCargoButtonShow ?  <div className={styles.text}>*/}
               {/*              <Link*/}
               {/*                  className="bg-primary px-4 py-3 text-white rounded hover:!text-[#FFFFFF]"*/}
               {/*                  href={`/dashboard/advertisement/all-vehicle-location`}*/}
               {/*              >*/}
               {/*                {adDetailsPage.ViewAllCargoLocation}*/}
               {/*              </Link>*/}
               {/*            </div> : ""}*/}
               {/*        </div>*/}

               {/*}*/}
              {/* Table */}
              <div className={styles.ad_contents}>
                <div className={'flex justify-between items-center pr-[20px]'}>
                <div className={styles.tab_menu}>
                  <div
                    className={clsx(
                      styles.tab_01,
                      styles.tab_title,
                      !filters.status && styles.active
                    )}
                    onClick={() => setFilters(
                        { ...filters, status: "" })}
                  >
                    {adDetailsPage.tabs[0]}
                  </div>
                  <div
                    className={clsx(
                      styles.tab_01,
                      styles.tab_title,
                      filters.status == "running" && styles.active
                    )}
                    onClick={() =>
                      setFilters({ ...filters, status: "running" })
                    }
                  >
                    {adDetailsPage.tabs[1]}
                  </div>
                  <div
                    className={clsx(
                      styles.tab_01,
                      styles.tab_title,
                      filters.status == "suspended" && styles.active
                    )}
                    onClick={() =>
                      setFilters({ ...filters, status: "suspended" })
                    }
                  >
                    {adDetailsPage.tabs[2]}
                  </div>
                </div>
                  {
                    isAllCargoButtonShow ?  <div className={styles.text}>
                      <Link
                          className="bg-primary px-4 py-3 text-white rounded hover:!text-[#FFFFFF]"
                          href={`/dashboard/advertisement-detail/${advertisementId}/all-vehicle-location`}
                      >
                        {adDetailsPage.ViewAllCargoLocation}
                      </Link>
                    </div> : ""}
                </div>


                <DataGrid
                  columns={columns}
                  rows={vehiclesData}
                  loading={isLoading}
                  showPagination
                  currentPage={currentPage}
                  itemsPerPage={per_page}
                  totalItems={totalRecords}
                  onChangePage={(page) => setFilters({ ...filters, page })}
                />
              </div>
             </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

//if user role is 'Advertiser'
const WithRoles = () => (
  <RoleBasedGuard roles={["Advertiser"]}>
    <AdvertisementDetailScreen />
  </RoleBasedGuard>
);

const VerifyPicturesModal = ({
  open,
  close,
  verifyPicturesModalData,
}: {
  open: boolean;
  close: VoidFunction;
  verifyPicturesModalData: {
    advertisement_id: number;
    cargo_vehicle_id: number;
  };
}) => {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const { dictionary: { verifyPicturesModal,operatingAreas : operatingAreasTrans } } = useAuth();
  const [{ start_date, end_date }, setDate] = useState({ start_date: '', end_date: '' });
  const [selectedRow, setSelectedRow] = useState(0);
  const { data, isLoading } = useGetCargoVerificationImages({
    ...verifyPicturesModalData, start_date, end_date
  });

  const handleSelect = (selectedIndex: any, e: any) => {
    setIndex(selectedIndex);
  };

  const CarouselWrapper = styled.div`
    .carousel.slide {
      height: 395px;
    }
  `;

  const columns = [
    {
      dataIndex: "date",
      title: verifyPicturesModal.columns[0],
      headerStyle: {
        backgroundColor: "rgb(244 247 251)",
        paddingTop: "20px",
        paddingBottom: "20px",
      },
      render: (text: string) => {
        return <div className='text-center'>
          {formatDate(text, false, "YYYY.MM.DD")}
        </div>
      }
    },
    {
      dataIndex: "status",
      title: verifyPicturesModal.columns[1],
      headerStyle: {
        backgroundColor: "rgb(244 247 251)",
        paddingTop: "20px",
        paddingBottom: "20px",
      },
      render: (text: any, record: any) => {
        const completed = text === '완전한'
        return <div className={`text-center ${completed ? 'text-[#30CD2C]' : 'text-[#CE3A54]'}`}>
          {completed ? verifyPicturesModal.status.complete : verifyPicturesModal.status.incomplete}
        </div>
      },
    },
    {
      dataIndex: "date",
      title: verifyPicturesModal.columns[2],
      headerStyle: {
        backgroundColor: "rgb(244 247 251)",
        paddingTop: "20px",
        paddingBottom: "20px",
      },
      render: (text: any, record: any, index) => {
        const enabled = record.image_path.length > 0
        return <div
          className={`text-center underline ${enabled ? 'text-advertiser-primary' : 'text-[#999999]'}`}
          onClick={() => {
            if (enabled) {
              setStep(1)
              console.log('index: ', index);

              setSelectedRow(index)
            }
          }}
        >{verifyPicturesModal.viewPhotos}</div>
      }
    }
  ];

  return (
    <Modal
      open={open}
      onCancel={close}
      title={
        <p className="text-2xl font-bold text-center text-[#29293E] py-2 border-b border-white">
          {verifyPicturesModal.title}
        </p>
      }
      footer={false}
      closable={false}
      className={"ad_modal"}
    >
      <div className="p-[16px] flex justify-center">
        {step === 1 && data && data[selectedRow].image_path?.length && (
          <div
            className={`!w-[550px] overflow-hidden ${styles.active} ${styles.detail_slide} ${styles.box}`}
            id="div3d"
          >
            <ArrowBack
              className={"ml-4 mb-4"}
              handleAction={() => setStep(0)}
            />
            <CarouselWrapper className={styles.swiper_wrapper}>
              <Carousel activeIndex={index} onSelect={handleSelect}>
                {data[selectedRow].image_path?.map((item, index) => (
                  <Carousel.Item key={index}>
                    <Image
                      src={item}
                      alt="slides"
                      width={550}
                      height={500}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </CarouselWrapper>
          </div>
        )}
        {step === 0 &&
          <div>
            <div className="flex justify-between pb-4 w-[483px]">
              <DatePicker
                suffixIcon={<DateIcon />}
                popupClassName={"admin-advertisement-date-picker"}
                placeholder={verifyPicturesModal.selectStartDate}
                className={clsx(
                  styles['date-picker'],
                )}
                onChange={(date, dateString) => setDate({ end_date, start_date: dateString })}
                value={start_date ? dayjs(start_date, "YYYY-MM-DD") : undefined}
              />
              <DatePicker
                suffixIcon={<DateIcon />}
                popupClassName={"admin-advertisement-date-picker"}
                placeholder={verifyPicturesModal.selectEndDate}
                className={clsx(
                  styles['date-picker'],
                )}
                onChange={(date, dateString) => setDate({ start_date, end_date: dateString })}
                value={end_date ? dayjs(end_date, "YYYY-MM-DD") : undefined}
              />
            </div>
            <DataGrid
              columns={columns}
              rows={data || []}
              loading={isLoading}
              additionalTableProps={{ scroll: { y: 500 } }}
            // showPagination
            // currentPage={currentPage}
            // itemsPerPage={per_page}
            // totalItems={totalRecords}
            // onChangePage={(page) => setFilters({ ...filters, page })}
            />
          </div>
        }
      </div>
    </Modal>
  );
};

export default WithRoles;
