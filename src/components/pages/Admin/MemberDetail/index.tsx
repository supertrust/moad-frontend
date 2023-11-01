
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styels from './styles.module.scss'
import { ArrowBack, Padding } from '@mui/icons-material';
import Image from 'next/image';
import {
    FormProvider,
    RHFInput,
    useForm,
    yupResolver,
    Button,
} from '@src/components/common';
import { IAdvertiser, UpdateAdvertiserInfoType } from '@src/types/user';
import RHFSelect from '@src/components/common/Form/RHFSelect';
import { useGetAdvertiserInfo, useUpdateAdvertiserInfo } from '@src/apis/user';
import { useRouter } from 'next/router';
import Modal from '@mui/material/Modal';
import { Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const colGeneral = {}

type StyleType = {
    position: 'absolute';
    top: string;
    left: string;
    transform: string;
    width: number;
    bgcolor: string;
    borderRadius: string;
    boxShadow: number;
};
const MemberDetail = () => {
    const { query } = useRouter();
    const { user_id } = query;

    const { data: advertiser } = useGetAdvertiserInfo({ id: Number(user_id) });
    const [advertiserdata, setadvertiserdata] = useState<IAdvertiser | undefined>(undefined);

    const { mutateAsync: updateInfo } = useUpdateAdvertiserInfo();

    useEffect(() => {
        // Check if 'advertiser' data is available and then set 'advertiserdata'
        if (advertiser) {
            setadvertiserdata(advertiser);
        }
    }, [advertiser]);

    const options = [
        { value: '', text: '담당자 직위' },
        { value: '사원', text: '사원' },
        { value: '주임', text: '주임' },
        { value: '대리', text: '대리' },
        { value: '과장', text: '과장' },
        { value: '차장', text: '차장' },
        { value: '부장', text: '부장' },
        { value: '임원', text: '임원' },
        { value: '기타', text: '기타' }
    ];
    const { registration_date } = advertiser || {};
    const [date, time] = (registration_date || '').split('T').map(part => part.split('.')[0]);

    const defaultValues = {
        company_phone_number: advertiserdata?.company_phone_number,
        contact_person_mobile_number: advertiserdata?.contact_person_mobile_number ?? '',
        contact_position: advertiserdata?.contact_position ?? '',
        manager: advertiserdata?.manager ?? '',
        contact_email: advertiserdata?.contact_email ?? ''
    };

    const methods = useForm<UpdateAdvertiserInfoType>();

    const {
        handleSubmit,
    } = methods;
    const onSubmit = handleSubmit(async (props) => {
        const data = {
            id: Number(user_id) ?? 0,
            company_phone_no: advertiserdata?.company_phone_number||'',
            contact_phone_number: advertiserdata?.company_phone_number || '',
            contact_position: props?.contact_position || '',
            manager: advertiserdata?.manager || '',
            contact_email: advertiserdata?.contact_email || '',
        };
        
        await updateInfo(
            data,
            {
                onSuccess: () => {
                    console.log('success')
                },
                onError: (error) => {
                    console.log('error', error)
                },
            },
        );
    });
    const handleChange = (e) => {
        const newValue = e.target.value;
        const name = e.target.name;
        // @ts-ignore 
        setadvertiserdata({ ...advertiserdata, [name]: newValue });
    };
    const [certificateopen, setCertificateOpen] = useState(false);
    const [memoopen, setMemoOpen] = useState(false);
    const handleOpen = () => setCertificateOpen(true);
    const handleClose = () => setCertificateOpen(false);
    const handleMemoOpen = () => setMemoOpen(true);
    const handleMemoClose = () => setMemoOpen(false);

    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '8px',
        boxShadow: 24,
    };
    
    return (
        <div className={styels['member-detail']}>
            <div className={styels['member-detail-header']}>
                <div className={styels['header-title']}>
                    <svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 21L1 11L11 1" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p>회원상세</p>
                </div>
                <div className={styels['header-btn']}>
                    <button>블랙리스트 등록</button>
                    <button>엑셀다운로드</button>
                </div>
            </div>
            <FormProvider methods={methods}>
                <div className={styels['member-content']}>
                    <div className={styels['member-content-box']}>
                        <div className={styels['member-content-title']}>
                            <p>아이디</p>
                        </div>
                        <div className={styels['member-content-data']}>
                            <p>{advertiser?.employee_email}</p>
                        </div>
                    </div>
                </div>
                <div className={styels['member-content']}>
                    <div className={styels['member-content-box']}>
                        <div className={styels['member-content-title']}>
                            <p>업종</p>
                        </div>
                        <div className={styels['member-content-data']}>
                            <p>{advertiser?.sector}</p>
                        </div>
                    </div>
                </div>
                <div className={styels['member-content']}>
                    <div className={`${styels['member-content-box']}`}>
                        <div className={styels['member-content-title']}>
                            <p>회사명</p>
                        </div>
                        <div className={styels['member-content-data']}>
                            <p>{advertiser?.company_name}</p>
                        </div>
                    </div>
                </div>


                <div className={styels['member-content']}>
                    <div className={styels['member-content-box']}>
                        <div className={styels['member-content-title']}>
                            <p>회사 전화번호</p>
                        </div>
                        <div className={styels['member-content-data']}>
                            <div className={styels['member-content-data-input']} >
                                <RHFInput
                                    type='text'
                                    className='user-input'
                                    placeholder='이메일 입력'
                                    name='company_phone_number'
                                    id='company_phone_number'
                                    value={advertiserdata?.company_phone_number}
                                    onChange={handleChange}
                                />
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="20px/edit">
                                        <path id="Vector" d="M7.1999 2.3999H3.64435C3.3143 2.3999 2.99777 2.53101 2.76439 2.76439C2.53101 2.99777 2.3999 3.3143 2.3999 3.64435V12.3555C2.3999 12.6855 2.53101 13.002 2.76439 13.2354C2.99777 13.4688 3.3143 13.5999 3.64435 13.5999H12.3555C12.6855 13.5999 13.002 13.4688 13.2354 13.2354C13.4688 13.002 13.5999 12.6855 13.5999 12.3555V8.7999" stroke="#6B7280" stroke-width="1.4667" stroke-linecap="round" stroke-linejoin="round" />
                                        <path id="Vector_2" d="M11.5485 2.75189C11.7739 2.52652 12.0796 2.3999 12.3983 2.3999C12.7171 2.3999 13.0227 2.52652 13.2481 2.75189C13.4735 2.97727 13.6001 3.28294 13.6001 3.60167C13.6001 3.9204 13.4735 4.22607 13.2481 4.45145L7.86617 9.83338L5.6001 10.3999L6.16662 8.13382L11.5485 2.75189Z" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styels['member-content']}>
                    <div className={styels['member-content-box']}>
                        <div className={styels['member-content-title']}>
                            <p>담당자</p>
                        </div>
                        <div className={styels['member-content-data']}>
                            <div className={styels['member-content-data-input']} >
                                <RHFInput
                                    type='text'
                                    className='user-input'
                                    placeholder='이메일 입력'
                                    name='manager'
                                    id='manager'
                                    value={advertiserdata?.manager}
                                    onChange={handleChange}
                                />
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="20px/edit">
                                        <path id="Vector" d="M7.1999 2.3999H3.64435C3.3143 2.3999 2.99777 2.53101 2.76439 2.76439C2.53101 2.99777 2.3999 3.3143 2.3999 3.64435V12.3555C2.3999 12.6855 2.53101 13.002 2.76439 13.2354C2.99777 13.4688 3.3143 13.5999 3.64435 13.5999H12.3555C12.6855 13.5999 13.002 13.4688 13.2354 13.2354C13.4688 13.002 13.5999 12.6855 13.5999 12.3555V8.7999" stroke="#6B7280" stroke-width="1.4667" stroke-linecap="round" stroke-linejoin="round" />
                                        <path id="Vector_2" d="M11.5485 2.75189C11.7739 2.52652 12.0796 2.3999 12.3983 2.3999C12.7171 2.3999 13.0227 2.52652 13.2481 2.75189C13.4735 2.97727 13.6001 3.28294 13.6001 3.60167C13.6001 3.9204 13.4735 4.22607 13.2481 4.45145L7.86617 9.83338L5.6001 10.3999L6.16662 8.13382L11.5485 2.75189Z" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={styels['member-content']}>
                    <div className={styels['member-content-box']}>
                        <div className={styels['member-content-title']}>
                            <p>담당자 직위</p>
                        </div>
                        <div className={styels['member-content-data']}>
                            <div className={styels['member-content-data-select']} >
                                <RHFSelect
                                    wrapperClassName='manager-tel'
                                    required
                                    id='contact_position'
                                    name='contact_position'
                                    options={options}
                                    className={styels['member-content-data-select']}
                                    selected={advertiserdata?.contact_position}
                                />
                            </div>
                        </div>
                    </div>
                </div>


                <div className={styels['member-content']}>
                    <div className={styels['member-content-box']}>
                        <div className={styels['member-content-title']}>
                            <p>담당자 휴대폰번호</p>
                        </div>
                        <div className={styels['member-content-data']}>
                            <div className={styels['member-content-data-input']} >
                                <RHFInput
                                    type='text'
                                    className='user-input'
                                    placeholder='이메일 입력'
                                    name='contact_person_mobile_number'
                                    id='contact_person_mobile_number'
                                    value={advertiserdata?.contact_person_mobile_number}
                                    onChange={handleChange}
                                />
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="20px/edit">
                                        <path id="Vector" d="M7.1999 2.3999H3.64435C3.3143 2.3999 2.99777 2.53101 2.76439 2.76439C2.53101 2.99777 2.3999 3.3143 2.3999 3.64435V12.3555C2.3999 12.6855 2.53101 13.002 2.76439 13.2354C2.99777 13.4688 3.3143 13.5999 3.64435 13.5999H12.3555C12.6855 13.5999 13.002 13.4688 13.2354 13.2354C13.4688 13.002 13.5999 12.6855 13.5999 12.3555V8.7999" stroke="#6B7280" stroke-width="1.4667" stroke-linecap="round" stroke-linejoin="round" />
                                        <path id="Vector_2" d="M11.5485 2.75189C11.7739 2.52652 12.0796 2.3999 12.3983 2.3999C12.7171 2.3999 13.0227 2.52652 13.2481 2.75189C13.4735 2.97727 13.6001 3.28294 13.6001 3.60167C13.6001 3.9204 13.4735 4.22607 13.2481 4.45145L7.86617 9.83338L5.6001 10.3999L6.16662 8.13382L11.5485 2.75189Z" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>



                <div className={styels['member-content']}>
                    <div className={styels['member-content-box']}>
                        <div className={styels['member-content-title']}>
                            <p>담당자 이메일</p>
                        </div>
                        <div className={styels['member-content-data']}>
                            <div className={styels['member-content-data-input']} >
                                <RHFInput
                                    type='text'
                                    className='user-input'
                                    placeholder='이메일 입력'
                                    name='contact_email'
                                    id='contact_email'
                                    value={advertiserdata?.contact_email}
                                    onChange={handleChange}
                                />
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="20px/edit">
                                        <path id="Vector" d="M7.1999 2.3999H3.64435C3.3143 2.3999 2.99777 2.53101 2.76439 2.76439C2.53101 2.99777 2.3999 3.3143 2.3999 3.64435V12.3555C2.3999 12.6855 2.53101 13.002 2.76439 13.2354C2.99777 13.4688 3.3143 13.5999 3.64435 13.5999H12.3555C12.6855 13.5999 13.002 13.4688 13.2354 13.2354C13.4688 13.002 13.5999 12.6855 13.5999 12.3555V8.7999" stroke="#6B7280" stroke-width="1.4667" stroke-linecap="round" stroke-linejoin="round" />
                                        <path id="Vector_2" d="M11.5485 2.75189C11.7739 2.52652 12.0796 2.3999 12.3983 2.3999C12.7171 2.3999 13.0227 2.52652 13.2481 2.75189C13.4735 2.97727 13.6001 3.28294 13.6001 3.60167C13.6001 3.9204 13.4735 4.22607 13.2481 4.45145L7.86617 9.83338L5.6001 10.3999L6.16662 8.13382L11.5485 2.75189Z" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={styels['member-content']}>
                    <div className={styels['member-content-box']}>
                        <div className={styels['member-content-title']}>
                            <p>총 광고건수</p>
                        </div>
                        <div className={styels['member-content-data']}>
                            <p>{advertiser?.total_ad_no}건</p>
                        </div>
                    </div>
                </div>

                <div className={styels['member-content']}>
                    <div className={styels['member-content-box']}>
                        <div className={styels['member-content-title']}>
                            <p>블랙리스트 및 휴면상태</p>
                        </div>
                        <div className={styels['member-content-data']}>
                            <p>{advertiser?.dormant_state == 0 ? '정상' : '블랙리스트'}</p>
                        </div>
                    </div>
                </div>

                <div className={styels['member-content']}>
                    <div className={styels['member-content-box']}>
                        <div className={styels['member-content-title']}>
                            <p>사업자등록번호</p>
                        </div>
                        <div className={styels['member-content-data']}>
                            <p>{advertiser?.company_registration_number}</p>
                        </div>
                    </div>
                </div>

                {/* <div className={styels['member-content']}>
                    <div className={styels['member-content-box']}>
                        <div className={styels['member-content-title']}>
                            <p>마케팅수신동의 및 약관동의</p>
                        </div>
                        <div className={styels['member-content-data']}>

                            <div className={styels['checkbox']}>
                                <div>
                                    <input type="checkbox" id="term1" name="term1" value="Bike" />
                                    <label htmlFor="term1">문자</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="term2" name="term2" value="Bike" />
                                    <label htmlFor="term2">ARS</label>
                                </div>
                            </div>
                            <button>사업자등록증 보기</button>
                        </div>
                    </div>
                </div> */}
                <div className={styels['member-content']}>
                    <div className={styels['member-content-box']}>
                        <div className={styels['member-content-title']}>
                            <p>사업자등록증</p>
                        </div>
                        <div className={styels['member-content-data']}>
                            <button onClick={handleOpen}>사업자등록증 보기</button>
                        </div>
                    </div>
                </div>
                <div className={styels['member-content']}>
                    <div className={styels['member-content-box']}>
                        <div className={styels['member-content-title']}>
                            <p>가입일시</p>
                        </div>
                        <div className={styels['member-content-data']}>
                            <p>{date} {time}</p>
                        </div>
                    </div>
                </div>

                <div className={styels['member-content']}>
                    <div className={styels['member-content-box']}>
                        <div className={`${styels['member-content-title']} min-h-[200px]`}>
                            <p>고객메모(0/300)</p>
                        </div>
                        <div className={styels['member-content-data']}>
                            <div className={styels['member-content-data-model']}>
                                <textarea name="" id="" cols={30} rows={10}></textarea>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={styels['member-content']}>
                    <div className={styels['member-content-box']}>
                        <div className={styels['member-content-title']}>
                            <p>고객메모이력</p>
                        </div>
                        <div className={styels['member-content-data']}>
                            <button onClick={handleMemoOpen}>메모이력확인</button>
                        </div>
                    </div>
                </div>


                <div className={styels['member-content']}>
                    <div className={styels['member-content-box']}>
                        <div className={styels['member-content-title']}>
                            <p>관리자</p>
                        </div>
                        <div className={styels['member-content-data']}>
                            <button className={styels.disabled_btn}>김관리</button>
                        </div>
                    </div>
                </div>


                <div className={styels['charts_btn']}>
                    <button className={styels['cancel-btn']}>취소</button>
                    {/* <button type='submit' >저장</button> */}
                    <Button
                        className={styels['save-btn']}
                        onClick={onSubmit}
                    // disabled={Object.keys(dirtyFields).length !== 3}
                    >
                        저장
                    </Button>
                </div>
            </FormProvider>
            <Modal
                open={certificateopen
                }
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="div" sx={style}>
                    <Box component="div" sx={{
                        padding: '30px 0px !important',

                    }}>
                        <Typography sx={{
                            color: '#29293E',
                            fontSize: '20px',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: 'normal',
                            textAlign: 'center',
                            paddingBottom: '0px 15px',
                            borderBottom: '1px solid #FFFFFF',
                        }}>사업자등록증 보기
                        </Typography>
                        <Box component="div">
                            <CloseIcon
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                }}
                            />
                        </Box>
                    </Box>
                    <Box component="div" sx={{ padding: '16px'}}>
                        <Box component="div">
                            <Image className={styels['model-image']}
                                src={advertiser?.company_registration_certificate || ''}
                                width={100}
                                height={100}
                                alt='image'
                            />
                        </Box>
                        <Box component="div" className={styels['model-btns']}>
                            <button className={styels['image-download']}>이미지 다운로드</button>
                            <button className={styels['image-download-check']}>확인</button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={memoopen}
                onClose={handleMemoClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="div" sx={style} className={styels['history_model']}>
                    <Box component="div" sx={{padding: '30px 0px !important'}}>
                        <Typography sx={{
                            color: '#29293E',
                            fontSize: '20px',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: 'normal',
                            textAlign: 'center',
                            paddingBottom: '0px 15px',
                            borderBottom: '1px solid #FFFFFF',
                        }}>고객메모이력
                        </Typography>
                        <Box component="div">
                            <CloseIcon
                                onClick={handleMemoClose}
                                sx={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                }}
                            />
                        </Box>
                    </Box>

                    <Box component="div" sx={{ padding: '16px' }}>

                        <Box component="div">
                            <div className={styels['member-content']}>
                                <div className={styels['member-content-box']}>
                                    <div className={styels['member-content-title']}>
                                        <p>아이디</p>
                                    </div>
                                    <div className={styels['member-content-data']}>
                                        <div className={`${styels['member-content-data-select']} ${styels['content-data-select']}`} >
                                            <select>
                                                <option>Volvo</option>
                                                <option>Saab</option>
                                                <option>Opel</option>
                                                <option>Audi</option>
                                            </select>
                                        </div>
                                        <div className={styels['member-content-data-select-option']}>
                                            <input type="text" />
                                            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.5">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.41314 10.8263C9.1266 10.8263 11.3263 8.6266 11.3263 5.91314C11.3263 3.19969 9.1266 1 6.41314 1C3.69969 1 1.5 3.19969 1.5 5.91314C1.5 8.6266 3.69969 10.8263 6.41314 10.8263Z" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M10.2194 9.71886L13.3075 12.807" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </g>
                                            </svg>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className={styels['member-content']}>
                                <div className={`${styels['member-content-box']} !bg-transparent`}>
                                    <div className={styels['member-content-title']}>
                                        <p>작성일</p>
                                    </div>
                                    <div className={`${styels['member-content-data']} ${styels['member-model-content']}`}>
                                        <div className={styels['model-calander']}>
                                            <input type="date" />
                                        </div>
                                        <span>~</span>
                                        <div className={styels['model-calander']}>
                                            <input type="date" />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className={styels['member-content']}>
                                <div className={styels['member-content-box']}>
                                    <div className={styels['member-content-title']}>
                                        <p>회사명</p>
                                    </div>
                                    <div className={styels['member-content-data']}>
                                        <p>머스트핀테크</p>
                                    </div>
                                </div>
                            </div>
                        </Box>
                        <Box component="div" sx={{marginTop: '16px'}}>
                            <table className={styels['model-table']}>
                                <tr>
                                    <th className={styels['model-table-no']}>NO</th>
                                    <th>메모내용</th>
                                    <th>작성일시</th>
                                    <th>작성일시</th>
                                </tr>
                                <tr>
                                    <td className={styels['model-table-data']}>1</td>
                                    <td>Maria Anders</td>
                                    <td>Germany</td>
                                    <td>Germany</td>
                                </tr>
                            </table>
                            <button className={styels['model-table-btn']}>확인</button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>

    );
};

export default MemberDetail;