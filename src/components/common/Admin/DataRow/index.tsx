import { clsx } from "clsx";
import React, { ReactNode } from "react";

interface DataRowProps {
  title: ReactNode;
  required?: boolean;
  children: ReactNode;
  className?: string;
  firstColumClass?: string;
  secondColumClass?: string;
  colSpan?: number;
  rowSpan?: number;
  additionalColumn?: { title: string; className?: string }[];
}
const labelColClass =
  "w-[35%] sm:w-[25%] md:w-[20%] lg:w-[15%] px-3 " +
  "!bg-advertiser-light border border-admin-stroke font-medium";

const DataRow = ({
  title,
  required,
  children,
  className,
  firstColumClass,
  additionalColumn,
  colSpan,
  rowSpan,
}: DataRowProps) => {
  return (
    <tr className="h-[48px]">
      <td
        className={clsx(labelColClass, firstColumClass)}
        colSpan={colSpan}
        rowSpan={rowSpan}
      >
        {title}
        {required && <span className="text-admin-error">*</span>}
      </td>
      {additionalColumn?.map((col, index) => (
        <td
          className={clsx(labelColClass, firstColumClass, col.className)}
          key={index}
        >
          {col.title}
        </td>
      ))}
      <td className={clsx("w-[90%] border border-admin-stroke", className)}>
        {children}
      </td>
    </tr>
  );
};

export default DataRow;
