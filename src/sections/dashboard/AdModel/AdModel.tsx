import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import styles from "./styles.module.css";
export default function AdModel({ setShowModal }: { setShowModal: (show: boolean) => void }) {

    const [model, setmodel] = useState("card1");
    const [isOpen, openPeriodlist] = useState(false);
    const [period, setPeriod] = useState("");
    const [isActive, setActive] = useState(false);

    const area = [
        {'id': 'seoul', 'value': '서울'},
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
            <div id={styles.ad_apply_modal} className="ad-apply-modal">
                <div className={styles.ad_modal_wrap}>
                    <div className={styles.ad_apply_title}>
                        <button type="button" id={styles.ic_close_btn} className={`${styles.ic_close_btn} ${styles.only_mb}`}></button>광고신청
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
                            <div className={styles.modal_select_wrap}>
                                <div onClick={() => {
                                    setmodel("card1");
                                }}
                                    className={`${model === "card1" ? styles.active : ""} ${styles.modal_select}`}>
                                    <label className={styles.select_box}>
                                        <input type="radio" name="ad_type" id="fixed_ad" className={styles.hidden} />
                                        <i className={styles.ic_radio}></i>
                                        <a href="" className={styles.detail_desc}>상세설명</a>
                                        <div className={`${styles.box_icon} ${styles.box_icon01}`}></div>
                                        <div className={styles.text}>
                                            <strong className={styles.text}>고정형 광고</strong><br />
                                            특정 지역 화주들을 매칭하여<br />
                                            노출할 수 있는 고정형 광고
                                        </div>
                                    </label>
                                </div>
                                <div onClick={() => {
                                    setmodel("card2");
                                }}
                                    className={`${model === "card2" ? styles.active : ""} ${styles.modal_select}`}>
                                    <label className={styles.select_box}>
                                        <input type="radio" name="ad_type" value="전국형광고" id="nationwide_ad" className={styles.hidden} />
                                        <i className={styles.ic_radio}></i>
                                        <a href="" className={styles.detail_desc}>상세설명</a>
                                        <div className={`${styles.box_icon} ${styles.box_icon02}`}></div>
                                        <div className={styles.text}>
                                            <strong className={styles.text}>전국형 광고 </strong><br />
                                            전국 모든 화주들을 매칭하여 적은 비용으로<br />
                                            광고효과를 최대화 할 수 있는 광고
                                        </div>
                                    </label>
                                </div>
                                <div onClick={() => {
                                    setmodel("card3");
                                }}
                                    className={`${model === "card3" ? styles.active : ""} ${styles.modal_select}`}>
                                    <label className={styles.select_box}>
                                        <input type="radio" name="ad_type" value="스팟광고" id="spot_ad" className={styles.hidden} />
                                        <i className={styles.ic_radio}></i>
                                        <a href="" className={styles.detail_desc}>상세설명</a>
                                        <div className={`${styles.box_icon} ${styles.box_icon03}`}></div>
                                        <div className={styles.text}>
                                            <strong className={styles.text}>스팟광고</strong><br />
                                            1시간 단위로 원하는 특정지역과 특정시간에<br />
                                            노출할 수 있는 광고
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className={styles.modal_step}>
                            <div className={`${styles.input_section} ${styles.title_section}`}>
                                <div className={styles.input_title}>광고이름</div>
                                <input type="text" id="input_ad_title" className={`${styles.box} ${styles.input_ad_title}`} maxLength={25} />
                                <div className={styles.text_count}>
                                    0/25
                                </div>
                            </div>

                            <div className={`${styles.input_section} ${styles.date_section}`}>
                                <div className={styles.input_wrap}>
                                    <div className={styles.input_title}>광고기간</div>
                                    <div className={`${isOpen ? styles.active : ""} ${styles.select_wrap} ${styles.spot_add}`}>
                                        <div className={styles.select_text}>
                                            <input type="text" onClick={() => { openPeriodlist(!isOpen) }} value={period ? period : ''} className={`${styles.box} ${styles.select_input} ${styles.spot_input_add}`} id="select_input" placeholder="기간 선택" readOnly />
                                            <div id="calender_area"></div>
                                        </div>
                                        <ul className={styles.date_select_box}>
                                            <li className={styles.date_list}
                                                onClick={
                                                    () => {
                                                        setPeriod("6개월")
                                                        openPeriodlist(false)
                                                    }
                                                }
                                                data-months="6_months">
                                                <label htmlFor="6_months" className={styles.period_label}>6개월</label>
                                                <input type="radio" value="6" name="date_period" id="6_months" className={styles.period_input} />
                                            </li>
                                            <li className={styles.date_list}
                                                onClick={
                                                    () => {
                                                        setPeriod("6개월")
                                                        openPeriodlist(false)
                                                    }
                                                }
                                                data-months="12_months">
                                                <label htmlFor="12_months" className={styles.period_label}>12개월</label>
                                                <input type="radio" value="12" name="date_period" id="12_months" className={styles.period_input} />
                                            </li>
                                            <li className={styles.date_list} data-months="consulting">
                                                <label htmlFor="consulting" className={styles.period_label}>추후상담</label>
                                                <input type="radio" value="consulting" name="date_period" id="consulting" className={styles.period_input} />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={`${styles.ad_start_date} ${styles.input_wrap}`}>
                                    <div className={styles.sub_title}>시작일</div>
                                    <Form.Control
                                        type="date"
                                        name="doj"
                                        placeholder="Date of Joining"
                                    />
                                </div>
                                <div className={styles.input_wrap}>
                                    <div className={styles.sub_title}>총 광고기간</div>
                                    <div className={styles.date_content}>
                                        <input type="text" name="date_start" id="input_date_start" className={`${styles.box} ${styles.input_date_start}`} readOnly /> ~
                                        <input type="text" name="date_end" id="input_date_end" className={`${styles.box} ${styles.input_date_end} ${styles.spot_input_add}`} readOnly />
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.input_section} ${styles.vehicles_section}`}>
                                <div className={styles.input_title}>운행차량</div>
                                <ul className={styles.table_wrap}>
                                    <li className={`${styles.table_row} ${styles.list_hd}`}>
                                        <div className={`${styles.text} ${styles.cell}`}>차량</div>
                                        <div className={`${styles.text} ${styles.cell}`}>차량대수</div>
                                        <div className={`${styles.text} ${styles.cell} ${styles.standard_wrap}`}>규격</div>
                                        <div className={`${styles.text} ${styles.cell} ${styles.celprice_wrapl}`}>가격</div>
                                    </li>
                                    <li className={`${styles.table_row} ${styles.list}`}>
                                        <div className={`${styles.text} ${styles.cell} ${styles.vehicles_wrap}`}>1t</div>
                                        <div className={`${styles.vehicles_num_wrap} ${styles.cell}`}>
                                            <input type="text" name="vehicles_num" className={styles.input_num} id="1t" placeholder="직접입력" />
                                            <span className={styles.text}>대</span>
                                        </div>
                                        <div className={` ${styles.cell} ${styles.standard_wrap}`}>
                                            <span className={styles.text}>2m X 1.1m x 2 / 후면 (무료서비스)</span>
                                        </div>
                                        <div className={`${styles.spot_add} ${styles.price_wrap}`}>
                                            <input type="text" name="1t_price" className={`${styles.text} ${styles.price_input} ${styles.spot_input_add}`} readOnly />
                                            <span className={`${styles.text} ${styles.won}`}>원</span>
                                        </div>
                                    </li>
                                    <li className={`${styles.table_row} ${styles.list}`}>
                                        <div className={`${styles.text} ${styles.cell} ${styles.vehicles_wrap}`}>2.5t</div>
                                        <div className={`${styles.vehicles_num_wrap} ${styles.cell}`}>
                                            <input type="text" name="vehicles_num" className={styles.input_num} id="2_5t" placeholder="직접입력" />
                                            <span className={styles.text}>대</span>
                                        </div>
                                        <div className={` ${styles.cell} ${styles.standard_wrap}`}>
                                            <span className={styles.text}>3.8m X 1.2m x 2 / 후면 (무료서비스)</span>
                                        </div>
                                        <div className={`${styles.spot_add} ${styles.price_wrap}`}>
                                            <input type="text" name="2_5t_price" className={`${styles.text} ${styles.price_input} ${styles.spot_input_add}`} readOnly />
                                            <span className={`${styles.text} ${styles.won}`}>원</span>
                                        </div>
                                    </li>
                                    <li className={`${styles.table_row} ${styles.list}`}>
                                        <div className={`${styles.text} ${styles.cell} ${styles.vehicles_wrap}`}>5t</div>
                                        <div className={`${styles.vehicles_num_wrap} ${styles.cell}`}>
                                            <input type="text" name="vehicles_num" className={styles.input_num} id="5t" placeholder="직접입력" />
                                            <span className={styles.text}>대</span>
                                        </div>
                                        <div className={` ${styles.cell} ${styles.standard_wrap}`}>
                                            <span className={styles.text}>6m X 1.3m x 2 / 후면 (무료서비스)</span>
                                        </div>
                                        <div className={`${styles.spot_add} ${styles.price_wrap}`}>
                                            <input type="text" name="5t_price" className={`${styles.text} ${styles.price_input} ${styles.spot_input_add}`} readOnly />
                                            <span className={`${styles.text} ${styles.won}`}>원</span>
                                        </div>
                                    </li>
                                    <li className={`${styles.table_row} ${styles.list}`}>
                                        <div className={`${styles.text} ${styles.cell} ${styles.vehicles_wrap}`}>11t</div>
                                        <div className={`${styles.vehicles_num_wrap} ${styles.cell}`}>
                                            <input type="text" name="vehicles_num" className={styles.input_num} id="11t" placeholder="직접입력" />
                                            <span className={styles.text}>대</span>
                                        </div>
                                        <div className={` ${styles.cell} ${styles.standard_wrap}`}>
                                            <span className={styles.text}>8m X 1.3m x 2 / 후면 (무료서비스)</span>
                                        </div>
                                        <div className={`${styles.spot_add} ${styles.price_wrap}`}>
                                            <input type="text" name="11t_price" className={`${styles.text} ${styles.price_input} ${styles.spot_input_add}`} readOnly />
                                            <span className={`${styles.text} ${styles.won}`}>원</span>
                                        </div>
                                    </li>
                                </ul>
                                <div className={`${styles.spot_add} ${styles.spot_info}`}>
                                    스팟광고의 광고 희망시간/기간등 차후 상담에 따라 결정됩니다.
                                </div>
                            </div>

                            <div className={`${styles.input_section} ${styles.area_section} ${styles.active}`}>
                                <div className={styles.input_title}>운행지역 (다중 선택 가능)</div>
                                <button type="button" id="reset_btn" className={styles.reset_btn}>
                                    <span className={styles.text}>초기화</span>
                                    <i className={styles.ic_reset}></i>
                                </button>
                                <div className={styles.chk_grid}>
                                    {area.map((item) =>
                                        <div key={item.id} className={styles.chk_wrap}><input type="checkbox" id={item.id} className={styles.chk_input} name="area" />
                                            <label htmlFor={item.id} className={styles.chk_area}>{item.value}</label></div>

                                    )}
                                </div>
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
                                    <div id="total_price" className={`${styles.price_text} ${styles.total_price}`}></div>
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
                                <button type="button" id={styles.ad_apply_cancel} onClick={() => setShowModal(false)} className={`${styles.btns} ${styles.cancel_btn}`}>취소</button>
                                <button type="button" id={styles.ad_apply_btn} className={`${styles.btns} ${styles.active} ${styles.ad_apply_btn}`}>광고 신청 </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}