import React from "react";
import HeaderComp from "./header/header";
import Footer from "./footer/footer";

const InquireComp = () => {
  return (
    <div className='_inquire_wrapper_'>
      <HeaderComp  />
      <main
        id='inquire'
        className='page'>
        <div className='page-title-wrap'>
          <h1 className='page-title-text'>문의하기</h1>
        </div>
        <form
          action=''
          className='inquire-form'>
          <div className='inquire-content'>
            <div className='inquire-input-content only-pc'>
              <div className='inquire-input-title'>구분</div>
            </div>
            <div className='inquire-input-content'>
              <div className='inquire-input-title title-required'>작성자</div>
              <div className='inquire-input-wrap input-writer-wrap'>
                <input
                  type='text'
                  className='input-writer input-default-style'
                  placeholder='이름을 입력해주세요'
                  required
                />
              </div>
            </div>
            <div className='inquire-input-content'>
              <div className='inquire-input-title title-required'>전화번호</div>
              <div className='inquire-input-wrap input-phone-wrap'>
                <select
                  name='inquire_phone'
                  className='input-select-style input-default-style'>
                  <option value='010'>010</option>
                  <option value='011'>011</option>
                </select>
                <span>-</span>
                <input
                  type='tel'
                  className='input-default-style'
                  required
                />
                <span>-</span>
                <input
                  type='tel'
                  className='input-default-style'
                  required
                />
              </div>
            </div>
            <div className='inquire-input-content'>
              <div className='inquire-input-title'>이메일</div>
              <div className='inquire-input-wrap input-email-wrap'>
                <input
                  type='text'
                  className='input-default-style input-email-main'
                  placeholder='이메일을 입력해주세요'
                />
                <span className='emain-at'>@</span>
                <input
                  type='text'
                  id='input_email_sub'
                  className='input-default-style input-email-sub'
                />
                <select
                  name='inquire_email'
                  id='select_email'
                  className='input-select-style input-default-style select-email'>
                  <option value=''>메일계정선택</option>
                  <option value='naver.com'>naver.com</option>
                  <option value='google.com'>google.com</option>
                  <option value='hanmail.net'>hanmail.net</option>
                  <option value='nate.com'>nate.com</option>
                  <option value='kakao.com'>kakao.com</option>
                </select>
              </div>
            </div>
            <div className='inquire-input-content'>
              <div className='inquire-input-title title-required'>제목</div>
              <div className='inquire-input-wrap input-title-wrap'>
                <input
                  type='text'
                  className='input-default-style input-title'
                  placeholder='제목을 입력해 주세요.'
                  required
                />
              </div>
            </div>
            <div className='inquire-input-content'>
              <div className='inquire-input-title title-required'>내용</div>
              <div className='inquire-input-wrap input-content-wrap'>
                <textarea
                  name='inquire_content_textarea'
                  id='inquire_content_textarea'
                  className='input-textarea-style input-default-style textarea-input'
                  placeholder='내용을 입력해 주세요'
                  required></textarea>
              </div>
            </div>
            <div className='inquire-input-content'>
              <div className='inquire-input-title'>첨부파일</div>
              <div className='inquire-input-wrap input-attachment-wrap'>
                <input
                  type='file'
                  className='input-attachment'
                  id='inquire_input_file'
                  name='inquire_input_file'
                  placeholder='jpg, jpeg, png, pdf 파일'
                />
                <label
                  htmlFor={"inquire_input_file"}
                  className='label-attachment'>
                  파일선택
                </label>
                <div
                  id='file_placeholder'
                  className='file-placeholder'>
                  jpg, jpeg, png, pdf 파일
                </div>
              </div>
            </div>  
          </div>
          <div className='inquire-btn-wrap'>
            <button
              type='submit'
              className='inquire-btn'>
              작성완료
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};
export default InquireComp;
