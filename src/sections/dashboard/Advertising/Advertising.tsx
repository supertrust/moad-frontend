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
  const {data: advertiserVehiclesStats } = useGetAdvertiserVehiclesStats() as {data:any}
  const { data: advertisements } = useGetAdvertisements({
    status,
    type,
    for_admin: userRole?.role_name === "Admin",
  });

  return (
    <>
      <div className={styles.adStatus}>
        <div className={styles.titleWrap}>
          <div className={styles.title}>
            <span>Advertising status</span>
          </div>
          <div className={styles.line}></div>
          <div className={styles.text}>
            <span>As of 12:00 am on March 10, 2023</span>
          </div>
        </div>
      </div>
      <div className={styles.adContents}>
        <div className={styles.cards}>
          {/*    <div className={styles.title}>*/}
          <div className={styles.itemTitle}>
            <span>registered advertisement</span>
          </div>
          <div className={styles.value}>
            <span>{advertisements?.length}</span>
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.itemTitle}>
            <span>total vehicle</span>
          </div>
          <div className={styles.value}>
            <span>{advertiserVehiclesStats?.total_vehicles}</span>
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.itemTitle}>
            <span> running</span>
          </div>
          <div className={styles.value}>
            <span>{advertiserVehiclesStats?.running}th</span>
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.itemTitle}>
            <span>Suspension</span>
          </div>
          <div className={styles.value}>
            <span>{advertiserVehiclesStats?.suspensions}</span>
          </div>
        </div>
      </div>
    </>
  );
}
