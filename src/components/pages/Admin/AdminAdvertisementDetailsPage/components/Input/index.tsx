import { EditIcon } from '@src/components/icons/admin/advertisement';
import { clsx } from 'clsx';
import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styles from "../../styles.module.scss";


interface InputProps  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    className?: string, inputClass?: string, iconClass?: string,
    placeholder?: string,
    type?: string,
    iconChild?: boolean,
    iconChildText?: string,
    value? : string,
    error?: boolean,
    helperText?: string,
}

const Input = ({
    type = "text",
    value = "",
    className = "",
    inputClass = "",
    iconClass = "",
    placeholder = "",
    iconChild = false,
    iconChildText = "대",
    error,
    helperText,
    ...rest
}: InputProps) => {


    return (
        <>
            <div 
                className={clsx(
                    styles['input-layout'],
                    className,
                    error && 'border border-admin-error'
                )}
            >
                <input 
                    {...rest}
                    placeholder={placeholder} 
                    type={type} 
                    value={value} 
                    className={clsx(
                        styles['input-body'], 
                        'focus:border-0',
                        inputClass 
                    )}
                />
                <div
                    className={clsx(
                        styles['input-icons'], 
                        iconChild ? "w-[68px] space-x-[19px] flex justify-between" : "w-[33px]", 
                        iconClass
                    )}
                >
                    {iconChild && <span className={styles['inputIconText']}>{iconChildText}</span>}
                    <EditIcon/>
                </div>
            </div>
            {helperText && <div className={clsx(
                "text-sm ",
                error ?  "text-admin-error" : "text-admin-sub"
            )}>{helperText}</div>}
        </>

    );
};
export default Input