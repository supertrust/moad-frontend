import { Skeleton } from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import styles from "./style.module.css";
import AdModel, { AdModelRef } from "../SaveAdModel";

import {
  useDeleteAdvertisement,
  useGetAdvertisements, useGetAdvertiserVehiclesStats,
  useUpdateAdStatus,
} from "@src/apis/advertisement";
import { AdStatusesType, AdTypesType } from "@src/types/advertisement";
import { toast } from "react-toastify";
import useAuth from "@src/hooks/useAuth";
import RoleBasedGuard from "@src/guards/RoleBasedGuard";
export default function Advertising() {
  const { userRole } = useAuth();
  const adModel = useRef<AdModelRef>(null);
  const [selectedAds, setSelectedAds] = useState<number[]>([]);
  const [status, setStatus] = useState<AdStatusesType | undefined>();
  const [type, setType] = useState<AdTypesType | undefined>();
  const {data: advertiserVehiclesStats, isLoading : isAdvertiserVehiclesStats  } = useGetAdvertiserVehiclesStats() as {data:any, isLoading : boolean}
  const { data: advertisements, isLoading : isAdvertisementLoading } = useGetAdvertisements({
    status,
    type,
    for_admin: userRole?.role_name === "Admin",
  });

  const currentDate = new Date();
  const formatDate = currentDate.toLocaleDateString('ko', { month: "2-digit", year:"numeric", day:"2-digit"}).replace(' ','');
  const formatTime = currentDate.toLocaleTimeString('ko', { hour12: true , timeStyle: 'short', });

  return (
    <>
      <div className={`${styles.adStatus}`}>
      <div className={styles.title_wrap_top}>
      광고관리
									</div>
        <div className={`${styles.titleWrap} pb-[11px] sm:pb-[20px] gap-[8px]`}>
          <div className={styles.title}>
            <span>광고 현황</span>
          </div>
          <div className={styles.line}></div>
          <div className={`${styles.text} !p-[0px]`}>
            <span>{formatDate} {formatTime} 기준</span>
          </div>
        </div>
      </div>
      <div className={styles.adContents}>
        <div className={styles.cards}>
          {/*    <div className={styles.title}>*/}
          <div className={styles.itemTitle}>
            <span>등록된 광고</span>
          </div>
          <div className={styles.value}>
            <span>{
              (isAdvertiserVehiclesStats || isAdvertisementLoading) ? <Skeleton variant={'text'} sx={{fontSize : "20px"}}
              width={20} height ={28}/> : advertisements?.data?.length
            }건
            </span>
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.itemTitle}>
            <span>총 운행차량</span>
          </div>
          <div className={styles.value}>
            <span>{  (isAdvertiserVehiclesStats || isAdvertisementLoading)  ? <Skeleton variant={'text'} sx={{fontSize : "20px"}}
                                                          width={20} height ={28}/> :
                advertiserVehiclesStats?.total_vehicles}대</span>
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.itemTitle}>
            <span>운행중</span>
          </div>
          <div className={styles.value}>
            <span>{  (isAdvertiserVehiclesStats || isAdvertisementLoading) ? <Skeleton variant={'text'} sx={{fontSize : "20px"}}
                                                         width={20} height ={28}/>
                : `${advertiserVehiclesStats?.running}대`}</span>
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.itemTitle}>
            <span>운행정지</span>
          </div>
          <div className={styles.value}>
            <span>{  (isAdvertiserVehiclesStats || isAdvertisementLoading) ? <Skeleton variant={'text'} sx={{fontSize : "20px"}}
                                                         width={20} height ={28}/>:
                advertiserVehiclesStats?.suspensions}대</span>
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.itemTitle}>
            <span>총 진행거리</span>
          </div>
          <div className={styles.value}>
            <span>{  (isAdvertiserVehiclesStats || isAdvertisementLoading) ? <Skeleton variant={'text'} sx={{fontSize : "20px"}} width={20} height ={28}/>: advertiserVehiclesStats?.total_distance.toLocaleString()} km</span>
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.itemTitle}>
            <span>총 진행시간</span>
          </div>
          <div className={styles.value}>
            <span>{  (isAdvertiserVehiclesStats || isAdvertisementLoading) ? <Skeleton variant={'text'} sx={{fontSize : "20px"}} width={20} height ={28}/>: advertiserVehiclesStats?.total_hours.toLocaleString()} 분</span>
          </div>
        </div>
      </div>
    </>
  );
}
