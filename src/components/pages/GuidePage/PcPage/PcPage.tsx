import { Card } from "@mui/material";
import ArrowBack from "@src/components/icons/ArrowBack";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import useAuth from "@src/hooks/useAuth";

function PcPage() {
  const router = useRouter();
  const { dictionary, setLang, lang } = useAuth();

  const onBack = () => {
    router.back();
  };

  // Function to get translation based on current language
  const t = (key: string) => dictionary?.pc_page?.[key]?.[lang] || key;

  return (
    <>
      <Head>
        <title>{t("titles")}</title>
      </Head>
      <div className={"only-mb"}>
        <div className={`${styles["mobile-top-header"]}`}>
          <div style={{ alignSelf: "flex-start" }}>
            <ArrowBack className={"ml-4"} handleAction={onBack} />
          </div>
          <div className={styles["header"]}>{t("headers")}</div>
          <div></div>
        </div>
      </div>

      <div
        className={`pl-[45px] pr-[32px]  pt-[20px] pb-[35px] text-gray-700 flex flex-col gap-[20px] ${styles["_ava_root"]}`}
        style={{ backgroundColor: "white" }}
      >
        <div className={`${styles["bg_Head_"]}`}>
          <div className="font-bold text-[30px] text-[#373737]">{t("headers")}</div>
          <div className="font-bold text-[40px] text-[#373737]">
            {t("subheaders")}
          </div>
        </div>
        <Card
          variant="elevation"
          elevation={3}
          className={`flex flex-col justify-between h-full gap-2 !shadow-[0px_2px_8px_0px_rgba(38,51,77,0.00)] ${styles["_bottom_a_style_img_group"]}`}
        >
          <div className={`${styles["_root__text_img"]}`}>
            <Image src="/images/b11.svg" alt="me" height={200} width={200} />
            <div>
              <h4>{t("content")[0]?.title}</h4>
              <p>{t("content")[0]?.description}</p>
            </div>
          </div>
        </Card>

        <Card
          variant="elevation"
          elevation={3}
          className={`flex flex-col justify-between h-full gap-2 !shadow-[0px_2px_8px_0px_rgba(38,51,77,0.00)] ${styles["_bottom_card_list_wrapper"]}`}
        >
          <div className={`${styles["_root__list_items"]}`}>
            {t("content").slice(1).map((item: { title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }, index: React.Key | null | undefined) => (
              <div key={index}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

export default PcPage;
