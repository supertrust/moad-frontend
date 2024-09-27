import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
  Ref,
  forwardRef,
} from "react";
import clsx from "clsx";

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: ReactNode;
  error_txt?: ReactNode;
  label?: ReactNode;
  caption?: ReactNode;
  wrapperClassName?: string;
  required?: boolean;
  right?: ReactNode;
  errorPosition?: "top" | "bottom";
  labelClassName?: string;
  countClassName?: string;
  captionPosition?: "top" | "bottom";
  justifyEnd?: boolean;
  showCount?: boolean;
  maxCount?: number;
  numberFunctionality?: boolean;
}

function Input(props: InputProps, ref: Ref<any>) {
  const {
    error,
    wrapperClassName,
    required,
    label,
    caption,
    className,
    right,
    errorPosition = "top",
    captionPosition = "bottom",
    justifyEnd = true,
    showCount = false,
    maxCount = null,
    countClassName,
    labelClassName,
    ...rest
  } = props;
  const { disabled = false, value, onChange: onChangeHandler } = rest;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (maxCount && e.target.value.length > maxCount) return;
    onChangeHandler?.(e);
  };

  return (
    <div className={`input-wrap ${wrapperClassName}`}>
      <div className="flex flex-row justify-between items-center">
        {label && (
          <div className="desc mb-2 mr-3">
            {label && (
              <span className={clsx("font-bold", labelClassName)}>{label}</span>
            )}
            {required && <span className="essential text-danger">*</span>}
          </div>
        )}
        {error && errorPosition == "top" && (
          <span className="text-danger text-xs">{error}</span>
        )}
        {caption && captionPosition == "top" && (
          <span className="text-advertiser-primary font-medium">{caption}</span>
        )}
      </div>
      <div className={"flex flex-row items-center"}>
        <input
          ref={ref}
          {...rest}
          onChange={onChange}
          className={clsx(
            className,
            error && "border border-danger",
            right && "pr-10",
            disabled && "!bg-[#EBEDF4]"
          )}
        />
        {showCount && typeof value !== "number" && (
          <span className={clsx(countClassName, "text-sm ml-[-50px] font-medium text-[#10121d]")}>
            (<span className="text-advertiser-primary font-medium">{value?.length}</span>
            {maxCount && "/" + maxCount})
          </span>
        )}
        {right && right}
      </div>
      <div
        className={clsx(
          "flex flex-row text-xs",
          caption && error && "justify-between",
          justifyEnd && !caption && error && "justify-end"
        )}
      >
        {caption && captionPosition == "bottom" && <span>{caption}</span>}
        {error && errorPosition == "bottom" && (
          <span className="pull-right text-danger">{error}</span>
        )}
      </div>
    </div>
  );
}

export default forwardRef(Input);
