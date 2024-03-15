import { Card } from "@mui/material";
import ArrowBack from "@src/components/icons/ArrowBack";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import clsx from "clsx";
import Image from "next/image";
import useAuth from "@src/hooks/useAuth";

function ConfirmPage() {
  const router = useRouter();
  const { dictionary, setLang, lang } = useAuth();

  // Accessing dictionary for translations
  const { confirm_page } = dictionary;
  const { titles, headers, steps } = confirm_page;

  const onBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>{titles}</title>
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
            <div className={styles["header"]}>{headers}</div>
            <div></div>
          </div>
        </div>

        <div
          className={`pl-[45px] pr-[32px]  pt-[20px] pb-[35px] text-gray-700 flex flex-col gap-[20px] ${styles["_ava_root"]}`}
          style={{ backgroundColor: "#f5f7fb" }}>
          <div style={{ backgroundColor: "white" }}>
            <div className={`${styles["bg_Head_"]}`}>
              <div className='font-bold text-[30px] text-[#373737]'>{headers}</div>
              <div className='font-bold text-[40px] text-[#373737]'>
                {steps.map((step) => (
                  <div key={step.number}>{step.title}</div>
                ))}
              </div>
            </div>

            <Card
              variant='elevation'
              elevation={3}
              className={`flex flex-col justify-between h-full gap-2 !shadow-[0px_2px_8px_0px_rgba(38,51,77,0.00)] ${styles["_bottom_card_list_wrapper"]}`}>
              {steps.map((step) => (
                <React.Fragment key={step.number}>
                  <p className={`${styles["cap_txt"]}`}>
                    {step.description}
                  </p>
                  {/* Add other content for each step */}
                </React.Fragment>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmPage;
