import { Card } from "@mui/material";
import ArrowBack from "@src/components/icons/ArrowBack";
import { useIcarusContext } from "@src/hooks";
import useAuth from "@src/hooks/useAuth";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "./confirm.module.scss";

function ConfirmPage() {

    const { setPageTitle } = useIcarusContext();
    const { dictionary: { guide_page, confirm_page }, isKorean,isPcOnly } = useAuth();
    const ad_types = confirm_page?.ad_types;
    const router = useRouter();
    const onBack = () => {
        router.back();
    };

    useEffect(() => {
        setPageTitle(guide_page?.title);
    }, [isKorean])

    return (
        <>
            {/*<Head>*/}
            {/*  <title>이카루스 광고주</title>*/}
            {/*</Head>*/}
            <div style={{ backgroundColor: "#f5f7fb !important" }}>
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
                <div
                    className={clsx( isPcOnly && "pl-[45px] pr-[32px]",`pt-[20px] pb-[35px] text-gray-700 flex flex-col gap-[20px] ${styles["_ava_root"]}`)}
                    style={{ backgroundColor: "#f5f7fb" }}>
                    <div style={{ backgroundColor: isPcOnly? "white":"transparent" }}>
                        <div className={`${styles["bg_Head_"]}`}>
                            <div className='font-bold text-[30px] text-[#373737]'>{confirm_page?.headers}</div>
                            <div className='font-bold text-[40px] text-[#373737]'>
                                {confirm_page?.sub_header}
                            </div>
                        </div>
                        <Card
                            variant='elevation'
                            elevation={3}
                            className={clsx(!isPcOnly && "!bg-[transparent] !mx-[24px]",`flex flex-col justify-between h-full gap-2 !shadow-[0px_2px_8px_0px_rgba(38,51,77,0.00)] ${styles["_bottom_card_list_wrapper"]}`)}>
                            <p className={`${styles["cap_txt"]}`}>
                                {confirm_page?.description}
                            </p>
                            <div className={`${styles["_confirm_root__list_items"]}`}>
                                <div className={`${styles["_confirm_root__text_img"]}`}>
                                    <div className={`${styles["_step_avatar_style"]}`}>
                                        <Image
                                            src='/images/confirm/1.svg'
                                            alt='step1'
                                            width={70}
                                            height={70}
                                        />
                                    </div>
                                    <div className={`${styles["text_ss"]}`}>
                                        <h3>{ad_types?.[0]?.title}</h3>
                                        <p>
                                            {ad_types?.[0]?.subtitle}
                                        </p>
                                    </div>
                                </div>
                                <hr/>
                                <div className={`${styles["confirm_bullets__"]}`}>
                                    <div>
                                        <h4>{ad_types?.[0]?.details?.[0]?.title}</h4>
                                        <h6>
                                            {ad_types?.[0]?.details?.[0]?.subtitle1}
                                            <br/>
                                            {ad_types?.[0]?.details?.[0]?.subtitle2}
                                        </h6>
                                    </div>
                                </div>
                                <div className={`${styles["confirm_bullets__"]}`}>
                                    <div>
                                        <h4>{ad_types?.[0]?.details?.[1]?.title}</h4>
                                        <h6>
                                            {ad_types?.[0]?.details?.[1]?.subtitle}
                                        </h6>
                                    </div>
                                </div>
                                <div className={`${styles["confirm_bullets__"]}`}>
                                    <div>
                                        <h4>{ad_types?.[0]?.details?.[2]?.title}</h4>
                                        <h6>
                                            {ad_types?.[0]?.details?.[2]?.subtitle1}
                                            <br/>
                                            {ad_types?.[0]?.details?.[2]?.subtitle2}
                                        </h6>
                                    </div>
                                </div>
                                <div className={`${styles["confirm_bullets__"]}`}>
                                    <div>
                                        <h4>{ad_types?.[0]?.details?.[3]?.title}</h4>
                                        <h6>
                                            {ad_types?.[0]?.details?.[3]?.subtitle1}
                                            <br/>
                                            {ad_types?.[0]?.details?.[3]?.subtitle2}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles["_confirm_root__list_items"]}`}>
                                <div className={`${styles["_confirm_root__text_img"]}`}>
                                    <div className={`${styles["_step_avatar_style"]}`}>
                                        <Image
                                            src='/images/confirm/2.svg'
                                            alt='step1'
                                            width={70}
                                            height={70}
                                        />
                                    </div>
                                    <div className={`${styles["text_ss"]}`}>
                                        <h3>{ad_types?.[1]?.title}</h3>
                                        <p>
                                            {ad_types?.[1]?.subtitle}
                                        </p>
                                    </div>
                                </div>
                                <hr/>
                                <div className={`${styles["confirm_bullets__"]}`}>
                                    <div>
                                        <h4>{ad_types?.[1]?.details?.[0]?.title}</h4>
                                        <h6>
                                            {ad_types?.[1]?.details?.[0]?.subtitle1}
                                            <br/>
                                            {ad_types?.[1]?.details?.[0]?.subtitle2}
                                        </h6>
                                    </div>
                                </div>
                                <div className={`${styles["confirm_bullets__"]}`}>
                                    <div>
                                        <h4>{ad_types?.[1]?.details?.[1]?.title}</h4>
                                        <h6>
                                            {ad_types?.[1]?.details?.[1]?.subtitle1}
                                            <br/>
                                            {ad_types?.[1]?.details?.[1]?.subtitle2}
                                        </h6>
                                    </div>
                                </div>
                                <div className={`${styles["confirm_bullets__"]}`}>
                                    <div>
                                        <h4>{ad_types?.[1]?.details?.[2]?.title}</h4>
                                        <h6>
                                            {ad_types?.[1]?.details?.[2]?.subtitle1}
                                            <br/>
                                            {ad_types?.[1]?.details?.[2]?.subtitle2}
                                        </h6>
                                    </div>
                                </div>
                                <div className={`${styles["confirm_bullets__"]}`}>
                                    <div>
                                        <h4>{ad_types?.[1]?.details?.[3]?.title}</h4>
                                        <h6>
                                            {ad_types?.[1]?.details?.[3]?.subtitle}
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
                                        <Image
                                            src='/images/confirm/3.svg'
                                            alt='step3'
                                            width={70}
                                            height={70}
                                        />
                                    </div>
                                    <div className={`${styles["text_ss"]}`}>
                                        <h3>{ad_types?.[2]?.title}</h3>
                                        <p>
                                            {ad_types?.[2]?.subtitle}
                                        </p>
                                    </div>
                                </div>
                                <hr/>
                                <div className={`${styles["confirm_bullets__"]}`}>
                                    <div>
                                        <h4>{ad_types?.[2]?.details?.[0]?.title}</h4>
                                        <h6>
                                            {ad_types?.[2]?.details?.[0]?.subtitle1}
                                            <br/>
                                            {ad_types?.[2]?.details?.[0]?.subtitle2}
                                        </h6>
                                    </div>
                                </div>
                                <div className={`${styles["confirm_bullets__"]}`}>
                                    <div>
                                        <h4>{ad_types?.[2]?.details?.[1]?.title}</h4>
                                        <h6>
                                            {ad_types?.[2]?.details?.[1]?.subtitle1}
                                            <br/>
                                            {ad_types?.[2]?.details?.[1]?.subtitle2}
                                        </h6>
                                    </div>
                                </div>
                                <div className={`${styles["confirm_bullets__"]}`}>
                                    <div>
                                        <h4>{ad_types?.[2]?.details?.[2]?.title}</h4>
                                        <h6>
                                            {ad_types?.[2]?.details?.[2]?.subtitle1}
                                            <br/>
                                            {ad_types?.[2]?.details?.[2]?.subtitle2}
                                        </h6>
                                    </div>
                                </div>
                                <div className={`${styles["confirm_bullets__"]}`}>
                                    <div>
                                        <h4>{ad_types?.[2]?.details?.[3]?.title}</h4>
                                        <h6>
                                            {ad_types?.[2]?.details?.[3]?.subtitle1}
                                            <br/>
                                            {ad_types?.[2]?.details?.[3]?.subtitle2}
                                            <br/>
                                            {ad_types?.[2]?.details?.[3]?.subtitle3}
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
