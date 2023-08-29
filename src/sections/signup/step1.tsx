import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "@src/components/Button";

interface Step1Props {
    onNextStep: () => void;
}

const Step1 = ({ onNextStep }: Step1Props) => {
    const router = useRouter();
    const [privacyPolicy, setPrivacyPolicy] = useState<boolean>(false)
    const [termsAndConditions, setTermsAndConditions] = useState<boolean>(false)
    const [error, setError] = useState(false)
    const [show, setShow] = useState({
        open: false,
        name: ""
    });
    const handleClose = () => setShow({
        open: false,
        name: ""
    });
    const handleShow = (name) => setShow({
        open: true,
        name: name
    });

    const handleBackButton = () => {
        router.push("/login");
    }

    return (
        <div className="step01 step-section">
            <div className="left">
                <div className="left-wrap">
                    <h1 className="logo-pc">
                        <Image src="/images/logo-pc.svg" alt='logo-pc' width={150} height={50}/>

                    </h1>
                </div>
            </div>

            <div className={"right"}>
                <h1 className="logo-mb">
                    <Image
                        src="assets/images/icons/logo-mb.svg"
                        alt=""
                        width={120}
                        height={50}
                    />
                </h1>
                <div className="right-wrap">
                    <div className="right-content">
                        <div onClick={handleBackButton} className="back-btn"></div>
                        <div className="step-title">
                            서비스 이용약관 및<br/>
                            개인정보 이용약관 동의
                        </div>
                        <div className="step-text">
                            필수항목 및 선택항목 약관에 동의주해주세요
                        </div>
                        <div
                            className={`text-red-600 mb-2 ${((!termsAndConditions || !privacyPolicy) && error)?"" : "hidden"}`}>
                            둘 다 확인해야합니다
                        </div>
                        <div className="agree-content">

                            <ul className="agree-wrap">
                                <li className="agree-list">
                                    <label htmlFor="chk_1" className="chk-wrap">
                                        <input
                                            checked={privacyPolicy}
                                            type="checkbox"
                                            id="chk_1"
                                            className="terms-chk"
                                            onChange={() => setPrivacyPolicy(!privacyPolicy)}
                                        />
                                        <div className="chk-text">
                                            (필수) 개인정보처리방침
                                        </div>
                                    </label>
                                    <div className="terms-content">
                                        <button
                                            onClick={() => handleShow("chk_1")}
                                            type="button"
                                            className="more-btn"
                                        >
                                            보기
                                        </button>
                                    </div>
                                </li>
                                <li className="agree-list">
                                    <label htmlFor="chk_2" className="chk-wrap">
                                        <input
                                            checked={termsAndConditions}
                                            type="checkbox"
                                            id="chk_2"
                                            className="terms-chk"
                                            onChange={() => setTermsAndConditions(!termsAndConditions)}
                                        />
                                        <div className="chk-text">
                                            (필수) 이카루스 이용약관
                                        </div>
                                    </label>
                                    <div className="terms-content">
                                        <button
                                            type="button"
                                            className="more-btn"
                                            onClick={() => handleShow("chk_2")}
                                        >
                                            보기
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <Button
                            disabled={!privacyPolicy || !termsAndConditions}
                            className="link link-step01"
                            onClick={()=>
                            {
                                if(!privacyPolicy || !termsAndConditions)
                                {
                                    setError(true)
                                }
                                else {
                                    setError(false);
                                    onNextStep()
                                }
                            }}
                        >
                            다음
                        </Button>
                    </div>
                </div>
            </div>
            <Modal className="more-content-modal" show={show.open} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="text-center">개인정보처리방침</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="terms-text">
                        <div className="inner-title">개인정보처리방침</div>
                        <div>
                            제1조 (목적)
                            표준약관 제10023호이 약관은 이카루스 (전자거래 사업자)가 운영하는 이카루스 사이버 몰(이하 "몰"이라 한다)에서 제공하는 인터넷 관련 서비스(이하 "서비스"라
                            한다)를 이용함에 있어 사이버몰과 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
                            ※ 「PC통신등을 이용하는 전자거래에 대해서도 그 성질에 반하지 않는한 이 약관을 준용합니다
                            이용약관이 들어갈 예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
                            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈 예정입니다이용 약관이 들어갈 예정입니다이용약관이 들어갈 예정입니다이용약관이다이용약관이 들어갈 예정입니다이용약관이
                            들어갈 예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈 예정입니다이용약관이
                            들어갈 예정입니다이용약관이 들어갈 예정입니다이용약관이 들어
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="outline-primary" onClick={() => {
                        if (show.name === "chk_1")
                            setPrivacyPolicy(false)

                        else setTermsAndConditions(false)

                        handleClose()
                    }}>
                        취소
                    </Button>
                    <Button className="primary" onClick={() => {
                        if (show.name === "chk_1")
                            setPrivacyPolicy(true)

                        else setTermsAndConditions(true)

                        handleClose()
                    }}>
                        동의
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Step1;
