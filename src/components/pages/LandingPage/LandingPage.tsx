import React, { useState } from 'react';
import './styles.module.scss';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { FreightIcon, Logo } from '@src/components/icons';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
	const [show, setShow] = useState(false);

	return (
		<>
			<header
				className={clsx(styles['landing-page-header'], styles['max_w_screen'])}>
				<nav className='navbar navbar-expand-lg p-0'>
					<div className='container-fluid p-0 ml-[5px] mr-[4px] mt-[16px]'>
						<Link className='navbar-brand p-0' href='#'>
							<Logo />
						</Link>
						<button
							className={clsx(styles['navbar-toggler'], 'navbar-toggler')}
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#navbarNav'
							aria-controls='navbarNav'
							aria-expanded='false'
							aria-label='Toggle navigation'
							onClick={() => setShow(!show)}>
							<span className='navbar-toggler-icon'></span>
						</button>
						<div
							id='navbarNav'
							className={clsx({
								[styles.navbarNav]: true,
								['navbar-collapse justify-content-end']: true,
								[styles.show]: show,
							})}>
							<ul className='navbar-nav'>
								<li className='nav-item'>
									<a
										className={clsx('nav-link p-0', styles.active)}
										aria-current='page'
										href='#'>
										서비스소개
									</a>
								</li>
								<li className='nav-item'>
									<a className='nav-link p-0' href='#'>
										회사소개
									</a>
								</li>
								<li className='nav-item'>
									<a className='nav-link p-0' href='#'>
										문의하기
									</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</header>

			<main className={styles['max_w_screen']}>
				<section>
					<div className={styles['hero-section']}>
						<div className='flex h-[900px] ml-[136px] '>
							<div className='col-sm-12 w-[403px] p-0'>
								<div className='mt-[285px]'>
									<h1>이카루스</h1>
									<p>움직이는 광고판,</p>
									<p className='mt-0'>전국광고의 시작</p>
									<a href='#'>서비스 문의하기</a>
								</div>
							</div>
							<div className='col-sm-12 p-0 ml-auto justify-end'>
								<FreightIcon />
							</div>
						</div>
					</div>
				</section>
				<section>
					<div className='row mt-[210px] mr-[-7px]'>
						<div className='col-12'>
							<div className={styles['thired-sec']}>
								<h1>
									최고를 지향하며 사명감과 신념으로
									<br />
									<b>차량광고</b>의 선두주자로 여러분의 곁에 서고자 하는
									<br />
									<b>우리는</b> <b className={styles['bold-font']}>이카루스</b>
									<b>입니다.</b>
								</h1>
								<p>
									시인성, 이동성, 경제성 모든 것을 만족시키고, 효율과 능률적인
									면에서 최고를 지향합니다.
								</p>
							</div>
						</div>
					</div>
				</section>
				<section>
					<div className={styles['mask-group-section']}>
						<div className='container'>
							<div className='row mt-[119px]'>
								<div className='col-md-7 col-sm-12'>
									<div className={styles['track-content']}>
										<h1>
											움직이는 광고판,
											<br />
											차량 랩핑광고를 소개합니다.
										</h1>
										<div
											className={clsx(
												styles['track-sub-headings'],
												'mt-5 ml-[-8px]',
											)}>
											<h2 className='ml-[-5px] mt-[-3px]'>
												기업의 가치와 품위
											</h2>
											<p className='ml-[-5px] mt-[6px]'>
												브랜드 광고를 통한 기업의 가치와 품위를 높여줍니다.
											</p>
										</div>

										<div
											className={clsx(
												styles['track-sub-headings'],
												'mt-[36px] ml-[-8px]',
											)}>
											<h2 className='ml-[-5px] mt-[-3px]'>
												좋은 시인성과 이동성
											</h2>
											<p className='ml-[-5px] mt-[6px]'>
												뛰어난 시인성으로 고객을 사로잡아 강하게 인식시킵니다.
											</p>
										</div>

										<div
											className={clsx(
												styles['track-sub-headings'],
												'mt-[30px] ml-[-8px]',
											)}>
											<h2 className='ml-[-5px] mt-[-3px]'>
												적은 비용으로 최대의 효과
											</h2>
											<p className='ml-[-5px] mt-[6px]'>
												면적 대비 저렴한 비용과 뛰어난 노출 효과로 최대의 효율을
												발휘합니다
											</p>
										</div>
									</div>
								</div>
								<div className='col-md-5 col-sm-12'></div>
							</div>
						</div>
					</div>
				</section>
				<section>
					<div className={clsx('mx-[135px]', styles['forth-sec'])}>
						<div className='row align-items-start'>
							<div className='col-md-5 col-sm-12'>
								<div className={styles['fourth-inner-text']}>
									<h1>
										화물 랩핑광고 <br />
										어디서 어떻게 <br />
										시작해야 할까요?
									</h1>

									<p className='mt-[22px]'>
										원하는 차량 선택부터 광고리포트까지
									</p>
									<p className='m-0'>모두 이카루스에서!</p>
								</div>
							</div>
							<div className='col-md-7 col-sm-12'>
								<div
									className={clsx(
										styles['chats-div'],
										'flex flex-col mt-[20px] pl-5',
									)}>
									<div
										className={clsx(
											styles['chats-send'],
											'ml-auto mt-9 !pt-[40px]',
										)}>
										<p>
											내가 원하는 차량을 직접 선택할 수 있으며, <br />
											차량과의 계약부터 정산 진행까지
											<br /> 이카루스에서 도와드립니다.
										</p>
									</div>
									<div className={clsx(styles['chats-rcv'], 'mt-[42px]')}>
										<p>
											디자인 시안이 없어도 OK, 걱정하지 마세요!
											<br /> 직종에 맞는 최상의 디자인을 제작해드립니다.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className='row align-items-start'>
							<div className='col-md-7 col-sm-12'>
								<div className='mt-[42px]'>
									<img src='/images/Landing-page/chats-img.png' alt='' />
								</div>
							</div>
							<div className='col-md-5 col-sm-12'>
								<div
									className={clsx(styles['chats-div'], 'mt-[45px] ml-[58px]')}>
									<div className={styles['chats-send']}>
										<p>
											실시간 광고 현황은 물론
											<br /> 광고 리포트까지 확인하실 수 있어요.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>

			<footer className={styles['max_w_screen']}>
				<section>
					<div className={styles['footer-bg']}>
						<div
							className={clsx(
								'container',
								styles['footer-sec'],
								styles['mt-sec'],
							)}>
							<div className='row'>
								<div className='col-md-12'>
									<h1 className='mb-[52px] mt-[-6px]'>
										차량광고 중개 플랫폼
										<br />
										이카루스와 함께 하세요
									</h1>
								</div>
								<div className='col-md-12'>
									<div className={styles['icons-content']}>
										<div className={styles['stors-icons']}>
											<img
												className='ml-[16px]'
												src='/images/Landing-page/play-store.png'
												alt=''
											/>
											<div className='mt-[-5px] ml-[2px]'>
												<h4>화물주 전용</h4>
												<p>다운로드</p>
											</div>
										</div>
										<div className={styles['stors-icons']}>
											<img
												className='ml-[14px]'
												src='/images/Landing-page/apple.png'
												alt=''
											/>
											<div className='mt-[-5px]'>
												<h4>화물주 전용</h4>
												<p>다운로드</p>
											</div>
										</div>
										<div className={styles['stors-icons']}>
											<img
												className='ml-[16px]'
												src='/images/Landing-page/logo-link.png'
												alt=''
											/>
											<div className='mt-[-5px]'>
												<h4>화물주 전용</h4>
												<p>다운로드</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section>
					<div className='container'>
						<div className='row'>
							<div className='col-md-12'>
								<div className={styles['footer-bottom-content']}>
									<h4>이용약관 &nbsp; &nbsp; 개인정보처리방침</h4>
									<p>
										주식회사 애드메타 &nbsp; &nbsp; ㅣ &nbsp; &nbsp; 대표자 :
										이진희
									</p>
									<p>
										세종특별자치시 남세종로 454, 8층 802호 에이864호 (보람동,
										강남제일타워) &nbsp; &nbsp; ㅣ &nbsp; &nbsp; 사업자등록번호
										559-87-02646&nbsp; &nbsp; ㅣ
									</p>
									<span className={styles['copy-right-content']}>
										Copyright 2022 ICARUS All rights reserved.{' '}
									</span>
								</div>
							</div>
						</div>
					</div>
				</section>
			</footer>
		</>
	);
}
