import React, {useRef,useState} from "react";
import {Form } from "react-bootstrap";
export default function AdModel({setShowModal}) {
  const closeModal = (e) => {
    setShowModal(false);
  };
  const [model, setmodel] = useState("card1");

  const modelStatus = (status) => {
    setmodel(status);
  };
  const [isOpen, openPeriodlist] = useState();
  const [period,setPeriod] = useState();

  const periodList = () => {
    openPeriodlist(!isOpen);
  };
  const periodStatus = (period) => {
    setPeriod(period);
    openPeriodlist(false);;
  };
  const [isActive, setActive] = useState(false);
  const ToggleClass = () => {
    setActive(!isActive); 
   };
   
  const area = [
    {
      'id' : 'seoul', 'value' : '서울'
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
      <div id="ad_apply_modal" className="ad-apply-modal">
        <div className="ad-modal-wrap">
            <div className="ad-apply-title">
                <button type="button" id="ic_close_btn" className="ic-close-btn only-mb"></button>광고신청 
            </div>
            <div id="ad_apply_info" className={isActive ? "ad-apply-info only-pc active" : "ad-apply-info only-pc"}>
                <div className="info-content">
                    <div className="info-text">
                        광고가 노출되는 지역을 선택해  광고를 생성하세요.<br/>
                        지역에 따라 광고의 특성이 달라질 수 있습니다.
                    </div>
                    <div id="slide_wrap" className="slide-wrap" >
                        <ul className="info-list-wrap">
                            <li className="list">광고 목적에 따라 광고 상품 유형을 선택하고, 광고 노출 기간 등 원하시는 조건을 등록하실 수 있습니다.</li>
                            <li className="list">광고 유형은 ‘고정형광고, ‘전국광고’, ‘스팟광고’,  총 3가지입니다.  등록 후 유형 변경은 불가하니 어떤 광고 상품을 진행할지 검토 후 선택하세요.</li>
                            <li className="list">광고 등록시 1~2일 정도 검수시간이 소요됩니다.  (담당자 전화번호로 연락드립니다.)</li>
                        </ul>
                        <div className="info-img-wrap">
                            <div className="img-title">
                                부착예시
                            </div>
                            <div className="img-wrap">
                                {/* <img src={`/images/advertising-apply-modal/img-car01.png`} alt="" className= "img img01" />
                                <img src={`/images/advertising-apply-modal/img-car02.png`} alt="" className="img img02" />
                                <img src={`/images/advertising-apply-modal/img-car03.png`} alt="" className="img img03" /> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="more_btn" className="more-btn">
                    <div className="text-wrap" onClick={ToggleClass}><span className="more-text">자세히</span> <i className="ic-down-blue"></i></div>
                </div>
            </div>
            <div className="ad-apply-info-mb only-mb">
                <div className="info-text">
                광고가 노출되는 지역을 선택해  광고를 생성하세요.<br/>
                지역에 따라 광고의 특성이 달라질 수 있습니다.<br/><br/>
                광고 목적에 따라 광고 상품 유형을 선택하고, 광고 노출 기간 등 원하시는 조건을 등록하실 수 있습니다.<br/><br/>
                광고 유형은 ‘고정형광고, ‘전국광고’, ‘스팟광고’,  총 3가지입니다.  등록 후 유형 변경은 불가하니 어떤 광고 상품을 진행할지 검토 후 선택하세요.<br/><br/>
                광고 등록시 1~2일 정도 검수시간이 소요됩니다.<br/>
                (담당자 전화번호로 연락드립니다.)
                </div>
            </div> 
            
            <div className="ad-apply-content">
                <div className="radio-wrap">
                    <div className="title only-pc">광고 유형</div>
                    <div className="modal-select-wrap">
                        <div onClick={() => {
                              modelStatus("card1");
                            }}  
                            className={model === "card1" ? "modal-select reset active" : "modal-select"}>
                            <label className="select-box">
                                <input type="radio" name="ad_type"  id="fixed_ad" className="hidden"  />
                                <i className="ic-radio"></i>
                                <a href="" className="detail-desc">상세설명</a>
                                <div className="box-icon box-icon01"></div>
                                <div className="text">
                                    <strong className="text">고정형 광고</strong><br/>
                                    특정 지역 화주들을 매칭하여<br/>
                                    노출할 수 있는 고정형 광고
                                </div>
                            </label>
                        </div>
                        <div onClick={() => {
                              modelStatus("card2");
                            }}  
                            className={model === "card2" ? "modal-select active" : "modal-select"}>
                            <label className="select-box">
                                <input type="radio" name="ad_type" value="전국형광고" id="nationwide_ad" className="hidden" />
                                <i className="ic-radio"></i>
                                <a href="" className="detail-desc">상세설명</a>
                                <div className="box-icon box-icon02"></div>
                                <div className="text">
                                    <strong className="text">전국형 광고 </strong><br/>
                                    전국 모든 화주들을 매칭하여 적은 비용으로<br/>
                                    광고효과를 최대화 할 수 있는 광고
                                </div>
                            </label>
                        </div>
                        <div onClick={() => {
                              modelStatus("card3");
                            }}  
                            className={model === "card3" ? "modal-select active" : "modal-select"}>
                            <label className="select-box">
                                <input type="radio" name="ad_type" value="스팟광고" id="spot_ad" className="hidden" />
                                <i className="ic-radio"></i>
                                <a href="" className="detail-desc">상세설명</a>
                                <div className="box-icon box-icon03"></div>
                                <div className="text">
                                    <strong className="text">스팟광고</strong><br/>
                                    1시간 단위로 원하는 특정지역과 특정시간에<br/>
                                    노출할 수 있는 광고
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                
                <div className="modal-step">
                    <div className="input-section title-section">
                        <div className="input-title">광고이름</div>
                        <input type="text" id="input_ad_title" className="box input-ad-title" maxLength='25'/>
                        <div className="text-count">
                            0/25
                        </div>
                    </div>

                    <div className="input-section date-section">
                        <div className="ipnut-wrap">
                            <div className="input-title">광고기간</div>
                            <div className={isOpen ? "select-wrap spot-add active" : "select-wrap spot-add"}>
                                    <div className="select-text">
                                        <input type="text" onClick={periodList} value={period ? period : ''} className="box select-input spot-input-add" id="select_input" placeholder="기간 선택" readOnly/>
                                        <div id="calender_area"></div>
                                    </div>
                                    <ul className="date-select-box">
                                        <li className="date-list" onClick={() => periodStatus("6개월")} data-months="6_months"><label htmlFor="6_months" className="period-label">6개월<input type="radio" value="6" name="date_period" id="6_months" className="period-input"/></label></li>
                                        <li className="date-list" onClick={() => periodStatus("12개월")} data-months="12_months"><label htmlFor="12_months" className="period-label">12개월<input type="radio" value="12" name="date_period" id="12_months" className="period-input"/></label></li>
                                        <li className="date-list hidden" data-months="consulting"><label htmlFor="consulting" className="period-label">추후상담<input type="radio" value="consulting" name="date_period" id="consulting" className="period-input"/></label></li>
                                    </ul>
                            </div>
                        </div>
                        <div className="ipnut-wrap ad-start-date">
                            <div className="sub-title">시작일</div>
                            <input type="date" id="input_calendar" className="box input-calendar" placeholder="날짜 입력" />
                        </div>
                        <div className="ipnut-wrap">
                            <div className="sub-title">총 광고기간</div>
                            <div className="date-content">
                                <input type="text" name="date_start" id="input_date_start"  className="box input-date-start" readOnly/> ~
                                <input type="text" name="date_end" id="input_date_end"  className="box input-date-end spot-input-add" readOnly/>
                            </div>
                        </div>
                    </div>

                    <div className="input-section vehicles-section">
                        <div className="input-title">운행차량</div>
                        <ul className="table-wrap">
                            <li className="table-row list-hd">
                                <div className="text cell">차량</div>
                                <div className="text cell">차량대수</div>
                                <div className="text cell standard-wrap">규격</div>
                                <div className="text cell price-wrap">가격</div>
                            </li>
                            <li className="table-row list">
                                <div className="text cell vehicles-wrap">1t</div>
                                <div className="cell vehicles-num-wrap">
                                    <input type="text" name="vehicles_num"  className="input-num" id="1t" placeholder="직접입력"/>
                                    <span className="text">대</span>
                                </div>
                                <div className="cell standard-wrap">
                                    <span className="text">2m X 1.1m x 2 / 후면 (무료서비스)</span>
                                </div>
                                <div className="price-wrap spot-add">
                                    <input type="text" name="1t_price"  className="text price-input spot-input-add" readOnly/>
                                    <span className="text won">원</span>
                                </div>
                            </li>
                            <li className="table-row list">
                                <div className="text cell vehicles-wrap">2.5t</div>
                                <div className="cell vehicles-num-wrap">
                                    <input type="text" name="vehicles_num"  className="input-num" id="2_5t" placeholder="직접입력"/>
                                    <span className="text">대</span>
                                </div>
                                <div className="cell standard-wrap">
                                    <span className="text">3.8m X 1.2m x 2 / 후면 (무료서비스)</span>
                                </div>
                                <div className="price-wrap spot-add">
                                    <input type="text" name="2_5t_price"  className="text price-input spot-input-add" readOnly/>
                                    <span className="text won">원</span>
                                </div>
                            </li>
                            <li className="table-row list">
                                <div className="text cell vehicles-wrap">5t</div>
                                <div className="cell vehicles-num-wrap">
                                    <input type="text" name="vehicles_num"  className="input-num" id="5t" placeholder="직접입력"/>
                                    <span className="text">대</span>
                                </div>
                                <div className="cell standard-wrap">
                                    <span className="text">6m X 1.3m x 2 / 후면 (무료서비스)</span>
                                </div>
                                <div className="price-wrap spot-add">
                                    <input type="text" name="5t_price"  className="text price-input spot-input-add" readOnly/>
                                    <span className="text won">원</span>
                                </div>
                            </li>
                            <li className="table-row list">
                                <div className="text cell vehicles-wrap">11t</div>
                                <div className="cell vehicles-num-wrap">
                                    <input type="text" name="vehicles_num"  className="input-num" id="11t" placeholder="직접입력"/>
                                    <span className="text">대</span>
                                </div>
                                <div className="cell standard-wrap">
                                    <span className="text">8m X 1.3m x 2 / 후면 (무료서비스)</span>
                                </div>
                                <div className="price-wrap spot-add">
                                    <input type="text" name="11t_price"  className="text price-input spot-input-add" readOnly/>
                                    <span className="text won">원</span>
                                </div>
                            </li>
                        </ul>
                        <div className="spot-info spot-add">
                            스팟광고의 광고 희망시간/기간등 차후 상담에 따라 결정됩니다.
                        </div>
                    </div>

                    <div className="input-section area-section active">
                        <div className="input-title">운행지역 (다중 선택 가능)</div>
                        <button type="button" id="reset_btn" className="reset-btn">
                            <span className="text">초기화</span>
                            <i className="ic-reset"></i>
                        </button>
                        <div className="chk-grid">
                        {area.map((item) => 
                             <div key={item.id} className="chk-wrap"><input type="checkbox" id={item.id} className="chk-input" name="area" />
                             <label htmlFor={item.id} className="chk-area">{item.value}</label></div>
                             
                           )}
                        </div>
                        <div id="area_modal" className="area-modal check-modal">
                            <div className="check-modal-wrap">
                                <div className="title">확인사항</div>
                                <div className="text">
                                    모든 운행 지역을 선택할 시<br/>
                                    광고 유형을 전국형으로 변경해주세요
                                </div>
                                <div className="btn-wrap">
                                    <button type="button" id="area_modal_close" className="active-btn">확인</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="price-section">
                        <div className="price-box spot-add">
                            <div className="price-text">광고비용</div>
                            <div id="total_price" className="price-text total-price"></div>
                            <div className="price-text text-won">원</div>
                        </div>
                        <div className="price-info">
                            광고비용은 차후 상담에 따라 변경 될 수  있습니다.
                        </div>
                    </div> 
                    
                    <div className="error-box">
                        <div className="error-line">
                            <i className="ic-error"></i>
                            <div className="error-text title-error">광고이름을 입력해주세요.</div>
                            <div className="error-text end-error">광고기간을 6개월 또는 12개월 선택해주세요.</div>
                            <div className="error-text start-error">
                                시작일을 선택해주세요.
                                <span className="only-pc">(광고 등록일 기준 1달 이후 부터 선택 가능)</span>
                                <span className="only-mb">(등록 기준 1달 이후 선택)</span>
                            </div>
                            <div className="error-text vehicles-error">운행차량을 입력해주세요.</div>
                            <div className="error-text area-error">운행지역을 선택해주세요.</div>
                        </div>
                    </div>

                    <div className="btn-section">
                        <button type="button" id="ad_apply_cancel" onClick={() => setShowModal(false)} className="btns cancel-btn">취소</button>
                        {/* <button type="button" id="ad_apply_btn" className="btns active ad-apply-btn" onclick="return onClickSave()">광고 신청</button> */}
                    </div>
                </div>
            </div>
        </div>
    </div> 
    </>
  );
}
