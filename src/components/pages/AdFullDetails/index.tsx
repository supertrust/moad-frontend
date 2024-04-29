import ArrowBack from "@src/components/icons/ArrowBack";
import Loader from "@src/components/Loader";
import { DataRow, AdImage } from "@src/components/common";
import HeaderLine from "@src/components/common/HeaderLine";
import styles from "@src/components/pages/GuidePage/styles.module.scss";
import { useIcarusContext } from "@src/hooks/useIcarusContext";
import { clsx } from "clsx";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PageTitleBackButton from "../../common/PageTitleBackButton/PageTitleBackButton";
import style from "./style.module";
import { useGetAdvertisementDetail } from "@src/apis/advertisement";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Carousel } from "react-bootstrap";
import Image from "next/image";
import useAuth from "@src/hooks/useAuth";

const labelColClass = " bg-advertiser-light font-medium";

export const Types = {
  fixed_ad: "고정",
  national_ad: "전국",
  spot_ad: "스팟",
};

export const allStatuses = {
  in_progress: "광고진행중",
  ad_reviewing: "광고검수중",
  end: "광고종료",
  decline: "거절됨",
  applying: "신청중",
  recruiting_cargo_owners: "화물주모집중",
  applying_for_advertisement: "광고신청중",
  proceeding: "진행중",
};

function AdFullDetails() {
  const { query } = useRouter();
  const { dictionary,isPcOnly } = useAuth();

  const advertisementId = query.ad_id as string;
  const { data: advertisement, isLoading: isAdvertisementLoading } =
    useGetAdvertisementDetail({ id: advertisementId });

  const title = dictionary.common.advertisement_management;
  const { pageTitle, setPageTitle } = useIcarusContext();
  const [viewopen, setViewOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex: any, e: any) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    pageTitle !== title && setPageTitle(title);
  }, []);

  const getVehicleTypeCount = (type: string) => {
    if (!advertisement?.vehicles_in_operation) return `0${dictionary.dashboard.big}`;
    const vType = advertisement?.vehicles_in_operation?.filter(
      (value) => value.vehicle_type == type
    );
    return `${vType.length ? vType[0].number_of_vehicles : 0}${dictionary.dashboard.big}`;
  };

  const getMinVehicleTypeCount = (type: string) => {
    if (!advertisement?.vehicles_in_operation) return `0${dictionary.dashboard.big}`;
    const vType = advertisement?.vehicles_in_operation?.filter(
      (value) => value.vehicle_type == type
    );
    return `${vType.length ? vType[0].min_num_of_vehicle : 0}${dictionary.dashboard.big}`;
  };

  const modalstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
  };

  const TypeOfVechicle = [
    { text: dictionary.vehicle_types.cargo, value: "cargo" },
    { text: dictionary.vehicle_types.tower, value: "tower" },
    { text: dictionary.vehicle_types.loaded, value: "loaded" },
  ];
  return (
    <div className="px-4 py-3">
      <div className={"only-mb"}>
       <PageTitleBackButton title={dictionary.common.advertisement_details}></PageTitleBackButton>
      </div>
      {isPcOnly && <HeaderLine title={dictionary.common.advertisement_details} />}
      {isAdvertisementLoading ? (
        <Loader />
      ) : (
        <table className="mt-3 w-full text-[14px] md:text-[16px]">
          <DataRow
            title={dictionary.common.advertisement_status}
            className={style.className}
            firstColumClass={style.firstColumnClass}
            colSpan={2}
            
          >
            {dictionary.statuses[advertisement?.status || "in_progress"]}
          </DataRow>
          <DataRow
            title={dictionary.common.advertisement_type}
            className={style.className}
            firstColumClass={style.firstColumnClass}
            colSpan={2}
            
          >
            {advertisement?.type && dictionary.types[advertisement?.type]}
          </DataRow>
          <DataRow
            title={dictionary.common.advertisement_name}
            className={style.className}
            firstColumClass={style.firstColumnClass}
            colSpan={2}
            
          >
            {advertisement?.ad_name}
          </DataRow>
          <DataRow
            title={dictionary.common.advertisement_content}
            className={style.className}
            firstColumClass={style.firstColumnClass}
            colSpan={2}
            
          >
            <textarea readOnly rows={5} className={clsx(style.textArea,'textarea-input')}>
              {advertisement?.content}
            </textarea>
          </DataRow>
          <DataRow
            title={dictionary.common.vehicle_recruitment_period}
            className={style.className}
            firstColumClass={style.firstColumnClass}
            colSpan={2}
          >
            {advertisement?.recruitment_period_start_date
              ? advertisement?.recruitment_period_start_date +
                "~" +
                advertisement?.recruitment_period_end_date
              : "--"}
          </DataRow>
          <DataRow
            title={dictionary.common.vehicle_type}
            className={style.className}
            firstColumClass={style.firstColumnClass}
            colSpan={2}
          >
            {advertisement?.vehicle_type &&
              TypeOfVechicle.find(
                (type) => type.value === advertisement?.vehicle_type
              )?.text}
          </DataRow>
          <DataRow
            title={dictionary.common.vehicle_count}
            className={style.className}
            firstColumClass={style.firstColumnClass}
            colSpan={2}
            
          >
            {advertisement?.number_of_cargo || 0}{dictionary.dashboard.big}
          </DataRow>
          <DataRow
            title={
              <p className={labelColClass}>
                {dictionary.common.min_vehicle_count}
                <br />{" "}
                <span className={"text-[12px] md:text-[14px] font-normal"}>
                  ({dictionary.common.min_max_number_vehicales})
                </span>
              </p>
            }
            className={style.className}
            firstColumClass={style.firstColumnClass}
            colSpan={1}
            rowSpan={4}
            additionalColumn={[
              {
                title: "1t",
                className: style.additionalColumClass,
              },
            ]}
          >
            {getMinVehicleTypeCount("1t")} / {getVehicleTypeCount("1t")}
          </DataRow>
          {["2.5t", "5t", "11t"].map((type) => (
            <DataRow
              key={type}
              title={type}
              className={style.className}
              firstColumClass={style.additionalColumClass}
            >
              {" "}
              {getMinVehicleTypeCount(type)} / {getVehicleTypeCount(type)}
            </DataRow>
          ))}
          <DataRow
            title={dictionary.common.advertisement_period}
            className={style.className}
            firstColumClass={style.firstColumnClass}
            colSpan={2}

          >
            {advertisement?.start_date} ~ {advertisement?.end_date}
          </DataRow>
          <DataRow
            title={dictionary.common.operating_area}
            className={style.className}
            firstColumClass={style.firstColumnClass}
            colSpan={2}
          >
            {advertisement?.operating_areas?.toString()}
          </DataRow>
          <DataRow
            title={dictionary.common.advertisement_images}
            className={style.className}
            firstColumClass={style.firstColumnClass}
            colSpan={2}

          >
            <div className="sm:flex sm:flex-row gap-1">
              {advertisement?.images.map((value, key) => (
                <AdImage
                    className={'w-[180px] md:w-[210px] py-[4px]'}
                  src={value.image_path}
                  key={key}
                  onView={() => {
                    setIndex(key);
                    setViewOpen(true);
                  }}
                />
              ))}
            </div>
          </DataRow>
        </table>
      )}
      <Modal
        open={viewopen}
        onClose={() => setViewOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="div" sx={modalstyle}>
          <Box component="div">
            <CloseIcon
              onClick={() => setViewOpen(false)}
              sx={{
                position: "absolute",
                top: "0px",
                right: "-30px",
                background: "#2C324C",
                cursor: "pointer",
                color: "#fff",
                zIndex: "99",
              }}
            />
          </Box>
          <Box component={"div"}>
            <Carousel
              className="advertisment_full_detail "
              activeIndex={index}
              interval={null}
              onSelect={handleSelect}
            >
              {advertisement?.images.map((value, key) => (
                <Carousel.Item key={key}>
                  <Image
                    src={value.image_path}
                    alt="slides"
                    width={668}
                    height={500}
                  />
                  <Carousel.Caption className="valu-text"></Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default AdFullDetails;
