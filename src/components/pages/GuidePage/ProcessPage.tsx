import { Card } from "@mui/material";
import ArrowBack from "@src/components/icons/ArrowBack";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";

function ProcessPage() {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Process</title>
      </Head>
      <div style={{ backgroundColor: "#f5f7fb !important" }}>
        <div className={"only-mb"}>
          <div className={`${styles["mobile-top-header"]}`}>
            <div style={{ alignSelf: "flex-start" }}>
              <ArrowBack
                className={"ml-4"}
                handleAction={onBack}
              />
            </div>
            <div className={styles["header"]}>가이드</div>
            <div></div>
          </div>
        </div>

        <div
          className={`pl-[45px] pr-[32px]  pt-[20px] pb-[35px] text-gray-700 flex flex-col gap-[20px] ${styles["_ava_root"]}`}
          style={{ backgroundColor: "#f5f7fb" }}>
          <div style={{ backgroundColor: "white" }}>
            <div className={`${styles["bg_Head_"]}`}>
              <div className='font-bold text-[30px] text-[#373737]'>가이드</div>
              <div className='font-bold text-[40px] text-[#373737]'>
                이카루스 광고 진행 프로세스
              </div>
            </div>
            <Card
              variant='elevation'
              elevation={3}
              className={`flex flex-col justify-between h-full gap-2 !shadow-[0px_2px_8px_0px_rgba(38,51,77,0.00)] ${styles["_bottom_card_list_wrapper"]}`}>
              <div className={`${styles["_root__list_items"]}`}>
                <div className={`${styles["_root__text_img"]}`}>
                  <div className={`${styles["_step_avatar_style"]}`}>
                    <img
                      src='/images/process/1.svg'
                      alt='step1'
                    />
                  </div>
                  <div className={`${styles["text_ss"]}`}>
                    <h3>STEP 1</h3>
                    <h4>광고 신청하기</h4>
                    <p>
                      광고 목적에 따라 광고 유형, 희망 기간, 희망 차
                      <br className={`${styles["br_mobile"]}`} />량 등
                      <br className={`${styles["br_desktop"]}`} />
                      조건 을 설정하여 광고를 신청합니다.
                    </p>
                  </div>
                </div>
                <div className={`${styles["_root__text_img"]}`}>
                  <div className={`${styles["_step_avatar_style"]}`}>
                    <img
                      src='/images/process/2.svg'
                      alt='step2'
                    />
                  </div>
                  <div className={`${styles["text_ss"]}`}>
                    <h3>STEP 2</h3>
                    <h4>광고 상담</h4>
                    <p>
                      이카루스 담당자가 확인 후 연락드립니다. <br />
                      광고 진행에 관한 자세한 상담을 도와드립니다.
                    </p>
                  </div>
                </div>
                <div className={`${styles["_root__text_img"]}`}>
                  <div className={`${styles["_step_avatar_style"]}`}>
                    <img
                      src='/images/process/3.svg'
                      alt='step3'
                    />
                  </div>
                  <div className={`${styles["text_ss"]}`}>
                    <h3>STEP 3</h3>
                    <h4>차량 모집</h4>
                    <p>
                      이카루스에서 검증된 차량들이며, <br />
                      해당 광고를 부착할 차량을 모집합니다.
                    </p>
                  </div>
                </div>
                <div className={`${styles["_root__text_img"]}`}>
                  <div className={`${styles["_step_avatar_style"]}`}>
                    <img
                      src='/images/process/4.svg'
                      alt='step4'
                    />
                  </div>
                  <div className={`${styles["text_ss"]}`}>
                    <h3>STEP 4</h3>
                    <h4>광고 진행</h4>
                    <p>
                      운행차량의 실시간 위치 등 <br />
                      광고 진행을 확인하실 수 있습니다.
                    </p>
                  </div>
                </div>
                <div className={`${styles["_root__text_img"]}`}>
                  <div className={`${styles["_step_avatar_style"]}`}>
                    <img
                      src='/images/process/5.svg'
                      alt='step5'
                    />
                  </div>
                  <div className={`${styles["text_ss"]}`}>
                    <h3>STEP 5</h3>
                    <h4>광고 통계 확인</h4>
                    <p>
                      총 누적금액, 진행 거리, 진행 시간 등 <br />
                      각종 내역들을 통계에서 확인하실 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProcessPage;
