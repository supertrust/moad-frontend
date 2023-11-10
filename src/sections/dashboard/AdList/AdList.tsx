import { CircularProgress } from "@mui/material";
import React, { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Pagination } from 'antd';
import AdModel, { AdModelRef } from '../SaveAdModel';
import styles from './style.module.css';
import {
	useDeleteAdvertisement,
	useGetAdvertisements,
	useUpdateAdStatus,
} from '@src/apis/advertisement';
import {
	AdStatusesType,
	AdTypesType,
	IAdvertisement,
} from '@src/types/advertisement';
import { toast } from 'react-toastify';
import useAuth from '@src/hooks/useAuth';
import RoleBasedGuard from '@src/guards/RoleBasedGuard';
import { clsx } from 'clsx';
import { useConfirmDialog } from '@src/hooks/useConfirmationDialog';
import { Button } from '@src/components/common';
import { Arrow } from '@src/components/icons';
import Link from "next/link";

const statuses = [
	{ label: '전체', value: undefined },
	{ label: '진행중', value: 'proceeding' },
	{ label: '신청중', value: 'applying' },
	{ label: '종료', value: 'end' },
];

const Types = {
	fixed_ad: '고정',
	national_ad: '국가',
	spot_ad: '스팟',
};

export default function AdListModule() {
	const { userRole } = useAuth();
	const adModel = useRef<AdModelRef>(null);
	const [selectedAds, setSelectedAds] = useState<IAdvertisement[]>([]);
	const [status, setStatus] = useState<AdStatusesType | undefined>();
	const [type, setType] = useState<AdTypesType | undefined>();
	const { confirm } = useConfirmDialog();

	const { data: advertisements, refetch: refetchAdvertisements, isLoading } =
		useGetAdvertisements(
			{status :(status == 'applying' ? 'proceeding' : status),
			type,
			for_admin: userRole?.role_name === 'Admin',
		});
	const { mutateAsync: updateAdStatus } = useUpdateAdStatus();
	const { mutateAsync: deleteAd } = useDeleteAdvertisement();

	const openModal = () => adModel.current?.open();

	const handleToggleSelect = (ad: IAdvertisement, selected: boolean) => () => {
		if (selected) {
			setSelectedAds((old) => old.filter((_ad) => _ad !== ad));
		} else {
			setSelectedAds((old) => [...old, ad]);
		}
	};

	const handleSelectAll = () => {
		if (selectedAds.length !== advertisements?.data?.length) {
			setSelectedAds(advertisements?.data || []);
		} else {
			setSelectedAds([]);
		}
	};

	const handleDeleteAds = async () => {
		try {
			let canDelete = true;
			selectedAds.map((ad) => {
				if (!canDelete) return false;
				if (ad.type !== 'spot_ad' && new Date(ad.end_date) > new Date()) {
					canDelete = false;
				}
			});
			confirm({
				title: canDelete ? '광고삭제' : '확인사항',
				description: (
					<p className='text-center'>
						{canDelete ? (
							<>
								삭제하시면 통계에서도 확인하실 수 없습니다. <br />{' '}
								삭제하시겠습니까?
							</>
						) : (
							<>
								종료된 광고만 삭제하실 수 있습니다.
							</>
						)}
					</p>
				),
				disableConfirmBtn: !canDelete,
				cancelButtonProps: {
					className: clsx(!canDelete && ` !text-white ${styles.btn}`),
				},
				cancelText: canDelete ? '확인' : '취소',
				confirmText: '삭제',
				onConfirm: async () => {
					await Promise.all(
						selectedAds.map(async (ad) => {
							await deleteAd({ id: `${ad.id}` });
						}),
					);
					setSelectedAds([]);
					refetchAdvertisements();
				},
			});
		} catch (error: any) {
			toast.error(error);
		}
	};

	const handleUpdateAdStatus = (status: 'yes' | 'no', id: number) => () => {
		updateAdStatus(
			{ id, status },
			{
				onSuccess: () => {
					refetchAdvertisements();
				},
			},
		);
	};

	// Pagination
	const itemsPerPage = (window.innerWidth > 767) ? 6 : 5;

	const [currentPage, setCurrentPage] = useState(1); // Current page number
	const totalItems = advertisements?.data?.length ?? 0; // Total number of items
	const totalPages = Math.ceil(totalItems / itemsPerPage); // Total number of pages
	const prevItems = (currentPage - 1) * itemsPerPage;
	const currentItems = currentPage * itemsPerPage;

	var sortedAdvertisements = advertisements?.data?.sort((a, b) => b.id - a.id);

	if(status == 'proceeding'){
		sortedAdvertisements = sortedAdvertisements?.filter(item => item.approved === 'yes');
	}
	if(status == 'applying'){
		sortedAdvertisements = sortedAdvertisements?.filter(item => item.approved === 'no');
	}

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};


	return (
		<>
			<div className={styles.titleWrap}>
				<div className={styles.title}>
					<h4 className="text-[16px] lg:text-[20px] leading-normal">광고 목록</h4>{' '}
				</div>
				<div className={styles.line} />
			</div>
			<div className={styles.adContents}>
				<div className={styles.menuHd}>
					<div className={styles.tabMenu}>
						{statuses.map((item) => (
							<div
								onClick={() => setStatus(item.value as AdStatusesType)}
								key={item.label}
								className={styles.tabTitle}>
								<span
									className={clsx(
										item.value === status && 'text-[16px] sm:text-[20px] text-[#2F48D1] font-bold',
									)}>
									{item.label}
								</span>
							</div>
						))}
					</div>
					<div className={styles.rightMenu}>
						<button
							onClick={openModal}
							className={`${styles.adAddBtn} font-[Inter] !w-[90px] md:!w-[138px]`}>
							<i className='ic-plus'></i>
							광고 신청
						</button>
						
						<div className='select-box only-pc md:w-[149px]'>
							<Form.Select
								onChange={(e) => setType(e.target.value as AdTypesType)}
								aria-label='Default select example'
								className='font-medium adlist  border-1 border-[#2F48D1] text-[#2F48D1] h-[36px]'>
								<option value=''>광고 유형 선택</option>
								<option value='fixed_ad'>고정형</option>
								<option value='national_ad'>전국형</option>
								<option value='spot_ad'>스팟</option>
							</Form.Select>
						</div>
						<button
							disabled={!selectedAds.length}
							onClick={handleDeleteAds}
							className={`${styles.adDeleteBtn} border-1 disabled:!border-[#EEEEEE] disabled:!text-[#999999] !border-[#2F48D1] !text-[#2F48D1]`}>
							삭제
						</button>
					</div>
				</div>
				<div className={styles.tabWrap}>
					<div className={`${styles.listHd} ${styles.listFlex}`}>
						<div className={styles.grid}>
							<div className={styles.chkBox}>
								{/* <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedAds.length === advertisements?.length}
                name="all_chk"
                id="all_chk"
                className="all-chk"
              /> */}
								<div className={styles.form_group}>
									<input
										type='checkbox'
										onChange={handleSelectAll}
										checked={selectedAds.length === advertisements?.data?.length}
										name='all_chk'
										id='all_chk'
										className='all-chk'
									/>
									<label htmlFor='all_chk'></label>
								</div>
							</div>
							<div className={`${styles.typeWrap} ${styles.gridBox} ${styles.only_pc}`}>
								광고 유형
							</div>
							<div className={`${styles.typeWrapsecond} ${styles.gridBox} `}>광고 이름</div>
							<div className={`${styles.typeWrapthird} ${styles.gridBox}`}>운행 차량수</div>
							<div className={`${styles.typeWrapfourth} ${styles.gridBox}`}>광고기간</div>
							<div className={`${styles.typeWrapfourth} ${styles.gridBox}`}>모집기간</div>
							<div className={`${styles.gridBox} ${styles.only_pc}`}>상태</div>

							{/* <div className={`${styles.statusWrap} ${styles.gridBox}`}>Total Cost</div> */}
						</div>

						<RoleBasedGuard roles={['Admin']}>
							<div className={`${styles.gridBox}`}>Action</div>
						</RoleBasedGuard>
					</div>
					<div className='tab-content all-wrap on min-h-[297px] h-full'>
						<ul className='list-wrap mb-0'>
							{isLoading && <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
								<CircularProgress color="primary" />
							</div>}
							{sortedAdvertisements
								?.slice(prevItems, currentItems)
								.map((item, index) => {
									const selected = selectedAds.includes(item);
									return (
										<li key={item.id} className={styles.listFlex}>
											<div
												className={styles.grid}>
												<div className={styles.chkBox}>
													{/* <input
                        type="checkbox"
                        onChange={handleToggleSelect(item.id, selected)}
                        checked={selected}
                        className="list-chk"
                        name="list_chk"
                      /> */}
													<div className={styles.form_group}>
														<input
															type='checkbox'
															onChange={handleToggleSelect(item, selected)}
															checked={selected}
															className='list-chk'
															name='list_chk'
															id={`item_${item.id}`}
														/>
														<label htmlFor={`item_${item.id}`}></label>
													</div>
												</div>
												<div className={clsx(
													styles.typeWrap, 
													styles.gridBox,
													styles.only_pc,
													"cursor-pointer"
												)}>
													<Link 
														href={`/dashboard/advertisement-detail/${item.id}`}
														className="text-[#2C324C]"
													>
														{Types[item.type]}
													</Link>
												</div>
												<div className={clsx(styles.gridBox,'!text-left underline text-')}>
													<Link 
														href={`/dashboard/advertisement-detail/${item.id}/full-details`}
														className="text-[#2C324C]"
													>
														{item.ad_name}
													</Link>
												</div>
												<div
													className={
														styles.gridBox
													}>{`${item.number_of_vehicles}`}</div>
												<div className={`${styles.gridBox} !text-left sm:!text-center`}>
													{item.start_date && item.start_date
														? `${item.start_date} ~ ${item.end_date}`
														: '--'}
														<Arrow fill={'#999999'} className='block sm:hidden absolute right-[10px] top-[24px] rotate-[-90deg]'/>
												</div>
												<div className={`${styles.gridBox} !text-left sm:!text-center`}></div>
												<div className={`${styles.gridBox} ${styles.only_pc}`}>
													{
														statuses.find(
															(status) => item.status === status.value,
														)?.label
													}
													
												</div>
												
											</div>
											<RoleBasedGuard roles={['Admin']}>
												<div className={styles.gridBox}>
													<Button onClick={handleUpdateAdStatus('no', item.id)}>
														Reject
													</Button>
													<Button
														onClick={handleUpdateAdStatus('yes', item.id)}>
														Approve
													</Button>
												</div>
											</RoleBasedGuard>
										</li>
									);
								})}
						</ul>
					</div>
					{/* Render the Pagination component */}
					{
						advertisements?.data?.length &&
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
			</div>
			<AdModel refetchAds={refetchAdvertisements} ref={adModel} />
		</>
	);
}
