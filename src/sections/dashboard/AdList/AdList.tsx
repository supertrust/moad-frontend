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
		useGetAdvertisements({
			status,
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
		if (selectedAds.length !== advertisements?.length) {
			setSelectedAds(advertisements || []);
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
					<p className='text-center py-3'>
						{canDelete ? (
							<>
								삭제하시면 통계에서도 확인하실 수 없습니다. <br />{' '}
								삭제하시겠습니까?
							</>
						) : (
							<>
								종료된 광고만 <br /> 삭제하실 수 있습니다
							</>
						)}
					</p>
				),
				disableConfirmBtn: !canDelete,
				cancelButtonProps: {
					className: clsx(!canDelete && 'bg-primary text-white'),
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
	const itemsPerPage = 6;

	const [currentPage, setCurrentPage] = useState(1); // Current page number
	const totalItems = advertisements?.length ?? 0; // Total number of items
	const totalPages = Math.ceil(totalItems / itemsPerPage); // Total number of pages
	const prevItems = (currentPage - 1) * itemsPerPage;
	const currentItems = currentPage * itemsPerPage;
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<>
			<div className={styles.titleWrap}>
				<div className={styles.title}>
					<h4>광고 목록</h4>{' '}
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
										item.value === status && 'text-secondary font-bold',
									)}>
									{item.label}
								</span>
							</div>
						))}
					</div>
					<div className={styles.rightMenu}>
						<button
							onClick={openModal}
							className={`${styles.adAddBtn} font-[Inter]`}>
							<i className='ic-plus'></i>
							광고 신청
						</button>
						<button
							disabled={!selectedAds.length}
							onClick={handleDeleteAds}
							className={styles.adDeleteBtn}>
							삭제
						</button>
						<div className='select-box only-pc'>
							<Form.Select
								onChange={(e) => setType(e.target.value as AdTypesType)}
								aria-label='Default select example'
								className='font-medium adlist  border-1 border-[#2F48D1] text-[#2F48D1] h-[36px]'>
								<option value=''>캠페인 유형 선택</option>
								<option value='fixed_ad'>고정형</option>
								<option value='national_ad'>전국형</option>
								<option value='spot_ad'>스팟</option>
							</Form.Select>
						</div>
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
										checked={selectedAds.length === advertisements?.length}
										name='all_chk'
										id='all_chk'
										className='all-chk'
									/>
									<label htmlFor='all_chk'></label>
								</div>
							</div>
							<div className={`${styles.typeWrap} ${styles.gridBox}`}>
								광고 유형
							</div>
							<div className={styles.gridBox}>광고 이름</div>
							<div className={styles.gridBox}>운행 차량수</div>
							<div className={styles.gridBox}>기간</div>
							<div className={styles.gridBox}>상태</div>

							{/* <div className={`${styles.statusWrap} ${styles.gridBox}`}>Total Cost</div> */}
						</div>

						<RoleBasedGuard roles={['Admin']}>
							<div className={`${styles.gridBox}`}>Action</div>
						</RoleBasedGuard>
					</div>
					<div className='tab-content all-wrap on min-h-[370px] h-full'>
						<ul className='list-wrap'>
							{isLoading &&  <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
								<CircularProgress color="primary" />
							</div>}
							{advertisements
								?.slice(prevItems, currentItems)
								.map((item, index) => {
									const selected = selectedAds.includes(item);
									return (
										<li key={item.id} className={styles.listFlex}>
											<a
												href={`/dashboard/advertisement-detail/${item.id}`}
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
												<div className={clsx(styles.typeWrap, styles.gridBox)}>
													{Types[item.type]}
												</div>
												<div className={styles.gridBox}>{item.ad_name}</div>
												<div
													className={
														styles.gridBox
													}>{`${item.number_of_vehicles}`}</div>
												<div className={styles.gridBox}>
													{item.start_date && item.start_date
														? `${item.start_date} ~ ${item.end_date}`
														: '--'}
												</div>
												<div className={styles.gridBox}>
													{
														statuses.find(
															(status) => item.status === status.value,
														)?.label
													}
												</div>
												{/* <div className={`${styles.statusWrap} ${styles.gridBox}`}>{item.amount}</div> */}
												<i className='only-mb ic-arrow-right'></i>
											</a>
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
					{/* <Pagination className={styles.adlistPagination}>
            <Pagination.Prev className="prev-btn" />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Next className="next-btn" />
          </Pagination> */}
					{/* Render the Pagination component */}
					<div className='flex justify-center py-[30px] notification_pagination'>
						<Pagination
							current={currentPage}
							total={totalItems}
							pageSize={itemsPerPage}
							onChange={handlePageChange}
						/>
					</div>
				</div>
			</div>
			<AdModel refetchAds={refetchAdvertisements} ref={adModel} />
		</>
	);
}
