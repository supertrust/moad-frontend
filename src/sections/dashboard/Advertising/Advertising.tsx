import { Skeleton } from "@mui/material";
import {
  useGetAdvertisements,
  useGetAdvertiserVehiclesStats,
} from "@src/apis/advertisement";
import { formatNumberWithCommas } from "@src/utils/formatter";
import React, { useEffect } from "react";
import styles from "./style.module.css";
import useAuth from "@src/hooks/useAuth";

export default function Advertising() {
  const { dictionary } = useAuth();

  const {
    data: advertiserVehiclesStats,
    isLoading: isAdvertiserVehiclesStats,
  } = useGetAdvertiserVehiclesStats({ notfication: true }) as {
    data: any;
    isLoading: boolean;
  };
  const { data: advertisements, isLoading: isAdvertisementLoading } =
    useGetAdvertisements({});

  const currentDate = new Date();
  const formatDate = currentDate
    .toLocaleDateString("ko", {
      month: "2-digit",
      year: "numeric",
      day: "2-digit",
    })
    .replace(" ", "");
  const formatTime = currentDate.toLocaleTimeString("ko", {
    hour12: true,
    timeStyle: "short",
  });

  return (
    <>
      <div className={`${styles.adStatus}`}>
        <div className={styles.title_wrap_top}>
          {dictionary.dashboard.title}
        </div>
        <div className={`${styles.titleWrap} pb-[11px] sm:pb-[20px] gap-[8px]`}>
          <div className={styles.title}>
            <span>{dictionary.dashboard.advertizing_status}</span>
          </div>
          <div className={styles.line}></div>
          <div className={`${styles.text} !p-[0px]`}>
            <span>
              {formatDate} {formatTime} {dictionary.dashboard.standard}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.adContents}>
        <div className={styles.cards}>
          {/*    <div className={styles.title}>*/}
          <div className={styles.itemTitle}>
            <span>{dictionary.dashboard.registered_advertisement}</span>
          </div>
          <div className={styles.value}>
            <span>
              {isAdvertiserVehiclesStats || isAdvertisementLoading ? (
                <Skeleton
                  variant={"text"}
                  sx={{ fontSize: "20px" }}
                  width={20}
                  height={28}
                />
              ) : (
                formatNumberWithCommas(advertisements?.data?.length)
              )}
              {" "}{dictionary.dashboard.case}
            </span>
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.itemTitle}>
            <span>{dictionary.dashboard.total_vehicales}</span>
          </div>
          <div className={styles.value}>
            <span>
              {isAdvertiserVehiclesStats || isAdvertisementLoading ? (
                <Skeleton
                  variant={"text"}
                  sx={{ fontSize: "20px" }}
                  width={20}
                  height={28}
                />
              ) : (
                formatNumberWithCommas(advertiserVehiclesStats?.total_vehicles)
              )}
              {" "}{dictionary.dashboard.big}
            </span>
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.itemTitle}>
            <span>{dictionary.dashboard.running}</span>
          </div>
          <div className={styles.value}>
            <span>
              {isAdvertiserVehiclesStats || isAdvertisementLoading ? (
                <Skeleton
                  variant={"text"}
                  sx={{ fontSize: "20px" }}
                  width={20}
                  height={28}
                />
              ) : (
                `${formatNumberWithCommas(advertiserVehiclesStats?.running)} ${dictionary.dashboard.big}`
              )}
            </span>
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.itemTitle}>
            <span>{dictionary.dashboard.suspensions}</span>
          </div>
          <div className={styles.value}>
            <span>
              {isAdvertiserVehiclesStats || isAdvertisementLoading ? (
                <Skeleton
                  variant={"text"}
                  sx={{ fontSize: "20px" }}
                  width={20}
                  height={28}
                />
              ) : (
                formatNumberWithCommas(advertiserVehiclesStats?.suspensions)
              )}{" "}
              {dictionary.dashboard.big}
            </span>
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.itemTitle}>
            <span>{dictionary.dashboard.total_distance}</span>
          </div>
          <div className={styles.value}>
            <span>
              {isAdvertiserVehiclesStats || isAdvertisementLoading ? (
                <Skeleton
                  variant={"text"}
                  sx={{ fontSize: "20px" }}
                  width={20}
                  height={28}
                />
              ) : (
                formatNumberWithCommas(
                  advertiserVehiclesStats?.total_distance,
                  2
                )
              )}{" "}
              km
            </span>
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.itemTitle}>
            <span>{dictionary.dashboard.total_hours}</span>
          </div>
          <div className={styles.value}>
            <span>
              {isAdvertiserVehiclesStats || isAdvertisementLoading ? (
                <Skeleton
                  variant={"text"}
                  sx={{ fontSize: "20px" }}
                  width={20}
                  height={28}
                />
              ) : (
                formatNumberWithCommas(advertiserVehiclesStats?.total_hours)
              )}{" "}
               {dictionary.dashboard.minutes}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
