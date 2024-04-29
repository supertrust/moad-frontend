import ArrowBack from "@src/components/icons/ArrowBack";
import { useRouter } from "next/router";
import React from 'react';
import styles from "./styles.module.scss";

const PageTitleBackButton = ({ title }) => {

    const router = useRouter()

    return (
        <div className={`${styles["mobile-top-header"]}`}>
            <div style={{ alignSelf: "flex-start items-center" }}>
                <ArrowBack className={""} handleAction={() => router.back()}/>
            </div>
            <div className={styles["header"]}>
                {title}
            </div>
            <div className={'invisible'}>.</div>
        </div>
    );
};

export default PageTitleBackButton;