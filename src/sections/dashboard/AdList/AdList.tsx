import React, { useRef, useState } from "react";
import { Form, Pagination } from "react-bootstrap";
import AdModel, { AdModelRef } from "../SaveAdModel";
import styles from './style.module.css'
import { useDeleteAdvertisement, useGetAdvertisements } from "@src/apis/advertisement";
import { AdStatusesType, AdTypesType } from "@src/types/advertisement";
import { toast } from "react-toastify";

const statuses = [
  { label: "All", value: undefined },
  { label: "Proceeding", value: "proceeding" },
  { label: "Applying", value: "applying" },
  { label: "End", value: "end" },
]

export default function AdListModule() {
  const adModel = useRef<AdModelRef>(null);
  const [selectedAds, setSelectedAds] = useState<number[]>([]);
  const [status, setStatus] = useState<AdStatusesType | undefined>();
  const [type, setType] = useState<AdTypesType | undefined>();

  const { data: advertisements, refetch: refetchAdvertisements } = useGetAdvertisements({ status, type })
  const { mutateAsync: deleteAd } = useDeleteAdvertisement()

  const openModal = () => adModel.current?.open();

  const handleToggleSelect = (id: number, selected: boolean) => () => {
    if (selected) {
      setSelectedAds(old => old.filter(_id => _id !== id));
    } else {
      setSelectedAds(old => ([...old, id]))
    }
  }

  const handleSelectAll = () => {
    if (selectedAds.length !== advertisements?.length) {
      setSelectedAds(advertisements?.map(item => item.id) || []);
    } else {
      setSelectedAds([])
    }
  }

  const handleDeleteAds = async () => {
    try {
      await Promise.all(selectedAds.map(async (id) => {
        await deleteAd({ id: `${id}` })
      }))
      setSelectedAds([]);
      refetchAdvertisements()
    } catch (error: any) {
      toast.error(error)
    }
  }

  return (
    <>
      <div className={styles.titleWrap}>
        <div className={styles.title}>
          <h4>ad list</h4>{" "}
        </div>
        <div className={styles.line} />
      </div>
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
            <button disabled={!selectedAds.length} onClick={handleDeleteAds} className={styles.adDeleteBtn}>
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
                onChange={handleSelectAll}
                checked={selectedAds.length === advertisements?.length}
                name="all_chk"
                id="all_chk"
                className="all-chk"
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
              {advertisements?.map(item => {
                const selected = selectedAds.includes(item.id);
                return (
                  <li key={item.id} className={styles.listFlex}>
                    <div className={styles.chkBox}>
                      <input
                        type="checkbox"
                        onChange={handleToggleSelect(item.id, selected)}
                        checked={selected}
                        className="list-chk"
                        name="list_chk"
                      />
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
                )
              })}
            </ul>
          </div>
          <Pagination className={styles.adlistPagination}>
            <Pagination.Prev className="prev-btn" />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Next className="next-btn" />
          </Pagination>
        </div>
      </div>
      <AdModel refetchAds={refetchAdvertisements} ref={adModel} />
    </>
  );
}
