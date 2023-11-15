import React, { useEffect, useMemo, useState, useRef, forwardRef } from "react";
import {
  Controller,
  FormProvider,
  Yup,
  yupResolver,
  useForm,
  Button,
} from "@src/components/common";
import ArrowBack from "@src/components/icons/ArrowBack";
import { ThreeDots } from "react-loader-spinner";
import { useGetOperatingAreas, useGetVehicles } from "@src/apis/advertisement";
import styles from "./styles.module.css";
import { Form, Modal, Table } from "react-bootstrap";
import { SaveAdvertisementType } from "@src/types/advertisement";
import Image from "next/image";
import Truck01 from "@images/advertising/img-car01.png";
import Truck02 from "@images/advertising/img-car02.png";
import Truck03 from "@images/advertising/img-car03.png";
import clsx from "clsx";
import { Loader } from "rsuite";
import Link from "next/link";
import DatePicker from "react-datepicker";
import { ConfirmPropsType } from "@src/contexts/ConfirmDialogContext";
import IconPlus from '@images/admin-ad-details/ic-add-plus.png'
import AdImage from "@src/components/pages/Admin/AdminAdvertisementDetailsPage/components/Image";
import ImagePlaceholder from '@images/admin-ad-details/ic-image-placeholder.png'
import adStyles from  '@src/sections/dashboard/AdList/style.module.css'

type FormDataType = {
  ad_name: string;
  vehicle_type: string;
  content: string;
  images: string;
  ad_period: number;
  type: string;
  start_date: string;
  vehicle_details: {
    [key: number]: number;
  };
  operating_area: number[];
};

const defaultValues: FormDataType = {
  ad_name: "",
  ad_period: 6,
  type: "fixed_ad",
  start_date: new Date().toISOString().split("T")[0],
  vehicle_details: {},
  operating_area: [] ,
  vehicle_type: 'cargo',
  content:  '',
  images: '',
};

const adTypes = [
  {
    type: "fixed_ad",
    title: "고정형 광고",
    subtitle_1: "특정 지역 화주들을 매칭하여",
    subtitle_2: "노출할 수 있는 고정형 광고",
    faq: true,
  },
  {
    type: "national_ad",
    title: "전국형 광고",
    subtitle_1: "전국 모든 화주들을 매칭하여 적은 비용",
    subtitle_2: "으로 광고효과를 최대화 할 수 있는 광고",
    faq: true,
  },
  {
    type: "spot_ad",
    title: "스팟광고",
    subtitle_1: "특정 지역 화주들을 매칭하여",
    subtitle_2: "노출할 수 있는 고정형 광고",
    faq: true,
  },
];

const SaveAdvertisementSchema = Yup.object().shape({
  type: Yup.string().required("고유형을 선택해주세요."),
  ad_name: Yup.string().required("광고이름을 입력해주세요."),
  ad_period: Yup.number().required(
    "광고기간을 6개월 또는 12개월 선택해주세요."
  ),
  start_date: Yup.string().required(
    "시작일을 선택해주세요. (등록 기준 1달 이후 선택)"
  ),
  vehicle_details: Yup.object().test(
    "is-not-empty-object",
    "운행차량을 입력해주세요.",
    (value) => Object.keys(value).length > 0
  ),
  operating_area: Yup.array().when("type", ([type], schema) =>
    type == "fixed_ad" ? schema.min(1, "운행지역을 선택해주세요.") : schema
  ),
});

const SaveAdForm = ({
  onCancel,
  onSubmitForm,
  isLoadingSaveAdvertisement,
  values,
}: {
  onCancel: VoidFunction;
  onSubmitForm: (props: SaveAdvertisementType) => Promise<void>;
  isLoadingSaveAdvertisement: boolean;
  values?: SaveAdvertisementType;
}) => {
  const methods = useForm<FormDataType>({
    //@ts-ignore
    defaultValues: values || defaultValues,
    //@ts-ignore
    resolver: yupResolver(SaveAdvertisementSchema),
  });

  const { data: vehicles, isLoading: isLoadingVehicles } = useGetVehicles();
  const { data: areas, isLoading: isLoadingCars } = useGetOperatingAreas();

  const [isOpen, openPeriodList] = useState(false);
  const [isVehicleTypeOpen, openVehicleType] = useState(false);
  const active_model = window.innerWidth > 767 ? false : true;
  const [isActive, setActive] = useState(active_model);
  const [period, setPeriod] = useState(defaultValues.ad_period);
  const [startDate, setStartDate] = useState(defaultValues.start_date);
  const [vehicleDetails, setVehicleDetails] = useState(
    values?.vehicle_details || defaultValues.vehicle_details
  );
  const [isAreaVisible, setIsAreaVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [allError, setErrors] = useState<string | undefined>("");
  const imageRef = useRef<HTMLInputElement>();
  const [images, setImages] = useState<File[]>([]);
  const [updateImage, setUpdateImage] = useState(false);

  const handleFileChange = event =>  setImages([...images, ...event.target.files as File[]])
  const removeFile = (file: File) => setImages(images.filter(image =>  image !== file))

  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
    setValue,
    getValues,
  } = methods;

  // console.log("Errors =>", errors);
  // Object.keys(errors).length && Object.values(errors)[0].ref;

  const totalPrice = useMemo(() => {
    let price = 0;
    Object.entries(vehicleDetails).map(([key, value]) => {
      if (key && value) {
        const vehicle = vehicles?.find((v) => v.id === Number(key));
        const noOfVehicle = value;
        if (vehicle) price += noOfVehicle * vehicle?.expenses?.[period];
      }
    });
    return price;
  }, [vehicleDetails, period, vehicles]);

  const endDate = useMemo(() => {
    const currentDate = new Date(startDate);
    const sixMonthsFromNow = new Date(
      currentDate.setMonth(currentDate.getMonth() + period)
    )
      .toISOString()
      .split("T")[0];
    return sixMonthsFromNow;
  }, [startDate, period]);

  const onSubmit = handleSubmit(
    async (v) => {
      const imageData = {};
        images.map((image, index) => {
            imageData[`image_${index+1}`] = image;
        });
      const values = {
        ...v,
        ...imageData,
        total_cost: totalPrice,
        end_date: endDate,
        status: "applying",
      };
      await onSubmitForm(values);
    },
    (errors) => {
      const error = Object.values(errors)[0].message;
      setErrors(error);

      const names = Object.keys(errors);
      if (names.length) {
        const element = document.getElementById(`input_${names[0]}`);
        element?.scrollIntoView();
        element?.focus();
      }
    }
  );

  useEffect(() => {
    watch(({ ad_period, vehicle_details, start_date, type }) => {
      ad_period && setPeriod(ad_period);
      start_date && setStartDate(start_date);
      // @ts-ignore
      vehicle_details && setVehicleDetails(vehicle_details);
      type && setIsAreaVisible(type == "fixed_ad");
    });
  }, [watch]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Enter") {
        event.preventDefault(); // Prevent form submission
        onSubmit().then(() => {});
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  const TypeOfVechicle = [
    {text :"카고",value :"cargo"},
    {text :"탑",value :"tower"},
    {text :"윙바디",value :"loaded"},
  ];
  
  function CustomInput(props) {
    return (
      <div className={`input-group ${styles.datepicker}`}>
        <input
          type="text"
          className={`form-control h-[36px] ${styles.input_date} !text-[14px]`}
          onClick={props.onClick}
          value={startDate}
          onChange={props.onChange}
          readOnly
        />
        <svg
          onClick={props.onClick}
          className="absolute right-[12px] top-[30%] z-[99]"
          width="14"
          height="16"
          viewBox="0 0 14 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.3335 1.99996H11.6668V1.33329C11.6668 0.966626 11.3668 0.666626 11.0002 0.666626C10.6335 0.666626 10.3335 0.966626 10.3335 1.33329V1.99996H3.66683V1.33329C3.66683 0.966626 3.36683 0.666626 3.00016 0.666626C2.6335 0.666626 2.3335 0.966626 2.3335 1.33329V1.99996H1.66683C0.933496 1.99996 0.333496 2.59996 0.333496 3.33329V14C0.333496 14.7333 0.933496 15.3333 1.66683 15.3333H12.3335C13.0668 15.3333 13.6668 14.7333 13.6668 14V3.33329C13.6668 2.59996 13.0668 1.99996 12.3335 1.99996ZM11.6668 14H2.3335C1.96683 14 1.66683 13.7 1.66683 13.3333V5.33329H12.3335V13.3333C12.3335 13.7 12.0335 14 11.6668 14Z"
            fill="#999999"
          />
        </svg>
      </div>
    );
  }
  const trucks = [Truck01, Truck02, Truck03];

  const containerRef = useRef(null);
  const handleClickOutside = (event) => {
    // @ts-ignore
    if (containerRef.current && !containerRef.current.contains(event.target) && document.getElementById(adStyles.adAddBtn) != event.target) {
      onCancel();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <FormProvider methods={methods}>
      <div className={styles.ad_modal_wrap} ref={containerRef} id={styles.ad_modal_wrap}>
        <div className={`only-mb`}>
          <div className={`${styles["mobile-top-header"]}`}>
            <ArrowBack handleAction={onCancel} />
            <div className={styles["header"]}>광고신청</div>
            <div></div>
          </div>
        </div>
        <div className={`hidden sm:block ${styles.ad_apply_title}`}>
          <p>광고신청</p>
        </div>
        <div
          id={styles.ad_apply_info}
          className={`${isActive ? styles.active : ""} ${
            styles.ad_apply_info
          } ${styles.only_pc} bg-[#FFFFFF]`}
        >
          <div className={`${styles.info_content}`}>
            <div className={styles.info_text}>
              광고가 노출되는 지역을 선택해 광고를 생성하세요.
              <br />
              지역에 따라 광고의 특성이 달라질 수 있습니다.
            </div>
            <div id={styles.slide_wrap} className={styles.slide_wrap}>
              <ul className={styles.info_list_wrap}>
                <li className={styles.list}>
                  광고 목적에 따라 광고 상품 유형을 선택하고, 광고 노출 기간 등
                  원하시는 조건을 등록하실 수 있습니다.
                </li>
                <li className={styles.list}>
                  광고 유형은 ‘고정형광고, ‘전국광고’, ‘스팟광고’, 총
                  3가지입니다. 등록 후 유형 변경은 불가하니 어떤 광고 상품을
                  진행할지 검토 후 선택하세요.
                </li>
                <li className={styles.list}>
                  광고 등록시 1~2일 정도 검수시간이 소요됩니다.
                  <br className="block sm:!hidden" /> (담당자 전화번호로
                  연락드립니다.)
                </li>
              </ul>
              <div
                className={`${styles.info_img_wrap} ${
                  active_model && "hidden"
                }`}
              >
                <div className={styles.img_title}>부착예시</div>
              </div>
              <div
                className={`${
                  active_model && "hidden"
                } sm:flex sm:flex-row justify-center items-center sm:justify-between gap-3 text-center px-[10px]`}
              >
                {trucks.map((truck, i) => (
                  <Image
                    key={i}
                    className={clsx(
                      "md:w-auto h-20 items-center",
                      `truck_image md:h-full !min-h-[102px] ${styles.truck_image}`,
                      i == 2 && `!h-[136px] ${styles.third_image}`
                    )}
                    src={truck}
                    alt=""
                  />
                ))}
              </div>
            </div>
          </div>
          <div
            id={styles.more_btn}
            className={`${styles.more_btn} hidden sm:block`}
          >
            <div
              className={styles.text_wrap}
              onClick={() => setActive(!isActive)}
            >
              <span className={styles.more_text}>자세히</span>{" "}
              <i className={styles.ic_down_blue}></i>
            </div>
          </div>
        </div>
        <div className={`${styles.only_mb} ${styles.ad_apply_info_mb}`}>
          <div className={styles.info_text}>
            광고가 노출되는 지역을 선택해 광고를 생성하세요.
            <br />
            지역에 따라 광고의 특성이 달라질 수 있습니다.
            <br />
            <br />
            광고 목적에 따라 광고 상품 유형을 선택하고, 광고 노출 기간 등
            원하시는 조건을 등록하실 수 있습니다.
            <br />
            <br />
            광고 유형은 ‘고정형광고, ‘전국광고’, ‘스팟광고’, 총 3가지입니다.
            등록 후 유형 변경은 불가하니 어떤 광고 상품을 진행할지 검토 후
            선택하세요.
            <br />
            <br />
            광고 등록시 1~2일 정도 검수시간이 소요됩니다.
            <br />
            (담당자 전화번호로 연락드립니다.)
          </div>
        </div>

        <div className={styles.ad_apply_content}>
          <div className={styles.modal_step}>
            <div className={styles.radio_wrap}>
              <div className={`${styles.title} ${styles.only_pc} !mb-[16px]`}>
              광고유형<span className="text-[#F24747]">*</span>
              </div>
              <Controller
                control={control}
                name="type"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <>
                    <div
                      id="imput_ad_type"
                      className={styles.modal_select_wrap}
                    >
                      {adTypes.map((item, index) => (
                        <div
                          key={item.type}
                          onClick={() => {
                            setErrors("");
                            const selectedAreas = getValues("operating_area");
                            item.type == "spot_ad" &&
                            //@ts-ignore
                              setValue("operating_area", "");
                            if (
                              "national_ad" &&
                              selectedAreas.length === areas?.length
                            ) {
                              //@ts-ignore
                              setValue("operating_area", "");
                              setShowModal(true);
                            }
                            onChange(item.type);
                          }}
                          className={`${
                            value === item.type ? styles.active : ""
                          } ${styles.modal_select} h-auto sm:h-[204px]`}
                        >
                          <label className={styles.select_box}>
                            <input
                              type="radio"
                              name="ad_type"
                              id={item.type}
                              className={styles.hidden}
                            />
                            <i className={styles.ic_radio}></i>
                            {item.faq && (
                              <Link
                                href="/dashboard/customer-service/faq"
                                className={clsx(
                                  styles.detail_desc,
                                  "md:mt-[10px] md:mr-[10px]"
                                )}
                              >
                                상세설명
                              </Link>
                            )}
                            <div
                              className={`${styles.box_icon} ${
                                styles[`box_icon0${index + 1}`]
                              }`}
                            ></div>
                            <div className={styles.text}>
                              <strong className={styles.text}>
                                {item.title}
                              </strong>
                              <br />
                              {item.subtitle_1}
                              <br />
                              {item.subtitle_2}
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                    {/* <span className="text-danger">{error?.message}</span> */}
                  </>
                )}
              />
            </div>
          </div>
          <div className={styles.modal_step}>
            <Controller
              control={control}
              name="ad_name"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div
                  className={`${styles.input_section} ${styles.title_section} ${styles.input_ad_name}`}
                >
                  <div className={styles.input_title}>광고이름<span className="text-[#F24747]">*</span></div>
                  <input
                    type="text"
                    id="input_ad_name"
                    placeholder="광고이름을 작성해주세요."
                    className={`${styles.box} ${styles.input_ad_title} h-[36px]`}
                    maxLength={25}
                    value={value}
                    onChange={(e) => {
                      onChange(e.target.value);
                      setErrors("");
                    }}
                  />
                  <div className="flex justify-end">
                    {/* <span className='text-danger'>{error?.message}</span> */}
                    <div className={styles.text_count}>
                      (<span className="text-[#0868FD]">{value.length}</span>/25)
                    </div>
                  </div>
                </div>
              )}
            />
            <Controller
              control={control}
              name="content"
              render={({ field: { value, onChange } }) => (
                <div
                  className={`${styles.input_section} ${styles.title_section} ${styles.input_ad_name}`}
                >
                  <div className={styles.input_title}>광고내용<span className="text-[#F24747]">*</span></div>
                  <textarea
                    name="content"
                    placeholder="광고내용을 입력해주세요."
                    className="w-full px-[12px] py-[16px]"
                    cols={30}
                    rows={10}
                    value={(value as string) || ""} // Bind the value
                    onChange={(e) => {
                      onChange(e.target.value); // Call onChange with the new value
                    }}
                  ></textarea>
                  <div className="flex justify-end">
                    <div className={styles.text_count}>
                      (
                      <span className="text-[#3772FF]">
                        {(value as string)?.length ?? 0}
                      </span>
                      {`/600`})
                    </div>
                  </div>
                </div>
              )}
            />
            <Controller
              control={control}
              name="images"
              render={({ field: { value, onChange } }) => (
                <div
                  className={`${styles.input_section} ${styles.title_section} ${styles.input_ad_name} !mb-[20px]`}
                >
                  <div >
                    
                    <p className={styles.input_title}>광고이미지<span className="text-[#F24747]">*</span></p>

                  <p className="mt-[8px] mb-[16px]">5MB 이하의 jpeg, jpg, png파일만 등록할 수 있습니다.<br/>
5개까지 등록할 수 있습니다.</p>
                  </div>
                  
                  <div className={'flex flex-col space-y-1'}>
                                <input 
                                    type='file' 
                                    //@ts-ignore
                                    ref={imageRef} 
                                    multiple
                                    className="hidden" 
                                    onChange={handleFileChange}
                                    accept="image/png,image/jpeg"
                                />
                                <div className="flex flex-row gap-1">
                                    <button 
                                        className={'bg-[#5F7FB9] px-4 py-2 w-24 text-center justify-center rounded-md h-9 text-white'}
                                        onClick={() => setUpdateImage(true)}
                                    >
                                        <span>편집</span>
                                    </button>
                                </div>


                                <div className={'flex gap-2 flex-wrap !mt-[12px]'}>
                                    {images.map((file, key)=>{
                                      return( 
                                        <div className={styles['image_section']} key={key}>
                                         
                                          {file.name}
                                          <span onClick={() => removeFile(file)}>
                                            <Image  
                                            src={'/images/ic-close.png'}
                                            width={20}
                                            height={20}
                                            alt="image"
                                          /></span>
                                        </div>
                                    )})}

                                    {updateImage && (images.length < 5) && 
                                        <div className={`h-auto w-[198.4px] border border-admin-stroke p-1 ${styles['image_section']}`}>
                                            <div 
                                                className={clsx(
                                                    "!border-dashed border cursor-pointer", 
                                                    "flex h-full flex-col justify-center items-center gap-2 w-full"
                                                )}
                                                //@ts-ignore
                                                onClick={()=> imageRef.current.click()}
                                            >
                                                Choose file
                                            </div>
                                            <span onClick={() => setUpdateImage(false)}>
                                            <Image  
                                            src={'/images/ic-close.png'}
                                            width={20}
                                            height={20}
                                            alt="image"
                                          /></span>
                                        </div>
                                    }
                                </div>
                            </div>

                </div>
              )}
            />

            <div className="from-selct"></div>

            <div
              className={`${styles.input_section} ${styles.date_section} !mb-[20px]`}
            >
              <div className="flex gap-[13px] w-full sm:!w-[100%] md:w-[60%]">
                <div
                  className={`${styles.input_wrap} ${styles.ad_period_section} w-[50%] sm:w-full`}
                >
                  <div className={styles.input_title}>광고기간<span className="text-[#F24747]">*</span></div>
                  <Controller
                    name="ad_period"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <div
                        className={`${isOpen ? styles.active : ""} ${
                          styles.select_wrap
                        } ${styles.spot_add}`}
                      >
                        <div className={styles.select_text}>
                          <input
                            type="text"
                            onClick={() => {
                              openPeriodList(!isOpen);
                            }}
                            value={
                              value ? (value === 6 ? "6개월" : "12개월") : ""
                            }
                            className={`${styles.box} ${styles.select_input} ${styles.spot_input_add} h-[36px]`}
                            id="select_input"
                            placeholder="기간 선택"
                            readOnly
                          />
                          <div id="calender_area"></div>
                        </div>
                        <ul className={`${styles.date_select_box} z-10`}>
                          {[6, 12].map((period) => (
                            <li
                              key={period}
                              className={styles.date_list}
                              onClick={() => {
                                onChange(period);
                                openPeriodList(false);
                              }}
                              data-months={`${period}_months`}
                            >
                              <label
                                htmlFor={`${period}_months`}
                                className={styles.period_label}
                              >{`${period}개월`}</label>
                              <input
                                type="radio"
                                value={period}
                                name="date_period"
                                id={`${period}_months`}
                                className={`${styles.period_input} h-[36px]`}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  />
                </div>
                <div
                  className={`${styles.ad_start_date} ${styles.input_wrap} customdatepickerwidth relative w-[50%] sm:w-full`}
                >
                  <div className={styles.sub_title}>시작일<span className="text-[#F24747]">*</span></div>
                  <Controller
                    name="start_date"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <>
                        {/* <Form.Control
                                            value={value}
                                            onChange={e => onChange(e.target.value)}
                                            type="date"
                                            name="doj"
                                            placeholder="Date of Joining"
                                        /> */}
                        {/* {value} */}
                        <DatePicker
                          dateFormat="yyyy-mm-dd"
                          //  locale={locale}
                          selected={new Date(value)}
                          onChange={(date: string) =>
                            setStartDate(
                              new Date(date).toISOString().split("T")[0]
                            )
                          }
                          customInput={<CustomInput />}
                        />
                      </>
                    )}
                  />
                </div>
              </div>

              <div
                className={`${styles.input_wrap} ${styles.date_selector} w-full sm:!w-[100%] md:w-[40%]`}
              >
                <div className={styles.sub_title}>총 광고기간<span className="text-[#F24747]">*</span></div>

                <div className={styles.date_content}>
                  <input
                    type="text"
                    value={startDate}
                    name="date_start"
                    id="input_date_start"
                    className={`${styles.box} ${styles.input_date_start} ${styles.input_section} ${styles.input_date_selector}`}
                    readOnly
                  />{" "}
                  <span className={styles.input_line}>~</span>
                  <input
                    type="text"
                    value={endDate}
                    name="date_end"
                    id="input_date_end"
                    className={`${styles.box} ${styles.input_date_end} ${styles.spot_input_add}`}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div
              className={`${styles.input_section} ${styles.date_section} !mb-[20px]`}
            >
              <div className="flex gap-[13px] w-full sm:!w-[100%] md:w-[60%]">
                <div
                  className={`${styles.input_wrap} ${styles.ad_period_section} w-[50%] sm:w-full`}
                >
                  <div className={styles.input_title}>차량종류<span className="text-[#F24747]">*</span></div>
                  <Controller
                    name="vehicle_type"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <div
                        className={`${isVehicleTypeOpen ? styles.active : ""} ${
                          styles.select_wrap
                        } ${styles.spot_add}`}
                      >
                        <div className={styles.select_text}>
                          <input
                            type="text"
                            onClick={() => {
                              openVehicleType(!isVehicleTypeOpen);
                            }}
                            value={TypeOfVechicle?.find((item) => item.value === (value as string))?.text || ""} 
                            className={`${styles.box} ${styles.select_input} ${styles.spot_input_add} h-[36px]`}
                            id="select_type_input"
                            placeholder="기간 선택"
                            readOnly
                          />
                          <div id="calender_area"></div>
                        </div>
                        <ul className={`${styles.date_select_box} z-10 !h-auto`}>
                          {TypeOfVechicle.map((type) => (
                            <li
                              key={type.value}
                              className={styles.date_list}
                              onClick={() => {
                                onChange(type.value);
                                openVehicleType(false);
                              }}
                            >
                              <label
                                htmlFor={`${type.value}`}
                                className={styles.period_label}
                              >{`${type.text}`}</label>
                              <input
                                type="radio"
                                value={type.value}
                                name="date_period"
                                id={`${type.value}`}
                                className={`${styles.period_input} h-[36px]`}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  />

                </div>
              </div>
            </div>
            {/* <span className='text-danger'>{errors?.ad_period?.message || errors?.start_date?.message}</span> */}

            <div
              className={`${styles.input_section} ${styles.vehicles_section}`}
            >
              <div className={styles.input_title}>운행차량<span className="text-[#F24747]">*</span></div>
              <Table
                bordered
                className="text-center rounded-sm border-gray-500 bg-[#FFFFFF] !m-0"
                responsive
              >
                <thead className="rounded-sm">
                  <tr className="rounded-r-sm text-[#2C324C]">
                    <td width={"18%"} className="!font-medium !p-[7px]">
                      차량
                    </td>
                    <td width={"21%"} className="!font-medium !p-[7px]">
                      차량대수
                    </td>
                    <td
                      width={"34%"}
                      className="!font-medium !p-[7px] hidden sm:block sm:w-full"
                    >
                      규격
                    </td>
                    <td width={"27%"} className="!font-medium !p-[7px]">
                      가격
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingVehicles && (
                    <tr>
                      <td
                        colSpan={4}
                        className={`${styles.text} ${styles.cell} ${styles.vehicles_wrap} !p-[7px]`}
                      >
                        <Loader size="sm" content="로드 중..." />
                      </td>
                    </tr>
                  )}
                  <Controller
                    name="vehicle_details"
                    control={control}
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <>
                        {vehicles?.map((item) => (
                          <tr key={item.id}>
                            <td
                              className={`${styles.text} ${styles.cell} ${styles.vehicles_wrap} !p-[7px]`}
                            >
                              {item.vehicle_type}
                            </td>
                            <td
                              className={`${styles.vehicles_num_wrap} ${styles.cell} !p-[7px]`}
                            >
                              <input
                                type="number"
                                name="vehicles_num"
                                // className={styles.input_num}
                                className={
                                  "!w-[78px] h-[20px] border border-[#ebedf4] text-gray-500 text-right mr-[3px] text-[12px] p-[3px]"
                                }
                                value={value[item.id]}
                                onChange={(e) =>
                                  onChange({
                                    ...value,
                                    [item.id]: e.target.value,
                                  })
                                }
                                id={item.vehicle_type}
                                placeholder="직접입력"
                                min={0}
                              />
                              <span className={styles.text}>대</span>
                            </td>
                            <td
                              className={` ${styles.cell} ${styles.standard_wrap} !p-[7px] hidden sm:block`}
                            >
                              <span className={styles.text}>
                                {item.vehicle_standard}
                              </span>
                            </td>
                            <td
                              className={`${styles.spot_add} ${styles.price_wrap} !p-[7px]`}
                            >
                              <span
                                className={`${styles.text} ${styles.price_input} ${styles.spot_input_add}`}
                              >
                                {value[item.id] && item.expenses[period]
                                  ? Number(
                                      (value[item.id] &&
                                        item.expenses[period] &&
                                        Number(value[item.id]) *
                                          item.expenses[period]) ||
                                        0
                                    ).toLocaleString()
                                  : null}
                              </span>
                              <span className={`${styles.text} ${styles.won}`}>
                                원
                              </span>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  />
                </tbody>
              </Table>
              <div className={`${styles.spot_add} ${styles.spot_info}`}>
                스팟광고의 광고 희망시간/기간등 차후 상담에 따라 결정됩니다.
              </div>
            </div>
            {/* <span className='text-danger'>{errors?.vehicle_details?.message}</span> */}

            <div
              className={clsx(
                styles.input_section,
                styles.area_section,
                styles.active,
                [!isAreaVisible && "!hidden"],
                "pt-[7px]"
              )}
            >
              <div className={styles.input_title}>
                운행지역 (다중 선택 가능)<span className="text-[#F24747]">*</span>
              </div>
              <button type="button" id="reset_btn" className={styles.reset_btn}>
                <span className={styles.text}>초기화</span>
                <i className={styles.ic_reset}></i>
              </button>
              {isLoadingCars && <Loader size="sm" content="로드 중..." />}
              <Controller
                name="operating_area"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <div id="input_operating_area" className={styles.chk_grid}>
                    {areas?.map((item) => {
                      const selected = (value as number[]).includes(item.id);
                      return (
                        <div
                          key={item.id}
                          className={styles.chk_wrap}
                          onClick={() => {
                            setErrors("");
                            if (selected) {
                              onChange(
                                value.filter((v: number) => v !== item.id)
                              );
                            } else {
                              const newValues = [...value, item.id];
                              const type = getValues("type");
                              if (
                                type !== "national_ad" &&
                                newValues.length === areas?.length
                              ) {
                                !showModal && setShowModal(true);
                                return;
                              }
                              onChange(newValues);
                            }
                          }}
                        >
                          <input
                            onChange={() => null}
                            type="checkbox"
                            checked={selected}
                            className={styles.chk_input}
                            name="area"
                          />
                          <label
                            htmlFor={`area${item.id}`}
                            className={styles.chk_area}
                          >
                            {item.area.replace("_", " ").toUpperCase()}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                )}
              />
              {/* <span className='text-danger'>{errors?.operating_area?.message}</span> */}
              <div
                id="area_modal"
                className={`${styles.check_modal} ${styles.area_modal}`}
              >
                <div className={styles.check_modal_wrap}>
                  <div className={styles.title}>확인사항</div>
                  <div className={styles.text}>
                    모든 운행 지역을 선택할 시<br />
                    광고 유형을 전국형으로 변경해주세요
                  </div>
                  <div className={styles.btn_wrap}>
                    <button
                      type="button"
                      id="area_modal_close"
                      className={styles.active_btn}
                    >
                      확인
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.price_section}>
              <div className="border border-gray-300 rounded p-0 bg-white">
              <div className={`${styles.price_box} ${styles.spot_add}`}>
                <div
                  className={`${styles.price_text} !text-[#222222] p-[16px] !text-[18px]`}
                >
                  광고비용
                </div>
                <div
                  id="total_price"
                  className={`${styles.price_text} ${styles.total_price} ${styles.total_price} !text-[#2F48D1]`}
                >
                  <span>{totalPrice && (totalPrice * period).toLocaleString()}</span>
                  <span className={`${styles.text_won} !text-[#999999]`}>
                    원
                  </span>
                </div>
                {/* <div
									className={`${styles.price_text} ${styles.text_won} !text-[#999999]`}>
									원
								</div> */}
              </div>
              <div className={`${styles.price_box} ${styles.spot_add} border-solid border-t border-[#EBEDF4]`}>
                <div
                  className={`${styles.price_text} !text-[#606060] !text-[14px]  p-[16px]`}
                >
                  월 광고비용
                </div>
                <div
                  id="total_month_price"
                  className={`${styles.price_text} ${styles.total_price} ${styles.total_price} !text-[#2F48D1]`}
                >
                  <span>{totalPrice && totalPrice.toLocaleString()}</span>
                  <span className={`${styles.text_won} !text-[#606060]`}>
                    원
                  </span>
                </div>
                {/* <div
									className={`${styles.price_text} ${styles.text_won} !text-[#999999]`}>
									원
								</div> */}
              </div>
              </div>
              <div className={styles.price_info}>
                광고비용은 차후 상담에 따라 변경 될 수 있습니다.
              </div>
            </div>
          </div>
          {allError ? (
            <div
              className={`${styles.error_section} d-flex bg-[#F24747] py-[12px] gap-[8px] px-[30px] my-[30px]`}
            >
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.47012 17.5038H17.5301C19.0701 17.5038 20.0301 15.8338 19.2601 14.5038L11.7301 1.49384C10.9601 0.163838 9.04012 0.163838 8.27012 1.49384L0.740121 14.5038C-0.0298787 15.8338 0.930121 17.5038 2.47012 17.5038ZM10.0001 10.5038C9.45012 10.5038 9.00012 10.0538 9.00012 9.50384V7.50384C9.00012 6.95384 9.45012 6.50384 10.0001 6.50384C10.5501 6.50384 11.0001 6.95384 11.0001 7.50384V9.50384C11.0001 10.0538 10.5501 10.5038 10.0001 10.5038ZM11.0001 14.5038H9.00012V12.5038H11.0001V14.5038Z"
                  fill="white"
                />
              </svg>
              <p className={`${styles.error_txt} text-[#fff] font-bold`}>
                {allError}
              </p>
              {/* <p className={`${styles.error_txt} text-[#fff] font-bold`}>{allError.each.message}</p> */}
            </div>
          ) : null}

          <div className={`${styles.modal_step} !mb-[50px]`}>
            <div className={styles.error_box}>
              <div className={styles.error_line}>
                <i className={styles.ic_error}></i>
                <div className={`${styles.error_text} ${styles.title_error}`}>
                  광고이름을 입력해주세요.
                </div>
                <div className={`${styles.error_text} ${styles.end_error}`}>
                  광고기간을 6개월 또는 12개월 선택해주세요.
                </div>
                <div className={`${styles.error_text} ${styles.start_error}`}>
                  시작일을 선택해주세요.
                  <span className={styles.only_pc}>
                    (광고 등록일 기준 1달 이후 부터 선택 가능)
                  </span>
                  <span className={styles.only_mb}>
                    (등록 기준 1달 이후 선택)
                  </span>
                </div>
                <div
                  className={`${styles.error_text} ${styles.vehicles_error}`}
                >
                  운행차량을 입력해주세요.
                </div>
                <div className={`${styles.error_text} ${styles.area_error}`}>
                  운행지역을 선택해주세요.
                </div>
              </div>
            </div>

            <div className={styles.btn_section}>
              <button
                type="button"
                id={styles.ad_apply_cancel}
                onClick={onCancel}
                className={`${styles.btns} ${styles.cancel_btn}`}
              >
                취소
              </button>
              <button
                type="button"
                id={styles.ad_apply_btn}
                className={`${styles.btns} ${styles.active} ${styles.ad_apply_btn}`}
                onClick={onSubmit}
              >
                {isLoadingSaveAdvertisement ? (
                  <div className="d-flex justify-content-center">
                    <ThreeDots
                      height="20"
                      width="40"
                      radius="9"
                      color="#FFFFFF"
                      ariaLabel="three-dots-loading"
                      visible
                    />
                  </div>
                ) : (
                  "광고 신청"
                )}
              </button>
            </div>
          </div>
        </div>

        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          className="bussiness-modal"
        >
          <Modal.Header>
            <Modal.Title>확인사항</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            모든 운행 지역을 선택할 시<br />
            광고 유형을 전국형으로 변경해주세요
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="bg-primary text-white px-4"
              onClick={() => setShowModal(false)}
            >
              닫다
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </FormProvider>
  );
};

export default SaveAdForm;
