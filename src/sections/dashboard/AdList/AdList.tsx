import { CircularProgress, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useDeleteAdvertisement, useGetAdvertisements, useUpdateAdStatus, } from '@src/apis/advertisement';
import { Types } from "@src/components/pages/AdFullDetails";
import useAuth from '@src/hooks/useAuth';
import { useConfirmDialog } from '@src/hooks/useConfirmationDialog';
import { AdStatusesType, AdTypesType, IAdvertisement, } from '@src/types/advertisement';
import { Pagination, Tooltip } from 'antd';
import { clsx } from 'clsx';
import Link from "next/link";
import React, { useRef, useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AdModel, { AdModelRef } from '../SaveAdModel';
import styles from './style.module.css';

export const allStatuses = [
    { label: '광고진행중', value: 'in_progress' },
    { label: '광고검수중', value: 'ad_reviewing' },
    { label: '광고종료', value: 'end' },
    { label: '거절됨', value: 'decline' },
    { label: '신청중', value: 'applying' },
    { label: '화물주모집중', value: 'recruiting_cargo_owners' },
    { label: '광고신청중', value: 'applying_for_advertisement' },
    { label: '진행중', value: 'proceeding' },
]

export default function AdListModule() {

    const { userRole, dictionary: { adList, noticePage, common }, lang, isPcOnly } = useAuth();
    const { adStatuses, allAdStatuses, deleteAdsModal, adTypes, columns, noAdsMsg } = adList
    const statuses = [
        { label: adStatuses.all, value: undefined },
        { label: adStatuses.inProgress, value: 'in_progress' },
        { label: adStatuses.adReviewing, value: 'ad_reviewing' },
        { label: adStatuses.end, value: 'end' },
    ];

    const allStatuses = [
        { label: allAdStatuses.inProgress, value: 'in_progress' },
        { label: allAdStatuses.adReviewing, value: 'ad_reviewing' },
        { label: allAdStatuses.end, value: 'end' },
        { label: allAdStatuses.declined, value: 'decline' },
        { label: allAdStatuses.applying, value: 'applying' },
        { label: allAdStatuses.recruitingCargoOwners, value: 'recruiting_cargo_owners' },
        { label: allAdStatuses.applyingForAdvertisement, value: 'applying_for_advertisement' },
        { label: allAdStatuses.proceeding, value: 'proceeding' },
    ]
    const adModel = useRef<AdModelRef>(null);
    const [selectedAds, setSelectedAds] = useState<IAdvertisement[]>([]);
    const [status, setStatus] = useState<AdStatusesType | undefined>();
    const [type, setType] = useState<AdTypesType | undefined>();
    const { confirm } = useConfirmDialog();

    const { data: advertisements, refetch: refetchAdvertisements, isLoading } =
        useGetAdvertisements(
            {
                status: (status == 'applying' ? 'proceeding' : status),
                type
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
                title: canDelete ? deleteAdsModal.deleteTitle : deleteAdsModal.checkListTitle,
                description: (
                    <p className='text-center'>
                        {canDelete ? (
                            <>
                                {deleteAdsModal.deleteMsg} <br/>{' '}
                                {deleteAdsModal.deleteConfirmationMsg}
                            </>
                        ) : (
                            <>
                                {deleteAdsModal.checkListMsg}
                            </>
                        )}
                    </p>
                ),
                disableConfirmBtn: !canDelete,
                cancelButtonProps: {
                    className: clsx(!canDelete && ` !text-white ${styles.btn}`),
                },
                cancelText: canDelete ? deleteAdsModal.deleteCancelBtn : deleteAdsModal.checkCancelBtn,
                confirmText: deleteAdsModal.confirmBtn,
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

    let sortedAdvertisements = advertisements?.data?.sort((a, b) => b.id - a.id);

    // if(status){
    // 	sortedAdvertisements = sortedAdvertisements?.filter(item => item.status === status);
    // }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getAdvertisementStatus = (ad: IAdvertisement) => allStatuses.find((status) => ad.status === status.value)?.label;

    return (
        <>
            <div className={styles.titleWrap}>
                <div className={styles.title}>
                    <h4 className="text-[16px] lg:text-[20px] leading-normal">{adList.title}</h4>{' '}
                </div>
                <div className={styles.line}/>
            </div>
            <div className={styles.adContents}>
                <div className={styles.menuHd}>
                    <div className={clsx(styles.tabMenu, !isPcOnly && 'w-[100%] flex !justify-between items-center')}>
                        <div className={'flex gap-[20px]'}>
                            {statuses.map((item) => (
                                <div
                                    onClick={() => setStatus(item.value as AdStatusesType)}
                                    key={item.label}
                                    className={styles.tabTitle}>
								<span
                                    className={clsx(
                                        item.value === status && 'text-[16px] sm:text-[20px] text-advertiser-primary font-bold',
                                    )}>
									{item.label}
								</span>
                                </div>
                            ))}
                        </div>

                        {
                            !isPcOnly ?
                                <button
                                    onClick={openModal}
                                    id={styles.adAddBtn}
                                    className={clsx(styles.adAddBtn, styles.buttonfont, "font-[Inter] items-center md:!w-[138px]", lang === "kr" ? " !w-[90px]" : " !w-[120px]")}>
                                    <i className='ic-plus'></i>
                                    {adList.applyForAdBtn}
                                </button>
                                : <></>
                        }
                    </div>
                    <div
                        className={clsx(styles.rightMenu, !isPcOnly && 'w-[100%] flex items-center !justify-between pt-[10px]')}>
                        {
                            isPcOnly ? <button
                                onClick={openModal}
                                id={styles.adAddBtn}
                                className={clsx(styles.adAddBtn, styles.buttonfont, "font-[Inter] items-center md:!w-[138px]", lang === "kr" ? " !w-[90px]" : " !w-[120px]")}>
                                <i className='ic-plus'></i>
                                {adList.applyForAdBtn}
                            </button> : <div className={styles.selectedCount}>{common?.selected_count_prefix} <span
                                className={clsx(selectedAds?.length && "text-advertiser-primary")}>{selectedAds.length || 0}</span>{common?.selected_count_suffix}
                            </div>
                        }
                        <div className={'flex gap-2 items-center'}>
                            <div className='select-box  md:w-[149px]'>
                                <Form.Select
                                    onChange={(e) => setType(e.target.value as AdTypesType)}
                                    aria-label='광고 유형 선택'
                                    className='font-medium custom-select  border-1 border-advertiser-primary text-advertiser-primary h-[36px]'
                                >
                                    {/* <option value="" >광고 유형 선택</option> */}
                                    <option value=''>{adTypes.all}</option>
                                    <option value='fixed_ad'>{adTypes.fixed}</option>
                                    <option value='national_ad'>{adTypes.national}</option>
                                    <option value='spot_ad'>{adTypes.spot}</option>
                                </Form.Select>
                            </div>
                            <button
                                disabled={!selectedAds.length}
                                onClick={handleDeleteAds}
                                className={`${styles.adDeleteBtn} border disabled:!border-[#EEEEEE] disabled:!text-[#999999] !border-advertiser-primary !text-advertiser-primary`}>
                                {adList.deleteAdBtn}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='overflow-auto'>
                        <Table width={`100%`} className="mb-[0px] relative" id="notice-table">
                            <TableHead className={`bg-advertiser-light !h-[60px]`}>
                                <TableRow>
                                    <TableCell className="!text-center" style={{ width: '55px' }}>
                                        <div className={clsx(styles.form_group, '!w-[55px]')}>
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
                                    </TableCell>
                                    <TableCell style={{ minWidth: '100px' }}
                                               className="!text-center">{columns.adType}</TableCell>
                                    <TableCell style={{ minWidth: '280px' }}
                                               className="!text-center">{columns.adName}</TableCell>
                                    <TableCell style={{ minWidth: '100px' }} className="!text-center">
                                        <Tooltip placement="top" title={columns.noOfVehiclesInOp} color={"#ECECEC"}>
                                           <span className={'!font-medium'}>
                                                {columns.noOfVehiclesInOp}
                                           </span>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell style={{ minWidth: '210px' }}
                                               className="!text-center">{columns.adPeriod}</TableCell>
                                    <TableCell style={{ minWidth: '210px' }}
                                               className="!text-center">{columns.recruitmentPeriod}</TableCell>
                                    <TableCell style={{ minWidth: '100px' }}
                                               className="!text-center">{columns.status}</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y">
                                {sortedAdvertisements?.length ? sortedAdvertisements
                                        ?.slice(prevItems, currentItems)
                                        .map((item, index) => {
                                            const selected = selectedAds.includes(item);
                                            return (
                                                <TableRow key={index} style={{ height: "50px" }}>
                                                    <TableCell className="!text-center !text-[14px] !w-[55px]">
                                                        <div className={clsx(styles.form_group, '!w-[55px]')}>
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
                                                    </TableCell>
                                                    <TableCell className="!text-[14px] text-center"
                                                               style={{ letterSpacing: "-0.16px" }}>
                                                        <Link
                                                            href={`/dashboard/advertisement-detail/${item.id}`}
                                                            className="text-[#2C324C]"
                                                        >
                                                            {Types[item.type]}
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell
                                                        className=" !text-[14px] !text-[#999999]">
                                                        <Link
                                                            href={`/dashboard/advertisement-detail/${item.id}/full-details`}
                                                            className="text-[#2C324C]"
                                                        >
                                                            {item.ad_name}
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell className="!text-[14px] text-center"
                                                               style={{ letterSpacing: "-0.16px" }}>
                                                        <Link
                                                            href={`/dashboard/advertisement-detail/${item.id}`}
                                                            className="text-[#2C324C] underline"
                                                        >
                                                            {`${item.number_of_vehicles}`}
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell
                                                        className="!text-center !text-[14px]">
                                                        {item.start_date && item.start_date
                                                            ? `${item.start_date} ~ ${item.end_date}`
                                                            : '--'}
                                                        {/*<Arrow fill={'#999999'} className='block sm:hidden absolute right-[10px] top-[24px] rotate-[-90deg]'/>*/}
                                                    </TableCell>
                                                    <TableCell className="!text-[14px] !text-center"
                                                               style={{ letterSpacing: "-0.16px" }}>
                                                        {item.recruitment_period_start_date && item.recruitment_period_start_date
                                                            ? `${item.recruitment_period_start_date} ~ ${item.recruitment_period_end_date}`
                                                            : '--'}
                                                    </TableCell>
                                                    <TableCell
                                                        className="!text-center !text-[14px]">
                                                        {getAdvertisementStatus(item)}
                                                    </TableCell>


                                                </TableRow>
                                            );
                                        })
                                    : <></>

                                }

                            </TableBody>
                        </Table>
                    </div>

                    <div className={'!text-center justify-center flex w-[100%] pt-2 pb-2'}>
                        {isLoading && <div className="flex justify-center items-center w-full h-15 backdrop-blur-sm">
                            <CircularProgress color="primary"/>
                        </div>}

                        {
                            ((!sortedAdvertisements || sortedAdvertisements?.length === 0) && !isLoading) &&
                            <div>{noAdsMsg}</div>
                        }
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
            <AdModel refetchAds={refetchAdvertisements} ref={adModel}/>
        </>
    );
}
