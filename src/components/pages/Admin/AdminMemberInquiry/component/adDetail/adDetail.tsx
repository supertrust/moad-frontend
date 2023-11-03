import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import {DotStatusIcon} from "@src/components/icons/admin/advertisement";
import { AdminAdList } from "@src/types/admin/member-inquiry";
import clsx from "clsx";
import * as React from "react";
import styles from "@src/components/pages/Admin/AdminMemberInquiry/component/adListModal/styles.module.scss";
import detailstyles from "@src/components/pages/Admin/MemberDetail/styles.module.scss";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AdvertisementStatus = {
  proceeding: "진행중",
  in_progress: "진행중",
  applying: "신청중",
  end: "종료",
};

const Types = {
  fixed_ad: "고정",
  national_ad: "국가",
  spot_ad: "스팟",
};

function AdDetail({
  adDetailModalOpen,
  handleAdDetailModalClose,
}: {
  adDetailModalOpen: {
    open: boolean;
    data: AdminAdList | null;
  };
  handleAdDetailModalClose: () => void;
}) {
  return (
    <div>
      <BootstrapDialog
        onClose={handleAdDetailModalClose}
        aria-labelledby="customized-dialog-title"
        open={adDetailModalOpen.open}
        fullWidth={true}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "876px",
              height: "100%",
              maxHeight: "690px",
            },
          },
        }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer absolute top-[13px] left-[16px]"
          onClick={handleAdDetailModalClose}
        >
          <path
            d="M20 25L10 15L20 5"
            stroke="#6B7280"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <DialogTitle
          sx={{ m: 0, p: 1, textAlign: "center" }}
          id="customized-dialog-title"
        >
          <span className={styles["modal-title"]}>광고정보</span>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleAdDetailModalClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers className={detailstyles["member-detail"]}>
          <div className={detailstyles["member-content"]}>
            <div className={detailstyles["member-content-box"]}>
              <div className={detailstyles["member-content-title"]}>
                <p>광고명</p>
              </div>
              <div className={detailstyles["member-content-data"]}>
                <p>{adDetailModalOpen?.data?.ad_name}</p>
              </div>
            </div>
          </div>
          <div className={detailstyles["member-content"]}>
            <div className={detailstyles["member-content-box"]}>
              <div className={detailstyles["member-content-title"]}>
                <p>운행차량</p>
              </div>
              <div className={detailstyles["member-content-data"]}>
                <p className="flex gap-[5px]">
                  {adDetailModalOpen?.data?.advertisement_vehicles?.map(
                    (data, index) => (
                      <div key={index}>
                        {data.vehicles.vehicle_type}
                        {index !==
                          (adDetailModalOpen?.data?.advertisement_vehicles
                            ?.length ?? 0) -
                            1 && ","}
                      </div>
                    )
                  )}
                </p>
              </div>
            </div>
          </div>
          {/* <div className={detailstyles["member-content"]}>
            <div className={detailstyles["member-content-box"]}>
              <div className={detailstyles["member-content-title"]}>
                <p>운행차량수</p>
              </div>
              <div className={detailstyles["member-content-data"]}>
                <p>{adDetailModalOpen?.data.ad_name}</p>
              </div>
            </div>
          </div> */}
          <div className={detailstyles["member-content"]}>
            <div className={detailstyles["member-content-box"]}>
              <div className={detailstyles["member-content-title"]}>
                <p>광고진행상태</p>
              </div>
              <div className={detailstyles["member-content-data"]}>
                <div className={"flex justify-center px-[20px]"}>
                  <div
                    className={clsx(
                      styles["status"],
                      adDetailModalOpen?.data?.status == "proceeding"
                        ? "bg-[#ebf0fa]"
                        : "bg-[#ebf8f1]"
                    )}
                  >
                    <DotStatusIcon
                      fill={
                        adDetailModalOpen?.data?.status == "proceeding"
                          ? "#5991ff"
                          : "#1cba75"
                      }
                    />
                    <span
                      className={clsx(
                        adDetailModalOpen?.data?.status == "proceeding"
                          ? "text-[#5991ff]"
                          : "text-[#1cba75]"
                      )}
                    >
                      {
                        AdvertisementStatus[
                          adDetailModalOpen?.data?.status ?? ""
                        ]
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={detailstyles["member-content"]}>
            <div className={detailstyles["member-content-box"]}>
              <div className={detailstyles["member-content-title"]}>
                <p>광고유형</p>
              </div>
              <div className={detailstyles["member-content-data"]}>
                <p>{Types[adDetailModalOpen?.data?.type ?? ""]}</p>
              </div>
            </div>
          </div>
          <div className={detailstyles["member-content"]}>
            <div className={detailstyles["member-content-box"]}>
              <div className={detailstyles["member-content-title"]}>
                <p>광고기간</p>
              </div>
              <div className={detailstyles["member-content-data"]}>
                <p>
                  {adDetailModalOpen?.data?.start_date} ~{" "}
                  {adDetailModalOpen?.data?.end_date}
                </p>
              </div>
            </div>
          </div>
          {/* <div className={detailstyles["member-content"]}>
            <div className={detailstyles["member-content-box"]}>
              <div className={detailstyles["member-content-title"]}>
                <p>스티커 부착 위치</p>
              </div>
              <div className={detailstyles["member-content-data"]}>
                <p>{adDetailModalOpen?.data.ad_name}</p>
              </div>
            </div>
          </div> */}
          <div className={detailstyles["member-content"]}>
            <div className={detailstyles["member-content-box"]}>
              <div className={detailstyles["member-content-title"]}>
                <p>광고내용</p>
              </div>
              <div className={detailstyles["member-content-data"]}>
                <p>{adDetailModalOpen?.data?.content}</p>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", display: "flex" }}>
          <div
            className={styles["confirmation"]}
            onClick={handleAdDetailModalClose}
          >
            <span>확인</span>
          </div>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default AdDetail;
