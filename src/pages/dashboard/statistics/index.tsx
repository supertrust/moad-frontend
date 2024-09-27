import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useGetShowAdvertisementStats, useGetStatBasedAdvertisment, } from '@src/apis/advertisement';
import HeaderLine from '@src/components/common/HeaderLine';
import { Arrow, TooltipIcon } from '@src/components/icons';
import { DateRange, } from '@src/components/pages/StatisticsDetailsPage/StatisticsDetailsPage';
import { DateSelected, ISOformatDate, } from '@src/helpers';
import { useIcarusContext } from "@src/hooks";
// import { DataGrid } from '@src/components/common';
import useAuth from '@src/hooks/useAuth';
import useUtils from "@src/hooks/useUtils";
import { styles } from '@src/sections/statistics';
import { AdStatusesType, AdTypesType, IAdvertisementStat, } from '@src/types/advertisement';
import { formatNumberWithCommas } from '@src/utils/formatter';
// import { DataGrid } from '@src/components/common';
import { Pagination, Skeleton, Tooltip } from 'antd';
import { clsx } from 'clsx';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

export default function StatisticsScreen() {
  const {
    dictionary: { pageTitle,types: adTypes, statistics, dateRangePickerCtrls,dashboard,isKorean,adList : {allAdStatuses,noAdsMsg} },
  } = useAuth();
  const { formatTimeFromMinute } = useUtils();
  const [selectedAds, setSelectedAds] = useState<IAdvertisementStat[]>([]);
  const [status, setStatus] = useState<AdStatusesType | undefined>();
  const [type, setType] = useState<AdTypesType | undefined>();
  const [dataFilter, setDataFilter] = useState<DateRange | null>({
    startDate : '',
    endDate : '',
  })
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const { setPageTitle } = useIcarusContext()
  const { data: advertisementStatsData, isLoading } = useGetShowAdvertisementStats(
    {
      status: status,
      page: currentPage,
      ad_type : type,
      start_date: dataFilter?.startDate ?? '',
      end_date: dataFilter?.endDate ?? '',
      limit : 5
    },
  );
  const advertisement_stats = advertisementStatsData?.data;

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
    { text: statistics.drivingDstTime.selectTypes[0], value: "" },
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

  const tableFilterDate = (value: string) => {
    if (value == 'all') {
      setDataFilter({ startDate: '', endDate: '' });
    } else {
      const filteredItemsToday: DateRange = DateSelected(value);
      setDataFilter({
        startDate: ISOformatDate(filteredItemsToday?.startDate as Date),
        endDate: ISOformatDate(filteredItemsToday?.endDate as Date),
      });
    }
  };

  // Pagination
  const itemsPerPage = advertisementStatsData?.per_page || 15;

  const totalItems = advertisementStatsData?.totalRecords || 0 // Total number of items
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
    setPageTitle(pageTitle["top_bar_statistics"]);
  },[isKorean]);

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
                              onChange={(e)=>
                              {
                                // @ts-ignore
                                setType(e.target.value)
                              }}
                            aria-label='Default select example'
                            className={clsx(`border-[1px] border-advertiser-primary text-advertiser-primary text-[14px] rounded-[5px] block w-full py-[8px] px-[12px] pr-[40px]
													${styles.selectOption} cursor-pointer`, !isKorean && "!max-w-[200px]")}>
                            <option selected  disabled={true} hidden={true}>
                              {statistics.drivingDstTime.chooseAdType}
                            </option>
                            {SelectTypes.map((data) => (
                              <option key={data.value} value={data.value}>
                                {data.text}
                              </option>
                            ))}
                          </Form.Select>
                          <Arrow
                            className={`absolute right-[14px] top-[40%] pointer-events-none`}
                          />
                        </div>
                        <div className={styles.selectDropdown}>
                          <Form.Select
                              onChange={(e) => tableFilterDate(e.target.value)}
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
                            className={`absolute right-[14px] top-[40%] pointer-events-none`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='overflow-auto'>
                    <Table width={`100%`} className="mb-[0px] relative" id="notice-table">
                      <TableHead className={`bg-table-header !h-[60px]`}>
                        <TableRow>
                          <TableCell style={{ minWidth: '140px' }}
                                     className="!text-center">{statistics.drivingDstTime.columns[0]}</TableCell>
                          <TableCell style={{ minWidth: '280px' }}
                                     className="!text-center">{statistics.drivingDstTime.columns[1]}</TableCell>
                          <TableCell style={{ minWidth: '140px' }} className="!text-center">
                            <Tooltip placement="top" title={statistics.drivingDstTime.columns[2]} color={"#ECECEC"}>
                                           <span className={'!font-medium'}>
                                               {statistics.drivingDstTime.columns[2]}
                                           </span>
                            </Tooltip>
                          </TableCell>
                          <TableCell style={{ minWidth: '200px' }}
                                     className="!text-center">{statistics.drivingDstTime.columns[3]}</TableCell>
                          <TableCell style={{ minWidth: '200px' }}
                                     className="!text-center">{statistics.drivingDstTime.columns[4]}</TableCell>
                          <TableCell style={{ minWidth: '84px' }}
                                     className="!text-center">{statistics.drivingDstTime.columns[5]}</TableCell>

                        </TableRow>
                      </TableHead>
                      <TableBody className="divide-y">
                        {advertisement_stats? advertisement_stats
                            .map((item, index) => {
                              const selected = selectedAds.includes(item);
                              const hours = formatTimeFromMinute(
                                  item.total_hours * 60,
                              );
                                  return (
                                      <TableRow key={index} style={{ height: "50px" }}>
                                        <TableCell className="!text-center !text-[14px] !w-[55px]">
                                          {adTypes[item.ad_type]}
                                        </TableCell>
                                        <TableCell className="!text-[14px] text-center"
                                                   style={{ letterSpacing: "-0.16px" }}>
                                          <Link
                                              href={`/dashboard/advertisement-detail/${item.id}`}
                                              className="text-[#2C324C] underline"
                                          >
                                            {item.ad_name}
                                          </Link>
                                        </TableCell>
                                        <TableCell
                                            className="!text-center !text-[14px]">
                                          {`${formatNumberWithCommas(
                                              item.number_of_vehicle,
                                          )}`}
                                          {dashboard?.big}
                                        </TableCell>
                                        <TableCell className="!text-[14px] text-center"
                                                   style={{ letterSpacing: "-0.16px" }}>
                                          {formatNumberWithCommas(
                                              item.total_distance,
                                              10,
                                          ) || '-'}{' '}
                                          km
                                        </TableCell>
                                        <TableCell
                                            className="!text-center !text-[14px]">
                                          {hours || '-'}
                                          {/*<Arrow fill={'#999999'} className='block sm:hidden absolute right-[10px] top-[24px] rotate-[-90deg]'/>*/}
                                        </TableCell>
                                        <TableCell className="!text-[14px] !text-center"
                                                   style={{ letterSpacing: "-0.16px" }}>
                                          {statusMapper[item.status] || '-'}
                                        </TableCell>


                                      </TableRow>
                                  );
                                })
                            : <></>

                        }

                      </TableBody>
                    </Table>
                    <div className={'!text-center justify-center flex w-[100%] pt-2 pb-2'}>
                      {isLoading && <div className="flex justify-center items-center w-full h-15 backdrop-blur-sm">
                        <CircularProgress color="primary"/>
                      </div>}

                      {
                          ((!advertisement_stats || advertisement_stats?.length === 0) && !isLoading) &&
                          <div>{status === "end" ? noAdsMsg.end : noAdsMsg.all}</div>
                      }
                    </div>

                    {/* Render the Pagination component */}
                  </div>
                  {/* <DataGrid columns={columns} rows={stats} loading={isLoading} /> */}
                  {/* <BootstrapTable
                    keyField="id"
                    data={data}
                    columns={columns}
                    pagination={paginationFactory({ hideSizePerPage: true, sizePerPage: 6 })}
                    selectRow={{ mode: 'checkbox', clickToSelect: true }}
                    noDataIndication={'진행중인 광고가 없습니다.'}
                  /> */}
                </div>
                {
                    (!isLoading && totalItems) ?
                    <div className='flex justify-center py-[30px] notification_pagination'>
                      <Pagination
                          current={currentPage}
                          total={totalItems}
                          pageSize={itemsPerPage}
                          onChange={handlePageChange}
                      />
                    </div> : <></>
                }
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
