import React from "react";
import { DatePicker } from "antd";

export interface RangeProps {
  className?: string;
  format?: string;
  footer?:string;
  onchange?:() => void;
}

function RangePicker(props : RangeProps) {
    const { RangePicker } = DatePicker;
    console.log('footer', props)
  return (
    <RangePicker
      className={props?.className}
      format="YYYY-MM-DD"
      onChange={() => onchange}
      separator={" ~ "}
      allowClear={false}
      suffixIcon={""}
      inputReadOnly
      renderExtraFooter={() => {return props?.footer}}
    />
  );
}

export default RangePicker;
