import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

export interface RangeProps {
  className?: string;
  format?: string;
  footer?:string;
  startDate?:Date;
  endDate?:Date;
  onchange?:VoidFunction;
}

function RangePicker(props : RangeProps) {
    const { RangePicker } = DatePicker;

  return (
    <RangePicker
      className={props?.className}
      format="YYYY-MM-DD"
      // onChange={(range) => onchange(range)}
      separator={" ~ "}
      allowEmpty={[false,false]}
      // defaultValue={[dayjs(props.startDate??new Date()),dayjs(props.endDate??new Date())]}
      allowClear={false}
      suffixIcon={""}
      inputReadOnly
      renderExtraFooter={() => {return props?.footer}}
    />
  );
}

export default RangePicker;
