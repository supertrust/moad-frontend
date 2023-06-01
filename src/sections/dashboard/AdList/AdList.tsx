import React, { useRef, useState } from "react";
import { Form, Pagination } from "react-bootstrap";
import AdModel, { AdModelRef } from "../SaveAdModel";
import styles from './style.module.css'
import { useDeleteAdvertisement, useGetAdvertisements, useUpdateAdStatus } from "@src/apis/advertisement";
import { AdStatusesType, AdTypesType } from "@src/types/advertisement";
import { toast } from "react-toastify";
import useAuth from "@src/hooks/useAuth";
import Button from "@src/components/Button";
import RoleBasedGuard from "@src/guards/RoleBasedGuard";
import Image from "next/image";
const statuses = [
  { label: "All", value: undefined },
  { label: "Proceeding", value: "proceeding" },
  { label: "Applying", value: "applying" },
  { label: "End", value: "end" },
]

export default function AdListModule() {
  const { userRole } = useAuth();
  const adModel = useRef<AdModelRef>(null);
  const [selectedAds, setSelectedAds] = useState<number[]>([]);
  const [status, setStatus] = useState<AdStatusesType | undefined>();
  const [type, setType] = useState<AdTypesType | undefined>();

  const { data: advertisements, refetch: refetchAdvertisements } = useGetAdvertisements({
    status,
    type,
    for_admin: userRole?.role_name === "Admin"
  });
  console.log("🚀 ~ file: AdList.tsx:31 ~ AdListModule ~ advertisements:", advertisements)
  const { mutateAsync: updateAdStatus } = useUpdateAdStatus();
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

  const handleUpdateAdStatus = (status: "yes" | "no", id: number) => () => {
    updateAdStatus({ id, status }, {
      onSuccess: () => {
        refetchAdvertisements()
      }
    })
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
              <i className="ic-plus"></i>
                광고등록
            </button>
            <button disabled={!selectedAds.length} onClick={handleDeleteAds} className={styles.adDeleteBtn}>
              삭제
            </button>
            <div className="select-box only-pc">
              <Form.Select onChange={e => setType(e.target.value as AdTypesType)} aria-label="Default select example" className="border-1 border-primary">
                <option value={undefined}>캠페인 유형 선택</option>
                <option value="fixed_ad">고정형</option>
                <option value="national_ad">전국형</option>
                <option value="spot_ad">스팟</option>
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
            <RoleBasedGuard roles={["Admin"]}>
              <div className={`${styles.gridBox}`}>Action</div>
            </RoleBasedGuard>
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
                      <div className={styles.gridBox}>{`1/${item.number_of_vehicles}`}</div>
                      <div className={styles.gridBox}>{(item.start_date && item.start_date) ? `${item.start_date} ~ ${item.end_date}` : "--"}</div>
                      <div className={`${styles.statusWrap} ${styles.gridBox}`}>{item.amount}</div>
                      <i className="only-mb ic-arrow-right"></i>
                    </a>
                    <RoleBasedGuard roles={["Admin"]}>
                      <div className={styles.gridBox}>
                        <Button onClick={handleUpdateAdStatus("no", item.id)}>Reject</Button>
                        <Button onClick={handleUpdateAdStatus("yes", item.id)}>Approve</Button>
                      </div>
                    </RoleBasedGuard>
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
