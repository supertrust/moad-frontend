import { Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button } from '@src/components/common';
import PrivacyPolicy from './privacyPolicy';
import TermsOfUse from './termsOfUse';
import useAuth from "@src/hooks/useAuth";

interface Step1Props {
	onNextStep: () => void;
}

const Step1 = ({ onNextStep }: Step1Props) => {
	const router = useRouter();
  const { dictionary:{ signup: { step1 } } } = useAuth();
	const [privacyPolicy, setPrivacyPolicy] = useState<boolean>(false);
	const [termsAndConditions, setTermsAndConditions] = useState<boolean>(false);
	const [error, setError] = useState(false);
	const [show, setShow] = useState({
		open: false,
		name: '',
	});
	const handleClose = () =>
		setShow({
			open: false,
			name: '',
		});
	const handleShow = (name) =>
		setShow({
			open: true,
			name: name,
		});

	const handleBackButton = () => {
		router.push('/login');
	};

	useEffect(() => {
		const handleKeyPress = (event) => {
			if (event.code === 'Enter' && privacyPolicy && termsAndConditions) {
				event.preventDefault(); // Prevent form submission
				setError(false);
				onNextStep();
			}
		};
		document.addEventListener('keydown', handleKeyPress);
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [privacyPolicy, termsAndConditions]);

	const listItem = (index:number,item:string[]) =>
	{
		const [itemNumber,text] = item
		return <div className='flex' key={index}>{itemNumber}
						{itemNumber !== "③" ?
						<p className='pl-1'>{text}</p> :
						<p className='pl-1'>
						“광고 상품”이라 함은 “광고주”의 “광고 소재”를 “광고매체”에 게재하기 위하여 “회사”가 “광고주”에게 판매하는 것으로 광고 상품의
						종류, 노출 형태, 위치 등 구체적 내용은 광고 상품 및 광고 서비스 이용료 과금 기준( <a className='text-danger' href='https://marketinghub.esmplus.com/ad-guide/index.html'>별첨1.</a> )과 같습니다.
					</p>}</div>
	}
	const list = [['①',`“광고” (이하 “광고”라고 함)라 함은 “회사”가 “광고주”가 신청한 광고 상품(아래 정의)의 내용과 절차에 따라 “광고주”의 “광고 소재”(아래 정의)를 “광고매체”에 노출하는 것을 말합니다.`],
								['②', `“광고소재”라 함은 “광고주”가 제작하여 광고매체에 등록한 상품 설명, 상품 사진, 텍스트 또는 이미지 등 형태의 제작물을 말합니다.`],
								['③', `“광고 상품”이라 함은 “광고주”의 “광고 소재”를 “광고매체”에 게재하기 위하여 “회사”가 “광고주”에게 판매하는 것으로 광고 상품의
								종류, 노출 형태, 위치 등 구체적 내용은 광고 상품 및 광고 서비스 이용료 과금 기준( 별첨1. )과 같습니다.`],
								['④',  `“광고 서비스” 라 함은 “광고주”가 구매한 광고 상품의 내용대로 “광고주”의 “광고 소재”를 “광고매체”에 노출하고 광고 등록, 광고
								관리, 리포트 등 제반 서비스를 말합니다.`]
								]


	return (
		<div className='step01 step-section'>
			<div className='left'>
				<div className='left-wrap'>
					<h1 className='logo-pc'>
						<Image
							src='/images/logo-pc.svg'
							alt='logo-pc'
							width={150}
							height={50}
						/>
					</h1>
				</div>
			</div>

			<div className={'right'}>
				<h1 className='logo-mb'>
					<Image
						src='assets/images/icons/logo-mb.svg'
						alt=''
						width={120}
						height={50}
					/>
				</h1>
				<div className='right-wrap'>
					<div className='right-content'>
						<div onClick={handleBackButton} className='back-btn cursor-pointer'></div>
						<div className='step-title'>
							{step1.stepTitle[0]}<br />
							{step1.stepTitle[1]}
						</div>
						<div className='step-text'>
							{step1.stepText}
						</div>
						<div
							className={`text-red-600 mb-2 ${
								(!termsAndConditions || !privacyPolicy) && error ? '' : 'hidden'
							}`}>
							{step1.checkBothMsg}
						</div>
						<div className='agree-content'>
							<ul className='agree-wrap'>
								<li className='agree-list'>
									<label htmlFor='chk_1' className='chk-wrap'>
										<input
											checked={privacyPolicy}
											type='checkbox'
											id='chk_1'
											className='terms-chk'
											onChange={() => setPrivacyPolicy(!privacyPolicy)}
										/>
										<div className='chk-text'>{step1.chk_1Label}</div>
									</label>
									<div className='terms-content'>
										<button
											onClick={() => handleShow('chk_1')}
											type='button'
											className='more-btn'>
											{step1.chk_1Btn}
										</button>
									</div>
								</li>
								<li className='agree-list'>
									<label htmlFor='chk_2' className='chk-wrap'>
										<input
											checked={termsAndConditions}
											type='checkbox'
											id='chk_2'
											className='terms-chk'
											onChange={() =>
												setTermsAndConditions(!termsAndConditions)
											}
										/>
										<div className='chk-text'>{step1.chk_2Label}</div>
									</label>
									<div className='terms-content'>
										<button
											type='button'
											className='more-btn'
											onClick={() => handleShow('chk_2')}>
											{step1.chk_2Btn}
										</button>
									</div>
								</li>
							</ul>
						</div>
						<Button
							disabled={!privacyPolicy || !termsAndConditions}
							className='link link-step01'
							onClick={() => {
								if (!privacyPolicy || !termsAndConditions) {
									setError(true);
								} else {
									setError(false);
									onNextStep();
								}
							}}>
							{step1.nextBtn}
						</Button>
					</div>
				</div>
			</div>
			<Modal
				centered
				className='more-content-modal'
				show={show.open}
				scrollable
				onHide={handleClose}>
				<Modal.Header>
					<Modal.Title className='text-center'>
						{show.name == 'chk_2' ? step1.modal.title[0] : step1.modal.title[1]}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className='h-auto'>
					<div className='terms-text'>
						<div className='inner-title'>
							{show.name == 'chk_2' ? step1.modal.innerTitle[0] : step1.modal.innerTitle[1]}
						</div>
						{show.name == 'chk_2' ? (
							// <div>
							// 	<p>
							// 	이카루스 관련 제반 서비스의 이용과 관련하여 필요한 사항을 규정합니다.
							// 	</p>
							// 	<div className='mt-[24px]'>
							// 		<p className='font-semibold'>제1조. 목적</p>
							// 		<p>
							// 		본 약관은 ㈜이카루스(이하 “회사”)가 제공하는 광고 서비스(아래 정의)를 “광고주”(아래 정의)에게 제공함에 있어 “회사”와 “광고주”의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
							// 		</p>
							// 		<div className='border-t border-slate-300 my-4'></div>
							// 		<p className='font-semibold'>
							// 		제2조. 정의
							// 		</p>
							// 		<p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
							// 		{list.map((item: string[], index:number) => listItem(index,item))}
							// 	</div>
							// </div>
							<TermsOfUse />
						) : (
							// <div>
							// 	<p>이용자님들의 개인정보를 매우 중요하게 생각하며 아래와 같은 개인정보처리방침을 제공합니다.</p>
							// 	<p className='font-semibold'>제1조. 개인정보의 수집•이용</p>
							// 	<p>
							// 	가. 회사가 개인정보를 수집하는 목적은 이용자의 신분과 서비스 이용의사를 확인하여 최적화되고 맞춤화된 서비스를 제공하기 위함입니
							// 	다.  회사는 최초 회원가입 시 서비스의 본질적 기능을 수행하기 위해 반드시 필요한 최소한의 정보만을 수집하고 있으며 회사가 제공하
							// 	는 서비스 이용에 따른 대금결제, 물품배송 및 환불 등에 필요한 정보를 추가로 수집할 수 있습니다.
							// 	</p>
							// 	<p>
							// 	나. 회사는 개인정보를 수집·이용목적 이외에 다른 용도로 이를 이용하거나 이용자의 동의 없이 제3자에게 이를 제공하지 않습니다.
							// 	</p>
							// 	<p>다. 회사는 다음과 같은 목적으로 개인정보를 수집하여 이용할 수 있습니다. 다만, 국세기본법, 전자금융거래법 등 관계법령에 따라 동의 받
      				// 	은 정보 이외에도 수집•보관이 불가피한 경우에는 이용자에게 고지하여 해당 정보를 수집할 수 있습니다.</p>
							// 	<div className='px-[20px]'>
							// 		<p>1)회원</p>
							// 		<p>
							// 		목적. 회원 본인 여부 확인 또는 불만처리 및 문의응대기록, 새로운 상품/서비스 정보와 고지, 사항의 안내, 광고집행 정산 등 커뮤니케이션
							// 		항목. 아이디(이메일주소), 비밀번호, 이름, 전화번호, 소속회사
							// 		보유기간. 사용자 탈퇴 시 6개월 / 반려 시 1개월 단, 거래가 있는 경우에는 관련 법령에 따른 보존기간
							// 		</p>
							// 		<p>2)기타</p>
							// 		<p>서비스 이용과정이나 사업처리 과정에서 아래와 같은 정보들이 자동으로 생성되어 수집•저장•조합•분석 될 수 있습니다.</p>
							// 	</div>
							// </div>
							<PrivacyPolicy />
						)}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						className='outline-primary border-solid border-[1px] border-advertiser-primary text-advertiser-primary !py-[5px]'
						onClick={() => {
							if (show.name === 'chk_1') setPrivacyPolicy(false);
							else setTermsAndConditions(false);

							handleClose();
						}}>
						{step1.modal.cancelBtn}
					</Button>
					<Button
						className='primary border-solid border-[1px] border-[transparent] bg-advertiser-primary text-[#fff] !py-[5px]'
						onClick={() => {
							if (show.name === 'chk_1') setPrivacyPolicy(true);
							else setTermsAndConditions(true);

							handleClose();
						}}>
						{step1.modal.agreeBtn}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Step1;
