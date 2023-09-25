import React, { Ref, forwardRef, useImperativeHandle, useState } from "react";
import styles from "./styles.module.css";
import { useSaveAdvertisement } from "@src/apis/advertisement";
import SaveAdForm from "./SaveAdForm";
import { SaveAdvertisementType } from "@src/types/advertisement";
import AdAgreementForm from "./AdAgreementForm";
import SaveAdSuccessPopup from "./SaveAdSuccessPopup";

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
    const [showAgreement, setShowAgreement ]= useState(false);
    const [advertisment, setAdvertisement ]= useState<SaveAdvertisementType | undefined>();

    const { mutateAsync: saveAdvertisement,isLoading : isLoadingSaveAdvertisement } = useSaveAdvertisement();

    const onSubmitForm = async (props: SaveAdvertisementType) => {
        setAdvertisement(props);
        setShowAgreement(true);
    }

    const onAgree = () => { 
        advertisment && saveAdvertisement(advertisment, {
            onSuccess: () => {
                refetchAds();
                setAgreed(true);
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

    return open ? (
        <div id={styles.ad_apply_modal} className={`ad-apply-modal ${agreed && styles.aggred}`}>
            {agreed ? (
                <SaveAdSuccessPopup onOk={onCancel} />
            ) : (
                !showAgreement ? (
                    <SaveAdForm 
                        onCancel={onCancel} 
                        onSubmitForm={onSubmitForm} 
                        isLoadingSaveAdvertisement={isLoadingSaveAdvertisement} 
                        values={advertisment}
                    />
                ) : (
                    <AdAgreementForm onDisagree={onDisagree} onAgree={onAgree} isLoading={isLoadingSaveAdvertisement}  />
                )
            )}
        </div>
    ) : null;
}

export default forwardRef(AdModel)