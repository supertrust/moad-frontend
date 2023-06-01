import React from "react";
import { styles } from "@src/sections/cargo-owner-signup";
const Info = ({ onButtonClick }:{onButtonClick: any}) => {
  
  return (
    <main className={styles.CargOwnerSignup}>
        <div className={styles.maindiv}>
          <h2>이카루스 가입 전 안내사항</h2>
          <p>이카루스 가입시 원활한 서비스를
            이용하기 위하여 아래의 정보를 제공해 주셔야 합니다.</p>
          <ul>
            <li>-개인정보, 차량정보, 운행정보, 사업자정보</li>
            <li>-계좌정보, 각종 서비스동의</li>
          </ul>
          <div className={styles.moredetails}>
            <p>제출서류 (신청 전 준비해주세요)</p>
            <ul>
              <li>[필수]  운전면허증</li>
              <li>[필수] 사업자등록증</li>
              <li>[필수] 화물운송종사자 자격증</li>
              <li>[필수] 차량등록증</li>
              <li>[필수]  사업자 통장사본 (입금용)</li>
            </ul>
          </div>
          <div className={styles.bluebutton}>
            <button onClick={() => onButtonClick("pagetwo")}>확인</button>
          </div>
        </div>
      </main>
  );
};

export default Info;
