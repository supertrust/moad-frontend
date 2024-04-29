import { clsx } from "clsx";
import React, { ReactNode } from "react";

interface DataRowProps {
    title: string | ReactNode,
    required?: boolean
    children: ReactNode
    className?: string
    firstColumClass?: string
    secondColumClass?: string
    colSpan?: number,
    rowSpan?: number,
    additionalColumn?: { title: string , className?: string}[],
    rowClass?:string
}
const labelColClass =  'w-[109px] sm:w-[25%] md:w-[20%] lg:w-[15%]  px-[12px]' +
    ' bg-advertiser-light border border-admin-stroke font-medium text-[#2c324c]'


const DataRow = ({
                     title , required,
                     children , className, firstColumClass,
                     additionalColumn, colSpan , rowSpan , rowClass,
                 }: DataRowProps) => {
    return (
        <tr className={clsx('h-[48px]', rowClass)}>
            <td
                className={clsx( labelColClass, firstColumClass )}
                colSpan={colSpan}
                rowSpan={rowSpan}
            >
                {title}
                {required && <span className="text-admin-error">*</span>}
            </td>
            {additionalColumn?.map((col, index) => (
                <td
                    className={clsx( labelColClass, firstColumClass, col.className )}
                    key={index}
                >
                    {col.title}
                </td>
            ))}
            <td className={clsx('w-[65%] md:w-[90%]  border border-admin-stroke', className)}>
                <div className={clsx('w-[100%]',className)}>
                    {children}
                </div>
            </td>
        </tr>
    )
}

export default DataRow
