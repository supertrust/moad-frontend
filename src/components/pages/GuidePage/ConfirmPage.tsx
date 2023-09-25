import { Card } from "@mui/material";
import ArrowBack from "@src/components/icons/ArrowBack";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import clsx from "clsx";

function ConfirmPage() {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Confirm</title>
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
                광고 유형 확인하기
              </div>
            </div>

            <Card
              variant='elevation'
              elevation={3}
              className={`flex flex-col justify-between h-full gap-2 !shadow-[0px_2px_8px_0px_rgba(38,51,77,0.00)] ${styles["_bottom_card_list_wrapper"]}`}>
              <p className={`${styles["cap_txt"]}`}>
                광고 목적에 따라 광고 유형을 적절하게 선택하여 광고의
                <br className={`${styles["br_mobile"]}`} /> 효율을 높일 수
                있습니다.
              </p>
              <div className={`${styles["_confirm_root__list_items"]}`}>
                <div className={`${styles["_confirm_root__text_img"]}`}>
                  <div className={`${styles["_step_avatar_style"]}`}>
                    <img
                      src='/images/confirm/1.svg'
                      alt='step1'
                    />
                  </div>
                  <div className={`${styles["text_ss"]}`}>
                    <h3>고정형 광고</h3>
                    <p>
                      특정 지역 화주들을 매칭하여 노출할 수 있
                      <br className={`${styles["br_mobile"]}`} />는 고정형 광고
                    </p>
                  </div>
                </div>
                <hr />
                <div className={`${styles["confirm_bullets__"]}`}>
                  <div>
                    <h4>지역적인 타겟팅 효과</h4>
                    <h6>
                      해당 지역의 소비자들에게 집중적으로 광고 메시지를 전달할
                      수 있습니다. 특히, 지역적인 특성이나 문화 등을 <br />
                      고려한 광고 전략을 세울 수 있어 효과적인 광고 효과를
                      기대할 수 있습니다.
                    </h6>
                  </div>
                </div>
                <div className={`${styles["confirm_bullets__"]}`}>
                  <div>
                    <h4>예산 효율성</h4>
                    <h6>
                      지역을 한정하여 광고를 진행할 경우, 해당 지역에 대한 광고
                      예산을 효율적으로 분배할 수 있습니다. 즉, 광고 예산을 더욱
                      집중적으로 투자하여{" "}
                      <br className={`${styles["br_mobile"]}`} />
                      노출빈도나 광고 크기 등을 높일 수 있습니다.
                    </h6>
                  </div>
                </div>

                <div className={`${styles["confirm_bullets__"]}`}>
                  <div>
                    <h4>지역 경쟁사 대응</h4>
                    <h6>
                      특정 지역에서 경쟁사가 많은 경우, 해당 지역에서만 광고를
                      진행하여 경쟁사에 대응할 수 있습니다.
                      <br /> 이는 지역적인 시장 경쟁력을 높이는 데에도 큰 도움이
                      될 수 있습니다.
                    </h6>
                  </div>
                </div>
                <div className={`${styles["confirm_bullets__"]}`}>
                  <div>
                    <h4>지역 효과 측정</h4>
                    <h6>
                      특정 지역에서만 광고를 진행할 경우, 해당 지역의 매출 혹은
                      인지도 등을 측정하여 광고 효과를 분석 하고 개선할 수
                      있습니다. <br className={`${styles["br_desktop"]}`} />
                      이를 통해 미디어 플래닝에 대한 정확한 정보를 얻을 수 있어,
                      미래 광고 전략 수립에 큰 도움이 됩니다.
                    </h6>
                  </div>
                </div>
              </div>

              <div className={`${styles["_confirm_root__list_items"]}`}>
                <div className={`${styles["_confirm_root__text_img"]}`}>
                  <div className={`${styles["_step_avatar_style"]}`}>
                    <img
                      src='/images/confirm/2.svg'
                      alt='step1'
                    />
                  </div>
                  <div className={`${styles["text_ss"]}`}>
                    <h3>전국형 광고 </h3>
                    <p>
                      전국 모든 화주들을 매칭하여 적은 비용으{" "}
                      <br className={`${styles["br_mobile"]}`} />로 광고효과를
                      최대화 할 수 있는 광고
                    </p>
                  </div>
                </div>
                <hr />
                <div className={`${styles["confirm_bullets__"]}`}>
                  <div>
                    <h4>대중적인 브랜딩 효과</h4>
                    <h6>
                      전국적으로 광고를 노출시킬 경우, 대중적인 브랜딩 효과를
                      기대할 수 있습니다.
                      <br /> 광고가 많은 사람들에게 노출되므로, 브랜드 인지도를
                      높일 수 있습니다.
                    </h6>
                  </div>
                </div>
                <div className={`${styles["confirm_bullets__"]}`}>
                  <div>
                    <h4>전국적인 마케팅 효과</h4>
                    <h6>
                      전국적으로 광고를 진행하면 전국적인 마케팅 효과를 얻을 수
                      있습니다. <br className={`${styles["br_desktop"]}`} />
                      특정 지역에 국한되지 않은 브랜딩이 가능하기 때문에, 더
                      많은 소비자에게 제품이나 서비스를 알릴 수 있습니다.
                    </h6>
                  </div>
                </div>

                <div className={`${styles["confirm_bullets__"]}`}>
                  <div>
                    <h4>넓은 범위의 대상층에게 노출</h4>
                    <h6>
                      전국적으로 광고를 진행하면 특정 지역에 국한되지 않고,
                      전국적으로 활동하는 대상층에게 노출할 수 있습니다.{" "}
                      <br className={`${styles["br_desktop"]}`} />
                      이는 특정 지역이나 지역적인 특성을 고려하지 않아도 되기
                      때문에, 브랜드 인지도를 높이는 데에 효과적입니다.
                    </h6>
                  </div>
                </div>
                <div className={`${styles["confirm_bullets__"]}`}>
                  <div>
                    <h4>저렴한 비용</h4>
                    <h6>
                      전국적으로 광고를 진행할 경우 고정형 광고보다 더 저렴한
                      비용으로 광고를 진행할 수 있습니다.
                    </h6>
                  </div>
                </div>
              </div>

              <div
                className={clsx(
                  `${styles["_confirm_root__list_items"]}`,
                  `${styles["_confirm_root__list_items_third"]}`
                )}>
                <div className={`${styles["_confirm_root__text_img"]}`}>
                  <div className={`${styles["_step_avatar_style"]}`}>
                    <img
                      src='/images/confirm/3.svg'
                      alt='step3'
                    />
                  </div>
                  <div className={`${styles["text_ss"]}`}>
                    <h3>스팟형 광고 </h3>
                    <p>
                      1시간 단위로 원하는 특정지역과 특정시간{" "}
                      <br className={`${styles["br_mobile"]}`} />에 노출할 수
                      있는 광고
                    </p>
                  </div>
                </div>
                <hr />
                <div className={`${styles["confirm_bullets__"]}`}>
                  <div>
                    <h4>타겟 마케팅 효과</h4>
                    <h6>
                      특정 위치나 시간대에 집중적으로 광고를 진행하면 해당
                      지역이나 시간대를 타겟으로 한 마케팅 효과를
                      <br /> 기대할 수 있습니다. 예를 들어, 지역 또는 시간대별로
                      선호하는 제품이나 서비스가 다를 수 있기 때문입니다
                    </h6>
                  </div>
                </div>
                <div className={`${styles["confirm_bullets__"]}`}>
                  <div>
                    <h4>효울적인 광고 비용</h4>
                    <h6>
                      특정 위치나 시간대에만 광고를 진행하면, 광고 예산을
                      효율적으로 분배할 수 있습니다. 전체 지역이나 시간대를{" "}
                      <br className={`${styles["br_desktop"]}`} />
                      대상으로 하는 광고보다 효율적으로 광고를 노출시켜 원하는
                      결과를 더 빠르고 효율적으로 달성할 수 있습니다.
                    </h6>
                  </div>
                </div>

                <div className={`${styles["confirm_bullets__"]}`}>
                  <div>
                    <h4>넓은 범위의 대상층에게 노출</h4>
                    <h6>
                      전국적으로 광고를 진행하면 특정 지역에 국한되지 않고,
                      전국적으로 활동하는 대상층에게 노출할 수 있습니다.{" "}
                      <br className={`${styles["br_desktop"]}`} /> 이는 특정
                      지역이나 지역적인 특성을 고려하지 않아도 되기 때문에,
                      브랜드 인지도를 높이는 데에 효과적입니다.
                    </h6>
                  </div>
                </div>
                <div className={`${styles["confirm_bullets__"]}`}>
                  <div>
                    <h4>경쟁 우위 확보</h4>
                    <h6>
                      경쟁 업체들이 집중하지 않는 지역이나 시간대에 광고를
                      진행하면, 해당 지역이나 시간대에서 경쟁 우{" "}
                      <br className={`${styles["br_mobile"]}`} />
                      위를 확보할 수 있습니다.{" "}
                      <br className={`${styles["br_desktop"]}`} /> 따라서, 특정
                      위치나 시간대에만 광고를 진행하는 것은 타겟 마케팅 효과나{" "}
                      <br className={`${styles["br_mobile"]}`} />
                      효율적인 광고 비용 등의 장점을 가지고 있습니다. <br />
                      또한 해당 지역이나 시간대에 높은 광고 효과를 기  <br className={`${styles["br_mobile"]}`} />대할 수
                      있으며, 경쟁 우위를 확보할 수 있는 장점도 있습니다
                    </h6>
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

export default ConfirmPage;
