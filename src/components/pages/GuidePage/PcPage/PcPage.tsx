import { Card } from "@mui/material";
import ArrowBack from "@src/components/icons/ArrowBack";
import { useIcarusContext } from "@src/hooks";
import useAuth from "@src/hooks/useAuth";
import clsx from "clsx";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import useMediaQuery from '@mui/material/useMediaQuery';
function PcPage() {

  const { setPageTitle } = useIcarusContext();
  const { dictionary : {guide_page,pc_page}, isKorean } = useAuth();
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:1023px)');
  const onBack = () => {
    router.back();
  };

  useEffect(()=> {
    setPageTitle(guide_page?.title);
  },[isKorean])

  return (
      <>
        <Head>
          <title>이카루스 광고주</title>
        </Head>
        <div className={"only-mb"}>
          <div className={`${styles["mobile-top-header"]}`}>
            <div style={{ alignSelf: "flex-start" }}>
              <ArrowBack
                  className={"ml-4"}
                  handleAction={onBack}
              />
            </div>
            <div className={styles["header"]}>{guide_page?.title}</div>
            <div></div>
          </div>
        </div>
       <div className={clsx('pt-[20px] pb-[35px]',isMobile ? 'bg-[white] !pt-[0px]' : "pl-[45px] pr-[32px]")}>
         <div
             className={`bg-[white] text-gray-700 flex flex-col gap-[20px]`}
         >
           <div className={`${styles["bg_Head_"]}`}>
             <div className='text-[30px] !text-[#2C324C]'>{guide_page?.title}</div>
             <div className='font-bold text-[40px] !text-[#2C324C]'>
               {pc_page?.subheaders}
             </div>
           </div>
          <div className={clsx(isMobile && "pl-[30px] pr-[30px]")}>
            <Card
                variant='elevation'
                elevation={3}
                className={`!bg-[white] flex flex-col justify-between h-full gap-2 !shadow-[0px_2px_8px_0px_rgba(38,51,77,0.00)] ${styles["_bottom_a_style_img_group"]}`}>
              <div className={`${styles["_root__text_img"]}`}>
                <Image
                    src='/images/b11.svg'
                    alt='me'
                    height={200}
                    width={200}
                />
                <div>
                  <h4>{pc_page?.content?.[0]?.title}</h4>
                  <p>
                    {pc_page?.content?.[0]?.description1} <br/>
                    {pc_page?.content?.[0]?.description2} <br/>
                    {pc_page?.content?.[0]?.description3} <br/>
                    {pc_page?.content?.[0]?.description4}
                  </p>
                </div>
              </div>
            </Card>
            <Card
                variant='elevation'
                elevation={3}
                className={`bg-transparent flex flex-col justify-between h-full gap-2 !shadow-[0px_2px_8px_0px_rgba(38,51,77,0.00)] ${styles["_bottom_card_list_wrapper"]}`}>
              <div className={`${styles["_root__list_items"]}`}>
                <div>
                  <h4>{pc_page?.content?.[1]?.title}</h4>
                  <p>
                    {pc_page?.content?.[1]?.description1} <br/>
                    {pc_page?.content?.[1]?.description2} <br/>
                    {pc_page?.content?.[1]?.description3}
                  </p>
                </div>
                <div>
                  <h4>{pc_page?.content?.[2]?.title}</h4>
                  <p>
                    {pc_page?.content?.[2]?.description1} <br/>
                    {pc_page?.content?.[2]?.description2}
                  </p>
                </div>
                <div>
                  <h4>{pc_page?.content?.[3]?.title}</h4>
                  <p>
                    {pc_page?.content?.[3]?.description1} <br/>
                    {pc_page?.content?.[3]?.description2}
                  </p>
                </div>
                <div>
                  <h4>{pc_page?.content?.[4]?.title}</h4>
                  <p>
                    {pc_page?.content?.[4]?.description1} <br/>
                    {pc_page?.content?.[4]?.description2}
                  </p>
                </div>
                <div>
                  <h4>{pc_page?.content?.[5]?.title}</h4>
                  <p>
                    {pc_page?.content?.[5]?.description1} <br/>
                    {pc_page?.content?.[5]?.description2}
                  </p>
                </div>
                <div>
                  <h4>{pc_page?.content?.[6]?.title}</h4>
                  <p>
                    {pc_page?.content?.[6]?.description1} <br/>
                    {pc_page?.content?.[6]?.description2}
                  </p>
                </div>
              </div>
            </Card>
          </div>
         </div>
       </div>
      </>
  );
}
export default PcPage;