import React, { useMemo, useState } from 'react';
import { CircularProgress } from "@mui/material";
import { styles } from '@src/sections/statistics';
// import { DataGrid } from '@src/components/common';
import { Arrow } from '@src/components/icons';
// import { columns } from '@src/sections/statistics/tabelData';
import { useGetShowAdvertisementStats } from '@src/apis/advertisement';
import { clsx } from 'clsx';
import { Pagination } from 'antd';
import {
	AdStatusesType,
	AdTypesType,
	IAdvertisement,
} from '@src/types/advertisement';
export default function StatisticsScreen() {
	const { data: advertisement_stats, isLoading: isLoading } = useGetShowAdvertisementStats();
	const [selectedAds, setSelectedAds] = useState<IAdvertisement[]>([]);
	const [status, setStatus] = useState<AdStatusesType | undefined>();
	const [type, setType] = useState<AdTypesType | undefined>();
	const date_start = '2023. 03. 01';
	const date_end = '2023. 03. 08';
	const ad_amount = '123,456,789';
	const driving_vehicle = [
		{
			title: '모든 차량수',
			data: '120',
		},
		{
			title: '운행차량',
			data: '120',
		},
		{
			title: '운행예정',
			data: '',
		},
		{
			title: '종료예정',
			data: '60',
		},
		{
			title: '종료',
			data: '20',
		},
	];

	const statuses = [
		{ label: '전체', value: undefined },
		{ label: '진행중', value: 'proceeding' },
		{ label: '종료', value: 'end' },
	];
	const Types = {
		fixed_ad: '고정',
		national_ad: '국가',
		spot_ad: '스팟',
	};
	// Pagination
	const itemsPerPage = 6;

	const [currentPage, setCurrentPage] = useState(1); // Current page number
	const totalItems = advertisement_stats?.length ?? 0; // Total number of items
	const totalPages = Math.ceil(totalItems / itemsPerPage); // Total number of pages
	const prevItems = (currentPage - 1) * itemsPerPage;
	const currentItems = currentPage * itemsPerPage;
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};
	const handleSelectAll = () => {
		if (selectedAds.length !== advertisement_stats?.length) {
			setSelectedAds(advertisement_stats || []);
		} else {
			setSelectedAds([]);
		}
	};
	const handleToggleSelect = (ad: IAdvertisement, selected: boolean) => () => {
		if (selected) {
			setSelectedAds((old) => old.filter((_ad) => _ad !== ad));
		} else {
			setSelectedAds((old) => [...old, ad]);
		}
	};

	const stats = useMemo(
		() =>
			!advertisement_stats?.length
				? []
				: advertisement_stats?.slice(prevItems, currentItems).map((item, index) => ({
					key: index,
					ad_type: item.ad_type,
					advertising_name: item.ad_name,
					vehicles: item.vehicles_in_operation,
					period: item.period,
					status: item.situation,
				})),
		[advertisement_stats?.length],
	);

	return (
		<>
			<div
				id={styles.statistics}
				className={`${styles.page} ${styles.statistics}`}>
				<div className={styles.container}>
					<div className={styles.board_content}>
						<div className={styles.statistics_content}>
							<div className={styles.step_01}>
								<div className={styles.ad_amount}>
									<div className={styles.title_wrap}>
										<div className={styles.title}>광고 금액</div>
										<div className={styles.line}></div>
										<a href='/ad-amount' className={styles.text}>
											view all
										</a>
									</div>
									<div className={styles.ad_amount_box}>
										<div className={styles.box_wrap}>
											<div className={styles.date}>
												{date_start} ~ {date_end}
											</div>
											<div className={styles.amount}>
												{ad_amount ? ad_amount : '-'}
											</div>
										</div>
									</div>
								</div>

								<div className={styles.driving_vehicle}>
									<div className={styles.title_wrap}>
										<div className={styles.title}>운행차량</div>
										<div className={styles.line}></div>
									</div>
									<div className={styles.driving_vehicle_box}>
										<ul className={styles.list_wrap}>
											{driving_vehicle.map((data, index) => (
												<li key={index} className={styles.list}>
													<div className={styles.title}>{data.title}</div>
													<div className={styles.data}>
														{data.data ? data.data + '대' : '-'}
													</div>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
							<div className='ad-contents !h-full shadow-none	'>
								<div className={styles.step_02}>
									<div className={styles.title_wrap}>
										<div className={styles.title}>운행거리/운행시간</div>
										<div className={styles.line}></div>
									</div>
									<div className={styles.menuHd}>
										<div className={styles.tabMenu}>
											{statuses.map((item) => (
												<div
													onClick={() => setStatus(item.value as AdStatusesType)}
													key={item.label}
													className={styles.tabTitle}>
													<span
														className={clsx(
															item.value === status ? 'text-[16px] sm:text-[20px] text-[#2F48D1] font-bold' : 'text-[14px] sm:text-[16px] text-[#2C324C]', 'cursor-pointer'
														)}>
														{item.label}
													</span>
												</div>
											))}
										</div>
										<div className={styles.rightMenu}>
											<div className={styles.selectDropdown}>

											<select id="countries" className={`border-[1px] border-[#2F48D1] text-[#2F48D1] text-[14px] rounded-lg block w-full py-[8px] px-[12px] pr-[40px]  ${styles.selectOption} ${styles.only_pc}`}>
												<option selected>캠페인 유형 선택</option>
												<option value="1">1st Option</option>
												<option value="2">2nd Option</option>
												<option value="3">3rd Option</option>
												<option value="4">4th Option</option>
											</select>
											<Arrow className={`absolute right-[14px] top-[40%] ${styles.only_pc}`}/>
											</div>
											<button
												disabled={!selectedAds.length}
												// onClick={handleDeleteAds}
												className={styles.adDeleteBtn}>
												삭제
											</button>
										</div>
									</div>
									{/* <DataGrid columns={columns} rows={stats} loading={isLoading} /> */}
									<div className={styles.tabWrap}>
										<div className={`${styles.listHd} ${styles.listFlex}`}>
											<div className={styles.grid}>
												<div className={styles.chkBox}>
													<div className={styles.form_group}>
														<input
															type='checkbox'
															onChange={handleSelectAll}
															checked={selectedAds.length === advertisement_stats?.length}
															name='all_chk'
															id='all_chk'
															className='all-chk'
														/>
														<label htmlFor='all_chk'></label>
													</div>
												</div>
												<div className={`${styles.typeWrap} ${styles.gridBox} !font-medium`}>
													광고 유형
												</div>
												<div className={`${styles.gridBox} !font-medium`}>광고 유형</div>
												<div className={`${styles.gridBox} !font-medium`}>운행 차량수</div>
												<div className={`${styles.gridBox} !font-medium ${styles.only_pc}`}>총 운행거리</div>
												<div className={`${styles.gridBox} !font-medium ${styles.only_pc}`}>총 운행시간</div>

												{/* <div className={`${styles.statusWrap} ${styles.gridBox}`}>Total Cost</div> */}
											</div>
										</div>
										<div className='tab-content all-wrap on min-h-[366px] h-full'>
											<ul className='list-wrap mb-0'>
												{isLoading && <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
													<CircularProgress color="primary" />
												</div>}
												{advertisement_stats
													?.slice(prevItems, currentItems)
													.map((item, index) => {
														const selected = selectedAds.includes(item);
														return (
															<li key={item.id} className={`${styles.listFlex} relative`}>
																<a
																	href={`/dashboard/statistics/1`}
																	className={styles.grid}>
																	<div className={styles.chkBox}>
																		<div className={styles.form_group}>
																			<input
																				type='checkbox'
																				onChange={handleToggleSelect(item, selected)}
																				checked={selected}
																				className='list-chk'
																				name='list_chk'
																				id={`item_${index}`}
																			/>
																			<label htmlFor={`item_${index}`}></label>
																		</div>
																	</div>
																	<div className={clsx(styles.typeWrap, styles.gridBox)}>
																		{Types[item.ad_type]}
																	</div>
																	<div className={`${styles.gridBox} !text-left`}>{item.ad_name}</div>
																	<div className={`${styles.gridBox} ${styles.only_pc}`}>{`${item.vehicles_in_operation}`}대</div>
																	<div className={styles.gridBox}>
																		{item.period}
																	</div>
																	<div className={`${styles.gridBox} ${styles.only_pc} `}>
																		{
																			statuses.find(
																				(status) => item.situation === status.value,
																			)?.label
																		}
																		{item.situation}
																	</div>
																	{/* <div className={`${styles.statusWrap} ${styles.gridBox}`}>{item.amount}</div> */}
																	{/* <i className='only-mb ic-arrow-right'></i> */}
																	<Arrow fill={'#999999'} className='block sm:hidden absolute right-[12px] top-[28px] rotate-[-90deg]'/>
																</a>
															</li>
														);
													})}
											</ul>
										</div>
										{ advertisement_stats?.length &&
										<div className='flex justify-center py-[30px] notification_pagination'>
											<Pagination
												current={currentPage}
												total={totalItems}
												pageSize={itemsPerPage}
												onChange={handlePageChange}
											/>
										</div>
										}
									</div>
									{/* <BootstrapTable
                    keyField="id"
                    data={data}
                    columns={columns}
                    pagination={paginationFactory({ hideSizePerPage: true, sizePerPage: 6 })}
                    selectRow={{ mode: 'checkbox', clickToSelect: true }}
                    noDataIndication={'진행중인 광고가 없습니다.'}
                  /> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!--TODO 삭제버튼을 눌렀을때 : 종료된 광고가 아닐때 출력--> */}
			{/* <!--TODO Output when active className is added to confirm-modal className--> */}
			<div
				id='check_modal'
				className={`${styles.check_modal} ${styles.confirm_modal}`}>
				<div className={styles.check_modal_wrap}>
					<div className={styles.title}>확인사항</div>
					<div className={styles.text}>
						종료된 광고만
						<br />
						삭제하실 수 있습니다
					</div>
					<div className={styles.btn_wrap}>
						<button
							type='button'
							className={`${styles.check_close_btn} ${styles.active_btn}`}>
							확인
						</button>
					</div>
				</div>
			</div>


			{/* <!--TODO 삭베버튼을 눌렀을때 : 종료된 광고가 삭제 되기전 출력 -->
      <!--TODO Output when active className is added to remove-ads-modal className--> */}
			<div
				id='remove_ads_modal'
				className={`${styles.check_modal} ${styles.remove_ads_modal}`}>
				<div className={styles.check_modal_wrap}>
					<div className={styles.title}>광고삭제</div>
					<div className={styles.text}>
						삭제시 복구할 수 없으며
						<br />
						광고에 대한 정보를 확인하실 수 없습니다.
					</div>
					<div className={styles.btn_wrap}>
						<button
							type='button'
							className={`${styles.check_close_btn} ${styles.line_btn}`}>
							취소
						</button>
						<button
							type='button'
							id='remove_ads_modal_confirm'
							className={styles.active_btn}>
							삭제
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
