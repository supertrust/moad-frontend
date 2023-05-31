import React, { DetailedHTMLProps, InputHTMLAttributes, LegacyRef, ReactNode, Ref, forwardRef } from 'react'

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    error?: ReactNode;
    label?: ReactNode;
    caption?: ReactNode;
    wrapperClassName?: string;
    required?: boolean;
}

function Input(props: InputProps, ref: Ref<any>) {
    const { error, wrapperClassName, required, label, caption, ...rest } = props;
    return (
        <div className={`input-wrap ${wrapperClassName}`}>
            {label && (
                <div className="desc">
                    {label}
                    {required && (<span className="essential">*</span>)}
                </div>
            )}
            <input
                ref={ref}
                {...rest}
            />
            {caption && <span>{caption}</span>}
            {error !== undefined && <span className="d-block bg-danger text-white mt-1 rounded-1 p-2">{error}</span>}
        </div>
    )
}

export default forwardRef(Input)
