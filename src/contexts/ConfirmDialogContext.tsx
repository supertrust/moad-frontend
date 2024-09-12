import { ButtonProps, Button } from '@src/components/common';
import { clsx } from 'clsx';
import React, { ReactNode, createContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import useAuth from "@src/hooks/useAuth";

export interface ConfirmPropsType {
    title: string;
    description?: ReactNode;
    confirmText?: string;
    cancelText?: ReactNode;
    disableConfirmBtn?: boolean
    onConfirm?: VoidFunction;
    onCancel?: VoidFunction;
    confirmLoading?: boolean;
    confirmButtonProps?: ButtonProps;
    cancelButtonProps?: ButtonProps;
    size?: "lg" | "xl" | "sm" ,
    footerClassName?: string,
    dialogClassName?: string,
    ref?:any
}

type ConfirmDialogContextType = {
    confirm: (props: ConfirmPropsType) => void
}


const ConfirmDialogContext = createContext<ConfirmDialogContextType | null>(null);

const ConfirmDialogProvider = ({ children }: { children: ReactNode }) => {
    const [confirmProps, setConfirmProps] = useState<ConfirmPropsType | null>(null);
    const {
        title,
        confirmText,
        disableConfirmBtn,
        confirmButtonProps,
        onConfirm,
        onCancel,
        confirmLoading,
        description,
        cancelText,
        cancelButtonProps,
        size,
        footerClassName,
        dialogClassName,
        ref
    } = confirmProps || {};
    const { dictionary } = useAuth();

    const { className: confirmButtonStyle, ...restConfirmButtonProps } = confirmButtonProps || {};
    const { className: cancelButtonStyle, ...restCancelButtonProps } = cancelButtonProps || {};

    const handleConfirm = () => {
        onConfirm && onConfirm();
        setConfirmProps(null);
    };

    const handelCancel = () => {
        onCancel && onCancel();
        setConfirmProps(null);
    };

    const confirm = (props: ConfirmPropsType) => setConfirmProps(props);

    return (
        <ConfirmDialogContext.Provider value={{ confirm }}>
            {children}
            {confirmProps && <Modal show={!!confirmProps} onHide={handelCancel} centered size={size} dialogClassName={dialogClassName}
 ref={ref} id >
                {title && 
                    <Modal.Header>
                        <Modal.Title className="text-center font-bold text-[#2C324C]">{title}</Modal.Title>
                    </Modal.Header>
                }
                <Modal.Body>{description}</Modal.Body>
                <Modal.Footer className={footerClassName}>
                    <Button 
                        {...restCancelButtonProps}  
                        className={clsx(
                            "outline-primary border border-primary text-primary px-3 ", 
                            cancelButtonStyle 
                        )}
                        onClick={handelCancel}
                    >
                        {cancelText || dictionary.adForm.cancel}
                    </Button>
                    {!disableConfirmBtn && 
                        <Button 
                            {...confirmButtonProps} 
                            className={clsx(
                                "bg-primary text-white px-3 border-primary border", 
                                confirmButtonStyle
                            )}
                            onClick={handleConfirm}
                            loading={confirmLoading}
                        >
                            {confirmText || dictionary.adForm.confirm}
                        </Button>
                    }
                </Modal.Footer>
            </Modal>}
        </ConfirmDialogContext.Provider>
    );
};


export {
    ConfirmDialogContext,
    ConfirmDialogProvider
}