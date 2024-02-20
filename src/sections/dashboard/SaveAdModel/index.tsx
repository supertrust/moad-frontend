import React, { Ref, forwardRef, useImperativeHandle, useState } from "react";
import { toast } from "react-toastify";
import styles from "./styles.module.css";
import { useSaveAdvertisement } from "@src/apis/advertisement";
import SaveAdForm from "./SaveAdForm";
import { SaveAdvertisementType } from "@src/types/advertisement";
import AdAgreementForm from "./AdAgreementForm";
import SaveAdSuccessPopup from "./SaveAdSuccessPopup";
import { Modal } from "antd";

interface IAdModelProps {
    refetchAds: VoidFunction
}

export type AdModelRef = {
    open: VoidFunction
}

function AdModel({ refetchAds }: IAdModelProps, ref: Ref<AdModelRef>) {
    const [id, setId] = useState<number | null>(null)
    const [open, setOpen] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [showAgreement, setShowAgreement] = useState(false);
    const [advertisment, setAdvertisement] = useState<SaveAdvertisementType | undefined>();

    const { mutateAsync: saveAdvertisement, isLoading: isLoadingSaveAdvertisement } = useSaveAdvertisement();

    const onSubmitForm = async (props: SaveAdvertisementType) => {
        setAdvertisement(props);
        setShowAgreement(true);
    }

    const onAgree = () => {
        const data = {
            ...advertisment,
            vehicle_details: JSON.stringify(advertisment?.vehicle_details),
            operating_area: JSON.stringify(advertisment?.operating_area),
        }
        // @ts-ignore
        advertisment && saveAdvertisement(data, {
            onSuccess: () => {
                refetchAds();
                setAgreed(true);
            },
            onError:(error)=>{
                toast.error("뭔가 잘못됐어!")

        }
        });
    }

    const onDisagree = () => {
        setShowAgreement(false);
    }

    const onCancel = () => {
        setId(null);
        setAgreed(false);
        setOpen(false);
        setShowAgreement(false)
        setAdvertisement(undefined);
    }

    useImperativeHandle(ref, () => ({
        open: () => setOpen(true),
    }), [])


    return (
        <>

            <Modal
                open={open && !agreed}
                onCancel={() => setOpen(false)}
                width={'972px'}
                footer={false}
                closable={false}
                className={'ad_modal'}
            >
                <div id={styles.ad_apply_modal} className={`ad-apply-modal ${agreed && styles.aggred}`}>
                    {

                        !showAgreement ? (
                            <SaveAdForm
                                onOpenModal={() => setOpen(true)}
                                onCancel={onCancel}
                                onSubmitForm={onSubmitForm}
                                isLoadingSaveAdvertisement={isLoadingSaveAdvertisement}
                                values={advertisment}
                            />
                        ) : (
                            <AdAgreementForm onDisagree={onDisagree} onAgree={onAgree}
                                             isLoading={isLoadingSaveAdvertisement}/>

                        )}
                </div>
            </Modal>

            <Modal
                open={open && agreed}
                onCancel={() => setOpen(false)}
                width={'367px'}
                footer={false}
                closable={false}
                className={'ad_modal'}
            >
                <div id={styles.ad_apply_modal} className={`ad-apply-modal ${agreed && styles.aggred}`}>
                    {agreed ? (
                        <SaveAdSuccessPopup onOk={onCancel}/>) : <></>
                    }
                </div>
            </Modal>
        </>
    );
}

export default forwardRef(AdModel)
