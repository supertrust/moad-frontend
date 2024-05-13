import useAuth from "@src/hooks/useAuth";
import { logoMobileSize } from "@src/utils/values";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Step4 = () => {

    const { isPcOnly,dictionary : { signup : {step4}}  } = useAuth()

    return (
        <div className="step04 step-section">
            <div className="left">
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
                    <div className="right-content">
                        <div className="step-title">{step4.title}</div>
                        <div className="step-text">
                            {step4.subtitle}
                        </div>
                       <div className={'flex justify-center w-[100%]'}>
                           <Link href="/login" className="link link-step01 !mt-[20px]">
                               {step4.login}
                           </Link>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Step4;
