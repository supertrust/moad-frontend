import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import styles from './styles.module.css';

export default function AdModel({ setShowModal }: { setShowModal: (show: boolean) => void }) {

    const closeModal = () => {
        setShowModal(false);
    };
    const [model, setmodel] = useState("card1");

    const modelStatus = (status: string) => {
        setmodel(status);
    };
    const [isOpen, openPeriodlist] = useState(false);
    const [period, setPeriod] = useState("");

    const periodList = () => {
        openPeriodlist(!isOpen);
    };
    const periodStatus = (period: string) => {
        setPeriod(period);
        openPeriodlist(false);;
    };
    const [isActive, setActive] = useState(false);
    const ToggleClass = () => {
        setActive(!isActive);
    };

    const area = [
        {
            'id': 'seoul', 'value': '서울'
        },
        { 'id': 'gyeonggi', 'value': '경기' },
        { 'id': 'incheon', 'value': '인천' },
        { 'id': 'daejeon', 'value': '대전' },
        { 'id': 'sejong', 'value': '세종' },
        { 'id': 'chung_nam', 'value': '충남' },
        { 'id': 'chung_buk', 'value': '충북', },
        { 'id': 'gwangju', 'value': '광주', },
        { 'id': 'jeon_nam', 'value': '전남', },
        { 'id': 'jeon_buk', 'value': '전북', },
        { 'id': 'daegu', 'value': '대구', },
        { 'id': 'gyeon_buk', 'value': '경북', },
        { 'id': 'busan', 'value': '부산', },
        { 'id': 'ulsan', 'value': '울산', },
        { 'id': 'gyeong_nam', 'value': '경남', },
        { 'id': 'gangwon', 'value': '강원', },
        { 'id': 'jeju', 'value': '제주', },
    ]
    return (
        <>
            {/* <div className="ad-list">
        <h4>ad model</h4>
      </div>
      <button onClick={() => setShowModal(false)}>Close</button> */}
            <div className={styles.adApplyModal}>
                <div className={styles.adModalWrap}>
                    <div className={styles.adApplyTitle}>
                        <button type="button" id="ic_close_btn" className="ic-close-btn only-mb"></button>광고신청
                    </div>
                    <div id="ad_apply_info" className={isActive ? `${styles.adApplyInfo} ${styles.onlyPc} active` : `${styles.adApplyInfo} ${styles.onlyPc}`}>
                        <div className={styles.infoContent}>
                            <div className={styles.infoText}>
                                광고가 노출되는 지역을 선택해  광고를 생성하세요.<br />
                                지역에 따라 광고의 특성이 달라질 수 있습니다.
                            </div>
                            <div id="slide_wrap" className={styles.slideWrap} >
                                <ul className={styles.infoListWrap}>
                                    <li className={styles.list}>광고 목적에 따라 광고 상품 유형을 선택하고, 광고 노출 기간 등 원하시는 조건을 등록하실 수 있습니다.</li>
                                    <li className={styles.list}>광고 유형은 ‘고정형광고, ‘전국광고’, ‘스팟광고’,  총 3가지입니다.  등록 후 유형 변경은 불가하니 어떤 광고 상품을 진행할지 검토 후 선택하세요.</li>
                                    <li className={styles.list}>광고 등록시 1~2일 정도 검수시간이 소요됩니다.  (담당자 전화번호로 연락드립니다.)</li>
                                </ul>
                                <div className={styles.infoImgWrap}>
                                    <div className={styles.imgTitle}>
                                        부착예시
                                    </div>
                                    <div className={styles.imgWrap}>
                                        {/* <img src={`/images/advertising-apply-modal/img-car01.png`} alt="" className= "img img01" />
                                <img src={`/images/advertising-apply-modal/img-car02.png`} alt="" className="img img02" />
                                <img src={`/images/advertising-apply-modal/img-car03.png`} alt="" className="img img03" /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="more_btn" className={styles.moreBtn}>
                            <div className={styles.textWrap} onClick={ToggleClass}><span className="more-text">자세히</span> <i className="ic-down-blue"></i></div>
                        </div>
                    </div>
                    {/*<div className={`${styles.adApplyInfoMb} ${styles.onlyMb}`}>*/}
                    {/*    <div className={styles.infoText}>*/}
                    {/*        광고가 노출되는 지역을 선택해  광고를 생성하세요.<br />*/}
                    {/*        지역에 따라 광고의 특성이 달라질 수 있습니다.<br /><br />*/}
                    {/*        광고 목적에 따라 광고 상품 유형을 선택하고, 광고 노출 기간 등 원하시는 조건을 등록하실 수 있습니다.<br /><br />*/}
                    {/*        광고 유형은 ‘고정형광고, ‘전국광고’, ‘스팟광고’,  총 3가지입니다.  등록 후 유형 변경은 불가하니 어떤 광고 상품을 진행할지 검토 후 선택하세요.<br /><br />*/}
                    {/*        광고 등록시 1~2일 정도 검수시간이 소요됩니다.<br />*/}
                    {/*        (담당자 전화번호로 연락드립니다.)*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className={styles.adApplyContent}>
                        <div className={styles.radioWrap}>
                            <div className={`${styles.title} ${styles.onlyPc}`}>광고 유형</div>
                            <div className={styles.modalSelectWrap}>
                                <div onClick={() => {
                                    modelStatus("card1");
                                }}
                                    className={model === "card1" ? `${styles.modalSelect} reset active` : styles.modalSelect}>
                                    <label className={styles.selectBox}>
                                        <input type="radio" name="ad_type" id="fixed_ad" className="hidden" />
                                        <i className={styles.icRadio}></i>
                                        <a href="src/sections/dashboard" className={styles.detailDesc}>상세설명</a>
                                        <div className={`${styles.boxIcon} ${styles.boxIcon01}`}></div>
                                        <div className={styles.text}>
                                            <strong className={styles.text}>고정형 광고</strong><br />
                                            특정 지역 화주들을 매칭하여<br />
                                            노출할 수 있는 고정형 광고
                                        </div>
                                    </label>
                                </div>
                                <div onClick={() => {
                                    modelStatus("card2");
                                }}
                                    className={model === "card2" ? `${styles.modalSelect} active` : styles.modalSelect}>
                                    <label className={styles.selectBox}>
                                        <input type="radio" name="ad_type" value="전국형광고" id="nationwide_ad" className="hidden" />
                                        <i className={styles.icRadio}></i>
                                        <a href="src/sections/dashboard" className={styles.detailDesc}>상세설명</a>
                                        <div className={`${styles.boxIcon} ${styles.boxIcon02}`}></div>
                                        <div className={styles.text}>
                                            <strong className={styles.text}>전국형 광고 </strong><br />
                                            전국 모든 화주들을 매칭하여 적은 비용으로<br />
                                            광고효과를 최대화 할 수 있는 광고
                                        </div>
                                    </label>
                                </div>
                                <div onClick={() => {
                                    modelStatus("card3");
                                }}
                                    className={model === "card3" ? `${styles.modalSelect} active` : styles.modalSelect}>
                                    <label className={styles.selectBox}>
                                        <input type="radio" name="ad_type" value="스팟광고" id="spot_ad" className="hidden" />
                                        <i className={styles.icRadio}></i>
                                        <a href="src/sections/dashboard" className={styles.detailDesc}>상세설명</a>
                                        <div className={`${styles.boxIcon} ${styles.boxIcon03}`}></div>
                                        <div className={styles.text}>
                                            <strong className={styles.text}>스팟광고</strong><br />
                                            1시간 단위로 원하는 특정지역과 특정시간에<br />
                                            노출할 수 있는 광고
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className={styles.modalStep}>
                            <div className={`${styles.inputSection} ${styles.titleSection}`}>
                                <div className={styles.inputTitle}>광고이름</div>
                                <input type="text" id="input_ad_title" className={`${styles.box} ${styles.inputAdTitle}`} maxLength={25} />
                                <div className={styles.textCount}>
                                    0/25
                                </div>
                            </div>

                            <div className={`${styles.inputSection} ${styles.dateSection}`}>
                                <div className={styles.inputWrap}>
                                    <div className={styles.inputTitle}>광고기간</div>
                                    <div className={isOpen ? `${styles.selectWrap} ${styles.spotAdd} active` : `${styles.selectWrap} ${styles.spotAdd}`}>
                                        <div className={styles.selectText}>
                                            <input type="text" onClick={periodList} value={period ? period : ''} className={`${styles.selectInput} ${styles.box}`} id="select_input" placeholder="기간 선택" readOnly />
                                            <div id="calender_area"></div>
                                        </div>
                                        <ul className={styles.dateSelectBox}>
                                            <li className={styles.dateList} onClick={() => periodStatus("6개월")} data-months="6_months"><label htmlFor="6_months" className={styles.periodLabel}>6개월<input type="radio" value="6" name="date_period" id="6_months" className={styles.periodInput} /></label></li>
                                            <li className={styles.dateList} onClick={() => periodStatus("12개월")} data-months="12_months"><label htmlFor="12_months" className={styles.periodLabel}>12개월<input type="radio" value="12" name="date_period" id="12_months" className={styles.periodInput} /></label></li>
                                            <li className={`${styles.dateList} hidden`} data-months="consulting"><label htmlFor="consulting" className={styles.periodLabel}>추후상담<input type="radio" value="consulting" name="date_period" id="consulting" className={styles.periodInput} /></label></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={`${styles.inputWrap} ${styles.adStartDate}`}>
                                    <div className={styles.subTitle}>시작일</div>
                                    <Form.Control
                                        type="date"
                                        name="doj"
                                        placeholder="Date of Joining"
                                    />

                                </div>
                                <div className={styles.inputWrap}>
                                    <div className={styles.subTitle}>총 광고기간</div>
                                    <div className={styles.dateContent}>
                                        <input type="text" name="date_start" id="input_date_start" className={`${styles.box} ${styles.inputDateStart}`} readOnly /> ~
                                        <input type="text" name="date_end" id="input_date_end" className={`${styles.box} ${styles.inputDateEnd}`} readOnly />
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.inputSection} ${styles.vehiclesSection}`}>
                                <div className={styles.inputTitle}>운행차량</div>
                                <ul className={styles.tableWrap}>
                                    <li className={`${styles.tableRow} ${styles.listHd}`}>
                                        <div className={`${styles.text} ${styles.cell}`}>차량</div>
                                        <div className={`${styles.text} ${styles.cell}`}>차량대수</div>
                                        <div className={`${styles.text} ${styles.cell} ${styles.standardWrap}`}>규격</div>
                                        <div className={`${styles.text} ${styles.cell} ${styles.priceWrap}`}>가격</div>
                                    </li>
                                    <li className={`${styles.tableRow} ${styles.list}`}>
                                        <div className={`${styles.text} ${styles.cell}`}>1t</div>
                                        <div className={`${styles.cell} ${styles.vehiclesNumWrap}`}>
                                            <input type="text" name="vehicles_num" className={styles.inputNum} id="1t" placeholder="직접입력" />
                                            <span className={styles.text}>대</span>
                                        </div>
                                        <div className={`${styles.cell} ${styles.standardWrap}`}>
                                            <span className={styles.text}>2m X 1.1m x 2 / 후면 (무료서비스)</span>
                                        </div>
                                        <div className={`${styles.priceWrap} ${styles.spotAdd}`}>
                                            <input type="text" name="1t_price" className={`${styles.text} ${styles.priceInput}`} readOnly />
                                            <span className={`${styles.text} ${styles.won}`}>원</span>
                                        </div>
                                    </li>
                                    <li className={`${styles.tableRow} ${styles.list}`}>
                                        <div className={`${styles.text} ${styles.cell}`}>2.5t</div>
                                        <div className={`${styles.cell} ${styles.vehiclesNumWrap}`}>
                                            <input type="text" name="vehicles_num" className={styles.inputNum} id="2_5t" placeholder="직접입력" />
                                            <span className={styles.text}>대</span>
                                        </div>
                                        <div className={`${styles.cell} ${styles.standardWrap}`}>
                                            <span className={styles.text}>3.8m X 1.2m x 2 / 후면 (무료서비스)</span>
                                        </div>
                                        <div className={`${styles.priceWrap} ${styles.spotAdd}`}>
                                            <input type="text" name="2_5t_price" className={`${styles.text} ${styles.priceInput}`} readOnly />
                                            <span className={`${styles.text} ${styles.won}`}>원</span>
                                        </div>
                                    </li>
                                    <li className={`${styles.tableRow} ${styles.list}`}>
                                        <div className={`${styles.text} ${styles.cell}`}>5t</div>
                                        <div className={`${styles.cell} ${styles.vehiclesNumWrap}`}>
                                            <input type="text" name="vehicles_num" className={styles.inputNum} id="5t" placeholder="직접입력" />
                                            <span className={styles.text}>대</span>
                                        </div>
                                        <div className={`${styles.cell} ${styles.standardWrap}`}>
                                            <span className={styles.text}>6m X 1.3m x 2 / 후면 (무료서비스)</span>
                                        </div>
                                        <div className={`${styles.priceWrap} ${styles.spotAdd}`}>
                                            <input type="text" name="5t_price" className={`${styles.text} ${styles.priceInput}`} readOnly />
                                            <span className={`${styles.text} ${styles.won}`}>원</span>
                                        </div>
                                    </li>
                                    <li className={`${styles.tableRow} ${styles.list}`}>
                                        <div className={`${styles.text} ${styles.cell}`}>11t</div>
                                        <div className={`${styles.cell} ${styles.vehiclesNumWrap}`}>
                                            <input type="text" name="vehicles_num" className={styles.inputNum} id="11t" placeholder="직접입력" />
                                            <span className={styles.text}>대</span>
                                        </div>
                                        <div className={`${styles.cell} ${styles.standardWrap}`}>
                                            <span className={styles.text}>8m X 1.3m x 2 / 후면 (무료서비스)</span>
                                        </div>
                                        <div className={`${styles.priceWrap} ${styles.spotAdd}`}>
                                            <input type="text" name="11t_price" className={`${styles.text} ${styles.priceInput}`} readOnly />
                                            <span className={`${styles.text} ${styles.won}`}>원</span>
                                        </div>
                                    </li>
                                </ul>
                                <div className={`${styles.spotInfo} ${styles.spotAdd}`}>
                                    스팟광고의 광고 희망시간/기간등 차후 상담에 따라 결정됩니다.
                                </div>
                            </div>

                            <div className={`${styles.inputSection} ${styles.areaSection} active`}>
                                <div className={styles.inputTitle}>운행지역 (다중 선택 가능)</div>
                                <button type="button" id="reset_btn" className={styles.resetBtn}>
                                    <span className={styles.text}>초기화</span>
                                    <i className={styles.icReset}></i>
                                </button>
                                <div className={styles.chkGrid}>
                                    {area.map((item) =>
                                        <div key={item.id} className={styles.chkWrap}><input type="checkbox" id={item.id} className={styles.chkInput} name="area" />
                                            <label htmlFor={item.id} className={styles.chkArea}>{item.value}</label></div>

                                    )}
                                </div>
                                <div id="area_modal" className={`${styles.areaModal} ${styles.checkModal}`}>
                                    <div className={styles.checkModalWrap}>
                                        <div className={styles.title}>확인사항</div>
                                        <div className={styles.text}>
                                            모든 운행 지역을 선택할 시<br />
                                            광고 유형을 전국형으로 변경해주세요
                                        </div>
                                        <div className={styles.btnWrap}>
                                            <button type="button" id="area_modal_close" className={styles.activeBtn}>확인</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.priceSection}>
                                <div className={`${styles.priceBox} ${styles.spotAdd}`}>
                                    <div className={styles.priceText}>광고비용</div>
                                    <div id="total_price" className={`${styles.priceText} ${styles.totalPrice}`}></div>
                                    <div className={`${styles.priceText} ${styles.textWon}`}>원</div>
                                </div>
                                <div className={styles.priceInfo}>
                                    광고비용은 차후 상담에 따라 변경 될 수  있습니다.
                                </div>
                            </div>

                            <div className={styles.errorBox}>
                                <div className={styles.errorLine}>
                                    <i className={styles.icError}></i>
                                    <div className={`${styles.errorText} title-error`}>광고이름을 입력해주세요.</div>
                                    <div className={`${styles.errorText} end-error`}>광고기간을 6개월 또는 12개월 선택해주세요.</div>
                                    <div className={`${styles.errorText} start-error`}>
                                        시작일을 선택해주세요.
                                        <span className={styles.onlyPc}>(광고 등록일 기준 1달 이후 부터 선택 가능)</span>
                                        <span className={styles.onlyMb}>(등록 기준 1달 이후 선택)</span>
                                    </div>
                                    <div className={`${styles.errorText} vehicles-error`}>운행차량을 입력해주세요.</div>
                                    <div className={`${styles.errorText} area-error`}>운행지역을 선택해주세요.</div>
                                </div>
                            </div>

                            <div className={styles.btnSection}>
                                <button type="button" id="ad_apply_cancel" onClick={() => setShowModal(false)} className={`${styles.btns} ${styles.cancelBtn}`}>취소</button>
                                 <button type="button" id="ad_apply_btn" className={`${styles.btns} ${styles.adApplyBtn}`} onclick="return onClickSave()">광고 신청</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
