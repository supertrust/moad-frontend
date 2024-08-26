import { Card } from "@mui/material";
import ArrowBack from "@src/components/icons/ArrowBack";
import clsx from "clsx";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styles from "./styles.module.scss";

const activity = [{
    title: "광고 신청하기",
    imageUrl: '/images/process/1.svg',
    comment: <>
        광고 목적에 따라 광고 유형, 희망 기간, 희망 차량 등 <br/>
        조건을 설정하여 광고를 신청합니다.
    </>
}, {
    title: "광고 상담",
    imageUrl: '/images/process/2.svg',
    comment: <>
        모드 담당자가 확인 후 연락드립니다. <br/>
        광고 진행에 관한 자세한 상담을 도와드립니다.
    </>

}, {
    title: "차량 모집",
    imageUrl: '/images/process/3.svg',

    comment: <>
        모드에서 검증된 차량들이며,<br/>
        해당 광고를 부착할 차량을 모집합니다.
    </>
}, {
    title: "광고 진행",
    imageUrl: '/images/process/4.svg',
    comment: <>
        운행차량의 실시간 위치 등 <br/>
        광고 진행을 확인하실 수 있습니다.
    </>
},]

const activitys = [{
    title: "Apply for Advertisement",
    imageUrl: '/images/process/1.svg',
    comment: <>
        Set the conditions such as advertisement type, desired duration, and preferred vehicle <br/>
        according to the purpose of the advertisement to apply.
    </>
}, {
    title: "Advertisement Consultation",
    imageUrl: '/images/process/2.svg',
    comment: <>
        A representative will contact you after reviewing your application. <br/>
        They will assist you with detailed consultations regarding the advertisement process.
    </>
}, {
    title: "Vehicle Recruitment",
    imageUrl: '/images/process/3.svg',
    comment: <>
        Mode-certified vehicles will be recruited <br/>
        to carry the advertisement.
    </>
}, {
    title: "Advertisement Execution",
    imageUrl: '/images/process/4.svg',
    comment: <>
        You can check the real-time location of the vehicles <br/>
        and monitor the progress of the advertisement.
    </>
},]


function ProcessPage() {
    const router = useRouter();
    const onBack = () => {
        router.back();
    };
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
                        <div className={styles["header"]}>가이드</div>
                        <div></div>
                    </div>
                </div>
                <div
                    className={`text-gray-700 flex flex-col gap-[20px] ${styles["_ava_root"]}`}
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