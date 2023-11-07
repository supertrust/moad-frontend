import { DateIcon } from "@src/components/icons";
import { ArrowBackIconAdmin, DropdownIcon } from "@src/components/icons/admin/advertisement";
import { Checkbox, DatePicker, Radio, Select, SelectProps } from "antd";
import clsx from "clsx";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import DotStatusIcon from "../../../icons/admin/advertisement/dotStatusIcon";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useAdminApproveAd, useGetAdvertisementDetails, useUpdateCompanyAd } from "@src/apis/admin/advertisement";
import Loader from "@src/components/Loader";
import dayjs from 'dayjs';
import { formatDate } from "@src/utils/formatter";
import { Button, Controller, FormProvider, Yup, useForm, yupResolver } from '@src/components/common';
import { IAdArea, IAdVehicle, UpdateCompanyAdProps } from "@src/types/admin/advertisment";
import { useGetOperatingAreas } from "@src/apis/advertisement";
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import { toast } from "react-toastify";
import IconPlus from '@images/admin-ad-details/ic-add-plus.png'
import ImagePlaceholder from '@images/admin-ad-details/ic-image-placeholder.png'
import Image from "next/image";
import AdImage from "./components/Image";
import { API_BASE_URL } from "@src/config";
import Input from "./components/Input";
import DataRow from "./components/DataRow";
import ChooseNumberOfVehicle from "./components/ChooseNumberOfVehicle";

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

const adListOptions: SelectProps['options'] = [
    { value: 'fixed_ad',  label: '고정형'  },
    { value: 'national_ad', label: '전국형' },
    { value: 'spot_ad', label: '스팟형' },
];

const vehicleTypeOptions = [
    { value: "all", label: "전체" },
    { value: "cargo", label: "카고" },
    { value: "tower", label: "탑" },
    { value: "loaded", label: "윙바디" },
]



const AdvertisementSchema = Yup.object().shape({
    ad_name: Yup.string().required('광고이름을 입력해주세요.'),
	company_phone_number: Yup.number().required('회사 전화번호를 입력하세요.'),
	advertisement_type: Yup.string().required('고유형을 선택해주세요.'),
	advertisement_recruitment_period_start: Yup.string().required('시작일을 선택해주세요.'),
	advertisement_recruitment_period_end: Yup.string().required('시작일을 선택해주세요.'),
	vehicle_details: Yup.object().test(
		'is-not-empty-object',
		'운행차량을 입력해주세요.',
		(value) => Object.keys(value).length > 0,
	),
	advertising_period_start: Yup.string().required('시작일을 선택해주세요.'),
	advertising_period_end: Yup.string().required('시작일을 선택해주세요.'),
	// operating_area: Yup.array().when('type', ([type], schema) =>
	// 	type == 'fixed_ad' ? schema.min(1, '운행지역을 선택해주세요.') : schema,
	// ),
    contact_phone_person: Yup.string().required('관리자 이름을 입력하세요.'),
    contact_phone_number: Yup.string().required('연락처 전화번호를 입력하세요.'),
    contact_position: Yup.string().required('광고이름을 입력해주세요.'),
    contact_email: Yup.string().required('광고이름을 입력해주세요.'),
});


const AdminAdvertisementDetailsPage = () => {
    const { query } = useRouter();
    const { idx } = query;
    const { data: adDetails, isLoading } = useGetAdvertisementDetails(Number(idx));
    const { data: operatingAreas } = useGetOperatingAreas();
    const { mutateAsync: updateCompanyAd, isLoading: isUpdating  } = useUpdateCompanyAd();

    const [status, setStatus] = useState<'no' | 'yes'>('no')
    const { mutateAsync: adminApproveAd , isLoading: isApproving } = useAdminApproveAd();

    const adAreaOptions = useMemo(
        () =>  operatingAreas?.map((area) => ({ label: area.area , value: area.id })) || [], 
        [operatingAreas]
    )

    const imageRef = useRef<HTMLInputElement>();
    const [updateImage, setUpdateImage] = useState(false);
    const [images, setImages] = useState<File[]>([]);

    const handleFileChange = event =>  setImages([...images, ...event.target.files as File[]])
    const removeFile = (file: File) => setImages(images.filter(image =>  image !== file))
    
    const methods =  useForm<UpdateCompanyAdProps>({
        defaultValues: {},
		//@ts-ignore
        resolver: yupResolver(AdvertisementSchema)
    });

    const { control , setValue , handleSubmit } = methods;

    useEffect(() => {
		if (adDetails) {
			Object.entries(adDetails).forEach(([key, value]) => {
                if(['id','advertisement_vehicle', 'advertising_area', 'images'].includes(key)){
                    switch (key) {
                        case 'id':
                            setValue('advertisement_id',  value)
                            break;
                        case 'advertising_area':
                            setValue('advertising_area',  value?.map((area: IAdArea) => area.id))
                            break;
                        case 'advertisement_vehicle':
                            //@ts-ignore
                            let newValue: { number: number} = {};
                            value?.map((_v : IAdVehicle , index) =>  newValue[`${Number(index + 1)}`] = _v.number_of_vehicles)
                            setValue('vehicle_details', newValue)
                            break;
                        default:
                            break;
                    }
                }else
				    setValue(key as keyof UpdateCompanyAdProps, value || '');
			});
		}
	}, [adDetails]);

    const onSubmit = handleSubmit(async (props) => {

        const imageData = {};
        images.map((image, index) => {
            imageData[`image_${index+1}`] = image;
        });
        await updateCompanyAd({
            ...props,
            ...imageData,
            advertisement_recruitment_period_start: formatDate(props.advertisement_recruitment_period_start) || '',
            advertisement_recruitment_period_end: formatDate(props.advertisement_recruitment_period_end) || '',
            advertising_period_start: formatDate(props.advertising_period_start) || '',
            advertising_period_end: formatDate(props.advertising_period_end) || '',
        }, {
            onSuccess: () =>  {
                setImages([]);
                setUpdateImage(false);
                toast.success('광고 업데이트 성공');
            },
            onError: (err) =>  {
                console.log(err)
                toast.error('문제가 발생했습니다.')
            }
        });
    })

    const approveAd = async() => {
        await adminApproveAd({ id: Number(idx), status}, {
            onSuccess: () =>  toast.success('광고 상태 변경 성공'),
            onError: (err) =>   toast.error( err || '문제가 발생했습니다.')
        })
    }

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
                                name='company_phone_number'
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
                                                className={clsx(
                                                    styles['date-picker'],
                                                    error && 'border-admin-error'
                                                )}
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
                                                className={clsx(
                                                    styles['date-picker'],
                                                    error && 'border-admin-error'
                                                )}
                                                popupClassName={"admin-advertisement-date-picker"} 
                                                onChange={onChange}
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
                                        type="number"
                                        onChange={onChange}
                                        min={0}
                                        iconChild={true}
                                        error={!!error}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                        </DataRow>
                        <DataRow keyValue={"광고진행상태"}>
                            <div className={'flex space-x-[30px] items-center px-2'}>
                                {/* { <div className={styles['status']}>
                                    <DotStatusIcon fill={"#7571ee"}/>
                                    <span>광고신청중</span>
                                </div>: */}
                                {
                                    <Select
                                        popupClassName={"admin-advertisement-select"}
                                        size={"large"}
                                        style={{ width: 200, borderRadius: "4px!important" }}
                                        suffixIcon={<div className={'pr-1'}><DropdownIcon/></div>}
                                        options={[
                                            { value: "no" , label: "아니요" }, 
                                            { value: "yes" , label: "예"}
                                        ]}
                                        value={status}
                                        onChange={(value) =>  setStatus(value)}
                                    />
                                }
                                <Button 
                                    className={styles['change-status-button']}
                                    onClick={approveAd}
                                    loading={isApproving}
                                >
                                    <span>제출</span>
                                </Button>
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
                                                className={clsx(
                                                    styles['date-picker'],
                                                    error && 'border-admin-error'
                                                )}
                                                onChange={onChange}
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
                                    name='advertising_period_end'
                                    control={control}
                                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                                        <>
                                            <DatePicker 
                                                suffixIcon={<DateIcon/>} 
                                                placeholder={"날짜선택"}
                                                className={clsx(
                                                    styles['date-picker'],
                                                    error && 'border-admin-error'
                                                )}
                                                popupClassName={"admin-advertisement-date-picker"} 
                                                onChange={onChange}
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
                                render={({ field: { value } , fieldState: { error } }) => (
                                    <>
                                        <div className={'px-1 flex flex-wrap   items-center pb-2'}>
                                            {adAreaOptions.map((obj, key) => (
                                                <Checkbox 
                                                    className={'mr-2 pt-2'} 
                                                    key={key}
                                                    checked={!!value?.includes(obj.value)}
                                                    onChange={(e) => setValue(
                                                        'advertising_area',
                                                        value.includes(obj.value) ? 
                                                            value.filter(area => area !== obj.value):
                                                            [...value, obj.value]
                                                    )}
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
                        <ChooseNumberOfVehicle control={control} setValue={setValue} />
                        <DataRow keyValue={"담당자"}>
                            <Controller
                                name='contact_phone_person'
                                control={control}
                                render={({ field: { value, onChange } , fieldState: { error } }) => (
                                    <Input 
                                        className={'w-[200px]'} 
                                        inputClass={'w-[132px]'} 
                                        value={value} 
                                        error={!!error}
                                        onChange={onChange}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                        </DataRow>
                        <DataRow keyValue={"담당자 직위"}>
                            <Controller
                                name='contact_position'
                                control={control}
                                render={({ field: { value, onChange } , fieldState: { error } }) => (
                                    <Input 
                                        className={'w-[200px]'} 
                                        inputClass={'w-[132px]'} 
                                        value={value} 
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
                                name='contact_email'
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
                        <DataRow keyValue={"광고신청일시"}>
                        <span className={clsx('pl-4', styles['global-value'])}>
                            {adDetails && formatDate(adDetails.advertisement_application_date_and_time, true)}
                        </span>
                        </DataRow>
                        <DataRow keyValue={"광고내용"} className={'!h-[185px]'}>
                            <Controller
                                name='advertisement_content'
                                control={control}
                                render={({ field: { value, onChange } , fieldState: { error } }) => (
                                    <>
                                        <textarea 
                                            className={clsx(
                                                "pl-3 overflow-y-auto h-[170px] rounded",
                                                "border border-admin-stroke w-full", 
                                                styles['pre-wrap']
                                            )}
                                            onChange={onChange}
                                        >{value}</textarea>
                                        {error && <span className="text-sm text-admin-error">{error?.message}</span>}
                                    </>
                                )}
                            />
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
                                        className={styles['ad-image-edit-btn']}
                                        onClick={() => setUpdateImage(true)}
                                    >
                                        <span>편집</span>
                                    </button>
                                    {updateImage && 
                                        <button 
                                            className={clsx(styles['ad-image-edit-btn'], "bg-admin-primary")}
                                            onClick={() => setUpdateImage(false)}
                                        >
                                            <span>완료</span>
                                        </button>
                                    }
                                </div>
                                <div className={'flex gap-2 flex-wrap'}>
                                    {adDetails?.images.map((value,key)=>( 
                                        <AdImage 
                                            src={API_BASE_URL+value.image_path} 
                                            key={key}
                                            edit={updateImage}
                                            onRemove={() => {}}
                                        />
                                    ))}
                                    {images.map((file, key)=>( 
                                        <AdImage 
                                            src={URL.createObjectURL(file)} 
                                            key={key}
                                            edit={updateImage}
                                            onRemove={() => removeFile(file)}
                                        />
                                    ))}
                                    {updateImage && 
                                        <div className="h-[156px] w-[198.4px] border border-admin-stroke p-1">
                                            <div 
                                                className={clsx(
                                                    "!border-dashed border cursor-pointer", 
                                                    "flex h-full flex-col justify-center items-center gap-2"
                                                )}
                                                //@ts-ignore
                                                onClick={()=> imageRef.current.click()}
                                            >
                                                <Image src={ImagePlaceholder} alt=""/>
                                                <span className="text-admin-placeholder text-lg font-medium">
                                                    이미지 추가
                                                </span>
                                                <Image src={IconPlus} alt=""/>
                                            </div>
                                        </div>
                                    }
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
                        <Button 
                            className={styles['save-button']} 
                            onClick={onSubmit}
                            disabled={isUpdating}
                        >
                            <span> 저장</span>
                        </Button>
                    </div>
                </FormProvider>  
            }         
        </div>
    );
};

export default AdminAdvertisementDetailsPage;