import { DateIcon } from "@src/components/icons";
import { ArrowBackIconAdmin, EditIcon, DropdownIcon } from "@src/components/icons/admin/advertisement";
import { Checkbox, DatePicker, Radio, RadioChangeEvent, Select, SelectProps } from "antd";
import clsx from "clsx";
import React, { DetailedHTMLProps, InputHTMLAttributes, useEffect } from 'react';
import DotStatusIcon from "../../../icons/admin/advertisement/dotStatusIcon";
import styles from "./styles.module.scss";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useRouter } from "next/router";
import { useGetAdvertisementDetails } from "@src/apis/admin/advertisement";
import Loader from "@src/components/Loader";
import dayjs from 'dayjs';
import { formatDate } from "@src/utils/formatter";
import { Controller, FormProvider, Yup, useForm, yupResolver } from '@src/components/common';
import { IAdvertisementDetails } from "@src/types/admin/advertisment";

const DataRow = ({ keyValue, children, borderBottom = true, className = '' }: {
    keyValue: string, className?: string,
    borderBottom?: boolean,
    children: React.ReactNode
}) => {
    return (
        <div className={clsx("flex items-center", borderBottom && styles['border-bottom'])}>
            <div className={clsx(styles['key-field'], className)}>
                <span>{keyValue}</span>
            </div>
            <div className="px-1 flex-1">{children}</div>
        </div>
    );
};

interface InputProps  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    className?: string, inputClass?: string, iconClass?: string,
    placeholder?: string,
    type?: string,
    iconChild?: boolean,
    iconChildText?: string,
    value? : string,
    error?: boolean,
    helperText?: string,
}

const Input = ({
    type = "text",
    value = "",
    className = "",
    inputClass = "",
    iconClass = "",
    placeholder = "",
    iconChild = false,
    iconChildText = "대",
    error,
    helperText,
    ...rest
}: InputProps) => {


    return (
        <div>
            <div 
                className={clsx(
                    styles['input-layout'],
                    className,
                    error && 'border border-admin-error'
                )}
            >
                <input 
                    {...rest}
                    placeholder={placeholder} 
                    type={type} 
                    value={value} 
                    className={clsx(
                        styles['input-body'], 
                        'focus:border-0',
                        inputClass 
                    )}
                />
                <div
                    className={clsx(
                        styles['input-icons'], 
                        iconChild ? "w-[68px] space-x-[19px] flex justify-between" : "w-[33px]", 
                        iconClass
                    )}
                >
                    {iconChild && <span className={styles['inputIconText']}>{iconChildText}</span>}
                    <EditIcon/>
                </div>
            </div>
            {helperText && <div className={clsx(
                "text-sm ",
                error ?  "text-admin-error" : "text-admin-sub"
            )}>{helperText}</div>}
        </div>

    );
};

const ChooseNumberOfVehicle = () => {
    return <div className={"h-[196px] flex"}>
        <div className={'w-[120px] h-[100%] bg-[#f8faff] border-r border-b border-[#eaecf0] items-center flex pl-4'}>
            <span className={styles['key-field-text']}>운행 차량수</span>
        </div>
        <div className={'flex-1'}>
            <DataRow keyValue={"1t"} className={'!w-[120px]'}>
                <Input className={'w-[200px]'} inputClass={'w-[132px]'} value={"50"} />
            </DataRow>
            <DataRow keyValue={"2.5t"} className={'!w-[120px]'}>
                <Input className={'w-[200px]'} inputClass={'w-[132px]'} placeholder={"0"}/>
            </DataRow>
            <DataRow keyValue={"5t"} className={'!w-[120px]'}>
                <Input className={'w-[200px]'} inputClass={'w-[132px]'} placeholder={"0"} />
            </DataRow>
            <DataRow keyValue={"11t"} className={'!w-[120px]'}>
                <Input className={'w-[200px]'} inputClass={'w-[132px]'} placeholder={"0"} />
            </DataRow>

        </div>
    </div>
}

const adListOptions: SelectProps['options'] = [
    { value: 'fixed_ad',  label: '고정형'  },
    { value: 'national_ad', label: '전국형' },
    { value: 'spot_ad', label: '스팟형' },
];


const adAreaOptions = [
    { label: "전국", value: "전국" },
    { label: "서울", value: "서울" },
    { label: "경기", value: "경기" },
    { label: "인천", value: "인천" },
    { label: "대전", value: "대전" },
    { label: "세종", value: "세종" },
    { label: "충남", value: "충남" },
    { label: "충북", value: "충북" },
    { label: "광주", value: "광주" },
    { label: "전남", value: "전남" },
    { label: "전북", value: "전북" },
    { label: "대구", value: "대구" },
    { label: "경북", value: "경북" },
    { label: "부산", value: "부산" },
    { label: "울산", value: "울산" },
    { label: "경남", value: "경남" },
    { label: "강원", value: "강원" },
    { label: "제주", value: "제주" }
]

const vehicleTypeOptions = [
    { value: "entire", label: "전체" },
    { value: "cargo", label: "카고" },
    { value: "tower", label: "탑" },
    { value: "wing_body", label: "윙바디" },
]



const AdvertisementSchema = Yup.object().shape({
	type: Yup.string().required('고유형을 선택해주세요.'),
	ad_name: Yup.string().required('광고이름을 입력해주세요.'),
	ad_period: Yup.number().required(
		'광고기간을 6개월 또는 12개월 선택해주세요.',
	),
	start_date: Yup.string().required(
		'시작일을 선택해주세요. (등록 기준 1달 이후 선택)',
	),
	vehicle_details: Yup.object().test(
		'is-not-empty-object',
		'운행차량을 입력해주세요.',
		(value) => Object.keys(value).length > 0,
	),
	operating_area: Yup.array().when('type', ([type], schema) =>
		type == 'fixed_ad' ? schema.min(1, '운행지역을 선택해주세요.') : schema,
	),
});

const AdminAdvertisementDetailsPage = () => {
    const { query } = useRouter();
    const { idx } = query;
    const { data: adDetails, isLoading } = useGetAdvertisementDetails(Number(idx))

    console.log("AdDetails ->", adDetails);

    const methods =  useForm({
        defaultValues: adDetails,
		//@ts-ignore
        resolver: yupResolver(AdvertisementSchema)
    });

    const { control , getValues , setValue } = methods;
    useEffect(() => {
		if (adDetails) {
			Object.entries(adDetails).forEach(([key, value]) => {
				setValue(key as keyof IAdvertisementDetails, value || '');
			});
		}
	}, [adDetails]);

    const handleAdType = (value: string | string[]) => {
        console.log(`Selected: ${value}`);
    };


    const areaChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const selectVehicleType = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        // setValue(e.target.value);
    };

    const adImages = [
        "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww"
    ]



    return (
        <div className={'flex flex-col mt-[35.5px] px-6 mb-[56.3px]'}>
            {isLoading ? 
                <Loader size="lg" /> :
                <FormProvider methods={methods}>
                    <div className={'flex justify-between'}>

                        <div className={'flex items-center space-x-2'}>
                            <ArrowBackIconAdmin/>
                            <span className={styles['title']}>
                                광고상세
                            </span>
                        </div>

                        <div className={'flex space-x-2'}>
                            <div className={styles['upload-draft']}>
                                <span>
                                    시안 업로드
                                </span>
                            </div>
                            <div className={styles['excel-button']}>
                                <span>
                                    엑셀다운로드
                                </span>
                            </div>
                        </div>

                    </div>

                    <div className={styles['box-layout']}>
                        <DataRow keyValue={"광고명"}>
                        <Controller
                            name='ad_name'
                            control={control}
                            render={({ field: { value, onChange } , fieldState: { error } }) => (
                                <Input 
                                    value={value} 
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )} 
                        />
                        </DataRow>
                        <DataRow keyValue={"업종"}>
                            <span className={clsx('pl-4', styles['global-value'])}>
                                {adDetails?.sector}
                            </span>
                        </DataRow>
                        <DataRow keyValue={"회사명"}>
                            <span className={clsx('pl-4 underline', styles['global-value'])}>
                                {adDetails?.company_name}
                            </span>
                        </DataRow>
                        <DataRow keyValue={"회사번호"}>

                        <Controller
                            name='contact_phone_number'
                            control={control}
                            render={({ field: { value, onChange } , fieldState: { error } }) => (
                                <Input className={'w-[200px]'}
                                    inputClass={'w-[167px]'} 
                                    value={`${value}`}
                                    onChange={onChange}
                                />
                            )}
                        />
                        </DataRow>
                        <DataRow keyValue={"광고모집기간"}>
                            <div className={'flex-1 flex items-center'}>
                                <div className={'flex-1'}>

                                <Controller
                                    name='advertisement_recruitment_period_start'
                                    control={control}
                                    render={({ field: { value, onChange } , fieldState: { error } }) => (
                                        <>
                                            <DatePicker 
                                                suffixIcon={<DateIcon/>} 
                                                popupClassName={"admin-advertisement-date-picker"}
                                                placeholder={"날짜선택"} 
                                                className={clsx(styles['date-picker'])} 
                                                onChange={onChange}
                                                value={dayjs(value, "YYYY-MM-DD")}
                                            />
                                            {error && <span className="text-sm text-admin-error">{error?.message}</span>}
                                        </>
                                    )}
                                />
                                </div>
                                <div className={'px-2'}>
                                    <span> ~ </span>
                                </div>
                                <div className={'flex-1'}>

                                <Controller
                                    name='advertisement_recruitment_period_end'
                                    control={control}
                                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                                        <>
                                            <DatePicker 
                                                suffixIcon={<DateIcon/>} 
                                                placeholder={"날짜선택"}
                                                className={
                                                    clsx(
                                                        styles['date-picker'],
                                                        error && 'border-admin-error'
                                                    )
                                                }
                                                popupClassName={"admin-advertisement-date-picker"} 
                                                onChange={(e) => {console.log(e)}}
                                                value={dayjs(value, "YYYY-MM-DD")}
                                            />
                                            {error && <span className="text-sm text-admin-error">{error?.message}</span>}
                                        </>
                                    )}
                                />
                                </div>
                            </div>
                        </DataRow>
                        <DataRow keyValue={"모집차량수"}>

                        <Controller
                            name='number_of_vehicles_recruited'
                            control={control}
                            render={({ field: { value, onChange } , fieldState: { error } }) => (
                                <Input 
                                    className={'w-[200px]'} 
                                    inputClass={'w-[132px]'} 
                                    value={`${value}`} 
                                    onChange={onChange}
                                    iconChild={true}
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                        </DataRow>
                        <DataRow keyValue={"모집차량수"}>
                            <div className={'flex space-x-[30px] items-center px-2'}>
                                <div className={styles['status']}>
                                    <DotStatusIcon fill={"#7571ee"}/>
                                    <span>
                                    광고신청중
                                </span>
                                </div>
                                <div className={styles['change-status-button']}>
                                <span>
                                    광고진행상태 변경
                                </span>
                                </div>
                            </div>
                        </DataRow>
                        <DataRow keyValue={"광고기간"}>
                            <div className={'flex-1 flex items-center'}>
                                <div className={'flex-1'}>
                                <Controller
                                    name='advertising_period_start'
                                    control={control}
                                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                                        <>
                                            <DatePicker 
                                                suffixIcon={<DateIcon/>} 
                                                popupClassName={"admin-advertisement-date-picker"}
                                                placeholder={"날짜선택"} 
                                                className={clsx(styles['date-picker'])} 
                                                onChange={() => { }}
                                                value={dayjs(value, "YYYY-MM-DD")}
                                            />
                                            {error && <span className="text-sm text-admin-error">{error?.message}</span>}
                                        </>
                                    )}
                                />
                                </div>
                                <div className={'px-2'}>
                                    <span>
                                    ~
                                </span>
                                </div>
                                <div className={'flex-1'}>
                                <Controller
                                    name='advertising_period_start'
                                    control={control}
                                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                                        <>
                                            <DatePicker 
                                                suffixIcon={<DateIcon/>} 
                                                placeholder={"날짜선택"}
                                                className={clsx(styles['date-picker'])}
                                                popupClassName={"admin-advertisement-date-picker"} 
                                                onChange={() => {}}
                                                value={dayjs(value, "YYYY-MM-DD")}
                                            />
                                            {error && <span className="text-sm text-admin-error">{error?.message}</span>}
                                        </>
                                    )}
                                />
                                </div>
                            </div>
                        </DataRow>
                        <DataRow keyValue={"광고유형"}>
                            <Controller
                                name='advertisement_type'
                                control={control}
                                render={({ field: { value, onChange } , fieldState: { error } }) => (
                                    <Select
                                        popupClassName={"admin-advertisement-select"}
                                        size={"large"}
                                        // placeholder={<span className={styles['dropdown-text']}>고정형</span>}
                                        // onChange={handleAdType}
                                        style={{ width: 200, borderRadius: "4px!important" }}
                                        suffixIcon={<div className={'pr-1'}><DropdownIcon/></div>}
                                        options={adListOptions}
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </DataRow>

                        <DataRow keyValue={"광고지역"} className={'!h-[80px]'}>
                            <Controller
                                name='advertising_area'
                                control={control}
                                render={({ field: { value, onChange } , fieldState: { error } }) => (
                                    <>
                                        <div className={'px-1 flex flex-wrap   items-center pb-2'}>
                                            {adAreaOptions.map((obj, key) => (
                                                <Checkbox 
                                                    className={'mr-2 pt-2'} 
                                                    key={key}
                                                    checked={!!value?.find(area => area.area == obj.label) || false}
                                                    onChange={onChange}
                                                >{obj.label}</Checkbox>
                                            ))}
                                        </div>
                                        {error && <span className="text-sm text-admin-error">{error?.message}</span>}
                                    </>
                                )}
                            />
                        </DataRow>
                        <DataRow keyValue={"광고지역"}>
                            <Controller
                                name='advertisement_vehicle_type'
                                control={control}
                                render={({ field: { value, onChange } , fieldState: { error } }) => (
                                    <div className={'px-1 flex flex-wrap   items-center pb-2'}>
                                        <Radio.Group 
                                            value={value}
                                            onChange={onChange} 
                                            // onChange={selectVehicleType} 
                                        >
                                            {vehicleTypeOptions.map((obj, key) => (
                                                <Radio 
                                                    name={obj.value} 
                                                    className={'mr-2 pt-2'} 
                                                    key={key}
                                                    // checked={adDetails?.advertisement_vehicle_type === obj.value}
                                                    value={obj.value}
                                                >{obj.label}</Radio>
                                            ))}
                                        </Radio.Group>
                                    </div>
                                )}
                            />
                        </DataRow>
                        <ChooseNumberOfVehicle/>
                        <DataRow keyValue={"담당자"}>
                            <Controller
                                name='advertisement_type'
                                control={control}
                                render={({ field: { value, onChange } , fieldState: { error } }) => (
                                    <Input 
                                        className={'w-[200px]'} 
                                        inputClass={'w-[132px]'} 
                                        value={"홍길동"} 
                                        error={!!error}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                        </DataRow>
                        <DataRow keyValue={"담당자 직위"}>
                            <Controller
                                name='advertisement_type'
                                control={control}
                                render={({ field: { value, onChange } , fieldState: { error } }) => (
                                    <Input 
                                        className={'w-[200px]'} 
                                        inputClass={'w-[132px]'} 
                                        value={""} 
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                        </DataRow>
                        <DataRow keyValue={"담당자 휴대폰번호"}>
                            <Controller
                                name='contact_phone_number'
                                control={control}
                                render={({ field: { value, onChange } , fieldState: { error } }) => (
                                    <Input 
                                        className={'w-[200px]'} 
                                        inputClass={'w-[132px]'} 
                                        value={value?.toString()} 
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                        </DataRow>
                        <DataRow keyValue={"담당자 이메일"}>
                            <Controller
                                name='contact_phone_number'
                                control={control}
                                render={({ field: { value, onChange } , fieldState: { error } }) => (
                                    <Input 
                                        value={value?.toString()} 
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                        </DataRow>
                        <DataRow keyValue={"광고신청일시"}>
                        <span className={clsx('pl-4', styles['global-value'])}>
                            {adDetails && formatDate(adDetails.advertisement_application_date_and_time, true)}
                        </span>
                        </DataRow>
                        <DataRow keyValue={"광고내용"} className={'!h-[180px]'}>
                            <div className={clsx("pl-3 overflow-y-auto  h-[170px]", styles['pre-wrap'])}>
                                {adDetails?.advertisement_content}
                            </div>
                        </DataRow>
                        <DataRow keyValue={"광고비용"}>
                        <div  className={clsx(styles['input-layout'],'flex justify-end w-[331px] items-center !border !border-[#eaecf0] h-[40px] space-x-4 pr-4')}>
                            <span className={styles['global-value']}>
                                {adDetails?.advertising_cost}
                            </span>
                            <span className={styles['inputIconText']}>
                                원
                            </span>
                        </div>
                        </DataRow>
                        <DataRow borderBottom={false} keyValue={"광고이미지"} className={'!h-[208px]'}>
                            <div className={'flex flex-col space-y-1'}>
                                <div className={styles['ad-image-edit-btn']}>
                                    <span>
                                        편집
                                    </span>
                                </div>
                                <div className={'flex space-x-2'}>
                                    {adDetails?.images.map((value,key)=>( 
                                        <img 
                                            src={value} 
                                            key={key}
                                            alt="Lamp" 
                                            style={{height : "156px",width : "198.4px"}}
                                        />
                                    ))}
                                </div>
                            </div>
                        </DataRow>
                    </div>

                    <div className={'flex space-x-2 py-5 justify-center'}>
                        <div className={styles['cancel-button']}>
                            <span>
                            취소
                            </span>
                        </div>
                        <div className={styles['save-button']}>
                            <span>
                            저장
                            </span>
                        </div>
                    </div>
                </FormProvider>  
            }         
        </div>
    );
};

export default AdminAdvertisementDetailsPage;