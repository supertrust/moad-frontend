import IconPlus from '@images/admin-ad-details/ic-add-plus.png';
import ImagePlaceholder from '@images/admin-ad-details/ic-image-placeholder.png';
import Truck01 from '@images/advertising/img-car01.png';
import Truck02 from '@images/advertising/img-car02.png';
import Truck03 from '@images/advertising/img-car03.png';
import { useGetOperatingAreas, useGetVehicles } from '@src/apis/advertisement';
import { AdImage, Button, Controller, FormProvider, useForm, Yup, yupResolver, } from '@src/components/common';
import ArrowBack from '@src/components/icons/ArrowBack';
import { adDetailsData, OperatingAreaTranslation } from '@src/constants';
import { ConfirmPropsType } from '@src/contexts/ConfirmDialogContext';
import { addWeeks } from '@src/helpers';
import useAuth from '@src/hooks/useAuth';
import { useConfirmDialog } from '@src/hooks/useConfirmationDialog';
import AdAgreementForm from '@src/sections/dashboard/SaveAdModel/AdAgreementForm';
import { SaveAdvertisementType } from '@src/types/advertisement';
import { Divider } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { ThreeDots } from 'react-loader-spinner';
import { Loader } from 'rsuite';
import styles from './styles.module.css';

const convertDate = (d: string) => {
  let currentDate = new Date(d);

  let year = currentDate.getFullYear();

  let month = String(currentDate.getMonth() + 1).padStart(2, '0');

  let day = String(currentDate.getDate()).padStart(2, '0');

  let formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

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
  vehicle_min: {
    [key: number]: number;
  };
  operating_area: number[];
  ad_recruitment_period_start_date: string;
  ad_recruitment_period_end_date: string;
};

type AdDataType = {
  main_title: string;
  sub_title: string;
  main_line: string;
  details: {
    main_heading: string;
    sub_heading: string;
    list: {
      title: string;
      description: string;
      description1: string;
      description2: string;
    }[];
  };
  check: string;
};

export const TypeOfVechicle = [
  { text: '카고', value: 'cargo' },
  { text: '탑', value: 'tower' },
  { text: '윙바디', value: 'loaded' },
];

const defaultStartDate = addWeeks(new Date(), 2);
const defaultValues: FormDataType = {
  ad_name: '',
  ad_period: 6,
  type: 'fixed_ad',
  start_date: defaultStartDate.toISOString().split('T')[0],
  vehicle_details: {},
  vehicle_min: {},
  operating_area: [],
  vehicle_type: 'loaded',
  content: '',
  images: '',
  ad_recruitment_period_start_date: '',
  ad_recruitment_period_end_date: '',
};


function filterImageKeys(obj) {
  var imageKeys: any[] = [];
  for (var key in obj) {
    if (key.includes('image_')) {
      imageKeys.push(obj[key]);
    }
  }
  return imageKeys;
}

function deleteImageKeys(obj) {
  for (var key in obj) {
    if (key.includes('image_')) {
      delete obj[key];
    }
  }
  return obj;
}

function removeZeroValueKeys(obj) {
  for (var key in obj) {
    if (obj[key] === 0) {
      delete obj[key];
    }
  }
}

function removeValueNotExistInOtherObject(obj, otherObj) {
  for (var key in obj) {
    if (otherObj[key] === undefined) {
      delete obj[key];
    }
  }
}

const minimumNumberVehicleValidation = (watch) => {
  let res = true;
  Object.keys(watch['vehicle_details']).forEach(function (key) {
    const ve = watch['vehicle_details'][key];
    const minV = watch['vehicle_min'][key];

    if( ve && (!minV || minV>ve ))
      res=false;
  });

  if(res)
  Object.keys(watch['vehicle_min']).forEach(function (key) {
    const ve = watch['vehicle_details'][key];
    const minV = watch['vehicle_min'][key];

    if(!ve && minV )
      res=false;
  });

  return res;
};

const SaveAdForm = ({
  onOpenModal,
  onCancel,
  onSubmitForm,
  isLoadingSaveAdvertisement,
  done,
}: {
  onOpenModal: VoidFunction
  onCancel: (e: any) => void;
  onSubmitForm: (props: SaveAdvertisementType) => Promise<void>;
  isLoadingSaveAdvertisement: boolean;
  done: boolean;
}) => {
  const { dictionary,isPcOnly,isKorean } = useAuth();
  const { data: vehicles, isLoading: isLoadingVehicles } = useGetVehicles();
  const { data: areas, isLoading: isLoadingCars } = useGetOperatingAreas();

  const [isOpen, openPeriodList] = useState(false);
  const [istermschecked, setIstermschecked] = useState(false);
  const [isVehicleTypeOpen, openVehicleType] = useState(false);
  const [isAggrementFormOpen, setIsAggrementFormOpen] = useState(false);
  const active_model = window.innerWidth > 767 ? false : true;
  const [isActive, setActive] = useState(active_model);
  const [period, setPeriod] = useState(defaultValues.ad_period);
  const [startDate, setStartDate] = useState(defaultValues.start_date);
  const [vehicleDetails, setVehicleDetails] = useState(
    defaultValues.vehicle_details,
  );
  const [isAreaVisible, setIsAreaVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [detailModal, setDetailModal] = useState(1);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [allError, setErrors] = useState<string | undefined>('');
  const imageRef = useRef<HTMLInputElement>();
  const [images, setImages] = useState<File[]>([]);
  const [prevImages, setPrevImages] = useState<string[]>([]);

  const [updateImage, setUpdateImage] = useState(false);

  const adTypes = [
    {
      type: 'fixed_ad',
      title: dictionary.adTypes[0].title,
      subtitle_1: dictionary.adTypes[0].subtitle_1,
      subtitle_2: dictionary.adTypes[0].subtitle_2,
      faq: true,
    },
    {
      type: 'national_ad',
      title: dictionary.adTypes[1].title,
      subtitle_1: dictionary.adTypes[1].subtitle_1,
      subtitle_2: dictionary.adTypes[1].subtitle_2,
      faq: true,
    },
    {
      type: 'spot_ad',
      title: dictionary.adTypes[2].title,
      subtitle_1: dictionary.adTypes[2].subtitle_1,
      subtitle_2: dictionary.adTypes[2].subtitle_2,
      faq: true,
    },
  ];

  const CurrentTypeOfVechicle = [{ text: dictionary.adForm.type_of_vehicle[0], value: 'loaded' }];

  const handleFileChange = (event) => {
    const currentImage = [...images, ...(event.target.files as File[])];
    const previewCurrImage = [
      ...prevImages,
      ...[...(event.target.files as File[])].map((file) =>
        URL.createObjectURL(file),
      ),
    ];
    const options: ConfirmPropsType = {
      ref: errorModal,
      title: '확인사항',
      size: 'sm',
      cancelText: <span className='text-[#FFFFFF]'>확인</span>,
      disableConfirmBtn: true,
      cancelButtonProps: {
        className: 'border-primary bg-primary !text-[#FFFFFF]',
      },
      footerClassName: 'flex flex-row justify-end',
    };

    setImages(currentImage.slice(0, 5));
    setPrevImages(previewCurrImage.slice(0, 5));

    if (currentImage.length > 5) {
      confirm({
        ...options,
        description: (
          <div className='mt-3 text-center'>5개까지 등록할 수 있습니다.</div>
        ),
      });
    }
    if(imageRef && imageRef?.current)
    imageRef.current.value = '';
  };
  const removeFile = (file: File, key) => {
    setImages(images.filter((image) => image !== file));
    setPrevImages(prevImages.filter((image, index) => index !== key));
    const currValues = deleteImageKeys(getValues());
    reset({ ...currValues });
  };

  const validationMsgs = dictionary.adForm.validations
  const SaveAdvertisementSchema = Yup.object().shape({
    type: Yup.string().required(validationMsgs.type.required),
    ad_name: Yup.string()
      .required(validationMsgs.adName.required)
      .test(
        'not-only-spaces',
        validationMsgs.adName.checkForOnlySpaces,
        (value) => !/^\s*$/.test(value),
      ),
    content: Yup.string()
      .required(validationMsgs.content.required)
      .test(
        'not-only-spaces',
        validationMsgs.content.checkForOnlySpaces,
        (value) => !/^\s*$/.test(value),
      ),
    ad_period: Yup.number().required(
      validationMsgs.adPeriod.required,
    ),
    start_date: Yup.string().required(
      validationMsgs.startDate.required,
    ),
    ad_recruitment_period_start_date:
      Yup.string().required(validationMsgs.adRecruitmentPeriodStartDate.required),
    ad_recruitment_period_end_date:
      Yup.string().required(validationMsgs.adRecruitmentPeriodEndDate.required),
    vehicle_details: Yup.object().test(
      'is-not-empty-object',
      validationMsgs.vehicleDetails.emptyObject,
      (value) => {
        const hasNonEmptyValue = Object.values(value).some((val) => val !== '');

        return Object.keys(value).length > 0 && hasNonEmptyValue;
      },
    ),
    operating_area: Yup.array().when('type', ([type], schema) =>
      type == 'fixed_ad' ? schema.min(1, validationMsgs.operatingArea.min) : schema,
    ),
  });

  const methods = useForm<FormDataType>({
    //@ts-ignore
    defaultValues: { ...defaultValues },
    //@ts-ignore
    resolver: yupResolver(SaveAdvertisementSchema),
  });
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isSubmitting, isSubmitted, errors },
    setValue,
    getValues,
  } = methods;

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
      currentDate.setMonth(currentDate.getMonth() + period),
    )
      .toISOString()
      .split('T')[0];
    return sixMonthsFromNow;
  }, [startDate, period]);

  useEffect(() => {
    if (done) dataReset();
  }, [done]);

  const dataReset = () => {
    reset({
      ...defaultValues,
      vehicle_details: {},
      vehicle_min: {},
      operating_area: [],
    });
    setValue('vehicle_min', {});
    setValue('vehicle_details', {});
    setImages([]);
    setPrevImages([]);
    setVehicleDetails({});
    setIstermschecked(false);
    setUpdateImage(false);
  };

  const { confirm } = useConfirmDialog();
  const errorModal = useRef(null);

  const checkFiles = (files: File[]) => {
    const allowedImages = ['image/jpeg', 'image/jpg', 'image/png'];
    const options: ConfirmPropsType = {
      ref: errorModal,
      title: dictionary?.common?.checkList,
      size: 'sm',
      cancelText: <span className='text-[#FFFFFF]'>{dictionary?.common?.check}</span>,
      disableConfirmBtn: true,
      cancelButtonProps: {
        className: 'border-primary bg-primary !text-[#FFFFFF]',
      },
      footerClassName: 'flex flex-row justify-end',
    };

    let hasError = false;
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      if (!file) return;

      if (!allowedImages.includes(file.type)) {
        hasError = true;
        confirm({
          ...options,
          description: (
            <div className='mt-3 text-center'>
              {dictionary?.common?.allowedFileTypesMsg}
            </div>
          ),
        });
        break;
      }

      // 5 MB
      if (file.size > 5 * 1024 * 1024) {
        hasError = true;
        confirm({
          ...options,
          description: (
            <div className='mt-3 text-center'>{dictionary?.adForm?.validations?.upTo5mb}</div>
          ),
        });
        break;
      }
    }

    return hasError;
  };

  const onSubmit = handleSubmit(
    async (v) => {
      const imageData = {};
      images.map((image, index) => {
        imageData[`image_${index + 1}`] = image;
      });

      if (!totalPrice) {
        setErrors(dictionary?.adForm?.validations?.noVehicleSelect);
        return;
      }
      if (!minimumNumberVehicleValidation({ ...watch() })) {
        setErrors(dictionary?.adForm?.validations?.minimumVehicle);
        return;
      }

      const values = {
        ...v,
        ...imageData,
        total_cost: totalPrice,
        end_date: endDate,
        status: 'applying',
      };
      removeZeroValueKeys(v.vehicle_details);
      removeValueNotExistInOtherObject(v.vehicle_min, v.vehicle_details);

      if (images.length > 0 && validationOfDisplayingTime().length === 0) {
        setErrors('');
        await onSubmitForm(values);
      }
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
    },
  );

  useEffect(() => {
    const currImages = filterImageKeys(getValues());
    if (images.length === 0 && currImages.length > 0) {
      setUpdateImage(true);
      setImages([...currImages]);
      setPrevImages([...currImages.map((file) => URL.createObjectURL(file))]);
    }
  }, []);

  useEffect(() => {
    watch(({ ad_period, vehicle_details, start_date, type }) => {
      ad_period && setPeriod(ad_period);
      start_date && setStartDate(start_date);
      // @ts-ignore
      vehicle_details && setVehicleDetails(vehicle_details);
      type && setIsAreaVisible(type == 'fixed_ad');
    });
  }, [watch]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.target.nodeName == 'TEXTAREA') return;
      if (event.code === 'Enter') {
        event.preventDefault(); // Prevent form submission
        onSubmit().then(() => {});
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  function CustomInput(props) {
    return (
      <div className={`input-group ${styles.datepicker}`}>
        <input
          type='text'
          className={`form-control !top-0 h-[36px] ${styles.input_date} !text-[14px]`}
          style={{top : "0"}}
          onClick={props.onClick}
          value={watch()[props.name]}
          onChange={props.onChange}
          placeholder={dictionary?.common?.enter_date}
          readOnly
        />
        <svg
          onClick={props.onClick}
          className='absolute right-[12px] top-[30%] z-[5]'
          width='14'
          height='16'
          viewBox='0 0 14 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M12.3335 1.99996H11.6668V1.33329C11.6668 0.966626 11.3668 0.666626 11.0002 0.666626C10.6335 0.666626 10.3335 0.966626 10.3335 1.33329V1.99996H3.66683V1.33329C3.66683 0.966626 3.36683 0.666626 3.00016 0.666626C2.6335 0.666626 2.3335 0.966626 2.3335 1.33329V1.99996H1.66683C0.933496 1.99996 0.333496 2.59996 0.333496 3.33329V14C0.333496 14.7333 0.933496 15.3333 1.66683 15.3333H12.3335C13.0668 15.3333 13.6668 14.7333 13.6668 14V3.33329C13.6668 2.59996 13.0668 1.99996 12.3335 1.99996ZM11.6668 14H2.3335C1.96683 14 1.66683 13.7 1.66683 13.3333V5.33329H12.3335V13.3333C12.3335 13.7 12.0335 14 11.6668 14Z'
            fill='#999999'
          />
        </svg>
      </div>
    );
  }

  const ErrorMessage = ({ error }) => (
    <span className='text-danger'>{error}</span>
  );

  const trucks = [Truck01, Truck02, Truck03];

  useEffect(() => {
    if (watch().type !== 'fixed_ad') {
      setValue('operating_area', []);
      setIsAreaVisible(false);
    }
  }, []);

  const validationOfDisplayingTime = () => {
    const tRecruitStart = new Date(watch().ad_recruitment_period_start_date);
    const tRecruitEnd = new Date(watch().ad_recruitment_period_end_date);
    const tStartDate = new Date(startDate);

    if (tRecruitEnd < tRecruitStart)
      return dictionary.adForm.validations.recruit_end.msg;
    else if (tRecruitEnd >= tStartDate)
      return '광고 시작일은 표시 종료일보다 커야 합니다.';

    return '';
  };

  // //console.log('hash', watch('vehicle_details')[1],watch('vehicle_min')[1])

  const agreemenetFormClose = () => setIsAggrementFormOpen(false);

  const agreementOnClick = (agree: boolean, outside = false) => {
    if (outside) {
      if (agree) {
        const options: ConfirmPropsType = {
          ref: errorModal,
          title: `${dictionary.adForm.confirm}`,
          size: 'sm',
          disableConfirmBtn: true,
          cancelText: (
            <span className='text-[#FFFFFF]'>{dictionary.adForm.done}</span>
          ),
          cancelButtonProps: {
            className: 'border-primary bg-primary !text-[#FFFFFF]',
          },
        };

        confirm({
          ...options,
          description: (
            <div className='text-center'>{dictionary.adForm.confrim_toc}</div>
          ),
        });
      } else setIstermschecked(false);
      return;
    }
    agreemenetFormClose();
    setIstermschecked(true);
  };

  return (
    <FormProvider methods={methods}>
      {/*<SaveAdSuccessPopup open={done} onCancel={onCancel}/>*/}
      <AdAgreementForm
        open={isAggrementFormOpen}
        onClose={agreemenetFormClose}
        onAgree={() => agreementOnClick(true)}
      />

      <div className={styles.ad_modal_wrap} id={styles.ad_modal_wrap}>
        <div className={`only-mb`}>
          <div className={`${styles['mobile-top-header']}`}>
            <ArrowBack handleAction={onCancel} />
            <div className={styles['header']}>{dictionary.adForm.title}</div>
            <div></div>
          </div>
        </div>
        <div className={`hidden sm:block ${styles.ad_apply_title}`}>
          <p>{dictionary.adForm.title}</p>
        </div>
        <div
          id={styles.ad_apply_info}
          className={`${isActive ? styles.active : ''} ${
            styles.ad_apply_info
          } ${styles.only_pc} bg-[#FFFFFF]`}>
          <div className={`${styles.info_content}`}>
            <div className={styles.info_text}>
              {dictionary.adForm.info_text[0]}
              <br />
              {dictionary.adForm.info_text[1]}
            </div>
            <div id={styles.slide_wrap} className={styles.slide_wrap}>
              <ul className={styles.info_list_wrap}>
                <div className={styles.info_text}>
                  {dictionary.adForm.info_text[2]}
                  {dictionary.adForm.info_text[3]}
                </div>
                <div className={styles.info_text}>
                  {dictionary.adForm.info_text[4]}
                  {dictionary.adForm.info_text[5]}
                  {dictionary.adForm.info_text[6]}
                </div>
                <div className={styles.info_text}>
                  {dictionary.adForm.info_text[7]}
                  <br className='block sm:!hidden' /> (
                  {dictionary.adForm.info_text[8]})
                </div>
              </ul>
              <div
                className={`${styles.info_img_wrap} ${
                  active_model && 'hidden'
                }`}>
                <div
                  className={
                    styles.img_title
                  }>{`<${dictionary.adForm.info_text[9]}>`}</div>
              </div>
              <div
                className={`${
                  active_model && 'hidden'
                } sm:flex sm:flex-row justify-center items-center sm:justify-between gap-3 text-center px-[10px]`}>
                {trucks.map((truck, i) => (
                  <Image
                    key={i}
                    className={clsx(
                      'md:w-auto h-20 items-center',
                      `truck_image md:h-full !min-h-[102px] ${styles.truck_image}`,
                      i == 2 && `!h-[136px] ${styles.third_image}`,
                    )}
                    src={truck}
                    alt=''
                  />
                ))}
              </div>
            </div>
          </div>
          <div
            id={styles.more_btn}
            className={`${styles.more_btn} hidden sm:block`}>
            <div
              className={styles.text_wrap}
              onClick={() => setActive(!isActive)}>
              <span className={styles.more_text}>
                {isActive
                  ? `${dictionary.adForm.buttons[0]}`
                  : `${dictionary.adForm.buttons[1]}`}
              </span>{' '}
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
                {dictionary.adForm.ad_type}
                <span className='text-[#F24747]'>*</span>
              </div>
              <Controller
                control={control}
                name='type'
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <>
                    <div
                      id='imput_ad_type'
                      className={clsx(styles.modal_select_wrap)}>
                      {adTypes.map((item, index) => (
                        <div
                          key={item.type}
                          onClick={() => {
                            setErrors('');
                            const selectedAreas = getValues('operating_area');
                            item.type == 'spot_ad' &&
                              //@ts-ignore
                              setValue('operating_area', []);
                            if (
                              'national_ad' &&
                              selectedAreas.length === areas?.length
                            ) {
                              //@ts-ignore
                              setValue('operating_area', []);
                              setShowModal(true);
                            }
                            onChange(item.type);
                          }}
                          className={`${
                            value === item.type ? styles.active : ''
                          } ${styles.modal_select} h-auto sm:h-[204px]`}>
                          <label className={clsx(styles.select_box,'cursor-pointer')}>
                            <input
                              type='radio'
                              name='ad_type'
                              id={item.type}
                              className={clsx(styles.hidden,'cursor-pointer')}
                            />
                            <i className={styles.ic_radio}></i>
                            {item.faq && (
                              <span
                                // href="/dashboard/customer-service/faq"
                                className={clsx(
                                  styles.detail_desc,
                                  'md:mt-[10px] md:mr-[10px] underline cursor-pointer',
                                )}
                                onClick={() => {
                                  setDetailModal(index + 1);
                                  setOpenDetailModal(true);
                                }}>
                                {dictionary.adForm.detailed_description}
                              </span>
                            )}
                            <div
                              className={`${styles.box_icon} ${
                                styles[`box_icon0${index + 1}`]
                              }`}></div>
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
              name='ad_name'
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div
                  className={`${styles.input_section} ${styles.title_section} ${styles.input_ad_name}`}>
                  <div className={styles.input_title}>
                    {dictionary.adForm.lbl_advertisement_name}
                    <span className='text-[#F24747]'>*</span>
                  </div>
                  <input
                    type='text'
                    id='input_ad_name'
                    placeholder={`${dictionary.adForm.advertisement_name}`}
                    className={`${styles.box} ${styles.input_ad_title} h-[36px]`}
                    maxLength={25}
                    value={value}
                    onChange={(e) => {
                      onChange(e.target.value);
                      setErrors('');
                    }}
                  />
                  <div className='flex justify-end'>
                    <ErrorMessage error={error?.message} />
                    <div className={styles.text_count}>
                      (<span className='text-advertiser-primary'>{value.length}</span>
                      /25)
                    </div>
                  </div>
                </div>
              )}
            />
            <Controller
              control={control}
              name='content'
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div
                  className={`${styles.input_section} ${styles.title_section} ${styles.input_ad_name}`}>
                  <div className={styles.input_title}>
                    {dictionary.adForm.lbl_advertisement_content}
                    <span className='text-[#F24747]'>*</span>
                  </div>
                  <textarea
                    name='content'
                    placeholder={`${dictionary.adForm.advertisement_content}`}
                    className='w-full px-[12px] py-[16px] textarea-input'
                    cols={30}
                    rows={10}
                    value={value.slice(0, 600) || ''} // Bind the value
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue.length <= 600) {
                        onChange(inputValue); // Call onChange with the new value
                      } else {
                        onChange(inputValue.substring(0, 600));
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        e.preventDefault();
                        const inputValue = value + '\r\n';
                        if (inputValue.length <= 600) {
                          onChange(inputValue);
                        }
                      }
                    }}></textarea>
                  <div className='flex justify-end'>
                    <ErrorMessage error={error?.message} />
                    <div className={styles.text_count}>
                      (
                      <span className='text-advertiser-primary'>
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
              name='images'
              render={({ field: { value, onChange } }) => (
                <div
                  className={`${styles.input_section} ${styles.title_section} ${styles.input_ad_name} !mb-[20px]`}>
                  <div>
                    <p className={styles.input_title}>
                      {dictionary.adForm.lbl_advertising_image}
                      <span className='text-[#F24747]'>*</span>
                    </p>

                    <p className='mt-[8px] mb-[16px]'>
                      {dictionary.adForm.image_limit}
                      <br />
                      {dictionary.adForm.image_limit2}
                    </p>
                  </div>

                  <div className={'flex flex-col space-y-1'}>
                    <input
                      type='file'
                      //@ts-ignore
                      ref={imageRef}
                      multiple
                      className='hidden'
                      onChange={(e) => {
                        const files = e.target.files
                          ? Array.from(e.target.files)
                          : [];
                        if (!checkFiles(files)) handleFileChange(e);
                      }}
                      accept='image/png,image/jpeg'
                    />
                    <div className='flex flex-row gap-1'>
                      <button
                        className={
                          'bg-advertiser-deep px-4 py-2 text-center justify-center rounded-md h-9 text-white'
                        }
                        onClick={() => setUpdateImage(true)}>
                        <span>{dictionary.adForm.select_file}</span>
                      </button>
                      <div className='flex justify-end'>
                        {isSubmitted && images.length === 0 && (
                          <ErrorMessage error={validationMsgs.files.msg} />
                        )}
                      </div>
                    </div>

                    <div className={'flex gap-2 flex-wrap !mt-[12px]'}>
                      {prevImages.map((file, key) => {
                        return (
                          <AdImage
                            key={key}
                            src={file || ''}
                            className={
                              '!w-[164px] !h-[126px] !lg:w-[176px] !lg:h-[138px] cursor-pointer'
                            }
                            edit={true}
                            onRemove={() => removeFile(images[key], key)}
                            onClick={() => window.open(file || '', '_blank')}
                          />
                        );
                      })}

                      {updateImage && images.length < 5 && (
                        <div
                          className={`cursor-pointer !w-[164px] !h-[126px] h-[138px] relative w-[176x] border border-admin-stroke  ${styles['image_section']} p-0`}>
                          <div
                            className={clsx(
                              '!border-dashed border cursor-pointer',
                              'flex h-full flex-col justify-center items-center gap-2 w-full',
                            )}
                            //@ts-ignore
                            onClick={() => imageRef.current.click()}>
                            <Image src={ImagePlaceholder} alt='' />
                            <span className='text-admin-placeholder text-lg font-medium'>
                              {dictionary.adForm.imagePlaceholder}
                            </span>
                            <Image src={IconPlus} alt='' />
                          </div>
                          <Image
                            onClick={() => setUpdateImage(false)}
                            className='absolute right-2 top-2 cursor-pointer'
                            src={'/images/ic-close.png'}
                            width={20}
                            height={20}
                            alt='image'
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            />

            <div className='from-selct'></div>

            <div
              className={`${styles.input_section} ${styles.date_section} !mb-[20px]`}>
              <div className='flex gap-[13px] w-full sm:!w-[100%] md:w-[60%]'>
                <div
                  className={`${styles.input_wrap} ${styles.ad_period_section} w-[50%] sm:w-full`}>
                  <div className={styles.input_title}>
                    {dictionary.adForm.advertising_period}
                    <span className='text-[#F24747]'>*</span>
                  </div>
                  <Controller
                    name='ad_period'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <div
                        className={`${isOpen ? styles.active : ''} ${
                          styles.select_wrap
                        } ${styles.spot_add}`}>
                        <div className={styles.select_text}>
                          <input
                            type='text'
                            onClick={() => {
                              openPeriodList(!isOpen);
                            }}
                            value={
                              value
                                ? value === 6
                                  ? `${dictionary.adForm.six_months}`
                                  : `${dictionary.adForm.twelve_months}`
                                : ''
                            }
                            className={`${styles.box} ${styles.select_input} ${styles.spot_input_add} h-[36px]`}
                            id='select_input'
                            placeholder='기간 선택'
                            readOnly
                          />
                          <div id='calender_area'></div>
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
                              data-months={`${period}_months`}>
                              <label
                                htmlFor={`${period}_months`}
                                className={
                                  styles.period_label
                                }>{`${period}${dictionary.adForm.months}`}</label>
                              <input
                                type='radio'
                                value={period}
                                name='date_period'
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
                  className={`${styles.ad_start_date} ${styles.input_wrap} customdatepickerwidth relative w-[50%] sm:w-full`}>
                  <div className={styles.sub_title}>
                    {dictionary.adForm.start_date}
                    <span className='text-[#F24747]'>*</span>
                  </div>
                  <Controller
                    name='start_date'
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
                          dateFormat='yyyy-mm-dd'
                          //  locale={locale}
                          selected={new Date(value)}
                          minDate={defaultStartDate}
                          name={'start_date'}
                          onChange={(date: string) => {
                            setStartDate(convertDate(date));
                            setValue('start_date', convertDate(date));
                          }}
                          popperClassName={styles.react_datepicker_popper}
                          customInput={<CustomInput />}
                        />
                      </>
                    )}
                  />
                </div>
              </div>

              <div
                className={`${styles.input_wrap} ${styles.date_selector} w-full sm:!w-[100%] md:w-[40%]`}>
                <div className={styles.sub_title}>
                  {dictionary.adForm.total_period}
                  <span className='text-[#F24747]'>*</span>
                </div>

                <div className={styles.date_content}>
                  <input
                    type='text'
                    value={startDate}
                    name='date_start'
                    id='input_date_start'
                    className={`${styles.box} ${styles.input_date_start} ${styles.input_section} ${styles.input_date_selector}`}
                    readOnly
                  />{' '}
                  <span className={styles.input_line}>~</span>
                  <input
                    type='text'
                    value={endDate}
                    name='date_end'
                    id='input_date_end'
                    className={`${styles.box} ${styles.input_date_end} ${styles.spot_input_add}`}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className={'flex flex-col mb-3'}>
              <div className={'flex gap-3 flex-wrap'}>
                <div
                  className={clsx(`${styles.input_section} ${styles.date_section}`, isPcOnly ?"!mb-[20px]": "w-[50%] !mb-[0px] pr-[6.5px]")}>
                  <div className='flex gap-[13px] w-full sm:!w-[100%] lg:w-[60%]'>
                    <div
                      className={`${styles.input_wrap} ${styles.ad_period_section} w-[50%] sm:w-full`}>
                      <div className={styles.input_title}>
                        {dictionary.adForm.vehicle_type}
                        <span className='text-[#F24747]'>*</span>
                      </div>
                      <Controller
                        name='vehicle_type'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <div
                            className={`${
                              isVehicleTypeOpen ? styles.active : ''
                            } ${styles.select_wrap} ${styles.spot_add}`}>
                            <div className={styles.select_text}>
                              <input
                                type='text'
                                onClick={() => {
                                  openVehicleType(!isVehicleTypeOpen);
                                }}
                                value={
                                  CurrentTypeOfVechicle?.find(
                                    (item) => item.value === (value as string),
                                  )?.text || ''
                                }
                                className={`${styles.box} ${styles.select_input} ${styles.spot_input_add} h-[36px]`}
                                id='select_type_input'
                                placeholder='기간 선택'
                                readOnly
                              />
                              <div id='calender_area'></div>
                            </div>
                            <ul
                              className={`${styles.date_select_box} !z-[1] !h-auto`}>
                              {CurrentTypeOfVechicle.map((type) => (
                                <li
                                  key={type.value}
                                  className={styles.date_list}
                                  onClick={() => {
                                    onChange(type.value);
                                    openVehicleType(false);
                                  }}>
                                  <label
                                    htmlFor={`${type.value}`}
                                    className={
                                      styles.period_label
                                    }>{`${type.text}`}</label>
                                  <input
                                    type='radio'
                                    value={type.value}
                                    name='date_period'
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
               <div className={clsx("flex gap-[13px]",isPcOnly? "" : "w-[100%] items-center")}>
                 <div
                     className={` ${styles.input_wrap} customdatepickerwidth relative w-[50%] lg:w-[175px]`}>
                   <div className={styles.sub_title}>
                     {dictionary.adForm.display_start_date}
                     <span className='text-[#F24747]'>*</span>
                   </div>
                   <Controller
                       name='ad_recruitment_period_start_date'
                       control={control}
                       render={({ field: { value, onChange } }) => {
                         return (
                             <>
                               <DatePicker
                                   dateFormat='yyyy-mm-dd'
                                   name={'ad_recruitment_period_start_date'}
                                   onChange={(date: string) => {
                                     setValue(
                                         'ad_recruitment_period_start_date',
                                         convertDate(date),
                                     );
                                   }}
                                   popperClassName={styles.react_datepicker_popper}
                                   customInput={<CustomInput />}
                               />
                             </>
                         );
                       }}
                   />
                 </div>
                 <div className={`${styles.ad_start_date} ${styles.input_wrap} customdatepickerwidth relative w-[50%] lg:w-[175px]`}>
                   <div className={styles.sub_title}>
                     {dictionary.adForm.display_end_date}
                     <span className='text-[#F24747]'>*</span>
                   </div>
                   <Controller
                       name='ad_recruitment_period_end_date'
                       control={control}
                       render={({ field: { value, onChange } }) => (
                           <>
                             <DatePicker
                                 name={'ad_recruitment_period_end_date'}
                                 dateFormat='yyyy-mm-dd'
                                 onChange={(date: string) => {
                                   //console.log('date', new Date(date));
                                   setValue(
                                       'ad_recruitment_period_end_date',
                                       convertDate(date),
                                   );
                                 }}
                                 popperClassName={styles.react_datepicker_popper}
                                 customInput={<CustomInput />}
                             />
                           </>
                       )}
                   />
                 </div>
               </div>
              </div>
              {isSubmitted && validationOfDisplayingTime().length ? (
                <span className='text-danger'>
                  {validationOfDisplayingTime()}
                </span>
              ) : (
                <></>
              )}
            </div>

            {/* <span className='text-danger'>{errors?.ad_period?.message || errors?.start_date?.message}</span> */}

            <div className={`${styles.input_section} ${styles.vehicles_section} overflow-x-auto`}>
              <div className={styles.input_title}>
                {dictionary.adForm.operating_vehicles}
                <span className='text-[#F24747]'>*</span>
              </div>
              <Table bordered className='text-center rounded-sm bg-[#FFFFFF] !m-0'>
                <thead className='rounded-sm !bg-advertiser-light border-advertiser-light'>
                  <tr className='rounded-r-sm'>
                    <td style={{ minWidth: '50px' }} className='!text-center  !text-[#2C324C] align-middle !font-medium !p-[7px]'>
                      {dictionary.adForm.vehicle}
                    </td>
                    <td className='!text-center  !text-[#2C324C] align-middle !font-medium !p-[7px]'>
                      {dictionary.adForm.num_of_vehicles}
                    </td>
                    <td className='!text-center  !text-[#2C324C] align-middle !font-medium !p-[7px]'>
                      {dictionary.adForm.min_vehicles}
                    </td>
                    <td style={{ minWidth: '300px' }} className='!text-center  !text-[#2C324C] align-middle !font-medium !p-[7px]'>
                      {dictionary.adForm.standard}
                    </td>
                    {/*<td width={'27%'} className='!font-medium !p-[7px]'>*/}
                    {/*  {dictionary.adForm.price}*/}
                    {/*</td>*/}
                  </tr>
                </thead>
                <tbody>
                  {isLoadingVehicles && (
                    <tr>
                      <td
                        colSpan={4}
                        className={`${styles.text} ${styles.cell} ${styles.vehicles_wrap} !p-[7px]`}>
                        <Loader size='sm' content='로드 중...' />
                      </td>
                    </tr>
                  )}
                  <Controller
                    name='vehicle_details'
                    control={control}
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <>
                        {vehicles?.map((item) => (
                          <tr key={item.id}>
                            <td
                              className={`${styles.text} ${styles.cell} ${styles.vehicles_wrap} !p-[7px]`}>
                              {item.vehicle_type}
                            </td>
                            <td
                              className={`${styles.vehicles_num_wrap} ${styles.cell} !p-[7px]`}>
                              <input
                                type='number'
                                name='vehicles_num'
                                // className={styles.input_num}
                                className={`!w-[78px] h-[20px] border  text-gray-500 text-right mr-[3px] text-[12px] p-[3px]
                                  ${
                                    (Number(value[item.id]) || 0) <= 10000
                                      ? '!border-[#ebedf4]'
                                      : '!border-[#ff0000]'
                                  }
                                  ${
                                    ((!watch('vehicle_details')[item.id]) && watch('vehicle_min')[item.id])
                                        ? '!border-[#ff0000]' : '!border-[#ebedf4]'
                                }
                        
                                  `}
                                value={value[item.id] || ''}
                                onChange={(e) => {
                                  const newValue = Number(e.target.value);
                                  if (newValue <= 10000) {
                                    onChange({
                                      ...value,
                                      [item.id]: newValue,
                                    });
                                  }
                                }}
                                id={`vehicles_num_${item.vehicle_type}`}
                                placeholder={dictionary.adForm.vehicleType}
                                min={0}
                                onKeyDown={(e) => {
                                  // Allow only numeric characters and prevent negative sign
                                  if (e.key === '-' || e.key === '.') {
                                    e.preventDefault();
                                  }
                                }}
                                onPaste={(e) => {
                                  const pastedValue =
                                    e.clipboardData.getData('text/plain');
                                  if (parseInt(pastedValue, 10) > 10000) {
                                    e.preventDefault();
                                  }
                                }}
                                onWheel={ event => event.currentTarget.blur() }
                              />
                              <span className={styles.text}>
                                {dictionary.adForm.big}
                              </span>
                            </td>
                            <td
                              className={`${styles.vehicles_num_wrap} ${styles.cell} !p-[7px]`}>
                              <input
                                  type="number"
                                  name="vehicles_min_req"
                                  // className={styles.input_num}
                                  className={
                                    `!w-[78px] h-[20px] border  text-gray-500 text-right mr-[3px] text-[12px] p-[3px]
                                  ${(watch('vehicle_details')[item.id]>=watch('vehicle_min')[item.id] || !watch('vehicle_details')[item.id]) ? '!border-[#ebedf4]' : '!border-[#ff0000]'}
                                  `
                                  }
                                  value={watch('vehicle_min')[item.id]===undefined? "" : watch('vehicle_min')[item.id]}
                                  onChange={(e) =>
                                    {
                                      let prevValue = watch('vehicle_min') || {}
                                      if(e.target.value){
                                        const newValue = Number(e.target.value);
                                        prevValue[item.id] = newValue
                                      }else {
                                        const {[item.id]:v, ...restValues} = prevValue
                                        prevValue = restValues
                                      }
                                      setValue('vehicle_min', prevValue)
                                    }
                                  }
                                  id={`vehicle_min_${item.vehicle_type}`}
                                  placeholder={dictionary.adForm.vehicleType}
                                  min={0}
                                  onKeyDown={(e) => {
                                    // Allow only numeric characters and prevent negative sign
                                    if (e.key === '-' || e.key === '.' ) {
                                      e.preventDefault();
                                    }
                                  }}
                                  onPaste={(e) => {
                                    // const pastedValue = e.clipboardData.getData('text/plain');
                                    // if (parseInt(pastedValue, 10) > 10000) {
                                    //   e.preventDefault();
                                    // }
                                  }}
                                  onWheel={ event => event.currentTarget.blur() }
                              />
                              <span className={styles.text}>
                                {dictionary.adForm.big}
                              </span>
                            </td>
                            <td className={`${styles.cell} ${styles.standard_wrap} !p-[7px]`}>
                              <span className={styles.text}>
                                {item.vehicle_standard}
                              </span>
                            </td>
                            {/*<td*/}
                            {/*  className={`${styles.spot_add} ${styles.price_wrap} !p-[7px]`}>*/}
                            {/*  <span*/}
                            {/*    className={`${styles.text} ${styles.price_input} ${styles.spot_input_add}`}>*/}
                            {/*    {value[item.id] && item.expenses[period]*/}
                            {/*      ? Number(*/}
                            {/*          (value[item.id] &&*/}
                            {/*            item.expenses[period] &&*/}
                            {/*            Number(value[item.id]) **/}
                            {/*              item.expenses[period]) ||*/}
                            {/*            0,*/}
                            {/*        ).toLocaleString()*/}
                            {/*      : null}*/}
                            {/*  </span>*/}
                            {/*  <span className={`${styles.text} ${styles.won}`}>*/}
                            {/*    {dictionary.adForm.won}*/}
                            {/*  </span>*/}
                            {/*</td>*/}
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
            <ErrorMessage error={errors?.vehicle_details?.message} />

            <div
              className={clsx(
                styles.input_section,
                styles.area_section,
                styles.active,
                [!isAreaVisible && '!hidden'],
                'pt-[7px]',
              )}>
              <div className={styles.input_title}>
                {dictionary.adForm.operating_area}
                <span className='text-[#F24747]'>*</span>
              </div>
              <button
                type='button'
                id='reset_btn'
                className={styles.reset_btn}
                onClick={() => {
                  setValue('operating_area', []);
                }}>
                <span className={styles.text}>{dictionary?.adForm?.reset}</span>
                <i className={styles.ic_reset}></i>
              </button>
              {isLoadingCars && <Loader size='sm' content='로드 중...' />}
              <Controller
                name='operating_area'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <div id='input_operating_area' className={styles.chk_grid}>
                    {areas?.map((item) => {
                      const selected = (value as number[]).includes(item.id);
                      return (
                        <div
                          key={item.id}
                          className={clsx(styles.chk_wrap,!isKorean && "!w-[175px]")}
                          onClick={() => {
                            setErrors('');
                            if (selected) {
                              onChange(
                                value.filter((v: number) => v !== item.id),
                              );
                            } else {
                              const newValues = [...value, item.id];
                              const type = getValues('type');
                              if (
                                type !== 'national_ad' &&
                                newValues.length === areas?.length
                              ) {
                                !showModal && setShowModal(true);
                                return;
                              }
                              onChange(newValues);
                            }
                          }}>
                          <input
                            onChange={() => null}
                            type='checkbox'
                            checked={selected}
                            className={styles.chk_input}
                            name='area'
                          />
                          <label
                            htmlFor={`area${item.id}`}
                            className={styles.chk_area}>
                            {
                              (OperatingAreaTranslation[item.area]? dictionary.operatingAreas[OperatingAreaTranslation[item.area]]
                                : item.area.replace('_', ' ').toUpperCase())
                            }
                          </label>
                        </div>
                      );
                    })}
                  </div>
                )}
              />
              {/* <span className='text-danger'>{errors?.operating_area?.message}</span> */}
              <div
                id='area_modal'
                className={`${styles.check_modal} ${styles.area_modal}`}>
                <div className={styles.check_modal_wrap}>
                  <div className={styles.title}>확인사항</div>
                  <div className={styles.text}>
                    모든 운행 지역을 선택할 시<br />
                    광고 유형을 전국형으로 변경해주세요
                  </div>
                  <div className={styles.btn_wrap}>
                    <button
                      type='button'
                      id='area_modal_close'
                      className={styles.active_btn}>
                      확인
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex	w-auto gap-[8px] my-[30px]'>
              <div
                onClick={() => agreementOnClick(!istermschecked, true)}
                className='cursor-pointer'>
                <Image
                  src={
                    istermschecked
                      ? '/images/ic-checked.png'
                      : '/images/ic-check.png'
                  }
                  width={20}
                  height={20}
                  alt='ic-check'
                />
              </div>
              <div>
                <span className='text-advertiser-primary'>
                  ({dictionary.adForm.required})
                </span>{' '}
                {dictionary.adForm.icarus_toc}
                <>
                  <span
                    onClick={() => setIsAggrementFormOpen(true)}
                    className='underline ml-[16px] cursor-pointer'>
                    {dictionary.adForm.look}
                  </span>
                </>
              </div>
            </div>
            {/*<div className={styles.price_section}>*/}
              {/*<div className='border border-gray-300 rounded p-0 bg-white'>*/}
              {/*  <div className={`${styles.price_box} ${styles.spot_add}`}>*/}
              {/*    <div*/}
              {/*      className={`${styles.price_text} !text-[#222222] p-[16px] !text-[18px]`}>*/}
              {/*      {dictionary.adForm.ad_cost}*/}
              {/*    </div>*/}
              {/*    <div*/}
              {/*      id='total_price'*/}
              {/*      className={`${styles.price_text} ${styles.total_price} ${styles.total_price} !text-[#2F48D1]`}>*/}
              {/*      <span>*/}
              {/*        {totalPrice && (totalPrice * period).toLocaleString()}*/}
              {/*      </span>*/}
              {/*      <span className={`${styles.text_won} !text-[#999999]`}>*/}
              {/*        {dictionary.adForm.won}*/}
              {/*      </span>*/}
              {/*    </div>*/}
              {/*    /!* <div*/}
				{/*					className={`${styles.price_text} ${styles.text_won} !text-[#999999]`}>*/}
				{/*					{dictionary.adForm.won}*/}
				{/*				</div> *!/*/}
              {/*  </div>*/}
              {/*  <div*/}
              {/*    className={`${styles.price_box} ${styles.spot_add} border-solid border-t border-[#EBEDF4]`}>*/}
              {/*    <div*/}
              {/*      className={`${styles.price_text} !text-[#606060] !text-[14px]  p-[16px]`}>*/}
              {/*      {dictionary.adForm.monthly_ad_cost}*/}
              {/*    </div>*/}
              {/*    <div*/}
              {/*      id='total_month_price'*/}
              {/*      className={`${styles.price_text} ${styles.total_price} ${styles.total_price} !text-[#2F48D1]`}>*/}
              {/*      <span>{totalPrice && totalPrice.toLocaleString()}</span>*/}
              {/*      <span className={`${styles.text_won} !text-[#606060]`}>*/}
              {/*        {dictionary.adForm.won}*/}
              {/*      </span>*/}
              {/*    </div>*/}
              {/*    /!* <div*/}
				{/*					className={`${styles.price_text} ${styles.text_won} !text-[#999999]`}>*/}
				{/*					{dictionary.adForm.won}*/}
				{/*				</div> *!/*/}
              {/*  </div>*/}
              {/*</div>*/}
            {/*  <div className={styles.price_info}>*/}
            {/*    {dictionary.adForm.cost_description}*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
          {allError ? (
            <div
              className={`${styles.error_section} d-flex bg-[#F24747] py-[12px] gap-[8px] px-[30px] my-[30px]`}>
              <svg
                width='20'
                height='18'
                viewBox='0 0 20 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M2.47012 17.5038H17.5301C19.0701 17.5038 20.0301 15.8338 19.2601 14.5038L11.7301 1.49384C10.9601 0.163838 9.04012 0.163838 8.27012 1.49384L0.740121 14.5038C-0.0298787 15.8338 0.930121 17.5038 2.47012 17.5038ZM10.0001 10.5038C9.45012 10.5038 9.00012 10.0538 9.00012 9.50384V7.50384C9.00012 6.95384 9.45012 6.50384 10.0001 6.50384C10.5501 6.50384 11.0001 6.95384 11.0001 7.50384V9.50384C11.0001 10.0538 10.5501 10.5038 10.0001 10.5038ZM11.0001 14.5038H9.00012V12.5038H11.0001V14.5038Z'
                  fill='white'
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
                  className={`${styles.error_text} ${styles.vehicles_error}`}>
                  운행차량을 입력해주세요.
                </div>
                <div className={`${styles.error_text} ${styles.area_error}`}>
                  운행지역을 선택해주세요.
                </div>
              </div>
            </div>

            <div className={styles.btn_section}>
              <button
                type='button'
                id={styles.ad_apply_cancel}
                onClick={(e)=>{
                  dataReset()
                  onCancel(e)
                }}
                className={`${styles.btns} ${styles.cancel_btn}`}>
                {dictionary.adForm.cancel}
              </button>
              <button
                type='button'
                id={styles.ad_apply_btn}
                className={`${styles.btns} ${styles.active} ${styles.ad_apply_btn}`}
                onClick={onSubmit}
                disabled={!istermschecked}>
                {isLoadingSaveAdvertisement ? (
                  <div className='d-flex justify-content-center'>
                    <ThreeDots
                      height='20'
                      width='40'
                      radius='9'
                      color='#FFFFFF'
                      ariaLabel='three-dots-loading'
                      visible
                    />
                  </div>
                ) : (
                  `${dictionary.adForm.apply_for_ad}`
                )}
              </button>
            </div>
          </div>
        </div>

        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          className='bussiness-modal'>
          <Modal.Header className='py-0 pl-0'>
            <Modal.Title className='text-[#2C324C] text-left text-xl mb-[20px] font-bold'>
              {dictionary.adForm.operating_region.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='text-center'>
            {dictionary.adForm.operating_region.content[0]}
            <br />
            {dictionary.adForm.operating_region.content[1]}
          </Modal.Body>
          <Modal.Footer className='py-0 pr-0'>
            <Button
              className='bg-primary text-white px-4 !mt-[20px]'
              onClick={() => setShowModal(false)}>
              {dictionary.adForm.operating_region.check}
            </Button>
          </Modal.Footer>
        </Modal>
        <DetailModal
          open={openDetailModal}
          handleClose={() => setOpenDetailModal(false)}
          iconClassName={styles[`detailModalIcon${detailModal}`]}
          adData={dictionary.adForm.ad_details_data[detailModal - 1]}
        />
      </div>
    </FormProvider>
  );
};

const DetailModal = ({
  open,
  handleClose,
  iconClassName,
  adData,
}: {
  open: boolean;
  handleClose: VoidFunction;
  iconClassName: string;
  adData: AdDataType;
}) => {
  const ListItem = ({ title, description, description1, description2 }) => (
    <div className='gap-2 flex flex-col'>
      <div className='text-xl font-bold text-secondary'>{title}</div>
      <div>{description}</div>
      <div>{description1}</div>
      <div>{description2}</div>
    </div>
  );

  const {
    main_title,
    sub_title,
    main_line,
    details: { main_heading, sub_heading, list },
    check
  } = adData;

  return (
    <Modal
      centered
      className={clsx('more-content-modal', 'sm:m-0')}
      show={open}
      scrollable
      onHide={handleClose}>
      <Modal.Header className={styles.bg_Head_}>
        <Modal.Title className='w-full text-left px-4'>
          <div>
            <div className={'!text-[24px] !text-[#2C324C] !font-medium'}>{main_title}</div>
            <div className='!text-[44px] !text-[#2C324C] font-bold'>{sub_title}</div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='h-auto'>
        <div className='terms-text'>
          <div className='text-lg mb-1'>{main_line}</div>
          <div className='bg-[#F7F7F7] p-[40px] '>
            <div className='flex gap-2'>
              <div className={iconClassName}></div>
              <div className='gap-2 flex flex-col justify-center'>
                <div className='text-2xl font-bold text-secondary'>
                  {main_heading}
                </div>
                <div>{sub_heading}</div>
              </div>
            </div>
            <Divider />
            <div className='flex flex-col gap-[20px]'>
              {list.map((listItem, index) => (
                <ListItem key={index} {...listItem} />
              ))}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className='bg-secondary primary border-solid border-[1px] border-[transparent] text-[#fff] !py-[5px]'
          onClick={handleClose}>
          {check}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SaveAdForm;
