import { Card } from "@mui/material";
import ArrowBack from "@src/components/icons/ArrowBack";
import { useIcarusContext } from "@src/hooks";
import useAuth from "@src/hooks/useAuth";
import clsx from "clsx";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";

function ProcessPage() {

    const router = useRouter();
    const { setPageTitle } = useIcarusContext();
    const { dictionary: {process_page,guide_page}, isKorean} = useAuth();
    const steps = process_page?.steps;

    const onBack = () => {
        router.back();
    };

    useEffect(() => {
        setPageTitle(guide_page?.title);
    }, [isKorean])

    const activity = [{
        title: steps?.[0]?.title,
        imageUrl: '/images/process/1.svg',
        comment: <>
            {steps?.[0]?.description1} <br/>
            {steps?.[0]?.description2}
        </>
    }, {
        title: steps?.[1]?.title,
        imageUrl: '/images/process/2.svg',
        comment: <>
            {steps?.[1]?.description1} <br/>
            {steps?.[1]?.description2}
        </>

    }, {
        title: steps?.[2]?.title,
        imageUrl: '/images/process/3.svg',

        comment: <>
            {steps?.[2]?.description1} <br/>
            {steps?.[2]?.description2}
        </>
    }, {
        title: steps?.[3]?.title,
        imageUrl: '/images/process/4.svg',
        comment: <>
            {steps?.[3]?.description1} <br/>
            {steps?.[3]?.description2}
        </>
    },]

    return (
        <>
            <Head>
                <title>이카루스 광고주</title>
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
                        <div className={styles["header"]}>{process_page?.headers}</div>
                        <div></div>
                    </div>
                </div>
                <div
                    className={`text-gray-700 flex flex-col gap-[20px] ${styles["_ava_root"]}`}
                    style={{ backgroundColor: "#f5f7fb" }}>
                    <div style={{ backgroundColor: "white" }}>
                        <div className={`${styles["bg_Head_"]}`}>
                            <div className='font-bold text-[30px] text-[#373737]'>{process_page?.headers}</div>
                            <div className='font-bold text-[40px] text-[#373737]'>
                                {process_page?.subtitle}
                            </div>
                        </div>
                        <Card
                            variant='elevation'
                            elevation={3}
                            className={`flex  flex-col justify-between h-full gap-2 !shadow-[0px_2px_8px_0px_rgba(38,51,77,0.00)] ${styles["_bottom_card_list_wrapper"]}`}>
                            <div className={`${styles["_root__list_items"]}`}>

                                <div className="flow-root">
                                    <ul role="list" className="-mb-8">
                                        {activity.map((activityItem, activityItemIdx) => (
                                            <li key={activityItemIdx}>
                                                <div className={clsx("relative",styles['list-inside'])}>
                                                    {activityItemIdx !== activity.length - 1 ? (
                                                        <span aria-hidden="true"
                                                              className={clsx("absolute top-5 -ml-px h-full w-[1px]",styles['connector'])}
                                                        />
                                                    ) : null}
                                                    <div className="relative flex items-start space-x-4 md:space-x-20">
                                                        <>
                                                            <div className="relative z-1">
                                                                <div
                                                                    className={clsx('flex items-center justify-center', styles['images-body'])}
                                                                >
                                                                    <Image
                                                                        src={activityItem.imageUrl}
                                                                        alt='step'
                                                                        width={110}
                                                                        height={100}
                                                                    />
                                                                </div>
                                                                <span
                                                                    className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
</span>
                                                            </div>
                                                            <div className={clsx("min-w-0 flex-1",styles['comment-body'])}>
                                                                <div className={`${styles["comment-section"]}`}>
                                                                    <h3>STEP {activityItemIdx + 1}</h3>
                                                                    <h4>{activityItem.title}</h4>
                                                                    <div>
                                                                        {activityItem.comment}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>

                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
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