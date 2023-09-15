import ArrowBack from "@src/components/icons/ArrowBack";
import { useIcarusContext } from "@src/hooks/useIcarusContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import styles from "./styles.module.scss";
import clsx from 'clsx';

const GuidePage = () => {

    const { setPageTitle } = useIcarusContext();

    const router = useRouter();

    useEffect(()=> {
        setPageTitle("가이드");
    },[])

    const onBack = ()=>
    {
        router.back();
    }

    return (
        <>
            <Container>
                <Row>
                    <Col md="12">
                        <div className={ styles["guide-content"]}>
                            <div className={`${styles['title-wrap']} p-0`}>
                                <div className={`only-mb`}>
                                    <div className={`${styles["mobile-top-header"]}`}>
                                        <ArrowBack handleAction={onBack}/>
                                        <div className={styles['header']}>
                                            가이드
                                        </div>
                                        <div></div>
                                    </div>

                                </div>
                                <div className={clsx(styles["title"],"only-pc")}>
                                    <span className="font-bold">광고 시작 가이드</span>
                                </div>
                                <div className={clsx(styles['sub-text'],"only-pc")}>
                                    <span >이카루스가 처음이신가요? 시작하는 광고주분들에게 도움이 될 수 있는 내용을 정리해보았습니다.</span>
                                </div>
                            </div>
                            <div className={styles["guide-box-wrap"]}>
                                <ul className={styles["box-wrap"]}>
                                    <li className={styles["box-list"]}>
                                        <div className={`${styles["box-title"]} font-semibold`}>
                                            <span>랩핑광고가 처음이신가요?</span>
                                        </div>
                                        <div className={styles["box-sub-text"]}>
                                            <span>브랜드를 알릴 수 있는 최고의 기회! 랩핑광고 시작 전 확인하세요!</span>
                                        </div>
                                        <div className={styles["box-link-wrap"]}>
                                            <a href="#" className={styles["box-link"]}>
                      <span className={styles["box-text"]}>
                        <span>랩핑 광고란?</span>
                      </span>
                                                <ChevronRightIcon className={clsx("w-7 h-7 text-[#FFFFFF]",
                                                    styles['extra'])} />
                                            </a>
                                            <a href="#" className={styles["box-link"]}>
                      <span className={styles["box-text"]}>
                        <span>광고 진행 프로세스 확인하기</span>
                      </span>
                                                <ChevronRightIcon className={clsx("w-7 h-7 text-[#FFFFFF]",styles['icon2'])}/>
                                            </a>
                                        </div>
                                    </li>
                                    <li className={styles["box-list"]}>
                                        <div className={`${styles["box-title"]} font-semibold`}>
                                            <span>광고 시작 전 확인하세요!</span>
                                        </div>
                                        <div className={styles["box-sub-text"]}>
                                            <span>나에게 알맞는 광고는 어떤것이 있는지 확인하세요!</span>
                                        </div>
                                        <div className={styles["box-link-wrap"]}>
                                            <a href="#" className={styles["box-link"]}>
                      <span className={styles["box-text"]}>
                        <span>광고 유형 확인하기</span>
                      </span>
                                                <ChevronRightIcon className={clsx("w-7 h-7 text-[#FFFFFF]", styles['extra'])} />
                                            </a>

                                        </div>
                                    </li>
                                    <li className={styles["box-list"]}>
                                        <div className={`${styles["box-title"]} font-semibold`}>
                                            <span>이카루스 이렇게 활용하세요!</span>
                                        </div>
                                        <div className={styles["box-sub-text"]}>
                                            <span>광고 등록부터 통계까지 한번에 이카루스에서 확인할 수 있습니다!</span>
                                        </div>
                                        <div className={styles["box-link-wrap"]}>
                                            <a href="#" className={styles["box-link"]}>
                      <span className={styles["box-text"]}>
                        <span>이카루스 활용법 확인하기</span>
                      </span>
                                                <ChevronRightIcon className={clsx("w-7 h-7 text-[#FFFFFF]", styles['extra'])} />
                                            </a>

                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default GuidePage;
