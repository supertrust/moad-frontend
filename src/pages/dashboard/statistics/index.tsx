import React, { useMemo, useState } from 'react';
import { CircularProgress } from "@mui/material";
import { styles } from '@src/sections/statistics';
// import { DataGrid } from '@src/components/common';
import { Tooltip } from 'antd';
import { Arrow, TooltipIcon } from '@src/components/icons';
import { Form } from 'react-bootstrap';
import { useGetShowAdvertisementStats, useGetStatBasedAdvertisment } from '@src/apis/advertisement';
import { clsx } from 'clsx';
import { Pagination, Skeleton } from 'antd';
import {
	AdStatusesType,
	AdTypesType,
	IAdvertisement,
	IAdvertisementStat,
} from '@src/types/advertisement';
import HeaderLine from '@src/components/common/HeaderLine';
import Link from 'next/link';
import {DateSelected, ISOformatDate, formatTimeFromMinute} from  '@src/helpers'
import { Types } from '@src/components/pages/AdFullDetails';
import { DateRange, DateRangePickerCtrls } from '@src/components/pages/StatisticsDetailsPage/StatisticsDetailsPage';
import { formatNumberWithCommas } from '@src/utils/formatter';


export default function StatisticsScreen() {
	const [selectedAds, setSelectedAds] = useState<IAdvertisementStat[]>([]);
	const [status, setStatus] = useState<AdStatusesType | undefined>();
	const [type, setType] = useState<AdTypesType | undefined>();
	const [currentPage, setCurrentPage] = useState(1); // Current page number
	const { data: advertisement_stats, isLoading } = useGetShowAdvertisementStats({
		status: status , page : currentPage
	});

	const [selectedDate, setSelectedDate] = useState<DateRange| null>({startDate : '',endDate: ''});
	const { data: totalStat, isLoading: isTotalLoading } = useGetStatBasedAdvertisment({start_date:selectedDate?.startDate??'',end_date:selectedDate?.endDate??''});
	const yearEnd = new Date(new Date().getFullYear(),11,31)

	const {
		advertisement_amount, all_vehicles , end ,
		operating_vehicles, schedule , schedule_to_end,total_add,advertisement_progress,
	} = totalStat || {};

	const driving_vehicle = [
		{
			title: '총 광고 수',
			data: formatNumberWithCommas(total_add),
			tooltip : `운행중인 차량수 : ${operating_vehicles}대`
		},
		{
			title: '진행중인 광고',
			data: formatNumberWithCommas(advertisement_progress),
		},
		{
			title: '종료된 광고',
			data: formatNumberWithCommas(end),
		},
	];

	const statuses = [
		{ label: '전체', value: undefined },
		{ label: '진행중', value: 'proceeding' },
		{ label: '종료', value: 'end' },
	];

	const statusMapper = {
		in_progress: '광고진행중',
		end: '광고종료',
		proceeding: '광고검토중',
		applying: '광고승인'
	}

	const SelectTypes = [
		{text: '전체',value : 'all'},
		{text: '고정형',value : 'fixed_ad'},
		{text: '전국형',value : 'national_ad'},
		{text: '스팟형',value : 'spot_ad'}
	];

	const filterDate = (value : string) => {
		if(value == 'all'){
		  setSelectedDate({startDate:'',endDate:''})
		}else{
		  const filteredItemsToday : DateRange = DateSelected(value)
		  setSelectedDate({
			startDate:ISOformatDate(filteredItemsToday?.startDate as Date),
			endDate:ISOformatDate(filteredItemsToday?.endDate as Date)});
		}
	  }

	// Pagination
	const itemsPerPage = 6;

	const totalItems = advertisement_stats?.length ?? 0; // Total number of items
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
	const handleToggleSelect = (ad: IAdvertisementStat, selected: boolean) => () => {
		if (selected) {
			setSelectedAds((old) => old.filter((_ad) => _ad !== ad));
		} else {
			setSelectedAds((old) => [...old, ad]);
		}
	};
	const customStyles = {
		dropdownIndicator: base => ({
		  ...base,
		  color: "red" // Custom colour
		})
	  };
const advertisementElement = (
	<div className='relative'>
	<Form.Select
		aria-label='Default select example'
		className={`border-[0px] !bg-[#f5f7fb] text-[#2F48D1] text-[14px] rounded-[5px] block w-full py-[8px] px-[12px] pr-[40px]
		${styles.selectOption} cursor-pointer`}
		onChange={(e) => filterDate(e.target.value)}
		>
		{DateRangePickerCtrls.map((data) => (
			<option key={data.value} value={data.value}>{data.label}</option>
		))}
	</Form.Select>
	<Arrow className={`absolute right-[14px] top-[40%] ${styles.only_pc} pointer-events-none`}/>
	</div>
);
const vehicleElement = (
	<div className='text-[#99A0AC] '>
		전체 기간 기준
	</div>
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
								    <div className={styles.title_wrap_top}>
									통계
									</div>
									<HeaderLine
										title='광고 금액'
										element={advertisementElement}
									/>
									<div className={styles.ad_amount_box}>
										<div className={styles.box_wrap}>

												<div className={'mb-[24px] flex items-center gap-2'}>
													<span className={styles.date}>
													{selectedDate?.startDate.toLocaleString()} {selectedDate?.startDate && '~'} {selectedDate?.endDate.toLocaleString()}
												</span>
													{selectedDate?.startDate &&

															<TooltipIcon title={"기간내 계약진행된 총 광고 금액의 합계"}/>}



												</div>

											<div className={styles.amount}>
												{isTotalLoading ?
													<Skeleton paragraph={false} className='w-24' />:
													advertisement_amount ? Number(advertisement_amount)?.toLocaleString('kr-KR') + '원' : '-'
												}
											</div>
										</div>
									</div>
								</div>

								<div className={styles.driving_vehicle}>
									<HeaderLine title='운행차량' element={vehicleElement} />
									<div className={styles.driving_vehicle_box}>
										<ul className={clsx(styles.list_wrap)}>
											{driving_vehicle.map((data, index) => (
												<li key={index} className={clsx(styles.list,'!items-center')}>
													<div className={'flex gap-2 items-center mb-[20px]'}>
														<span className={styles.title}>{data.title}</span>
														{
															data?.tooltip ? <TooltipIcon title={data.tooltip}/> : null
														}
													</div>
													<div className={styles.data}>
														{isTotalLoading ?
															<Skeleton paragraph={false} className='w-14 items-center' />:
															data.data!=undefined ? data.data + '대' : '-'
														}
													</div>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
							<HeaderLine title='운행거리/운행시간' className='mb-[9px]'/>
							<div className='ad-contents !h-full shadow-none	'>
								<div className={styles.step_02}>
									<div className={styles.menuHd}>
										<div className={styles.tabMenu}>
											{statuses.map((item) => (
												<div
													onClick={() => {setSelectedAds([]);setStatus(item.value as AdStatusesType)}}
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
											<div className='block lg:!hidden'>
												선택 {selectedAds.length}건
											</div>
											<div className='flex flex-row gap-2'>
												<div className={styles.selectDropdown}>
												<Form.Select
													aria-label='Default select example'
													className={`border-[1px] border-[#2F48D1] text-[#2F48D1] text-[14px] rounded-[5px] block w-full py-[8px] px-[12px] pr-[40px]
													${styles.selectOption} cursor-pointer`}>
													<option selected>광고 유형 선택</option>
													{SelectTypes.map((data) => (
														<option key={data.value} value={data.value}>{data.text}</option>
													))}
												</Form.Select>
													<Arrow className={`absolute right-[14px] top-[40%] ${styles.only_pc} pointer-events-none`}/>
												</div>
												<div className={styles.selectDropdown}>
												<Form.Select
													aria-label='Default select example'
													className={`border-[1px] border-[#2F48D1] text-[#2F48D1] text-[14px] rounded-[5px] block w-full py-[8px] px-[12px] pr-[40px]
													${styles.selectOption} cursor-pointer`}
													>
													{DateRangePickerCtrls.map((data) => (
														<option key={data.value} value={data.value}>{data.label}</option>
													))}
												</Form.Select>
													<Arrow className={`absolute right-[14px] top-[40%] ${styles.only_pc} pointer-events-none`}/>
												</div>
												<button
													disabled={!selectedAds.length}
													// onClick={handleDeleteAds}
													className={
														clsx(styles.adDeleteBtn,
														'border-1 disabled:!border-[#EEEEEE] disabled:!text-[#999999] !border-[#2F48D1] !text-[#2F48D1]'
														)
														}>
													삭제
												</button>
											</div>
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
															className='all-chk w-[15px] h-[15px]'
														/>
														<label htmlFor='all_chk'></label>
													</div>
												</div>
												<div className={`${styles.typeWrap} ${styles.gridBox} !font-medium`}>
													광고 유형
												</div>
												<div className={`${styles.gridBox} !font-medium`}>광고 이름</div>
												<div className={`${styles.gridBox} !font-medium`}>운행 차량수</div>
												<div className={`${styles.gridBox} !font-medium ${styles.only_pc}`}>총 운행거리</div>
												<div className={`${styles.gridBox} !font-medium ${styles.only_pc}`}>총 운행시간</div>
												<div className={`${styles.gridBox} !font-medium ${styles.only_pc}`}>상태</div>

												{/* <div className={`${styles.statusWrap} ${styles.gridBox}`}>Total Cost</div> */}
											</div>
										</div>
										<div className='tab-content all-wrap on min-h-[288px] sm:min-h-[298px] h-full'>
											<ul className='list-wrap mb-0'>
												{isLoading && <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
													<CircularProgress color="primary" />
												</div>}
												{ advertisement_stats?.slice(prevItems, currentItems)
													.map((item, index) => {
														const selected = selectedAds.includes(item);
														const hours = formatTimeFromMinute(item.total_hours * 60);
														return (
															<li key={index} className={`${styles.listFlex} relative`}>
																<div className={styles.grid}>
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
																			<label htmlFor={`item_${index}`} className='w-[15px] h-[15px]'></label>
																		</div>
																	</div>
																	<div className={clsx(styles.typeWrap, styles.gridBox)}>
																		{Types[item.ad_type]}
																	</div>
																	<Link
																	href={`/dashboard/statistics/${item.id}`}
																	className={`${styles.gridBox} !text-left !justify-start underline text-[#2C324C] hover:!text-[#2C324C]`}>{item.ad_name}</Link>
																	<div className={`${styles.gridBox} ${styles.only_pc}`}>{`${formatNumberWithCommas(item.number_of_vehicle)}`}대</div>
																	<div className={styles.gridBox}>
																		{formatNumberWithCommas(item.total_distance,10)|| "-"} km
																	</div>
																	<div className={`${styles.gridBox} ${styles.only_pc} `}>
																		{hours || '-'}
																	</div>
																	<div className={`${styles.gridBox} ${styles.only_pc} `}>
																		{statusMapper[item.status] || '-'}
																	</div>
																	<Arrow fill={'#999999'} className='block sm:hidden absolute right-[12px] top-[28px] rotate-[-90deg]'/>
																</div>
															</li>
														);
													})}
											</ul>
											{ !isLoading && !advertisement_stats?.length &&  <div className='w-fit m-auto'>진행중인 광고가 없습니다.</div> }
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
