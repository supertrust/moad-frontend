import React, { DetailedHTMLProps, InputHTMLAttributes, ReactNode, Ref, forwardRef } from 'react'
import clsx from 'clsx';

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    error?: ReactNode;
    error_txt?: ReactNode;
    label?: ReactNode;
    caption?: ReactNode;
    wrapperClassName?: string;
    required?: boolean;
    right? : ReactNode
    errorPosition?: 'top' | 'bottom'
}

function Input(props: InputProps, ref: Ref<any>) {
    const { error, wrapperClassName, required, label, caption, className, right,errorPosition = 'top',  ...rest } = props;
    return (
        <div className={`input-wrap ${wrapperClassName}`}>
            <div className='flex flex-row justify-between items-center'>
                {label && (
                    <div className="desc mb-2 mr-3">
                        {label && (<span className="font-bold">{label}</span>)}
                        {required && (<span className="essential text-danger">*</span>)}
                    </div>
                )}
                {error && errorPosition == 'top' && <span className="text-danger">{error}</span>}
            </div>
            <div className='flex flex-row items-center'>
                <input
                    ref={ref}
                    {...rest}
                    className={clsx(
                        className,  
                        error && 'border border-danger' ,
                        right && 'pr-10'
                    )}
                />
                {right && right}
            </div>
            <div className={clsx('flex flex-row ', caption && error && 'justify-between', !caption && error && 'justify-end' )}>
                {caption && <span>{caption}</span>}
                {error && errorPosition == 'bottom' && <span className="pull-right text-danger">{error}</span>}
            </div>
        </div>
    )
}

export default forwardRef(Input)
