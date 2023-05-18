import React, { Ref, forwardRef, useImperativeHandle, useState } from "react";
import styles from "./styles.module.css";
import { useDeleteAdvertisement, useSaveAdvertisement } from "@src/apis/advertisement";
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

    const { mutateAsync: saveAdvertisement } = useSaveAdvertisement();
    const { mutateAsync: deleteAdvertisement } = useDeleteAdvertisement();

    const onSubmitForm = async (props: SaveAdvertisementType) => {
        await saveAdvertisement(props, {
            onSuccess: ({ id: _id }) => {
                setId(_id)
            }
        });
    }

    const onAgree = () => {
        setAgreed(true);
        refetchAds();
    }

    const onDisagree = () => {
        if (id) {
            deleteAdvertisement({ id: `${id}` }, {
                onSettled: () => {
                    onCancel();
                }
            })
        }
    }

    const onCancel = () => {
        setId(null);
        setAgreed(false);
        setOpen(false);
    }

    useImperativeHandle(ref, () => ({
        open: () => setOpen(true),
    }), [])

    return open ? (
        <div id={styles.ad_apply_modal} className="ad-apply-modal">
            {agreed ? (
                <SaveAdSuccessPopup onOk={onCancel} />
            ) : (
                !id ? (
                    <SaveAdForm onCancel={onCancel} onSubmitForm={onSubmitForm} />
                ) : (
                    <AdAgreementForm onDisagree={onDisagree} onAgree={onAgree} />
                ))}
        </div>
    ) : null;
}

export default forwardRef(AdModel)