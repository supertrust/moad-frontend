import useAuth from "@src/hooks/useAuth";
import { logoMobileSize } from "@src/utils/values";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RejectSignup = () => {

    const { isPcOnly,dictionary : { signup : {deny}}  } = useAuth()

    return (
      <div id="sign_up">
          <div className="step04 step-section">
              <div className="left"  style={{
                  background: "url('/images/deny-signup.png') no-repeat center center / auto",
                  backgroundColor: "var(--light-gray)"
              }}>
                  <div className="left-wrap">
                      <h1 className="logo-pc">
                          <Image src="/images/logo-pc.svg" alt='logo-pc' width={150} height={50} />

                      </h1>
                  </div>
              </div>
              <div className="right">
                  {
                      !isPcOnly &&
                      <div>
                          <Image src="/images/logo-mb.svg" alt='logo-mb' width={logoMobileSize.width} height={
                              logoMobileSize.height
                          }/>
                      </div>
                  }
                  <div className="right-wrap">
                      <div className="right-content !w-[350px] sm:!w-[390px]">
                          <div className="step-title !w-[100%] no-wrap !text-[20px] sm:!text-[30px]">{deny.title}</div>
                          <div className="step-text">
                              {deny.subtitle}
                              <div className={'font-medium text-base text-[#3772FF] text-sm'}>
                                  02-000-0000
                              </div>
                          </div>

                          <div className={'flex justify-center'}>
                              <div className={'flex justify-center w-[250px]'}>
                                  <Link href="/login" className="link link-step01 !mt-[4px]  hover:!text-[#FFFFFF] hover:!no-underline">
                                      {deny.login}
                                  </Link>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
}

export default RejectSignup;
