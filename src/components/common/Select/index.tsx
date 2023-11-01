import React, { DetailedHTMLProps, InputHTMLAttributes, ReactNode, Ref, SelectHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx';
import Image from 'next/image';

export interface SelectProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    error?: ReactNode;
    error_txt?: ReactNode;
    label?: ReactNode;
    caption?: ReactNode;
    wrapperClassName?: string;
    required?: boolean;
    right?: ReactNode
    errorPosition?: 'top' | 'bottom',
    labelClassName?: string;
    captionPosition?: 'top' | 'bottom',
    options: { value: string, text: string }[];
    selected?: string,
}
interface Option {
    value?: string,
    text?: string
}

function Select(props: SelectProps, ref: Ref<any>) {
    const {
        error, wrapperClassName, required, label, caption, className, right,
        errorPosition = 'top', captionPosition = 'bottom', labelClassName, options,selected, ...rest } = props;
    return (
        <div className={`select-wrap ${wrapperClassName}`}>
            <div className='flex flex-row justify-between items-center'>
                {label && (
                    <div className="desc mb-2 mr-3">
                        {label && (<span className={clsx("font-bold", labelClassName)}>{label}</span>)}
                        {required && (<span className="essential text-danger">*</span>)}
                    </div>
                )}
                {error && errorPosition == 'top' && <span className="text-danger">{error}</span>}
                {caption && captionPosition == 'top' && <span className="text-[#3772FF] font-medium">{caption}</span>}
            </div>
            <div className='flex flex-row items-center select-section'>
                <Image src="/images/down-arrow.png" width={12} height={8} alt=""  className='absolute right-[18px]'/>
                <select
                    {...rest}
                    className={clsx(
                        className,
                        error && 'border border-danger',
                        right && 'pr-10'
                    )}>
                    {options?.map((data: Option, index) => (
                        <option key={index} value={data?.value}>{data.text}</option>
                    ))}
                </select>
                {right && right}
            </div>
            <div className={clsx('flex flex-row ', caption && error && 'justify-between', !caption && error && 'justify-end')}>
                {caption && captionPosition == 'bottom' && <span>{caption}</span>}
                {error && errorPosition == 'bottom' && <span className="pull-right text-danger">{error}</span>}
            </div>
        </div>
    )
}

export default forwardRef(Select)
