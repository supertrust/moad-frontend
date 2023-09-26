import React from "react";

const Footer = () => {
  return (
    <footer id='footer'>
      <div className='container'>
        <div className='terms-line'>
          <ul className='_list-wrap'>
            <li className='_list'>
              <a
                href=''
                className='link'>
                이용약관
              </a>
            </li>
            <li className='_list'>
              <a
                href=''
                className='link'>
                개인정보처리방침
              </a>
            </li>
          </ul>
        </div>
        <div className='company-line'>
          <span className='_text'>주식회사 애드메타</span>
          <span className='bar'>ㅣ</span>
          <span className='_text'>대표자 : 이진희</span>
        </div>
        <div className='company-num'>
          <span className='_text'>
            세종특별자치시 남세종로 454, 8층 802호 에이864호 (보람동,
            강남제일타워)
          </span>
          <span className='bar'>ㅣ</span>
          <span className='_text'>사업자등록번호 559-87-02646</span>
          <span className='bar'>ㅣ</span>
        </div>
        <div className='copyright _text'>
          Copyright 2022 ICARUS All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
