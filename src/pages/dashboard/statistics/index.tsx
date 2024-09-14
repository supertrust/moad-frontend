import { useIcarusContext } from "@src/hooks";
import useUtils from "@src/hooks/useUtils";
import React, { useEffect, useMemo, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { styles } from '@src/sections/statistics';
// import { DataGrid } from '@src/components/common';
import { Tooltip } from 'antd';
import { Arrow, TooltipIcon } from '@src/components/icons';
import { Form } from 'react-bootstrap';
import {
  useGetShowAdvertisementStats,
  useGetStatBasedAdvertisment,
} from '@src/apis/advertisement';
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
import {
  DateSelected,
  ISOformatDate,
} from '@src/helpers';
import { Types } from '@src/components/pages/AdFullDetails';
import {
  DateRange,
  DateRangePickerCtrls,
} from '@src/components/pages/StatisticsDetailsPage/StatisticsDetailsPage';
import { formatNumberWithCommas } from '@src/utils/formatter';
// import { DataGrid } from '@src/components/common';
import useAuth from '@src/hooks/useAuth';

export default function StatisticsScreen() {
  const {
    dictionary: { pageTitle,types: adTypes, statistics, dateRangePickerCtrls,dashboard,isKorean,adList : {allAdStatuses} },
  } = useAuth();
  const { formatTimeFromMinute } = useUtils();
  const [selectedAds, setSelectedAds] = useState<IAdvertisementStat[]>([]);
  const [status, setStatus] = useState<AdStatusesType | undefined>();
  const [type, setType] = useState<AdTypesType | undefined>();
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const { setPageTitle } = useIcarusContext()
  const { data: advertisement_stats, isLoading } = useGetShowAdvertisementStats(
    {
      status: status,
      page: currentPage,
    },
  );

  const [selectedDate, setSelectedDate] = useState<DateRange | null>({
    startDate: '',
    endDate: '',
  });
  const { data: totalStat, isLoading: isTotalLoading } =
    useGetStatBasedAdvertisment({
      start_date: selectedDate?.startDate ?? '',
      end_date: selectedDate?.endDate ?? '',
    });
  const yearEnd = new Date(new Date().getFullYear(), 11, 31);

  const {
    advertisement_amount,
    all_vehicles,
    end,
    operating_vehicles,
    schedule,
    schedule_to_end,
    total_add,
    advertisement_progress,
  } = totalStat || {};

  const ad_statistics = [
    {
      title: statistics.adStatistics.report[0].title,
      data: formatNumberWithCommas(total_add),
      tooltip: `${statistics.adStatistics.report[0].tooltip} : ${operating_vehicles}${dashboard?.big}`,
    },
    {
      title: statistics.adStatistics.report[1].title,
      data: formatNumberWithCommas(advertisement_progress),
    },
    {
      title: statistics.adStatistics.report[2].title,
      data: formatNumberWithCommas(end),
    },
  ];

  const statuses = [
    { label: statistics.drivingDstTime.statuses[0], value: undefined },
    { label: statistics.drivingDstTime.statuses[1], value: 'proceeding' },
    { label: statistics.drivingDstTime.statuses[2], value: 'end' },
  ];

  const statusMapper = {
    in_progress: allAdStatuses.inProgress,
    end: allAdStatuses.end,
    proceeding: allAdStatuses.proceeding,
    applying: allAdStatuses.applying,
  };

  const SelectTypes = [
    { text: statistics.drivingDstTime.selectTypes[0], value: 'all' },
    { text: statistics.drivingDstTime.selectTypes[1], value: 'fixed_ad' },
    { text: statistics.drivingDstTime.selectTypes[2], value: 'national_ad' },
    { text: statistics.drivingDstTime.selectTypes[3], value: 'spot_ad' },
  ];

  const filterDate = (value: string) => {
    if (value == 'all') {
      setSelectedDate({ startDate: '', endDate: '' });
    } else {
      const filteredItemsToday: DateRange = DateSelected(value);
      setSelectedDate({
        startDate: ISOformatDate(filteredItemsToday?.startDate as Date),
        endDate: ISOformatDate(filteredItemsToday?.endDate as Date),
      });
    }
  };

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
  const handleToggleSelect =
    (ad: IAdvertisementStat, selected: boolean) => () => {
      if (selected) {
        setSelectedAds((old) => old.filter((_ad) => _ad !== ad));
      } else {
        setSelectedAds((old) => [...old, ad]);
      }
    };
  const customStyles = {
    dropdownIndicator: (base) => ({
      ...base,
      color: 'red', // Custom colour
    }),
  };

  useEffect(() => {
    setPageTitle("top_bar_statistics")
  },[isKorean])

  const advertisementElement = (
    <div className='relative'>
      <Form.Select
        aria-label='Default select example'
        className={`border-[0px] !bg-[#f5f7fb] text-advertiser-primary text-[14px] rounded-[5px] block w-full py-[8px] px-[12px] pr-[40px]
			${styles.selectOption} cursor-pointer`}
        onChange={(e) => filterDate(e.target.value)}>
        {dateRangePickerCtrls.map((data) => (
          <option key={data.value} value={data.value}>
            {data.label}
          </option>
        ))}
      </Form.Select>
      <Arrow
        className={`absolute right-[14px] top-[40%] ${styles.only_pc} pointer-events-none`}
      />
    </div>
  );
  const vehicleElement = (
    <div className='text-[#99A0AC] '>{statistics.vehicleElement}</div>
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
                  <div className={styles.title_wrap_top}>{pageTitle?.top_bar_statistics}</div>
                  <HeaderLine
                    title={statistics.adAmount.title}
                    element={advertisementElement}
                  />
                  <div className={styles.ad_amount_box}>
                    <div className={styles.box_wrap}>
                      <div className={'mb-[24px] flex items-center gap-2'}>
                        <span className={styles.date}>
                          {selectedDate?.startDate.toLocaleString()}{' '}
                          {selectedDate?.startDate && '~'}{' '}
                          {selectedDate?.endDate.toLocaleString()}
                        </span>
                        {selectedDate?.startDate && (
                          <TooltipIcon title={statistics.adAmount.tooltipMsg} />
                        )}
                      </div>

                      <div className={styles.amount}>
                        {isTotalLoading ? (
                          <Skeleton paragraph={false} className='w-24' />
                        ) : advertisement_amount ? (
                          Number(advertisement_amount)?.toLocaleString(
                            'kr-KR',
                          ) + statistics.adAmount.won
                        ) : (
                          '-'
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.driving_vehicle}>
                  <HeaderLine
                    title={statistics.adStatistics.title}
                    element={vehicleElement}
                  />
                  <div className={styles.driving_vehicle_box}>
                    <ul className={clsx(styles.list_wrap)}>
                      {ad_statistics.map((data, index) => (
                        <li
                          key={index}
                          className={clsx(styles.list, '!items-center')}>
                          <div className={'flex gap-2 items-center mb-[20px]'}>
                            <span className={styles.title}>{data.title}</span>
                            {data?.tooltip ? (
                              <TooltipIcon title={data.tooltip} />
                            ) : null}
                          </div>
                          <div className={styles.data}>
                            {isTotalLoading ? (
                              <Skeleton
                                paragraph={false}
                                className='w-14 items-center'
                              />
                            ) : data.data != undefined ? (
                              data.data + ` ${dashboard?.big}`
                            ) : (
                              '-'
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <HeaderLine
                title={statistics.drivingDstTime.title}
                className='mb-[9px]'
              />
              <div className='ad-contents !h-full shadow-none	'>
                <div className={styles.step_02}>
                  <div className={styles.menuHd}>
                    <div className={styles.tabMenu}>
                      {statuses.map((item) => (
                        <div
                          onClick={() => {
                            setSelectedAds([]);
                            setStatus(item.value as AdStatusesType);
                          }}
                          key={item.label}
                          className={styles.tabTitle}>
                          <span
                            className={clsx(
                              item.value === status
                                ? 'text-[16px] sm:text-[20px] text-advertiser-primary  font-bold'
                                : 'text-[14px] sm:text-[16px] text-[#2C324C]',
                              'cursor-pointer',
                            )}>
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.rightMenu}>
                      <div className='block lg:!hidden'>
                        {/*선택 {selectedAds.length}건*/}
                      </div>
                      <div className='flex flex-row gap-2'>
                        <div className={styles.selectDropdown}>
                          <Form.Select
                            aria-label='Default select example'
                            className={clsx(`border-[1px] border-advertiser-primary text-advertiser-primary text-[14px] rounded-[5px] block w-full py-[8px] px-[12px] pr-[40px]
													${styles.selectOption} cursor-pointer`, !isKorean && "!max-w-[200px]")}>
                            <option selected>
                              {statistics.drivingDstTime.chooseAdType}
                            </option>
                            {SelectTypes.map((data) => (
                              <option key={data.value} value={data.value}>
                                {data.text}
                              </option>
                            ))}
                          </Form.Select>
                          <Arrow
                            className={`absolute right-[14px] top-[40%] ${styles.only_pc} pointer-events-none`}
                          />
                        </div>
                        <div className={styles.selectDropdown}>
                          <Form.Select
                            aria-label='Default select example'
                            className={`border-[1px]  border-advertiser-primary text-advertiser-primary  text-[14px] rounded-[5px] block w-full py-[8px] px-[12px] pr-[40px]
													${styles.selectOption} cursor-pointer`}>
                            {dateRangePickerCtrls.map((data) => (
                              <option key={data.value} value={data.value}>
                                {data.label}
                              </option>
                            ))}
                          </Form.Select>
                          <Arrow
                            className={`absolute right-[14px] top-[40%] ${styles.only_pc} pointer-events-none`}
                          />
                        </div>
                        {/* <button
                          disabled={!selectedAds.length}
                          // onClick={handleDeleteAds}
                          className={clsx(
                            styles.adDeleteBtn,
                            'flex justify-center border-1 disabled:!border-[#EEEEEE] disabled:!text-[#999999] !border-advertiser-primary !text-advertiser-primary ',
                          )}>
                          {statistics.drivingDstTime.delete}
                        </button> */}
                      </div>
                    </div>
                  </div>
                  {/* <DataGrid columns={columns} rows={stats} loading={isLoading} /> */}
                  <div className={styles.tabWrap}>
                    <div className={clsx(`${styles.listHd} ${styles.listFlex}`, isKorean? "" : "!py-8")}>
                      <div className={styles.grid}>
                        {/*<div className={styles.chkBox}>*/}
                        {/*  <div className={styles.form_group}>*/}
                        {/*    <input*/}
                        {/*      type='checkbox'*/}
                        {/*      onChange={handleSelectAll}*/}
                        {/*      checked={*/}
                        {/*        selectedAds.length ===*/}
                        {/*        advertisement_stats?.length*/}
                        {/*      }*/}
                        {/*      name='all_chk'*/}
                        {/*      id='all_chk'*/}
                        {/*      className='all-chk w-[15px] h-[15px]'*/}
                        {/*    />*/}
                        {/*    <label htmlFor='all_chk'></label>*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                        <div
                          className={`${styles.typeWrap} ${styles.gridBox} !font-medium`}>
                          {statistics.drivingDstTime.columns[0]}
                        </div>
                        {/*<div className={`${styles.gridBox} !font-medium`}>*/}
                        {/*  {statistics.drivingDstTime.columns[0]}*/}
                        {/*</div>*/}
                        <div className={`${styles.gridBox} !font-medium`}>
                          {statistics.drivingDstTime.columns[1]}
                        </div>
                        <div
                          className={`${styles.gridBox} !font-medium ${styles.only_pc}`}>
                          {statistics.drivingDstTime.columns[2]}
                        </div>
                        <div
                          className={`${styles.gridBox} !font-medium ${styles.only_pc}`}>
                          {statistics.drivingDstTime.columns[3]}
                        </div>
                        <div
                          className={`${styles.gridBox} !font-medium ${styles.only_pc}`}>
                          {statistics.drivingDstTime.columns[4]}
                        </div>
                        <div
                            className={`${styles.gridBox} !font-medium ${styles.only_pc}`}>
                          {statistics.drivingDstTime.columns[5]}
                        </div>

                        {/* <div className={`${styles.statusWrap} ${styles.gridBox}`}>Total Cost</div> */}
                      </div>
                    </div>
                    <div className='tab-content all-wrap on min-h-[288px] sm:min-h-[298px] h-full'>
                      <ul className='list-wrap mb-0'>
                        {isLoading && (
                          <div className='flex justify-center items-center w-full h-32 backdrop-blur-sm'>
                            <CircularProgress color='primary' />
                          </div>
                        )}
                        {advertisement_stats
                          ?.slice(prevItems, currentItems)
                          .map((item, index) => {
                            const selected = selectedAds.includes(item);
                            const hours = formatTimeFromMinute(
                              item.total_hours * 60,
                            );
                            return (
                              <li
                                key={index}
                                className={`${styles.listFlex} relative`}>
                                <div className={styles.grid}>
                                  {/*<div className={styles.chkBox}>*/}
                                  {/*  <div className={styles.form_group}>*/}
                                  {/*    <input*/}
                                  {/*      type='checkbox'*/}
                                  {/*      onChange={handleToggleSelect(*/}
                                  {/*        item,*/}
                                  {/*        selected,*/}
                                  {/*      )}*/}
                                  {/*      checked={selected}*/}
                                  {/*      className='list-chk'*/}
                                  {/*      name='list_chk'*/}
                                  {/*      id={`item_${index}`}*/}
                                  {/*    />*/}
                                  {/*    <label*/}
                                  {/*      htmlFor={`item_${index}`}*/}
                                  {/*      className='w-[15px] h-[15px]'></label>*/}
                                  {/*  </div>*/}
                                  {/*</div>*/}
                                  <div
                                    className={clsx(
                                      styles.typeWrap,
                                      styles.gridBox,
                                    )}>
                                    {adTypes[item.ad_type]}
                                  </div>
                                  <Link
                                    href={`/dashboard/statistics/${item.id}`}
                                    className={`${styles.gridBox} !text-left !justify-start underline text-[#2C324C] hover:!text-[#2C324C]`}>
                                    {item.ad_name}
                                  </Link>
                                  <div
                                    className={`${styles.gridBox} ${styles.only_pc}`}>
                                    {`${formatNumberWithCommas(
                                      item.number_of_vehicle,
                                    )}`}
                                    {dashboard?.big}
                                  </div>
                                  <div className={styles.gridBox}>
                                    {formatNumberWithCommas(
                                      item.total_distance,
                                      10,
                                    ) || '-'}{' '}
                                    km
                                  </div>
                                  <div
                                    className={`${styles.gridBox} ${styles.only_pc} `}>
                                    {hours || '-'}
                                  </div>
                                  <div
                                    className={`${styles.gridBox} ${styles.only_pc} `}>
                                    {statusMapper[item.status] || '-'}
                                  </div>
                                  <Arrow
                                    fill={'#999999'}
                                    className='block sm:hidden absolute right-[12px] top-[28px] rotate-[-90deg]'
                                  />
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                      {!isLoading && !advertisement_stats?.length && (
                        <div className='w-fit m-auto'>
                          {status === "end"
                            ? statistics.drivingDstTime.noAdsMsg.finished
                            : statistics.drivingDstTime.noAdsMsg.all
                          }
                        </div>
                      )}
                    </div>
                    {advertisement_stats?.length && (
                      <div className='flex justify-center py-[30px] notification_pagination'>
                        <Pagination
                          current={currentPage}
                          total={totalItems}
                          pageSize={itemsPerPage}
                          onChange={handlePageChange}
                        />
                      </div>
                    )}
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
          <div className={styles.title}>{statistics.checkModal.title}</div>
          <div className={styles.text}>{statistics.checkModal.msg}</div>
          <div className={styles.btn_wrap}>
            <button
              type='button'
              className={`${styles.check_close_btn} ${styles.active_btn}`}>
              {statistics.checkModal.btnText}
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
          <div className={styles.title}>{statistics.removeAdsModal.title}</div>
          <div className={styles.text}>{statistics.removeAdsModal.msg}</div>
          <div className={styles.btn_wrap}>
            <button
              type='button'
              className={`${styles.check_close_btn} ${styles.line_btn}`}>
              {statistics.removeAdsModal.cancelBtnText}
            </button>
            <button
              type='button'
              id='remove_ads_modal_confirm'
              className={styles.active_btn}>
              {statistics.removeAdsModal.delBtnText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
