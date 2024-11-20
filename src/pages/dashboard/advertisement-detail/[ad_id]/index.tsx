import styled from "@emotion/styled";
import { CircularProgress, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
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
import useOptions from "@src/hooks/useOptions";
import TruckModel from "@src/models/truck";
import { styles } from "@src/sections/advertisement-detail";
import { DraftAdvertisementImage, IAdvertisementCargo } from "@src/types/advertisement";
import { formatDate } from "@src/utils/formatter";
import { DatePicker, Image as AntImage, Modal, Pagination } from "antd";
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
import React, { Suspense, useEffect, useMemo, useState, } from "react";
import { Carousel, Table } from "react-bootstrap";
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

const ImageTypeValue = {
    'left' : 0,
    'right' : 1, 'doorright' : 2, 'doorleft' : 3};

const DisabledButton = ({ children }) => {
    return <div className={'flex justify-center'}>
        <button disabled={true} className={'text-[black] !opacity-80'}>{children}</button>
    </div>
}

function AdvertisementDetailScreen() {
    const router = useRouter();
    const [isAllCargoButtonShow, setIsAllCargoButtonShow] = useState(false);
    const { AllStatuses } = useOptions()
    const {
        dictionary: {
            types,
            view,
            operationStatus,
            adDetailsPage,
            common,
            dashboard,
            operatingAreas: operatingAreasTrans,
            pageTitle,
            adForm,
            vehicle_types
        },
        isPcOnly,
        isKorean
    } = useAuth();
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
        data: draftAdvertisementImagesRes,
        isLoading: isDraftAdvertisementImagesLoading,
    } = useGetDraftAdvertisementImages(advertisementId);

    const [draftAdvertisementImages, setDraftAdvertisementImages] = useState<DraftAdvertisementImage[]>([])

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
        currentPage=1,
        per_page=5,
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

    useEffect(() => {
        if (isFetchedAfterMount && totalRecords) {
            setIsAllCargoButtonShow(true);
        }
    }, [isFetchedAfterMount])

    useEffect(() => {
        const modalImagesArr = modelImages;
        const propertyMap = {
            0: 'left',
            1: 'right',
            2: 'doorRight',
            3: 'doorLeft',
        };

        draftAdvertisementImages?.map((data, index) => {
            if (data?.is_3d == "0" && data?.type) {
                const typeId = ImageTypeValue[data.type];
                const propertyName = propertyMap[typeId];
                if (propertyName)
                    modalImagesArr[propertyName] = data?.completed_url;

            }
        });
        setModelImages(modalImagesArr);
        if (!isDraftAdvertisementImagesLoading && !draftAdvertisementImages?.length)
            openModel("model");
    }, [isDraftAdvertisementImagesLoading, draftAdvertisementImages]);

    useEffect(()=>{
        if(draftAdvertisementImagesRes){
            const order = ['left', 'right', 'doorright', 'doorleft'];
            let newDraftAdvertisementImagesRes : DraftAdvertisementImage[]  =[]

                order.map((type,index)=>{
                    const newData = [...draftAdvertisementImagesRes]?.filter(item => item?.type == type).pop()

                    if(newData)
                        newDraftAdvertisementImagesRes.push(newData)

                })

;
            setDraftAdvertisementImages([...newDraftAdvertisementImagesRes])

        }
    },[isDraftAdvertisementImagesLoading])


    useEffect(() => {
        setPageTitle(pageTitle["top_bar_dashboard"]);
    }, [isKorean])

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
                    ? `${advertisement?.start_date} ~ ${advertisement?.end_date} (${advertisement.ad_period}${adForm?.months})`
                    : "--",
        },
        {
            title: adDetailsPage.adDetailColumns[7],
            value:
                advertisement?.recruitment_period_start_date && advertisement?.recruitment_period_end_date
                    ? `${advertisement?.recruitment_period_start_date} ~ ${advertisement?.recruitment_period_end_date}`
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
                ? AllStatuses.find((status) => advertisement?.status === status.value)
                    ?.label
                : advertisement?.status,
        },
        {
            title: adDetailsPage.adDetailColumns[9],
            value: !advertisement?.vehicle_type? "-" :`${vehicle_types[advertisement?.vehicle_type]} ${advertisement.vehicles_in_operation.map(vehicle => vehicle.vehicle_type).join(', ')}`
        },
        {
            title: adDetailsPage.adDetailColumns[8],
            value: !advertisement?.vehicles_in_operation? "-": `${advertisement?.vehicles_in_operation.reduce((sum, vehicle) => sum + vehicle.number_of_vehicles, 0)}${dashboard?.big}`
        },
        {
            title: adDetailsPage.adDetailColumns[4],
            value: <div className={'flex gap-1 flex-wrap h-[100%]'}>
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
            value: `${advertisement?.total_cost?.toLocaleString() || 0} ${adForm?.won}`,
        },
        {
            title: adDetailsPage.adDetailColumns[6],
            value: advertisement?.advertising_contract
                ? <button className="bg-advertiser-deep px-4 py-2 text-center justify-center rounded-md h-9 text-white">
                    <a target={"_blank"} className={'!no-underline !text-[#FFFFFF]'}
                       href={advertisement?.advertising_contract}>{common?.download}</a>
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
    // const handleModelImageChange =
    //   (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //       setModelImages((old) => ({ ...old, [key]: URL.createObjectURL(file) }));
    //     }
    //   };

    if (isAdvertisementLoading && isOperationAreasLoading)
        return (
            <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
                <CircularProgress color="primary"/>
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
                                <ArrowBack handleAction={onBack}/>
                                <div className={styles["header"]}>{advertisement?.ad_name}</div>
                                <div></div>
                            </div>
                        </div>
                        <div className={styles.ad_detail_list_content}>
                          <span className={'title_wrap_top'}>{adDetailsPage?.operationDetails}</span>
                            <div className={'flex flex-col gap-[10px]'}>
                                <div className={clsx(styles.detail_content, 'h-[100%] w-[100%]')}>
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
                                                                <AntImage
                                                                    src={item.completed_url}
                                                                    alt="slides"
                                                                    width={"100%"}
                                                                    height={500}
                                                                />
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
                                                <ambientLight intensity={1.25}/>
                                                <ambientLight intensity={0.1}/>
                                                <directionalLight intensity={0.4}/>
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
                                    <div className={clsx(styles.right_side,"mb-[20px]")}>
                                        <div className={clsx(styles.table_box,isKorean && "h-[100%]")}>
                                            {ad_detail_arr.map((data, index) => (
                                                <div key={index} className={`${styles.table_line} w-[100%] h-[100%]`}>
                                                    <div
                                                        className={`${styles.title} lg:w-[120px] w-[90px] h-[100%] lg:px-[30px] text-center`}>{data.title}</div>
                                                    <div
                                                        className={`${data.title === adDetailsPage.adDetailColumns[4] ? "overflow-y-auto" : ""} ${styles.text} lg:pl-[20px] sm:pl-[12px] py-2 h-[100%]`}>
                                                        {data.value}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.ad_contents}>
                                    <div
                                        className={clsx('flex justify-between items-center  lg:pr-[20px] pb-[12px] lg:pb-[0px]', (!isPcOnly && !isKorean) && "flex-wrap")}>
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
                                            isAllCargoButtonShow ? <div
                                                className={clsx(styles.text, !isPcOnly && "!text-xs", (!isKorean && !isPcOnly) && "pt-2 flex justify-end w-[100%]")}>
                                                <Link
                                                    className="bg-primary px-[8px]  py-[4px] lg:px-[1rem] lg:py-[12px] text-white rounded hover:!text-[#FFFFFF]"
                                                    href={`/dashboard/advertisement-detail/${advertisementId}/all-vehicle-location`}
                                                >
                                                    {adDetailsPage.ViewAllCargoLocation}
                                                </Link>
                                            </div> : ""}
                                    </div>

                                    <div>
                                        <div className='overflow-auto'>
                                            <Table width={`100%`} className="mb-[0px] relative">
                                                <TableHead className={`bg-table-header !h-[60px]`}>
                                                    <TableRow>
                                                        <TableCell style={{ minWidth: isPcOnly ? '70px' : "40px" }}
                                                                   className="!text-center">{adDetailsPage.columns[0]}</TableCell>
                                                        <TableCell
                                                            style={{ minWidth: isPcOnly ? '210px' : isKorean ? "90px" : "180px" }}
                                                            className="!text-center">{adDetailsPage.columns[1]}</TableCell>
                                                        <TableCell
                                                            style={{ minWidth: isPcOnly ? '180px' : isKorean ? "80px" : "120px" }}
                                                            className="!text-center">
                                                            {adDetailsPage.columns[2]}
                                                        </TableCell>
                                                        <TableCell
                                                            style={{ minWidth: isPcOnly ? '175px' : isKorean ? "70px" : "120px" }}
                                                            className="!text-center">{adDetailsPage.columns[3]}</TableCell>
                                                        <TableCell
                                                            style={{ minWidth: isPcOnly ? '140px' : isKorean ? "70px" : "160px" }}
                                                            className="!text-center">{adDetailsPage.columns[4]}</TableCell>
                                                        <TableCell
                                                            style={{ minWidth: isPcOnly ? '140px' : isKorean ? "70px" : "160px" }}
                                                            className="!text-center">{adDetailsPage.columns[5]}</TableCell>
                                                        <TableCell
                                                            style={{ minWidth: isPcOnly ? '140px' : isKorean ? "70px" : "180px" }}
                                                            className="!text-center">{adDetailsPage.columns[6]}</TableCell>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody className="divide-y">
                                                    {vehiclesData?.length ? vehiclesData
                                                            .map((item, index) => {
                                                                return (
                                                                    <TableRow key={index} style={{ height: "50px" }}>

                                                                        <TableCell
                                                                            className={clsx("text-center", isPcOnly ? "!text-[14px]" : "!text-[13px]")}
                                                                            style={{ letterSpacing: "-0.16px" }}>
                                                                            {( (currentPage-1)*per_page)+ index + 1}
                                                                        </TableCell>
                                                                        <TableCell
                                                                            className={clsx("text-center", isPcOnly ? "!text-[14px]" : "!text-[13px]")}>
                                                                            {item?.car_number}
                                                                        </TableCell>
                                                                        <TableCell
                                                                            className={clsx("text-center", isPcOnly ? "!text-[14px]" : "!text-[13px]")}
                                                                            style={{ letterSpacing: "-0.16px" }}>
                                                                            {item?.vehicle_type}
                                                                        </TableCell>
                                                                        <TableCell
                                                                            className={clsx("text-center", isPcOnly ? "!text-[14px]" : "!text-[13px]")}>
                                                                            {
                                                                                item?.vehicle_status ? operationStatus[item?.vehicle_status.toLowerCase()] : "-"
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell className="!text-[14px] !text-center"
                                                                                   style={{ letterSpacing: "-0.16px" }}>
                                                                            {
                                                                                // item?.vehicle_status === "end" ?
                                                                                //     <DisabledButton>{item?.vehicle_information}</DisabledButton> :
                                                                                    <Link
                                                                                        legacyBehavior
                                                                                        href={`/dashboard/advertisement-detail/${item.advertisement_id}/vehicle/${item.cargo_vehicle_id}`}
                                                                                    >
                                                                                        <a className="text-advertiser-primary hover:no-underline">
                                                                                            {item?.vehicle_information}
                                                                                        </a>
                                                                                    </Link>
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell
                                                                            className={clsx("text-center", isPcOnly ? "!text-[14px]" : "!text-[13px]")}>
                                                                            {
                                                                                // item?.vehicle_status === "end" ?
                                                                                //     <DisabledButton>{item?.vehicle_location}</DisabledButton> :
                                                                                    <Link
                                                                                        legacyBehavior
                                                                                        href={`/dashboard/advertisement-detail/${item.advertisement_id}/vehicle-location/${item.cargo_vehicle_id}`}
                                                                                    >
                                                                                        <a className="text-advertiser-primary hover:no-underline">
                                                                                            {item?.vehicle_location}
                                                                                        </a>
                                                                                    </Link>
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell
                                                                            className={clsx("text-center", isPcOnly ? "!text-[14px]" : "!text-[13px]")}>
                                                                            {
                                                                                // item?.vehicle_status === "end" ?
                                                                                //     <DisabledButton>{item?.vehicle_location}</DisabledButton> :
                                                                                    <div
                                                                                        className="text-advertiser-primary cursor-pointer"
                                                                                        onClick={() => {
                                                                                            setVerifyPicturesModalData({
                                                                                                advertisement_id: item.advertisement_id,
                                                                                                cargo_vehicle_id: item.cargo_vehicle_id
                                                                                            })
                                                                                            setOpen(true)
                                                                                        }}
                                                                                    >
                                                                                        {item?.vehicle_location}
                                                                                    </div>

                                                                            }
                                                                        </TableCell>


                                                                    </TableRow>
                                                                );
                                                            })
                                                        : <></>

                                                    }

                                                </TableBody>
                                            </Table>
                                        </div>

                                        <div className={'!text-center justify-center flex w-[100%] pt-2 pb-2'}>
                                            {isLoading && <div
                                                className="flex justify-center items-center w-full h-15 backdrop-blur-sm">
                                                <CircularProgress color="primary"/>
                                            </div>}

                                            {
                                                ((!vehiclesData || vehiclesData?.length === 0) && !isLoading) &&
                                                <div>{common?.no_data_found}</div>
                                            }
                                        </div>

                                        {/* Render the Pagination component */}
                                        {
                                            vehiclesData?.length ?
                                                <div className='flex justify-center py-[30px] notification_pagination'
                                                     style={{ background: "none" }}>
                                                    <Pagination
                                                        current={currentPage}
                                                        total={totalRecords}
                                                        pageSize={per_page}
                                                        onChange={(page) => setFilters({ ...filters, page })}
                                                    />
                                                </div> : <></>
                                        }
                                    </div>


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
        <AdvertisementDetailScreen/>
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
    const {
        dictionary: { verifyPicturesModal, operatingAreas: operatingAreasTrans, common, pageTitle },
        isPcOnly,
        isKorean
    } = useAuth();
    const [{ start_date, end_date }, setDate] = useState({ start_date: '', end_date: '' });
    const [filterDate, setFilterDate] = useState({
        start_date: '', end_date: ''
    })
    const [page,setPage] = useState(1)
    const [selectedRow, setSelectedRow] = useState(0);
    const { data : resData, isFetching: isLoading } = useGetCargoVerificationImages({
        ...verifyPicturesModalData, startDate: filterDate?.start_date, endDate: filterDate?.end_date,
        page,
        per_page : 5
    });

    const data = resData?.data
    const pagination = resData?.pagination

    const handleSelect = (selectedIndex: any, e: any) => {
        setIndex(selectedIndex);
    };

    const CarouselWrapper = styled.div`
      .carousel.slide {
        height: 395px;
      }
    `;

    useEffect(() => {
        if ((start_date && end_date) || (!start_date && !end_date)) {
            setFilterDate({ start_date, end_date })
        }
    }, [start_date, end_date])

    const columns = [
        {
            width : 160,
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
            width : 160,
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
            width : 160,
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
                    className={`text-center underline ${enabled ? 'text-advertiser-primary cursor-pointer' : 'cursor-not-allowed text-[#999999]'}`}
                    onClick={() => {
                        if (enabled) {
                            setStep(1)

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
              <div className={'flex justify-between items-center px-[10px] h-[78px]'}>
                  <ArrowBack
                      handleAction={() => {
                          if (step === 1) setStep(0)
                           else close()

                      }}
                  />
                  <p className="text-2xl font-bold text-center text-[#29293E] border-b border-white">
                      {verifyPicturesModal.title}
                  </p>
                  <span className={'invisible'}>.</span>
              </div>
            }
            footer={false}
            closable={false}
            className={"ad_modal"}
            width={isPcOnly ? 520 : 370}
        >
            <div className="flex justify-center w-[100%] p-0 lg:p-6 lg:w-[100%] pb-3">
                {step === 1 && data && data[selectedRow].image_path?.length && (
                    <div
                        className={`!lg:w-[550px] overflow-hidden ${styles.active} ${styles.detail_slide} ${styles.box}`}
                        id="div3d"
                    >
                        <CarouselWrapper className={styles.swiper_wrapper}>
                            <Carousel activeIndex={index} onSelect={handleSelect}>
                                {data[selectedRow].image_path?.map((item, index) => (
                                    <Carousel.Item key={index}>
                                        <AntImage
                                            src={item}
                                            alt="slides"
                                            width={isPcOnly ? 520 : 370}
                                            height={395}
                                            fallback="data:image/png;base64,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"
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </CarouselWrapper>
                    </div>
                )}
                {step === 0 &&
                    <div className={'w-[340px] lg:w-[100%] lg:p-4 pb-0 pt-0'}>
                        <div className="flex justify-between items-center gap-2 pb-3 lg:pb-4  w-[340px] lg:px-0 lg:w-[100%]">
                            <DatePicker
                                style={{width : "50%",height :"40px"}}
                                suffixIcon={<DateIcon/>}
                                popupClassName={clsx("admin-advertisement-date-picker", isKorean ? "korean-date" : "eng-date")}
                                placeholder={common?.select_date}
                                className={clsx(
                                    styles['date-picker'],
                                )}
                                onChange={(date, dateString) => setDate({ end_date, start_date: dateString })}
                                value={start_date ? dayjs(start_date, "YYYY-MM-DD") : undefined}
                            />
                            <span>~</span>
                            <DatePicker
                                style={{width : "50%",height :"40px"}}
                                suffixIcon={<DateIcon/>}
                                popupClassName={clsx("admin-advertisement-date-picker", isKorean ? "korean-date" : "eng-date")}
                                placeholder={common?.select_date}
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
                            showPagination={!!data?.length}
                            itemsPerPage={5}
                            currentPage={page || 1}
                            totalItems={pagination?.total_items}
                            onChangePage={(page) => setPage(page)}
                        />
                    </div>
                }
            </div>
        </Modal>
    );
};

export default WithRoles;
