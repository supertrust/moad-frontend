import React, { useEffect, useMemo, useState } from 'react'
import { Controller, FormProvider, Yup, yupResolver, useForm } from '@src/components/Form';
import { ThreeDots } from "react-loader-spinner";
import { useGetOperatingAreas, useGetVehicles } from "@src/apis/advertisement";
import styles from "./styles.module.css";
import { Form, Modal, Table} from "react-bootstrap";
import { SaveAdvertisementType } from '@src/types/advertisement';
import Image from 'next/image';
import Truck01 from '@images/advertising/img-car01.png';
import Truck02 from '@images/advertising/img-car02.png';
import Truck03 from '@images/advertising/img-car03.png';
import clsx from 'clsx';
import Button from '@src/components/Button';
import { Loader } from 'rsuite';
import Link from 'next/link';


type FormDataType = {
    ad_name: string;
    ad_period: number;
    type: string;
    start_date: string;
    vehicle_details: {
        [key: number]: number
    },
    operating_area: number[]
};

const defaultValues: FormDataType = {
    ad_name: "",
    ad_period: 6,
    type: "",
    start_date: (new Date()).toISOString().split("T")[0],
    vehicle_details: {},
    operating_area: []
};

const adTypes = [
    {
        type: "fixed_ad",
        title: "고정형 광고",
        subtitle_1: "특정 지역 화주들을 매칭하여",
        subtitle_2: "노출할 수 있는 고정형 광고",
        faq: false,
    },
    {
        type: "national_ad",
        title: "전국형 광고",
        subtitle_1: "전국 모든 화주들을 매칭하여 적은 비용으로",
        subtitle_2: "광고효과를 최대화 할 수 있는 광고",
        faq: true
    },
    {
        type: "spot_ad",
        title: "스팟광고",
        subtitle_1: "1시간 단위로 원하는 특정지역과 특정시간에",
        subtitle_2: "노출할 수 있는 광고",
        faq: true
    }
];

const SaveAdvertisementSchema = Yup.object().shape({
    type: Yup.string().required("고유형을 선택해주세요."),
    ad_name: Yup.string().required("고명을 입력해주세요."),
    ad_period: Yup.number().required("고기간을 입력해주세요."),
    start_date: Yup.string().required("시작일을 입력해주세요."),
    vehicle_details: Yup.object().required("화주 선택을 해주세요."),
    operating_area: Yup.array().when('type', ([type],  schema) =>
        type !== 'spot_ad' ? schema.min(1,"운영지역을 선택해주세요.") : schema,
    )
})


const SaveAdForm = ({ onCancel, onSubmitForm }: { onCancel: VoidFunction, onSubmitForm: (props: SaveAdvertisementType) => Promise<void> }) => {
    const methods = useForm<FormDataType>({
        defaultValues,
        //@ts-ignore
        resolver: yupResolver(SaveAdvertisementSchema)
    });

    const { data: vehicles, isLoading: isLoadingVehicles } = useGetVehicles();
    const { data: areas, isLoading: isLoadingCars } = useGetOperatingAreas();

    const [isOpen, openPeriodList] = useState(false);
    const [isActive, setActive] = useState(false);
    const [period, setPeriod] = useState(defaultValues.ad_period);
    const [startDate, setStartDate] = useState(defaultValues.start_date);
    const [vehicleDetails, setVehicleDetails] = useState(defaultValues.vehicle_details);
    const [isAreaVisible, setIsAreaVisible ] = useState(false);
    const [showModal, setShowModal ] = useState(false);

    const { handleSubmit, control, watch, formState: { isSubmitting, errors }, setValue, getValues } = methods;
    
    // console.log("Errors =>", errors); 
    // Object.keys(errors).length && Object.values(errors)[0].ref; 

    const totalPrice = useMemo(() => {
        let price = 0;
        Object.entries(vehicleDetails).map(([key, value]) => {
            if (key && value) {
                const vehicle = vehicles?.find(v => v.id === Number(key))
                const noOfVehicle = value
                if (vehicle) price += noOfVehicle * vehicle?.expenses?.[period];
            }
        })
        return price;
    }, [vehicleDetails, period, vehicles])

    const endDate = useMemo(() => {
        const currentDate = new Date(startDate);
        const sixMonthsFromNow = new Date(currentDate.setMonth(currentDate.getMonth() + period))
            .toISOString()
            .split("T")[0];
        return sixMonthsFromNow;
    }, [startDate, period])

    const onSubmit = handleSubmit(async (v) => {
        const values = {
            ...v,
            total_cost: totalPrice,
            end_date: endDate,
            status: "proceeding"
        };
        await onSubmitForm(values)
    },(errors) => {
        const names = Object.keys(errors);
        if(names.length){
            const element = document.getElementById(`input_${names[0]}`);
            element?.scrollIntoView();
        }
    });

    useEffect(() => {
        watch(({ ad_period, vehicle_details, start_date, type }) => {
            ad_period && setPeriod(ad_period);
            start_date && setStartDate(start_date);
            // @ts-ignore
            vehicle_details && setVehicleDetails(vehicle_details);
            type && setIsAreaVisible(type !== 'spot_ad')
        })
    }, [watch]);

    const trucks = [Truck01, Truck02, Truck03]
    return (
        <FormProvider methods={methods}>
            <div className={styles.ad_modal_wrap}>
                <div className={styles.ad_apply_title}>
                    <p>새 광고 등록</p>
                </div>
                <div id={styles.ad_apply_info} className={`${isActive ? styles.active : ""} ${styles.ad_apply_info} ${styles.only_pc}`}>
                    <div className={styles.info_content}>
                        <div className={styles.info_text}>
                            광고가 노출되는 지역을 선택해  광고를 생성하세요.<br />
                            지역에 따라 광고의 특성이 달라질 수 있습니다.
                        </div>
                        <div id={styles.slide_wrap} className={styles.slide_wrap} >
                            <ul className={styles.info_list_wrap}>
                                <li className={styles.list}>광고 목적에 따라 광고 상품 유형을 선택하고, 광고 노출 기간 등 원하시는 조건을 등록하실 수 있습니다.</li>
                                <li className={styles.list}>광고 유형은 ‘고정형광고, ‘전국광고’, ‘스팟광고’,  총 3가지입니다.  등록 후 유형 변경은 불가하니 어떤 광고 상품을 진행할지 검토 후 선택하세요.</li>
                                <li className={styles.list}>광고 등록시 1~2일 정도 검수시간이 소요됩니다.  (담당자 전화번호로 연락드립니다.)</li>
                            </ul>
                            <div className={styles.info_img_wrap}>
                                <div className={styles.img_title}>
                                    부착예시
                                </div>
                            </div>
                            <div className='sm:flex sm:flex-row justify-center sm:justify-between gap-3 text-center'>
                                {trucks.map((truck , i) => 
                                    <Image key={i} 
                                        className={clsx(
                                            'my-3 w-auto h-20 items-center',
                                            "md:h-auto "
                                        ) }
                                        src={truck} 
                                        alt=""  
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div id={styles.more_btn} className={styles.more_btn}>
                        <div className={styles.text_wrap} onClick={() => setActive(!isActive)}><span className={styles.more_text}>자세히</span> <i className={styles.ic_down_blue}></i></div>
                    </div>
                </div>
                <div className={`${styles.only_mb} ${styles.ad_apply_info_mb}`}>
                    <div className={styles.info_text}>
                        광고가 노출되는 지역을 선택해  광고를 생성하세요.<br />
                        지역에 따라 광고의 특성이 달라질 수 있습니다.<br /><br />
                        광고 목적에 따라 광고 상품 유형을 선택하고, 광고 노출 기간 등 원하시는 조건을 등록하실 수 있습니다.<br /><br />
                        광고 유형은 ‘고정형광고, ‘전국광고’, ‘스팟광고’,  총 3가지입니다.  등록 후 유형 변경은 불가하니 어떤 광고 상품을 진행할지 검토 후 선택하세요.<br /><br />
                        광고 등록시 1~2일 정도 검수시간이 소요됩니다.<br />
                        (담당자 전화번호로 연락드립니다.)
                    </div>
                </div>

                <div className={styles.ad_apply_content}>
                    <div className={styles.radio_wrap}>
                        <div className={`${styles.title} ${styles.only_pc}`}>광고 유형</div>
                        <Controller
                            control={control}
                            name="type"
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                <>
                                    <div id='imput_ad_type' className={styles.modal_select_wrap}>
                                        {adTypes.map((item, index) => (
                                            <div
                                                key={item.type}
                                                onClick={() => {
                                                    const selectedAreas = getValues('operating_area')
                                                    item.type == 'spot_ad' && setValue('operating_area' , [])
                                                    if( 'national_ad' && selectedAreas.length === areas?.length ){
                                                        setValue('operating_area' , [])
                                                        setShowModal(true);
                                                    }
                                                    onChange(item.type)
                                                }}
                                                className={`${value === item.type ? styles.active : ""} ${styles.modal_select}`}
                                            >
                                                <label className={styles.select_box}>
                                                    <input
                                                        type="radio"
                                                        name="ad_type"
                                                        id={item.type}
                                                        className={styles.hidden}
                                                    />
                                                    <i className={styles.ic_radio}></i>
                                                    {item.faq && 
                                                        <Link 
                                                            href="/dashboard/customer-service/faq" 
                                                            className={clsx(styles.detail_desc, 'md:mt-3 md:mr-5')} 
                                                        >상세설명</Link>
                                                    }
                                                    <div className={`${styles.box_icon} ${styles[`box_icon0${index + 1}`]}`}></div>
                                                    <div className={styles.text}>
                                                        <strong className={styles.text}>
                                                            {item.title}
                                                        </strong><br />
                                                        {item.subtitle_1}
                                                        <br />
                                                        {item.subtitle_2}
                                                    </div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-danger">{error?.message}</span>
                                </>
                            )}
                        />
                    </div>

                    <div className={styles.modal_step}>
                        <Controller
                            control={control}
                            name="ad_name"
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                <div className={`${styles.input_section} ${styles.title_section}`}>
                                    <div className={styles.input_title}>광고이름</div>
                                    <input
                                        type="text"
                                        id="input_ad_name"
                                        className={`${styles.box} ${styles.input_ad_title}`}
                                        maxLength={25}
                                        value={value}
                                        onChange={e => onChange(e.target.value)}
                                    />
                                    <div className="flex justify-between">
                                        <span className='text-danger'>{error?.message}</span>
                                        <div className={styles.text_count}>
                                            {`${value.length}/25`}
                                        </div>
                                    </div>
                                </div>
                            )}
                        />

                        <div className={`${styles.input_section} ${styles.date_section}`}>
                            <div className={styles.input_wrap}>
                                <div className={styles.input_title}>광고기간</div>
                                <Controller
                                    name="ad_period"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <div className={`${isOpen ? styles.active : ""} ${styles.select_wrap} ${styles.spot_add}`}>
                                            <div className={styles.select_text}>
                                                <input
                                                    type="text"
                                                    onClick={() => { openPeriodList(!isOpen) }}
                                                    value={value ? value === 6 ? "6개월" : "12개월" : ''}
                                                    className={`${styles.box} ${styles.select_input} ${styles.spot_input_add}`}
                                                    id="select_input"
                                                    placeholder="기간 선택"
                                                    readOnly
                                                />
                                                <div id="calender_area"></div>
                                            </div>
                                            <ul className={styles.date_select_box}>
                                                {[6, 12].map(period => (
                                                    <li
                                                        key={period}
                                                        className={styles.date_list}
                                                        onClick={() => {
                                                            onChange(period)
                                                            openPeriodList(false)
                                                        }
                                                        }
                                                        data-months={`${period}_months`}
                                                    >
                                                        <label htmlFor={`${period}_months`} className={styles.period_label}>{`${period}개월`}</label>
                                                        <input type="radio" value={period} name="date_period" id={`${period}_months`} className={styles.period_input} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                />
                            </div>
                            <div className={`${styles.ad_start_date} ${styles.input_wrap}`}>
                                <div className={styles.sub_title}>시작일</div>
                                <Controller
                                    name="start_date"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <Form.Control
                                            value={value}
                                            onChange={e => onChange(e.target.value)}
                                            type="date"
                                            name="doj"
                                            placeholder="Date of Joining"
                                        />
                                    )}
                                />
                            </div>
                            <div className={styles.input_wrap}>
                                <div className={styles.sub_title}>총 광고기간</div>
                                <div className={styles.date_content}>
                                    <input type="text" value={startDate} name="date_start" id="input_date_start" className={`${styles.box} ${styles.input_date_start}`} readOnly /> ~
                                    <input type="text" value={endDate} name="date_end" id="input_date_end" className={`${styles.box} ${styles.input_date_end} ${styles.spot_input_add}`} readOnly />
                                </div>
                            </div>
                        </div>
                        <span className='text-danger'>{errors?.ad_period?.message || errors?.start_date?.message}</span>

                        <div className={`${styles.input_section} ${styles.vehicles_section}`}>
                            <div className={styles.input_title}>운행차량</div>
                            <Table  bordered className='text-center rounded-sm border-gray-500' responsive>
                                <thead className='rounded-sm'>
                                    <tr  className='rounded-r-sm'>
                                        <td width={'15%'}>차량</td>
                                        <td width={'25%'}>차량대수</td>
                                        <td width={'35%'}>규격</td>
                                        <td width={'25%'}>가격</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoadingVehicles &&   
                                        <tr>
                                            {/* @ts-ignore */}
                                            <td colspan={4} className={`${styles.text} ${styles.cell} ${styles.vehicles_wrap}`}>
                                                <Loader size="sm" content="로드 중..." />
                                            </td>
                                        </tr>
                                    }
                                    <Controller
                                        name="vehicle_details"
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <>
                                                {vehicles?.map(item => (
                                                    <tr key={item.id} >
                                                        <td className={`${styles.text} ${styles.cell} ${styles.vehicles_wrap}`}>{item.vehicle_type}</td>
                                                        <td className={`${styles.vehicles_num_wrap} ${styles.cell}`}>
                                                            <input
                                                                type="number"
                                                                name="vehicles_num"
                                                                // className={styles.input_num}
                                                                className={'!w-24 border border-[#ebedf4] text-gray-500 text-right mr-1'}
                                                                onChange={e => onChange({ ...value, [item.id]: e.target.value })}
                                                                id={item.vehicle_type}
                                                                placeholder="직접입력"
                                                                min={0}
                                                            />
                                                            <span className={styles.text}>대</span>
                                                        </td>
                                                        <td className={` ${styles.cell} ${styles.standard_wrap}`}>
                                                            <span className={styles.text}>{item.vehicle_standard}</span>
                                                        </td>
                                                        <td className={`${styles.spot_add} ${styles.price_wrap}`}>
                                                            <span className={`${styles.text} ${styles.price_input} ${styles.spot_input_add}`}>
                                                                {
                                                                    Number((
                                                                        (value[item.id] && item.expenses[period]) && Number(value[item.id]) * (item.expenses[period]))
                                                                        || 0
                                                                    ).toLocaleString()
                                                                }
                                                            </span>
                                                            <span className={`${styles.text} ${styles.won}`}>원</span>
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
                        <span className='text-danger'>{errors?.vehicle_details?.message}</span>

                        <div className={clsx(
                            styles.input_section, styles.area_section ,styles.active,
                            [!isAreaVisible  &&  '!hidden']
                        )}>
                            <div className={styles.input_title}>운행지역 (다중 선택 가능)</div>
                            <button type="button" id="reset_btn" className={styles.reset_btn}>
                                <span className={styles.text}>초기화</span>
                                <i className={styles.ic_reset}></i>
                            </button>
                            {isLoadingCars && <Loader size="sm" content="로드 중..." />}
                            <Controller
                                name="operating_area"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <div id='input_operating_area' className={styles.chk_grid}>
                                        {areas?.map((item) => {
                                            const selected = (value as number[]).includes(item.id);
                                            return (
                                                <div
                                                    key={item.id}
                                                    className={styles.chk_wrap}
                                                    onClick={() => {
                                                        if (selected) {
                                                            onChange(value.filter((v: number) => v !== item.id))
                                                        } else {
                                                            const newValues =  [...value, item.id];
                                                            const type = getValues('type')
                                                            if( type !== 'national_ad' && newValues.length === areas?.length ){
                                                                !showModal && setShowModal(true);
                                                                return;
                                                            }
                                                            onChange(newValues)
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
                                            )
                                        })}
                                    </div>
                                )}
                            />
                            <span className='text-danger'>{errors?.operating_area?.message}</span>
                            <div id="area_modal" className={`${styles.check_modal} ${styles.area_modal}`}>
                                <div className={styles.check_modal_wrap}>
                                    <div className={styles.title}>확인사항</div>
                                    <div className={styles.text}>
                                        모든 운행 지역을 선택할 시<br />
                                        광고 유형을 전국형으로 변경해주세요
                                    </div>
                                    <div className={styles.btn_wrap}>
                                        <button type="button" id="area_modal_close" className={styles.active_btn}>확인</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.price_section}>
                            <div className={`${styles.price_box} ${styles.spot_add}`}>
                                <div className={styles.price_text}>광고비용</div>
                                <div id="total_price" className={`${styles.price_text} ${styles.total_price}`}>{totalPrice.toLocaleString()}</div>
                                <div className={`${styles.price_text} ${styles.text_won}`}>원</div>
                            </div>
                            <div className={styles.price_info}>
                                광고비용은 차후 상담에 따라 변경 될 수  있습니다.
                            </div>
                        </div>

                        <div className={styles.error_box}>
                            <div className={styles.error_line}>
                                <i className={styles.ic_error}></i>
                                <div className={`${styles.error_text} ${styles.title_error}`}>광고이름을 입력해주세요.</div>
                                <div className={`${styles.error_text} ${styles.end_error}`}>광고기간을 6개월 또는 12개월 선택해주세요.</div>
                                <div className={`${styles.error_text} ${styles.start_error}`}>
                                    시작일을 선택해주세요.
                                    <span className={styles.only_pc}>(광고 등록일 기준 1달 이후 부터 선택 가능)</span>
                                    <span className={styles.only_mb}>(등록 기준 1달 이후 선택)</span>
                                </div>
                                <div className={`${styles.error_text} ${styles.vehicles_error}`}>운행차량을 입력해주세요.</div>
                                <div className={`${styles.error_text} ${styles.area_error}`}>운행지역을 선택해주세요.</div>
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
                                {isSubmitting ? (
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
                                ) : "광고 신청"}
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
                        모든 운행 지역을 선택할 시<br/>
                        광고 유형을 전국형으로 변경해주세요
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='bg-primary text-white px-4' onClick={() => setShowModal(false)}>닫다</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </FormProvider>
    )
}

export default SaveAdForm