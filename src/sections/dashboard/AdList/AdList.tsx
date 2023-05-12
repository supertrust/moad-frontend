import React, { useState } from "react";
import { Form } from "react-bootstrap";
import AdModel from "../AdModel/AdModel";
import styles from './style.module.css'

export default function AdListModule() {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  return (
    <>
      <div className={styles.titleWrap}>
        <div className={styles.title}>
          <h4>ad list</h4>{" "}
        </div>
        <div className={styles.line} />
      </div>
      {showModal ? <AdModel setShowModal={setShowModal} /> : null}
      <div className={styles.adContents}>
        <div className={styles.menuHd}>
          <div className={styles.tabMenu}>
            <div className={styles.tabTitle}>
              <span>entire</span>
            </div>
            <div className={styles.tabTitle}>
              <span>Proceeding</span>
            </div>
            <div className={styles.tabTitle}>
              <span>Applying</span>
            </div>
            <div className={styles.tabTitle}>
              <span>end</span>
            </div>
          </div>
          <div className={styles.rightMenu}>
            <button onClick={openModal} className={styles.adAddBtn}>
              <img src="/images/add-icon.png" alt="add"></img>
              <p>
                Advertisement registration
              </p>
            </button>
            <button className={styles.adDeleteBtn}>
              <p>
                delete
              </p>
            </button>
            <div className="select-box only-pc">
              <Form.Select aria-label="Default select example">
                <option>Choose your campaign type</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
              {/* <div className="filter-wrp">
              <img
                    src={"/images/statistics/filter.png"}
                  />
                </div> */}
          </div>
          </div>
          <div className={styles.tabWrap}>
            <div className={`${styles.listHd} ${styles.listFlex}`}>
              <div className={styles.chkBox}>
                <input
                  type="checkbox"
                  name="all_chk"
                  id="all_chk"
                  className="all-chk"
                  value=""
                />
              </div>
              <div className={styles.grid}>
                <div className={`${styles.typeWrap} ${styles.gridBox}`}>ad name</div>
                <div className={styles.gridBox}>ad name</div>
                <div className={styles.gridBox}>ad name</div>
                <div className={styles.gridBox}>ad name</div>
                <div className={`${styles.statusWrap} ${styles.gridBox}`}>ad name</div>
              </div>
            </div>
            <div className="tab-content all-wrap on">
              <ul className="list-wrap">
                <li className={styles.listFlex}>
                 <div className={styles.chkBox}>
                  <input type="checkbox" className="list-chk" name="list_chk" />
                    </div>
                      <a href="ad-detail-list" className={styles.grid}>
                        <div className={`${styles.typeWrap} ${styles.gridBox}`}>고정형</div>
                        <div className={styles.gridBox}>이카루스 서비스 오픈 출시 기념입니다 25글자</div>
                        <div className={styles.gridBox}>1/120</div>
                        <div className={styles.gridBox}>2023. 01. 01 ~ 2023. 03. 01</div>
                        <div className={`${styles.statusWrap} ${styles.gridBox}`}>광고검수중</div>
                        <i className="only-mb ic-arrow-right"></i>
                      </a>
                </li>
              </ul>
            </div>
          </div>
      </div>
    </>
  );
}
