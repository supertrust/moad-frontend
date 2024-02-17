import { useRef } from "react";
import Input, { InputProps } from "../../Input";
import { Controller, useFormContext } from "react-hook-form";
import { numberWithHyphens, numberWithoutHyphens } from "@src/helpers";

export interface RHFInputProps extends InputProps {
    name: string;
}

const RHFInput = (props: RHFInputProps) => {
    const { name, caption, type, numberFunctionality = true, ...rest } = props;
    const { control } = useFormContext();
    const isPhoneNumber = type === 'phoneNumber'
    const inputType = isPhoneNumber ? 'text' : type
    const numberInputRef = useRef(null);

    const isNumberFunctionalityOff = () => (type === "number" && !numberFunctionality) || isPhoneNumber
        || name.includes('phone_number')


    const handleScroll = (event) => {
        if (numberInputRef && numberInputRef?.current && isNumberFunctionalityOff()) {
            //@ts-ignore
            numberInputRef.current.blur();
        }
    };

    return (
        <Controller

            control={control}
            name={name}
            render={({ field: { onChange, onBlur, ref, value }, fieldState: { error } }) => (
                <Input
                    // @ts-ignore
                    ref={isNumberFunctionalityOff()?numberInputRef : ref}
                    onBlur={onBlur}
                    onChange={e => onChange(isPhoneNumber ? numberWithoutHyphens(e.target.value, value) : e.target.value)}
                    value={isPhoneNumber ? numberWithHyphens(value, name) : value}
                    name={name}
                    caption={!error && caption}
                    error={error?.message}
                    type={inputType}
                    {...rest}
                    onWheel={handleScroll}
                />
            )}
        />
    )
}

export default RHFInput
