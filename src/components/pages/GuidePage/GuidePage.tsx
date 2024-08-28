import ArrowBack from "@src/components/icons/ArrowBack";
import useAuth from "@src/hooks/useAuth";
import { useIcarusContext } from "@src/hooks/useIcarusContext";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import styles from "./styles.module.scss";
import clsx from 'clsx';

const GuidePage = () => {

  const { setPageTitle } = useIcarusContext();
  const { dictionary : {pageTitle, guide_page},isKorean} = useAuth()

  const router = useRouter();

  useEffect(()=> {
    setPageTitle(guide_page?.title);
  },[isKorean])

  const onBack = ()=>
  {
    router.back();
  }

  return (
      <>
        <div className={'mx-auto px-[15px]'}>
          <Row>
            <Col md="12">
              <div className={ styles["guide-content"]}>
                <div className={`${styles['title-wrap']} p-0`}>
                  <div className={`only-mb`}>
                    <div className={`${styles["mobile-top-header"]}`}>
                      <ArrowBack handleAction={onBack}/>
                      <div className={styles['header']}>
                        {pageTitle?.top_bar_guide}
                      </div>
                      <div></div>
                    </div>

                  </div>
                  <div className={clsx(styles["title"],"only-pc")}>
                    <span className="font-bold">{guide_page?.starting_guide?.title}</span>
                  </div>
                  <div className={clsx(styles['sub-text'],"only-pc")}>
                    <span >{guide_page?.starting_guide?.subtitle}</span>
                  </div>
                </div>
                <div className={styles["guide-box-wrap"]}>
                  <ul className={styles["box-wrap"]}>
                    <li className={styles["box-list"]}>
                      <div className={`${styles["box-title"]} font-semibold`}>
                        <span className="font-medium">{guide_page?.boxes?.[0]?.title}</span>
                      </div>
                      <div className={styles["box-sub-text"]}>
                        <span>{guide_page?.boxes?.[0].subtitle}</span>
                      </div>
                      <div className={styles["box-link-wrap"]}>
                        <Link href="/dashboard/customer-service/guide/wrapping-advertising" className={styles["box-link"]}>
                                            <span className={styles["box-text"]}>
                                                <span>{guide_page?.boxes?.[0]?.links?.[0]?.text}</span>
                                            </span>
                          <ChevronRightIcon className={clsx("w-7 h-7 text-[#FFFFFF]",
                              styles['extra'])} />
                        </Link>
                        <Link href="/dashboard/customer-service/guide/advertising-process" className={styles["box-link"]}>
                                                    <span className={styles["box-text"]}>
                                                    <span>{guide_page?.boxes?.[0]?.links?.[1]?.text}</span>
                                                </span>
                          <ChevronRightIcon className={clsx("w-7 h-7 text-[#FFFFFF]",styles['icon2'])}/>
                        </Link>
                      </div>
                    </li>
                    <li className={styles["box-list"]}>
                      <div className={`${styles["box-title"]} font-semibold`}>
                        <span className="font-medium">{guide_page?.boxes?.[1]?.title}</span>
                      </div>
                      <div className={styles["box-sub-text"]}>
                        <span>{guide_page?.boxes?.[1]?.subtitle}</span>
                      </div>
                      <div className={styles["box-link-wrap"]}>
                        <Link href="/dashboard/customer-service/guide/ad-type" className={styles["box-link"]}>
                                            <span className={styles["box-text"]}>
                                                <span>{guide_page?.boxes?.[1]?.links?.[0]?.text}</span>
                                            </span>
                          <ChevronRightIcon className={clsx("w-7 h-7 text-[#FFFFFF]", styles['extra'])} />
                        </Link>

                      </div>
                    </li>

                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </>
  );
};

export default GuidePage;
