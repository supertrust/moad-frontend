
import React, { useCallback, useMemo, useState } from 'react';
import styels from './styles.module.scss'
import { ArrowBack } from '@mui/icons-material';

const colGeneral = {}

const MemberDetail = () => {


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
            <div className={styels['member-content']}>
                <div className={styels['member-content-box']}>
                    <div className={styels['member-content-title']}>
                        <p>아이디</p>
                    </div>
                    <div className={styels['member-content-data']}>
                        <p>mufincrew@mail.com</p>
                    </div>
                </div>
            </div>
            <div className={styels['member-content']}>
                <div className={styels['member-content-box']}>
                    <div className={styels['member-content-title']}>
                        <p>업종</p>
                    </div>
                    <div className={styels['member-content-data']}>
                        <p>금융업</p>
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


            <div className={styels['member-content']}>
                <div className={styels['member-content-box']}>
                    <div className={styels['member-content-title']}>
                        <p>회사 전화번호</p>
                    </div>
                    <div className={styels['member-content-data']}>
                        <div className={styels['member-content-data-input']} >
                            <input type="input" />
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
                            <input type="input" />
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
                            <select>
                                <option>Volvo</option>
                                <option>Saab</option>
                                <option>Opel</option>
                                <option>Audi</option>
                            </select>
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
                            <input type="input" />
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
                        <p>담당자 휴대폰번호</p>
                    </div>
                    <div className={styels['member-content-data']}>
                        <div className={styels['member-content-data-input']} >
                            <input type="input" />
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
                        <p>20건</p>
                    </div>
                </div>
            </div>

            <div className={styels['member-content']}>
                <div className={styels['member-content-box']}>
                    <div className={styels['member-content-title']}>
                        <p>블랙리스트 및 휴면상태</p>
                    </div>
                    <div className={styels['member-content-data']}>
                        <p>정상</p>
                    </div>
                </div>
            </div>

            <div className={styels['member-content']}>
                <div className={styels['member-content-box']}>
                    <div className={styels['member-content-title']}>
                        <p>사업자등록번호</p>
                    </div>
                    <div className={styels['member-content-data']}>
                        <p>569-19-01650</p>
                    </div>
                </div>
            </div>

            <div className={styels['member-content']}>
                <div className={styels['member-content-box']}>
                    <div className={styels['member-content-title']}>
                        <p>사업자등록증</p>
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
            </div>
            <div className={styels['member-content']}>
                <div className={styels['member-content-box']}>
                    <div className={styels['member-content-title']}>
                        <p>마케팅수신동의 및 약관동의</p>
                    </div>
                    <div className={styels['member-content-data']}>
                        <button>사업자등록증 보기</button>
                    </div>
                </div>
            </div>
            <div className={styels['member-content']}>
                <div className={styels['member-content-box']}>
                    <div className={styels['member-content-title']}>
                        <p>가입일시</p>
                    </div>
                    <div className={styels['member-content-data']}>
                        <p>2023.07.01 09:00:00</p>
                    </div>
                </div>
            </div>

            <div className={styels['member-content']}>
                <div className={styels['member-content-box']}>
                    <div className={styels['member-content-title']}>
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
                        <button>메모이력확인</button>
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
                <button className={styels['save-btn']}>저장</button>
            </div>
        </div>

    );
};

export default MemberDetail;