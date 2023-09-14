import React, { useState } from 'react';
import './styles.module.scss';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { Logo } from '@src/components/icons';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
	const [show, setShow] = useState(false);

	return (
		<>
			<header
				className={clsx(
					'max-w-[1440px] m-auto',
					styles['landing-page-header'],
				)}>
				<nav className='navbar navbar-expand-lg p-0'>
					<div className='container-fluid p-0 ml-[5px] mr-[4px] mt-[16px]'>
						<Link className='navbar-brand p-0' href='#'>
							{/* Logo for Desktop */}
							<Image
								className={styles['hide-big']}
								width={200}
								height={56}
								src='/images/Landing-page/logo-big.png'
								alt='logo'
							/>
							{/* Logo for Mobile */}
							<Image
								className={styles['hide-small']}
								width={115}
								height={33.35}
								src='/images/Landing-page/logo-small.png'
								alt='logo'
							/>
						</Link>

						{/* Burger Menu Button */}
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

						{/* Nav Items | Nav Side Menu Body */}
						<div
							id='navbarNav'
							className={clsx({
								[styles.navbarNav]: true,
								['navbar-collapse justify-content-end']: true,
								[styles.show]: show,
							})}>
							<ul className='navbar-nav'>
								<li className='nav-item'>
									<Link
										className={clsx('nav-link p-0', styles.active)}
										aria-current='page'
										href='#'>
										서비스소개
									</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link p-0' href='#'>
										회사소개
									</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link p-0' href='#'>
										문의하기
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</header>

			<main className='max-w-[1440px] m-auto'>
				{/* Section 1 */}
				<section>
					<div className={styles['section-1']}>
						<div className='flex'>
							<div className='col-sm-12 w-[403px] p-0'>
								<div className={styles['hero-text-container']}>
									<h1>이카루스</h1>
									<p>움직이는 광고판,</p>
									<p className='mt-0'>전국광고의 시작</p>
									<Link href='#'>서비스 문의하기</Link>
								</div>
							</div>
							<div className='col-sm-12' />
						</div>
					</div>
				</section>

				{/* Section 2 */}
				<section>
					<div className={clsx(styles['section-2'])}>
						<h1 className={styles['hide-small']}>
							최고를 지향하며 사명감과 신념으로 <b>차량광고</b>의 선두주자로
							여러분의 곁에 서고자 하는
							<b>우리는</b> <b className={styles['bold-font']}>이카루스</b>
							<b>입니다.</b>
						</h1>
						<div className={styles['hide-big']}>
							<h1>최고를 지향하며 사명감과 신념으로</h1>
							<h1>
								<b>차량광고</b>의 선두주자로 여러분의 곁에 서고자 하는
							</h1>
							<h1>
								<b>
									우리는 <b className={styles['bold-font']}>이카루스</b>입니다.
								</b>
							</h1>
						</div>
						<p>
							시인성, 이동성, 경제성 모든 것을 만족시키고, 효율과 능률적인
							면에서 최고를 지향합니다.
						</p>
					</div>
				</section>

				{/* Section 3 */}
				<section>
					<div className={styles['section-3']}>
						<div className='container'>
							<div className='row'>
								<div className='col-md-7 col-sm-12 p-0'>
									<div className={styles['track-content']}>
										<h1>
											움직이는 광고판,
											<br />
											<b className={styles['bold-font']}>차량 랩핑광고</b>를
											소개합니다.
										</h1>

										{/* Slide Items */}
										<div className={styles['slide-container']}>
											{/* Item 1 */}
											<div className={styles['track-sub-headings']}>
												<h2
													className={clsx(
														styles['hide-small'],
														styles['bold-font'],
													)}>
													01
												</h2>
												<h2>기업의 가치와 품위</h2>
												<p>
													브랜드 광고를 통한 기업의 가치와 품위를 높여줍니다.
												</p>
											</div>

											{/* Item 2 */}
											<div className={styles['track-sub-headings']}>
												<h2
													className={clsx(
														styles['hide-small'],
														styles['bold-font'],
													)}>
													02
												</h2>
												<h2>좋은 시인성과 이동성</h2>
												<p>
													뛰어난 시인성으로 고객을 사로잡아 강하게 인식시킵니다.
												</p>
											</div>

											{/* Item 3 */}
											<div className={styles['track-sub-headings']}>
												<h2
													className={clsx(
														styles['hide-small'],
														styles['bold-font'],
													)}>
													03
												</h2>
												<h2>적은 비용으로 최대의 효과</h2>
												<p>
													면적 대비 저렴한 비용과 뛰어난 노출 효과로 최대의
													효율을 발휘합니다
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-5 col-sm-12'></div>
							</div>
						</div>
					</div>
				</section>

				{/* Section 4 - Big */}
				<section className={styles['hide-big']}>
					<div className={styles['section-4']}>
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

				{/* Section 4 - Small */}
				<section
					className={clsx(styles['hide-small'], styles['section-4-small'])}>
					<h4>화물 랩핑광고 어디서 어떻게</h4>
					<h4> 시작해야 할까요?</h4>

					<h5>원하는 차량 선택부터 광고리포트까지</h5>
					<h5>모두 이카루스에서!</h5>

					<Image
						src='/images/Landing-page/chats-img.png'
						alt='img'
						width={280}
						height={200}
					/>

					<div>
						내가 원하는 차량을 직접 선택할 수
						<br />
						있으며, 차량과의
						<span>계약부터 정산 진행까지 이카루스에서 도와드립니다.</span>
					</div>
					<div>
						<span>
							디자인 시안이 없어도 OK, 걱정하지 <br />
							마세요!
						</span>
						직종에 맞는 최상의 디자인을
						<br />
						제작 해드립니다.
					</div>
					<div>
						실시간 <span>광고 현황</span>은 물론
						<br />
						<span>광고 리포트까지 확인</span>하실 수 있어요.
					</div>
				</section>
			</main>

			<footer className={clsx('max-w-[1440px] m-auto', styles['hide-big'])}>
				<section>
					<div className={styles['footer-section-1']}>
						<div className={clsx('container mt-[100px]', styles['footer-sec'])}>
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
										<div className={styles['store-icons']}>
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
										<div className={styles['store-icons']}>
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
										<div className={styles['store-icons']}>
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
					<div className={styles['footer-section-2']}>
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
											강남제일타워) &nbsp; &nbsp; ㅣ &nbsp; &nbsp;
											사업자등록번호 559-87-02646&nbsp; &nbsp; ㅣ
										</p>
										<span className={styles['copy-right-content']}>
											Copyright 2022 ICARUS All rights reserved.{' '}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</footer>

			<footer className={styles['hide-small']}>
				<section className={styles['footer-small-section-1']}>
					<h4>차량광고 중개 플랫폼 이카루스와 함께 하세요</h4>

					{/* Play Store Card */}
					<div className={styles['footer-card']}>
						<span>
							<Image
								width={20}
								height={20}
								src='/images/Landing-page/play-store.png'
								alt='paly store'
							/>
						</span>
						<div>
							<h5>화물주 전용앱</h5>
							<p>다운로드</p>
						</div>
					</div>

					{/* Apple Card */}
					<div className={styles['footer-card']}>
						<span>
							<Image
								width={20}
								height={20}
								src='/images/Landing-page/apple-small.png'
								alt='paly store'
							/>
						</span>
						<div>
							<h5>화물주 전용앱</h5>
							<p>다운로드</p>
						</div>
					</div>

					{/* Logo Card */}
					<div className={styles['footer-card']}>
						<span>
							<Image
								width={20}
								height={20}
								src='/images/Landing-page/logo-link.png'
								alt='paly store'
							/>
						</span>
						<div>
							<h5>광고주 시스템</h5>
							<p>이용하기</p>
						</div>
					</div>
				</section>

				<section className={styles['footer-small-section-2']}>
					<div>
						<h5>이용약관</h5>
						<h5>개인정보처리방침</h5>
					</div>
					<div>
						<p>주식회사 애드메타</p>
						<p>ㅣ</p>
						<p>주식회사 애드메타</p>
					</div>
					<p>세종특별자치시 남세종로 454, 8층 802호 에이864호</p>
					<p>(보람동, 강남제일타워)</p>
					<p>사업자등록번호 559-87-02646</p>
					<p>Copyright 2022 ICARUS All rights reserved.</p>
				</section>
			</footer>
		</>
	);
}
