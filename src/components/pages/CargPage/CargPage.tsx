import { Card } from "@mui/material";
import ArrowBack from "@src/components/icons/ArrowBack";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import Image from "next/image";

function CargPage() {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>page title - 가이드</title>
      </Head>
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
        style={{ backgroundColor: "white" }}>
        <div className={`${styles["bg_Head_"]}`}>
          <div className='font-bold text-[30px] text-[#373737]'>가이드</div>
          <div className='font-bold text-[40px] text-[#373737]'>
            랩핑광고란?
          </div>
        </div>
        <Card
          variant='elevation'
          elevation={3}
          className={`flex flex-col justify-between h-full gap-2 !shadow-[0px_2px_8px_0px_rgba(38,51,77,0.00)] ${styles["_bottom_a_style_img_group"]}`}>
          <div className={`${styles["_root__text_img"]}`}>
            <Image
              src='/images/b11.svg'
              alt='me'
              height={20}
              width={20}
            />
            <div>
              <h4>화물차 랩핑 광고</h4>
              <p>
                차량의 외관을 특수한 비닐 필름으로 덮어
                <br className={`${styles["br_mobile"]}`} /> 광고 메시지를
                전달하는 마케팅 방법
                <br /> 운행 하는 도로를 통해 상품, 브랜드, 서비스, 이벤트
                <br className={`${styles["br_mobile"]}`} /> 또는 기타 캠페인등을
                홍보할
                <br className={`${styles["br_desktop"]}`} />{" "}수 있으며, 차량
                측면,
                <br className={`${styles["br_mobile"]}`} />
                {" "}후면 부분에 광고를 진행할 수 있습니다.
                <br />
                대중적인 이동 수단에서 매우 큰 광고 효과를 얻을
                <br className={`${styles["br_mobile"]}`} />{" "}수 있는 장점이
                있습니다.
              </p>
            </div>
          </div>
        </Card>

        <Card
          variant='elevation'
          elevation={3}
          className={`flex flex-col justify-between h-full gap-2 !shadow-[0px_2px_8px_0px_rgba(38,51,77,0.00)] ${styles["_bottom_card_list_wrapper"]}`}>
          <div className={`${styles["_root__list_items"]}`}>
            <div>
              <h4>높은 노출률</h4>
              <p>
                차량 랩핑 광고는 도로를 주행하는 차량들의 눈에 띄어 매우 높은
                노출률을 가지고 있습니다.
                <br /> 또한, 차량은 도로를 주행하는 동안 다양한 지역을
                <br className={`${styles["br_mobile"]}`} /> 지나가므로 광고
                지역의 다양성이 보장됩니다.
                <br />
                특히, 교통 체증이나 주요 도로에서 주행할 때 광고 효과가 더욱
                높아집니다.
              </p>
            </div>
            <div>
              <h4>넓은 광고 범위</h4>
              <p>
                랩핑 광고는 다양한 광고 영역을 포함할 수 있으며, 여러 군데에서
                광고가 가능합니다. <br />
                또한, 화물차는 일반적으로 교통량이 많은 고속도로를 이용하므로 더
                많은 사람들이 광고를 볼 수 있습
                <br className={`${styles["br_mobile"]}`} />
                니다.
              </p>
            </div>
            <div>
              <h4>비용절감</h4>
              <p>
                화물차 랩핑 광고는 일반적인 광고매체에 비해 저렴한 비용으로
                광고를 전파할 수 있습니다.
                <br />
                또한, 화물차는 매일 일정한 노선을 운행하므로 노선 상에서 광고
                메시지를 전달할 수 있어 추가적인 광고 비용이 필요하지 않습니다.
              </p>
            </div>
            <div>
              <h4>높은 참여도</h4>
              <p>
                랩핑 광고는 차량의 크기와 밝은 색상, 독특한 디자인 등으로 높은
                참여도를 가지고 있습니다.
                <br />
                이는 사람들이 광고에 대해 호기심을 갖게 하고, 기억에 남도록
                만듭니다.
              </p>
            </div>
            <div>
              <h4>광고 메시지의 지속성</h4>
              <p>
                랩핑 광고는 광고 메시지의 지속성이 높습니다. 광
                <br className={`${styles["br_mobile"]}`} />고 필름은 일정 기간
                유지될 수 있으며, 차량 랩핑은 비교적 쉽게 제거할 수 있으므로,
                <br /> 광고주는 광고 전략이나 캠페인이 변경되더라도 쉽
                <br className={`${styles["br_mobile"]}`} />게 광고를
                업데이트하거나 변경할 수 있습니다.
              </p>
            </div>
            <div>
              <h4>브랜드 인식 증진</h4>
              <p>
                차량 랩핑 광고는 광고주의 브랜드, 제품 또는 서비
                <br className={`${styles["br_mobile"]}`} />
                스를 큰 이미지로 홍보할 수 있습니다.
                <br className={`${styles["br_desktop"]}`} /> 이를 통해
                <br className={`${styles["br_mobile"]}`} /> 브랜드 인식과
                인지도를 높일 수 있습니다
              </p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default CargPage;
