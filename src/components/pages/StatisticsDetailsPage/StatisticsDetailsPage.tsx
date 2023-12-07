import {
  Card,
  CircularProgress,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useGetVehicleAdvertisementStatsDetails } from "@src/apis/advertisement";
import ArrowBack from "@src/components/icons/ArrowBack";
import NextIcon from "@src/components/icons/NextIcon";
import PrevIcon from "@src/components/icons/PrevIcon";
import { useIcarusContext } from "@src/hooks/useIcarusContext";
import { IAdvertisementStat } from "@src/types/advertisement";
import { Pagination } from "antd";
import { clsx } from "clsx";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSearchParams } from "next/navigation";
import styles from "./styles.module.scss";
import { DateSelected, ISOformatDate, dateFormat, getNextMonthDates, totalDays } from "@src/helpers";
import { TypeOfVechicle } from "@src/sections/dashboard/SaveAdModel/SaveAdForm";
import { DatePicker } from "antd";
import dayjs from "dayjs";

export const DateRangePickerCtrls = [
  {
    label: "전체",
    value: "all",
  },
  {
    label: "오늘",
    value: "today",
  },
  {
    label: "이번 주",
    value: "this_week",
  },
  {
    label: "지난주",
    value: "last_week",
  },
  {
    label: "이번 달",
    value: "this_month",
  },
  {
    label: "지난 달",
    value: "last_month",
  },
  {
    label: "올해",
    value: "this_year",
  },
  {
    label: "작년",
    value: "last_year",
  }
];
export type DateRange = {
startDate : Date |string,
endDate : Date | string
}
const currentYearStart = new Date(new Date().getFullYear(), 0, 1);
function StatisticsDetailsPage() {
  const router = useRouter();
  const { RangePicker } = DatePicker;
  const { id } = router.query;
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1); // Current page number

  const [selectedAds, setSelectedAds] = useState<IAdvertisementStat[]>([]);
  const { setPageTitle } = useIcarusContext();

  const [date, setDate] = useState(new Date());
  const [bufferdDate, setBufferdDate] = useState<DateRange | []>({startDate : new Date(),endDate: new Date(String(searchParams.get("end")))});
  const [selectedDate, setSelectedDate] = useState<DateRange>({startDate : new Date(),endDate: new Date(String(searchParams.get("end")))});

  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);

  const { data: vehicle_advertisement_stats_details, isLoading } =
    useGetVehicleAdvertisementStatsDetails({
      to: selectedDate.endDate?ISOformatDate(selectedDate.endDate as Date):'',
      from: selectedDate.startDate?ISOformatDate(selectedDate.startDate as Date) : '',
      advertisement_id: String(id),
      page: currentPage,
    });

  const itemsPerPage = 15;
  const totalItems = vehicle_advertisement_stats_details?.totalRecords;
  const prevItems = 1;
  const currentItems = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    setPageTitle("통계");
  }, []);

  const allStatuses = [
    { label: "시작", value: "accepted" },
    { label: "시작", value: "apply" },
    { label: "거부됨", value: "rejected" },
    { label: "시작", value: "start" },
    { label: "끝", value: "end" },
  ];
  const handleMonthChange = (type,date) => {
    const {startDate,endDate} = getNextMonthDates(type,date)
    setSelectedDate({startDate:startDate as Date,endDate:endDate as Date});
  }
  const handleDateChange = (range) => {
    const startDate = range[0].format();
    const endDate = range[1].format();
    setBufferdDate({startDate:new Date(startDate),endDate:new Date(endDate)});
  };

  const filterDate = (value : string) => {
    if(value == 'all'){
      setBufferdDate([])
      setSelectedDate({startDate:'',endDate:''})
    }else{
      const filteredItemsToday : DateRange = DateSelected(value)
      setBufferdDate({startDate:filteredItemsToday?.startDate,endDate:filteredItemsToday?.endDate});
    }
  }

  // Extra options in date range picker
  useEffect(() => {
    const dateRangePicker = document.querySelector(
      ".custom_popup_picker .ant-picker-panel-layout>div"
    );
    var newElementOuter = document.createElement("div");
    newElementOuter.classList.add(styles['ant-picker-custom-header']);
    var newElement = document.createElement("div");

    DateRangePickerCtrls.forEach((item) => {
      var newButton = document.createElement("button");
      newButton.textContent = item.label;
      newButton.onclick = () => {
        var elements = document.getElementsByClassName(styles['active']);
        console.log('elements', elements)
        for (var i = 0; i < elements.length; i++) {
          elements[i].classList.remove(styles['active']);
        }
        newButton.classList.add(styles['active']);
        filterDate(item.value??'')
      };
      newElement.appendChild(newButton);
    });

    newElementOuter.appendChild(newElement);
    dateRangePicker?.insertBefore(newElementOuter, dateRangePicker?.firstChild);
    return () => {
      dateRangePicker?.removeChild(newElementOuter);
    };
  }, [datePickerOpen]);

  const bufferStartDate = !Array.isArray(bufferdDate) ? bufferdDate.startDate : new Date();
  const bufferEndDate   = !Array.isArray(bufferdDate) ? bufferdDate.endDate : new Date();

  return (
    <>
      {/*pc version*/}

      <div className={clsx("only-pc", "mx-[30px]")}>
        <div className={"py-[20px]"}>
          <span className={styles["top-title"]}>
            {"통계 > 이카루스 서비스 오픈 출시 기념 "}
          </span>
        </div>

        <Card
          variant="elevation"
          elevation={1}
          className="mb-10 flex flex-col sm:min-h-[560px] h-full justify-between"
        >
          <div>
            <div
              className={
                "min-h-[74px] flex items-center px-4 justify-between space-x-5 relative"
              }
            >
              <div className={"flex space-x-[20px]"}>
                <div
                  className={
                    "flex items-center justify-between  bg-white border-y border-[#ebedf4] w-[320px]"
                  }
                >
                  <div className={`${styles["date-next-prev"]} cursor-pointer`} onClick={() => handleMonthChange('prev',selectedDate?.startDate)}>
                    <PrevIcon width={16} height={16} />
                  </div>
                  <div>
                    <span
                      className={`${styles["date"]} ${
                        datePickerOpen ? "hidden" : "block"
                      }`}
                      onClick={() => setDatePickerOpen(true)}
                    >
                      <div className="flex">
                        <div>
                          <input
                            className="w-[80px] text-center"
                            readOnly
                            placeholder="Start date"
                            value={selectedDate?.startDate && dateFormat(
                              (selectedDate?.startDate as Date)?.toISOString(),
                              "Y-m-d"
                            )}
                          />
                        </div>
                        <div>~</div>
                        <div>
                          <input
                            className="w-[80px] text-center"
                            readOnly
                            placeholder="End date"
                            value={selectedDate.endDate && dateFormat((selectedDate.endDate as Date)?.toISOString(), "Y-m-d")}
                          />
                        </div>
                      </div>
                    </span>
                    <div>
                      <RangePicker
                        className={datePickerOpen ? "custom_picker" : "hidden"}
                        popupClassName={"custom_popup_picker !left-unset"}
                        format="YYYY-MM-DD"
                        onChange={handleDateChange}
                        separator={"~"}
                        defaultValue={[
                          dayjs(bufferStartDate),
                          dayjs(bufferEndDate),
                        ]}
                        value={[
                          dayjs(bufferStartDate),
                          dayjs(bufferEndDate),
                        ]}
                        allowClear={false}
                        suffixIcon={""}
                        inputReadOnly
                        open={datePickerOpen}
                        onOpenChange={(open) =>
                          setDatePickerOpen(datePickerOpen)
                        }
                        onCalendarChange={() => console.log("yes")}
                        renderExtraFooter={() => (
                          <div className="flex justify-between px-[20px] bg-[#E1ECFF] py-[15px] items-center">
                            <div>
                              {
                              <p>{ISOformatDate(bufferStartDate as Date)} ~
                              {ISOformatDate(bufferEndDate as Date)} {' '}
                              <span className="text-[#2F48D1] font-medium	">({totalDays(bufferStartDate,bufferEndDate)}일간)</span>
                              </p>
                              }
                            </div>
                            <div className="flex gap-[4px]">
                              <button
                                className=" bg-[#2F48D1] text-[#fff] px-[12px] py-[5px] rounded text-[12px] leading-normal"
                                onClick={() => {
                                  setSelectedDate({startDate:bufferStartDate as Date,endDate:bufferEndDate as Date});
                                  setDatePickerOpen(false)
                                }}
                              >
                                Ok
                              </button>
                              <button
                                className=" bg-[#fff] text-[#999] px-[12px] py-[5px] rounded text-[12px] leading-normal"
                                onClick={() => {
                                  setDatePickerOpen(false);
                                }}
                              >
                                취소
                              </button>
                            </div>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  <div className={`${styles["date-next-prev"]} cursor-pointer`} onClick={() => handleMonthChange('next',selectedDate?.endDate)}>
                    <NextIcon width={16} height={16} />
                  </div>
                </div>

                <div className={"h-[40px] w-[1px] bg-[#EBEDF4]"}></div>
              </div>
              <span className={styles["selected-date"]}>
                보고서는 실시간이 아닙니다. 2023. 03. 28 14:59 기준 , 2023.03.28
                11: 00 시간까지 업데이트된 지표입니다.
              </span>
            </div>
            {isLoading ? (
                  <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
                    <CircularProgress color="primary" />
                  </div>
                ) :(
                  vehicle_advertisement_stats_details?.data?.length ? (
                    <Table width={`100%`} className="m-0 !text-[16px]">
                       <TableHead className="bg-[#f5f7fb]">
                <TableRow className={"!h-[60px]"}>
                  <TableCell className={clsx(styles["table-title"])}>
                    no
                  </TableCell>
                  <TableCell className={clsx(styles["table-title"])}>
                    등록번호
                  </TableCell>
                  <TableCell className={clsx(styles["table-title"])}>
                    차량종류
                  </TableCell>
                  <TableCell className={clsx(styles["table-title"])}>
                    운행거리
                  </TableCell>
                  <TableCell className={clsx(styles["table-title"])}>
                    운행시간
                  </TableCell>
                  <TableCell className={clsx(styles["table-title"])}>
                    달성률
                  </TableCell>
                  <TableCell className={clsx(styles["table-title"])}>
                    상태
                  </TableCell>
                  <TableCell className={clsx(styles["table-title"])}>
                    광고기간
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y">
                      {vehicle_advertisement_stats_details?.data?.map(
                      (stats: any, index: number) => {
                        return (
                          <TableRow
                            key={index}
                            className="cursor-pointer hover:bg-blue-50 transform transition-all duration-200
                                      !h-[50px]"
                          >
                            <TableCell
                              className={clsx(
                                styles["table-value"],
                                "!w-[82.4px]"
                              )}
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell
                              className={clsx(
                                styles["table-value"],
                                "!w-[185px]"
                              )}
                            >
                              {stats?.registration_number}
                            </TableCell>

                            <TableCell
                              className={clsx(
                                styles["table-value"],
                                "!w-[205px]"
                              )}
                            >
                              {TypeOfVechicle?.find(
                                (item) =>
                                  item.value === stats?.advertisement_vehicle_type
                              )?.text + ` `}
                              {stats?.vehicle_type}
                            </TableCell>
                            <TableCell
                              className={clsx(
                                styles["table-value"],
                                "!w-[195px]"
                              )}
                            >
                              {stats?.total_distance}km
                            </TableCell>
                            <TableCell
                              className={clsx(
                                styles["table-value"],
                                "!w-[190px]"
                              )}
                            >
                              {stats?.total_hours}시간
                            </TableCell>
                            <TableCell
                              className={clsx(styles["table-value"], "w-[200px]")}
                            >
                              {stats?.achievement_rate}
                            </TableCell>
                            <TableCell
                              className={clsx(styles["table-value"], "w-[200px]")}
                            >
                              {
                                allStatuses.find(
                                  (status) => stats?.status === status.value
                                )?.label
                              }
                            </TableCell>
                            <TableCell
                              className={clsx(styles["table-value"], "w-[200px]")}
                            >
                              {stats?.start_date} ~ {stats?.end_date}
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                    </TableBody>
                    </Table>

                  ) : (
                    <div
                      className={'w-full p-[150px] text-center'}
                    >
                      조회된 내용이 없습니다.
                    </div>
                  )
                )}
          </div>

          {vehicle_advertisement_stats_details?.data?.length ? (
            <div className="flex justify-center py-[20px] notification_pagination">
              <Pagination
                current={currentPage}
                total={totalItems}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
              />
            </div>
          ) : null}
        </Card>
      </div>

      {/*mobile version*/}

      <div
        className={
          "only-mb ml-[19px] mr-[19px] break-words whitespace-break-spaces"
        }
      >
        <div className={`${styles["mobile-top-header"]}`}>
          <ArrowBack handleAction={() => router.back()} />
          <div className={styles["header"]}>이카루스 서비스 오픈 출시 기념</div>
          <div></div>
        </div>

        <div className={"mt-[20px] flex flex-col space-y-3"}>
          <div className={"flex justify-between space-x-2 items-center"}>
            <span className={clsx(styles["mb-top-title"])}>
              총운행거리/시간
            </span>
            <div className={styles["horizontal-line"]}></div>
          </div>

          <div className={clsx(styles["driving-section"])}>
            <div className={"flex  items-center space-x-2 justify-between"}>
              <span className={styles["card-info-title"]}>총 운행거리</span>
              <span className={styles["total-driving-amount"]}>3000시간</span>
            </div>

            <div className={"flex items-center space-x-2 justify-between"}>
              <span className={styles["card-info-title"]}>총 운행시간</span>
              <span className={styles["total-driving-amount"]}>300시간</span>
            </div>
          </div>
        </div>

        <div className={"mt-[28px]"}>
          <div className={"flex justify-between space-x-2 items-center"}>
            <span className={clsx(styles["mb-top-title"])}>운행차량</span>
            <div className={styles["horizontal-line"]}></div>
          </div>
        </div>

        <div
          className={
            "flex items-center justify-between min-h-[40px] mb-[20px] mt-3 bg-white"
          }
        >
          <div className={styles["date-next-prev"]}>
            <PrevIcon width={16} height={16} />
          </div>
          <div>
            <span className={styles["date"]}>
              오늘 : 2023. 03. 08 ~ 2023. 03. 08
            </span>
          </div>
          <div className={styles["date-next-prev"]}>
            <NextIcon width={16} height={16} />
          </div>
        </div>

        <div className={"flex flex-col space-y-[12px]"}>
          {vehicle_advertisement_stats_details?.data?.map((obj, idx) => {
            return (
              <div
                key={idx}
                className={clsx(
                  styles["mobile-card-body"],
                  "flex flex-col py-[20px]"
                )}
              >
                <div
                  className={
                    "flex  items-center space-x-2 justify-between mx-[30px] border-b border-[#ebedf4] py-[14px]"
                  }
                >
                  <span className={styles["card-info-title"]}>등록번호</span>
                  <span className={styles["card-info-value"]}>
                    {obj.registration_number}
                  </span>
                </div>

                <div
                  className={
                    "flex items-center space-x-2 justify-between mx-[30px] border-b border-[#ebedf4] py-[14px]"
                  }
                >
                  <span className={styles["card-info-title"]}>차량종류</span>
                  <span className={styles["card-info-value"]}>
                    {obj.vehicle_type}
                  </span>
                </div>

                <div
                  className={
                    "flex  items-center space-x-2 justify-between mx-[30px] border-b border-[#ebedf4] py-[14px]"
                  }
                >
                  <span className={styles["card-info-title"]}>운행거리</span>
                  <span className={styles["card-info-value"]}>
                    {obj.total_distance}
                  </span>
                </div>

                <div
                  className={
                    "flex  items-center space-x-2 justify-between mx-[30px] border-b border-[#ebedf4] py-[14px]"
                  }
                >
                  <span className={styles["card-info-title"]}>운행시간</span>
                  <span className={styles["card-info-value"]}>
                    {obj.total_hours}
                  </span>
                </div>

                <div
                  className={
                    "flex  items-center space-x-2 justify-between mx-[30px]  py-[14px]"
                  }
                >
                  <span className={styles["card-info-title"]}>달성률</span>
                  <span className={styles["card-info-value"]}>
                    {obj.achievement_rate}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {vehicle_advertisement_stats_details?.data?.length && (
          <div className="flex justify-center py-[30px] notification_pagination">
            <Pagination
              current={currentPage}
              total={totalItems}
              pageSize={itemsPerPage}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default StatisticsDetailsPage;

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((obj, id) => {
  return {
    no: id + 1,
    registration_number: "10150122호",
    car_number: "윙바디 1t",
    driving_distance: "500km",
    operating_time: "50시간",
    achievement_rate: "80%",
  };
});
