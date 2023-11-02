import { DateIcon } from "@src/components/icons";
import { ArrowBackIconAdmin, EditIcon, DropdownIcon } from "@src/components/icons/admin/advertisement";
import { Checkbox, DatePicker, Radio, RadioChangeEvent, Select, SelectProps } from "antd";
import clsx from "clsx";
import React, { ReactNode } from 'react';
import DotStatusIcon from "../../../icons/admin/advertisement/dotStatusIcon";
import styles from "./styles.module.scss";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

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

const Input = ({
                   type = "text",
                   value = "",
                   className = "",
                   inputClass = "",
                   iconClass = "",
                   placeholder = "",
                   iconChild = false,
                   iconChildText = "대"
               }: {
    className?: string, inputClass?: string, iconClass?: string,
    placeholder?: string,
    type?: string,
    iconChild?: boolean,
    iconChildText?: string,
    value? : string
}) => {


    return (
        <div className={clsx(styles['input-layout'], className)}>
            <input placeholder={placeholder} type={type} value={value}
                   className={clsx(styles['input-body'], inputClass)}>
            </input>
            <div
                className={clsx(styles['input-icons'], iconChild ? "w-[68px] space-x-[19px] flex justify-between" : "w-[33px]", iconClass)}>
                {iconChild && <span className={styles['inputIconText']}>{iconChildText}</span>}
                <EditIcon/>
            </div>
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
                <Input className={'w-[200px]'} inputClass={'w-[132px]'} value={"50"} iconChild={true}/>
            </DataRow>
            <DataRow keyValue={"2.5t"} className={'!w-[120px]'}>
                <Input className={'w-[200px]'} inputClass={'w-[132px]'} placeholder={"0"} iconChild={true}/>
            </DataRow>
            <DataRow keyValue={"5t"} className={'!w-[120px]'}>
                <Input className={'w-[200px]'} inputClass={'w-[132px]'} placeholder={"0"} iconChild={true}/>
            </DataRow>
            <DataRow keyValue={"11t"} className={'!w-[120px]'}>
                <Input className={'w-[200px]'} inputClass={'w-[132px]'} placeholder={"0"} iconChild={true}/>
            </DataRow>

        </div>
    </div>
}
const AdminAdvertisementDetailsPage = () => {

    const handleAdType = (value: string | string[]) => {
        console.log(`Selected: ${value}`);
    };

    const adListOptions: SelectProps['options'] = [
        {
            value: '1',
            label: '고정형',
        },
        {
            value: '2',
            label: '회사명',
        },
        {
            value: '3',
            label: '회사 전화번호',
        },
        {
            value: '4',
            label: '담당자',
        },
        {
            value: '5',
            label: '담당자 직위',
        },
        {
            value: '6',
            label: '담당자 휴대폰번호',
        },
        {
            value: '7',
            label: '담당자 이메일',
        },
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
        { label: "전체", value: "전체" },
        { label: "카고", value: "카고" },
        { label: "탑", value: "탑" },
        { label: "윙바디", value: "윙바디" },
    ]


    const areaChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const selectVehicleType = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        // setValue(e.target.value);
    };

    const adImages = ["https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww"
    ]


    return (
        <div className={'flex flex-col mt-[35.5px] px-6 mb-[56.3px]'}>
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
                    <Input value={"이카루스 서비스 오픈 출시 기념 홍보 광고"}/>
                </DataRow>
                <DataRow keyValue={"업종"}>
                    <span className={clsx('pl-4', styles['global-value'])}>
                        금융업
                    </span>
                </DataRow>
                <DataRow keyValue={"회사명"}>
                    <span className={clsx('pl-4 underline', styles['global-value'])}>
                        머스트핀테크
                    </span>
                </DataRow>
                <DataRow keyValue={"회사번호"}>
                    <Input className={'w-[200px]'} inputClass={'w-[167px]'} value={"02-123-4567"}/>
                </DataRow>
                <DataRow keyValue={"광고모집기간"}>
                    <div className={'flex-1 flex items-center'}>
                        <div className={'flex-1'}>
                            <DatePicker suffixIcon={<DateIcon/>} popupClassName={"admin-advertisement-date-picker"}
                                        placeholder={"날짜선택"} className={clsx(styles['date-picker'])} onChange={() => {
                            }}/>
                        </div>
                        <div className={'px-2'}>
                            <span>
                            ~
                        </span>
                        </div>
                        <div className={'flex-1'}>
                            <DatePicker suffixIcon={<DateIcon/>} placeholder={"날짜선택"}
                                        className={clsx(styles['date-picker'])}
                                        popupClassName={"admin-advertisement-date-picker"} onChange={() => {
                            }}/>
                        </div>
                    </div>
                </DataRow>
                <DataRow keyValue={"모집차량수"}>
                    <Input className={'w-[200px]'} inputClass={'w-[132px]'} value={"50"} iconChild={true}/>
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
                <DataRow keyValue={"광고모집기간"}>
                    <div className={'flex-1 flex items-center'}>
                        <div className={'flex-1'}>
                            <DatePicker suffixIcon={<DateIcon/>} popupClassName={"admin-advertisement-date-picker"}
                                        placeholder={"날짜선택"} className={clsx(styles['date-picker'])} onChange={() => {
                            }}/>
                        </div>
                        <div className={'px-2'}>
                            <span>
                            ~
                        </span>
                        </div>
                        <div className={'flex-1'}>
                            <DatePicker suffixIcon={<DateIcon/>} placeholder={"날짜선택"}
                                        className={clsx(styles['date-picker'])}
                                        popupClassName={"admin-advertisement-date-picker"} onChange={() => {
                            }}/>
                        </div>
                    </div>
                </DataRow>
                <DataRow keyValue={"광고유형"}>
                    <Select
                        popupClassName={"admin-advertisement-select"}
                        size={"large"}
                        // placeholder={<span className={styles['dropdown-text']}>고정형</span>}
                        onChange={handleAdType}
                        style={{ width: 200, borderRadius: "4px!important" }}
                        suffixIcon={<div className={'pr-1'}><DropdownIcon/></div>}
                        options={adListOptions}
                        defaultValue={"1"}
                    />
                </DataRow>

                <DataRow keyValue={"광고지역"} className={'!h-[80px]'}>
                    <div className={'px-1 flex flex-wrap   items-center pb-2'}>
                        {
                            adAreaOptions.map((obj, key) => {
                                return <Checkbox className={'mr-2 pt-2'} key={key}
                                                 onChange={areaChange}>{obj.label}</Checkbox>;
                            })
                        }
                    </div>
                </DataRow>
                <DataRow keyValue={"광고지역"}>
                    <div className={'px-1 flex flex-wrap   items-center pb-2'}>

                        <Radio.Group onChange={selectVehicleType} value={"1"}>
                            {
                                vehicleTypeOptions.map((obj, key) => {
                                    return <Radio name={"vehicleType"} className={'mr-2 pt-2'} key={"vehicleType"}
                                    >{obj.label}</Radio>;
                                })
                            }
                        </Radio.Group>

                    </div>
                </DataRow>
                <ChooseNumberOfVehicle/>
                <DataRow keyValue={"담당자"}>
                    <Input className={'w-[200px]'} inputClass={'w-[132px]'} value={"홍길동"} iconChild={true}/>
                </DataRow>
                <DataRow keyValue={"담당자 직위"}>
                    <Input className={'w-[200px]'} inputClass={'w-[132px]'} value={"사원"} iconChild={true}/>
                </DataRow>
                <DataRow keyValue={"담당자 휴대폰번호"}>
                    <Input className={'w-[200px]'} inputClass={'w-[132px]'} value={"010-1234-5678"} iconChild={true}/>
                </DataRow>
                <DataRow keyValue={"담당자 이메일"}>
                    <Input value={"must@mufin.co.kr"}/>
                </DataRow>
                <DataRow keyValue={"광고신청일시"}>
                   <span className={clsx('pl-4', styles['global-value'])}>
                        2023.06.01 09:00:00
                   </span>
                </DataRow>
                <DataRow keyValue={"광고내용"} className={'!h-[180px]'}>
                    <div className={clsx("pl-3 overflow-y-auto  h-[170px]", styles['pre-wrap'])}>
                        조수석 앞쪽/뒤쪽 도어에 6개월간 부착하는 광고입니다.

                        이카루스 서비스 오픈 출시 기념 홍보 광고입니다.
                        광고주와 화물주를 연결시켜서 광고주는 광고를 하고 화물주는 광고 부착 후 운행을 하면
                        돈을 벌 수 있는 양쪽 모두 윈윈할 수 있는 서비스입니다.

                        조수석 앞쪽/뒤쪽 도어에 6개월간 부착하는 광고입니다.

                        이카루스 서비스 오픈 출시 기념 홍보 광고입니다.
                        광고주와 화물주를 연결시켜서 광고주는 광고를 하고 화물주는 광고 부착 후 운행을 하면
                        돈을 벌 수 있는 양쪽 모두 윈윈할 수 있는 서비스입니다.
                        이카루스 서비스 오픈 출시 기념 홍보 광고입니다.
                        광고주와 화물주를 연결시켜서 광고주는 광고를 하고 화물주는 광고 부착 후 운행을 하면
                        돈을 벌 수 있는 양쪽 모두 윈윈할 수 있는 서비스입니다.

                        조수석 앞쪽/뒤쪽 도어에 6개월간 부착하는 광고입니다.

                        이카루스 서비스 오픈 출시 기념 홍보 광고입니다.
                        광고주와 화물주를 연결시켜서 광고주는 광고를 하고 화물주는 광고 부착 후 운행을 하면
                        돈을 벌 수 있는 양쪽 모두 윈윈할 수 있는 서비스입니다.
                        이카루스 서비스 오픈 출시 기념 홍보 광고입니다.
                        광고주와 화물주를 연결시켜서 광고주는 광고를 하고 화물주는 광고 부착 후 운행을 하면
                        돈을 벌 수 있는 양쪽 모두 윈윈할 수 있는 서비스입니다.

                        조수석 앞쪽/뒤쪽 도어에 6개월간 부착하는 광고입니다.

                        이카루스 서비스 오픈 출시 기념 홍보 광고입니다.
                        광고주와 화물주를 연결시켜서 광고주는 광고를 하고 화물주는 광고 부착 후 운행을 하면
                        돈을 벌 수 있는 양쪽 모두 윈윈할 수 있는 서비스입니다.
                        이카루스 서비스 오픈 출시 기념 홍보 광고입니다.
                        광고주와 화물주를 연결시켜서 광고주는 광고를 하고 화물주는 광고 부착 후 운행을 하면
                        돈을 벌 수 있는 양쪽 모두 윈윈할 수 있는 서비스입니다.

                        조수석 앞쪽/뒤쪽 도어에 6개월간 부착하는 광고입니다.

                        이카루스 서비스 오픈 출시 기념 홍보 광고입니다.
                        광고주와 화물주를 연결시켜서 광고주는 광고를 하고 화물주는 광고 부착 후 운행을 하면
                        돈을 벌 수 있는 양쪽 모두 윈윈할 수 있는 서비스입니다.
                    </div>

                </DataRow>
                <DataRow keyValue={"광고비용"}>
                   <div  className={clsx(styles['input-layout'],'flex justify-end w-[331px] items-center !border !border-[#eaecf0] h-[40px] space-x-4 pr-4')}>
                     <span className={styles['global-value']}>
                         20,900,000
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

                            {
                                adImages.map((value,key)=>{
                                    return  <img src={value} key={key}
                                                 alt="Lamp" style={{height : "156px",width : "198.4px"}}/>
                                })
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
                <div className={styles['save-button']}>
                    <span>
                       저장
                    </span>
                </div>
            </div>


        </div>
    );
};

export default AdminAdvertisementDetailsPage;