import { CircularProgress } from "@mui/material";
import { Center, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  useGetAdvertisementCargoList,
  useGetAdvertisementDetail,
  useGetAdvertisementOperationArea,
  useGetAdvertisementVehicles,
} from "@src/apis/advertisement";
import { DataGrid } from "@src/components/common";
import RoleBasedGuard from "@src/guards/RoleBasedGuard";
import { useIcarusContext } from "@src/hooks/useIcarusContext";
import TruckModel from "@src/models/truck";
import { styles } from "@src/sections/advertisement-detail";
import { IAdvertisementCargo } from "@src/types/advertisement";
import { Breadcrumb } from "antd";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Carousel } from "react-bootstrap";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowBack from "@src/components/icons/ArrowBack";

interface ICargoColumns extends IAdvertisementCargo {
  vehicle_information: "바라보다";
  vehicle_location: "바라보다";
}

const AdvertisementStatus = {
  proceeding: "진행중",
  applying: "신청중",
  end: "종료",
};

const Types = {
  fixed_ad: "고정",
  national_ad: "전국",
  spot_ad: "스팟",
};

const OperationStatus = {
  service: "서비스 중",
  suspended: "운행종료",
  running: "운행중",
};

function AdvertisementDetailScreen() {
  const router = useRouter();
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
  // const { data: vehicles } = useGetAdvertisementVehicles({
  // 	advertisement_id: advertisementId,
  // });
  const { data: operationAreas, isLoading: isOperationAreasLoading } =
    useGetAdvertisementOperationArea({
      advertisement_id: advertisementId,
    });

  const { data: cargoList, isLoading } = useGetAdvertisementCargoList({
    advertisement_id: advertisementId,
    ...filters,
  });
  const {
    data: cargoItems,
    currentPage,
    per_page,
    totalRecords,
  } = cargoList || {};

  useEffect(() => {
    if (advertisement?.ad_name) setPageTitle(advertisement?.ad_name);
    else setPageTitle("");
  }, [advertisement?.ad_name]);

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
      title: "광고이름",
      value: advertisement?.ad_name,
    },
    {
      title: "광고기간",
      value:
        advertisement?.start_date && advertisement?.end_date
          ? `${advertisement?.start_date} ~ ${advertisement?.end_date} (${advertisement.ad_period}개월)`
          : "--",
    },
    {
      title: "광고유형",
      value: advertisement?.type
        ? Types[advertisement.type]
        : advertisement?.type,
    },
    {
      title: "광고상태",
      value: advertisement?.status
        ? AdvertisementStatus[advertisement?.status]
        : advertisement?.status,
    },
    {
      title: "광고지역",
      value: operationAreas?.map((item) => `${item.area}, `),
    },
    {
      title: "광고금액",
      value: `${advertisement?.amount.toLocaleString()}원`,
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
        : cargoItems?.map((item) => ({
            key: item.id,
            no: item.id,
            registration_number: item.registration_number,
            vehicle_type: item.vehicle?.vehicle_type,
            vehicle_status: item.status,
            vehicle_information: "바라보다",
            vehicle_location: "바라보다",
            show_links: item.status == null ? false : true,
            cargo_vehicle_id: item.cargo_vehicle_id,
            advertisement_id: item.advertisement_id,
          })),
    [cargoItems?.length]
  );

  const columns = [
    {
      dataIndex: "no",
      title: "no",
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
      dataIndex: "registration_number",
      title: "등록번호",
      sort: true,
      headerStyle: {
        backgroundColor: "rgb(244 247 251)",
        paddingTop: "20px",
        paddingBottom: "20px",
      },
    },
    {
      dataIndex: "vehicle_type",
      title: "차량종류",
      headerStyle: {
        backgroundColor: "rgb(244 247 251)",
        paddingTop: "20px",
        paddingBottom: "20px",
      },
    },
    {
      title: "운행여부",
      headerStyle: {
        backgroundColor: "rgb(244 247 251)",
        paddingTop: "20px",
        paddingBottom: "20px",
      },
      render: ({ vehicle_status }) => {
        return OperationStatus[vehicle_status];
      },
    },
    {
      dataIndex: "vehicle_information",
      title: "차량정보",
      headerStyle: {
        backgroundColor: "rgb(244 247 251)",
        paddingTop: "20px",
        paddingBottom: "20px",
      },
      render: (text: any, record: any) => (
        // record.show_links ?
        <Link
          legacyBehavior
          href={`/dashboard/advertisement-detail/${record.advertisement_id}/vehicle/${record.cargo_vehicle_id}`}
        >
          <a target="_blank" className="hover:no-underline">
            {text}
          </a>
        </Link>
        // :"아직 할당되지 않았습니다."
      ),
    },
    {
      dataIndex: "vehicle_location",
      title: "차량위치",
      headerStyle: {
        backgroundColor: "rgb(244 247 251)",
        paddingTop: "20px",
        paddingBottom: "20px",
      },
      render: (text: any, record: any) => (
        // record.show_links ?
        <Link
          legacyBehavior
          href={`/dashboard/advertisement-detail/${record.advertisement_id}/vehicle-location/${record.cargo_vehicle_id}`}
        >
          <a target="_blank" className="hover:no-underline">
            {text}
          </a>
        </Link>
        // :"아직 할당되지 않았습니다."
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

  const [modelImages, setModelImages] = useState({
    left: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg",
    right:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg",
    doorLeft:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg",
    doorRight:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg",
  });

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
                    title: "광고관리",
                  },
                  {
                    title: "신제품 홍보 출시기념",
                  },
                ]}
                className="text-[#2c324c] mb-[20px] hidden sm:block"
              />

              <div className={styles.detail_content}>
                <div className={styles.slide_box}>
                  <div
                    className={`${model === "image" ? styles.active : ""} ${
                      styles.detail_slide
                    } ${styles.box}`}
                    id="div3d"
                  >
                    <div className={styles.swiper_wrapper}>
                      <Carousel activeIndex={index} onSelect={handleSelect}>
                        {mockup_arr.map((item, index) => (
                          <Carousel.Item key={index}>
                            <Image
                              src={item.img ? item.img : item.default_img}
                              alt="slides"
                              width={550}
                              height={500}
                            />
                            <Carousel.Caption className="valu-text">
                              <h3>
                                {item.badge_text}
                                {item.badge_text2}
                              </h3>
                            </Carousel.Caption>
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    </div>
                  </div>
                  <div
                    className={`${model === "model" ? styles.active : ""} ${
                      styles.detail_3d
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
                          <TruckModel images={modelImages} />
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
                    className={`${swiper ? styles.active : ""} ${
                      styles.mockup_btn
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
                      <span className={styles.text}>360°로 돌려보기</span>
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
                      <span className={styles.text}>이미지로 보기</span>
                    </button>
                  </div>
                </div>
                <div className={styles.right_side}>
                  <div className={styles.table_box}>
                    {ad_detail_arr.map((data, index) => (
                      <div key={index} className={styles.table_line}>
                        <div className={styles.title}>{data.title}</div>
                        <div className={styles.text}>{data.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.model_contents_container}>
                    {/*<div className={styles.model_content}>*/}
                    {/*  <p>Left</p>*/}
                    {/*  <div className={styles.model_side_image_con}>*/}
                    {/*    <Image*/}
                    {/*        className={styles.model_images}*/}
                    {/*        src={modelImages.left}*/}
                    {/*        alt="left"*/}
                    {/*        width={200}*/}
                    {/*        height={200}*/}
                    {/*    />*/}
                    {/*  </div>*/}
                    {/*  <input*/}
                    {/*      onChange={handleModelImageChange("left")}*/}
                    {/*      className={styles.file_input}*/}
                    {/*      type="file"*/}
                    {/*      placeholder="file"*/}
                    {/*  />*/}
                    {/*</div>*/}
                    {/*<div className={styles.model_content}>*/}
                    {/*  <p>Right</p>*/}
                    {/*  <div className={styles.model_side_image_con}>*/}
                    {/*    <Image*/}
                    {/*        className={styles.model_images}*/}
                    {/*        src={modelImages.right}*/}
                    {/*        alt="right"*/}
                    {/*        width={200}*/}
                    {/*        height={200}*/}
                    {/*    />*/}
                    {/*  </div>*/}
                    {/*  <input*/}
                    {/*      width={"200px"}*/}
                    {/*      height={"100px"}*/}
                    {/*      onChange={handleModelImageChange("right")}*/}
                    {/*      className={styles.file_input}*/}
                    {/*      type="file"*/}
                    {/*      placeholder="file"*/}
                    {/*  />*/}
                    {/*</div>*/}
                    {/*<div className={styles.model_content}>*/}
                    {/*  <p>Back</p>*/}
                    {/*  <div className={styles.back_doors_con}>*/}
                    {/*    <div className={styles.back_door_con}>*/}
                    {/*      <div className={styles.model_back_image_con}>*/}
                    {/*        <Image*/}
                    {/*            className={styles.model_images}*/}
                    {/*            width={50}*/}
                    {/*            height={200}*/}
                    {/*            src={modelImages.doorLeft}*/}
                    {/*            alt="doorLeft"*/}
                    {/*        />*/}
                    {/*      </div>*/}
                    {/*      <input*/}
                    {/*          onChange={handleModelImageChange("doorLeft")}*/}
                    {/*          className={styles.file_input}*/}
                    {/*          type="file"*/}
                    {/*          placeholder="file"*/}
                    {/*      />*/}
                    {/*    </div>*/}
                    {/*    <div className={styles.back_door_con}>*/}
                    {/*      <div className={styles.model_back_image_con}>*/}
                    {/*        <Image*/}
                    {/*            className={styles.model_images}*/}
                    {/*            width={50}*/}
                    {/*            height={200}*/}
                    {/*            src={modelImages.doorRight}*/}
                    {/*            alt="doorRight"*/}
                    {/*        />*/}
                    {/*      </div>*/}
                    {/*      <input*/}
                    {/*          onChange={handleModelImageChange("doorRight")}*/}
                    {/*          className={styles.file_input}*/}
                    {/*          type="file"*/}
                    {/*          placeholder="file"*/}
                    {/*      />*/}
                    {/*    </div>*/}
                    {/*  </div>*/}
                    {/*</div>*/}
                  </div>
                </div>
              </div>
              {/* Table */}
              <div className={styles.ad_contents}>
                <div className={styles.tab_menu}>
                  <div
                    className={clsx(
                      styles.tab_01,
                      styles.tab_title,
                      !filters.status && styles.active
                    )}
                    onClick={() => setFilters({ ...filters, status: "" })}
                  >
                    전체
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
                    운행중
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
                    운행정지
                  </div>
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
    </>
  );
}

//if user role is 'Advertiser'
const WithRoles = () => (
  <RoleBasedGuard roles={["Advertiser"]}>
    <AdvertisementDetailScreen />
  </RoleBasedGuard>
);

export default WithRoles;
