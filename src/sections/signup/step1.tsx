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
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleBackButton = () => {
        router.push("/login");
    }
    return (
        <div className="step01 step-section">
            <div className="left">
                <div className="left-wrap">
                    <h1 className="logo-pc">
                        <Image src="/images/logo-pc.svg" alt='logo-pc' width={150} height={50} />

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
                            서비스 이용약관 및<br />
                            개인정보 이용약관 동의
                        </div>
                        <div className="step-text">
                            필수항목 및 선택항목 약관에 동의주해주세요
                        </div>
                        <div className="agree-content">
                            <ul className="agree-wrap">
                                <li className="agree-list">
                                    <label htmlFor="chk_1" className="chk-wrap">
                                        <input
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
                                            onClick={handleShow}
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
                                            onClick={handleClose}
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
                            onClick={onNextStep}
                        >
                            다음
                        </Button>
                    </div>
                </div>
            </div>
            <Modal className="more-content-modal" show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="text-center">개인정보처리방침</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="terms-text">
                        <div className="inner-title">개인정보처리방침</div>
                        <div className="text">
                            이카루스 관련 제반 서비스의 이용과 관련하여 필요한 사항을
                            규정합니다.
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="outline-primary" onClick={handleClose}>
                        취소
                    </Button>
                    <Button className="primary" onClick={handleClose}>
                        동의
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Step1;
