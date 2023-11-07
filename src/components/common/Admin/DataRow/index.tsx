import { clsx } from "clsx";
import React,  { ReactNode } from "react";

interface DataRowProps {
    title: string, 
    required?: boolean
    children: ReactNode
    className?: string
}

const DataRow = ({title , required,  children , className}: DataRowProps) => {
    return (
        <tr className='h-[48px]'>
            <td className='bg-admin-light w-[35%] sm:w-[25%] md:w-[15%] px-3 border border-admin-stroke font-medium'>
                {title}
                {required && <span className="text-admin-error">*</span>}
            </td>
            <td className={clsx('w-[90%] border border-admin-stroke', className)}>{children}</td>
        </tr>
    )
}

export default DataRow