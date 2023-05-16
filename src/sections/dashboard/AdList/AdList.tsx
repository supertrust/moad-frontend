import React, { useState } from "react";
import { Form } from "react-bootstrap";
import AdModel from "../AdModel/AdModel";
import styles from './style.module.css'
import { useGetAdvertisements } from "@src/apis/advertisement";
import { AdStatusesType, AdTypesType } from "@src/types/advertisement";

const statuses = [
  { label: "All", value: undefined },
  { label: "Proceeding", value: "proceeding" },
  { label: "Applying", value: "applying" },
  { label: "End", value: "end" },
]

export default function AdListModule() {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState<AdStatusesType | undefined>();
  const [type, setType] = useState<AdTypesType | undefined>();

  const { data: advertisements } = useGetAdvertisements({ status, type })

  const openModal = () => setShowModal(true);

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
            {statuses.map(item => (
              <div onClick={() => setStatus(item.value as AdStatusesType)} key={item.label} className={styles.tabTitle}>
                <span style={{ color: item.value === status ? "blue" : "" }}>{item.label}</span>
              </div>
            ))}
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
              <Form.Select onChange={e => setType(e.target.value as AdTypesType)} aria-label="Default select example">
                <option value={undefined}>All</option>
                <option value="fixed_ad">Fixed</option>
                <option value="national_ad">National</option>
                <option value="spot_ad">Spot</option>
              </Form.Select>
            </div>
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
              <div className={`${styles.typeWrap} ${styles.gridBox}`}>ad type</div>
              <div className={styles.gridBox}>ad name</div>
              <div className={styles.gridBox}>No of vehicles</div>
              <div className={styles.gridBox}>Period</div>
              <div className={`${styles.statusWrap} ${styles.gridBox}`}>Total Cost</div>
            </div>
          </div>
          <div className="tab-content all-wrap on">
            <ul className="list-wrap">
              {advertisements?.map(item => (
                <li key={item.id} className={styles.listFlex}>
                  <div className={styles.chkBox}>
                    <input type="checkbox" className="list-chk" name="list_chk" />
                  </div>
                  <a href={`/dashboard/advertisement-detail/${item.id}`} className={styles.grid}>
                    <div className={`${styles.typeWrap} ${styles.gridBox}`}>{item.type}</div>
                    <div className={styles.gridBox}>{item.ad_name}</div>
                    <div className={styles.gridBox}>{"1/120"}</div>
                    <div className={styles.gridBox}>{(item.start_date && item.start_date) ? `${item.start_date} ~ ${item.end_date}` : "--"}</div>
                    <div className={`${styles.statusWrap} ${styles.gridBox}`}>{item.amount}</div>
                    <i className="only-mb ic-arrow-right"></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
