import { ConfirmPropsType } from "@src/contexts/ConfirmDialogContext";
import { useConfirmDialog } from "@src/hooks/useConfirmationDialog";
import React, { Ref, forwardRef, useImperativeHandle, useState, useEffect } from "react";
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
    const [done, setDone] = useState(false);
    const {confirm} = useConfirmDialog();

    const { mutateAsync: saveAdvertisement, isLoading: isLoadingSaveAdvertisement } = useSaveAdvertisement();

    const onSubmitForm = async (props: SaveAdvertisementType) => {
        const advertisment = {...props}
        const data = {
            ...advertisment,
            vehicle_details: JSON.stringify(advertisment?.vehicle_details),
            operating_area: JSON.stringify(advertisment?.operating_area),
            vehicle_min : JSON.stringify(advertisment?.vehicle_min)

        }
        // @ts-ignore
        advertisment && saveAdvertisement(data, {
            onSuccess: () => {
                refetchAds();
                setDone(true);
            },
            onError:(error)=>{
                toast.error("뭔가 잘못됐어!")

            }
        });
    }

    const onConfirmModal = async (props: SaveAdvertisementType)=>{
        const options: ConfirmPropsType = {
            title: '광고신청',
            size: 'sm',
            disableConfirmBtn: false,
            footerClassName: 'flex flex-row justify-end',
            onConfirm : ()=>onSubmitForm(props)
        };
        confirm({
            ...options,
            description: (
                <div className='mt-3 text-center'>
                    광고신청 완료시에는, 모든 약관이나 면책서에
                    동의하는 것으로 간주합니다.
                </div>
            ),
        });

    }

    // const onAgree = () => {
    //     const data = {
    //         ...advertisment,
    //         vehicle_details: JSON.stringify(advertisment?.vehicle_details),
    //         operating_area: JSON.stringify(advertisment?.operating_area),
    //     }
    //     // @ts-ignore
    //     advertisment && saveAdvertisement(data, {
    //         onSuccess: () => {
    //             refetchAds();
    //             setDone(true);
    //         },
    //         onError:(error)=>{
    //             toast.error("뭔가 잘못됐어!")
    //
    //     }
    //     });
    // }


    const onCancel = () => {
        setId(null);
        setDone(false);
        setOpen(false);
    }

    useImperativeHandle(ref, () => ({
        open: () => setOpen(true),
    }), [])

    useEffect(()=>{
        return ()=>{
            setDone(false)
        }
    },[open])


    return (
        <>
            <SaveAdSuccessPopup open={done} onCancel={onCancel}/>
            <Modal
                open={open}
                onCancel={onCancel}
                width={'972px'}
                footer={false}
                closable={false}
                className={'ad_modal'}
            >
                <div id={styles.ad_apply_modal} className={`ad-apply-modal`}>
                        <SaveAdForm
                            onOpenModal={() => setOpen(true)}
                            onCancel={onCancel}
                            onSubmitForm={onConfirmModal}
                            isLoadingSaveAdvertisement={isLoadingSaveAdvertisement}
                            done={done}
                        />
                </div>
            </Modal>


        </>
    );
}

export default forwardRef(AdModel)
