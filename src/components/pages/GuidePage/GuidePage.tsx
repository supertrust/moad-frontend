import { Card } from "@mui/material";
import ArrowBack from "@src/components/icons/ArrowBack";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import useAuth from "@src/hooks/useAuth";

function ProcessPage() {
  const router = useRouter();
  const { dictionary, setLang, lang } = useAuth();

  const onBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>{dictionary.process_page.titles}</title>
      </Head>
      <div style={{ backgroundColor: "#f5f7fb !important" }}>
        <div className={"only-mb"}>
          <div className={`${styles["mobile-top-header"]}`}>
            <div style={{ alignSelf: "flex-start" }}>
              <ArrowBack className={"ml-4"} handleAction={onBack} />
            </div>
            <div className={styles["header"]}>
              {dictionary.process_page.headers}
            </div>
            <div></div>
          </div>
        </div>

        <div
          className={`pl-[45px] pr-[32px]  pt-[20px] pb-[35px] text-gray-700 flex flex-col gap-[20px] ${styles["_ava_root"]}`}
          style={{ backgroundColor: "#f5f7fb" }}
        >
          <div style={{ backgroundColor: "white" }}>
            <div className={`${styles["bg_Head_"]}`}>
              <div className="font-bold text-[30px] text-[#373737]">
                {dictionary.process_page.headers}
              </div>
              <div className="font-bold text-[40px] text-[#373737]">
                {dictionary.process_page.titles}
              </div>
            </div>
            <Card
              variant="elevation"
              elevation={3}
              className={`flex flex-col justify-between h-full gap-2 !shadow-[0px_2px_8px_0px_rgba(38,51,77,0.00)] ${styles["_bottom_card_list_wrapper"]}`}
            >
              <div className={`${styles["_root__list_items"]}`}>
                {dictionary.process_page.steps.map((step, index) => (
                  <div key={index} className={`${styles["_root__text_img"]}`}>
                    <div className={`${styles["_step_avatar_style"]}`}>
                      <Image
                        src={`/images/process/${index + 1}.svg`}
                        alt={`step${index + 1}`}
                        width={110}
                        height={100}
                      />
                    </div>
                    <div className={`${styles["text_ss"]}`}>
                      <h3>{step.number}</h3>
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProcessPage;
