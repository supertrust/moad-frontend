import { clsx } from "clsx";
import React, {
  DetailedHTMLProps,
  ReactNode,
  Ref,
  TextareaHTMLAttributes,
  forwardRef,
} from "react";

export interface TextareaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  error?: ReactNode;
  error_txt?: ReactNode;
  label?: ReactNode;
  caption?: ReactNode;
  wrapperClassName?: string;
  required?: boolean;
  // right? : ReactNode
  errorPosition?: "top" | "bottom";
  showLength?: boolean;
  placeholderError?: boolean;
}

function Textarea(props: TextareaProps, ref: Ref<any>) {
  const {
    value,
    error,
    placeholderError = false,
    wrapperClassName,
    required,
    label,
    caption,
    className,
    errorPosition = "top",
    showLength,
    maxLength,
    ...rest
  } = props;

  const formatNumber = (number: number) => {
    return number.toLocaleString("en-US").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className={clsx(`input-wrap`, wrapperClassName)}>
      <div className="flex flex-row justify-between items-center">
        {label && (
          <div className="desc mb-2 mr-3">
            {label && <span className="font-bold">{label}</span>}
            {required && <span className="essential text-danger">*</span>}
          </div>
        )}
        {!placeholderError && error && errorPosition == "top" && (
          <span className="text-danger">{error}</span>
        )}
      </div>
      <textarea
        ref={ref}
        {...rest}
        value={value}
        className={clsx(
          `w-full text-gray-600 outline-[#EBEDF4] py-2 px-3 border border-gray-300 rounded`,
          error && "!border-[#F24747]",
          error && placeholderError && "placeholder:!text-[#F24747]",
          className
        )}
      ></textarea>
      <div
        className={clsx(
          "flex flex-row ",
          caption && error && "justify-between",
          !caption && error && "justify-end"
        )}
      >
        {caption && <span>{caption}</span>}
        {!placeholderError && error && errorPosition == "bottom" && (
          <span className="pull-right text-danger">{error}</span>
        )}
      </div>
      {showLength && (
        <div className="flex flex-row justify-end text-[#999999]">
          (
          <span className="text-primary">
            {formatNumber((value as string)?.length || 0)}
          </span>
          {maxLength && "/" + formatNumber(maxLength)})
        </div>
      )}
    </div>
  );
}

export default forwardRef(Textarea);
