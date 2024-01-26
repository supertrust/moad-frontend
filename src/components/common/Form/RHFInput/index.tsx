import Input, { InputProps } from "../../Input";
import { Controller, useFormContext } from "react-hook-form";
import { numberWithHyphens, numberWithoutHyphens } from "@src/helpers";

export interface RHFInputProps extends InputProps {
    name: string;
}

const RHFInput = (props: RHFInputProps) => {
    const { name,caption, type, ...rest } = props;
    const { control } = useFormContext();
    const isPhoneNumber = type === 'phoneNumber'
    const inputType = isPhoneNumber ? 'text' : type

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, ref, value }, fieldState: { error } }) => (
                <Input
                    // @ts-ignore
                    ref={ref}
                    onBlur={onBlur}
                    onChange={e => onChange(isPhoneNumber ? numberWithoutHyphens(e.target.value, value) : e.target.value)}
                    value={isPhoneNumber ? numberWithHyphens(value) : value}
                    name={name}
                    caption={!error && caption}
                    error={error?.message}
                    type={inputType}
                    {...rest}
                />
            )}
        />
    )
}

export default RHFInput
