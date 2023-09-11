import Input, { InputProps } from "../../Input";
import { Controller, useFormContext } from "react-hook-form";

export interface RHFInputProps extends InputProps {
    name: string;
}

const RHFInput = (props: RHFInputProps) => {
    const { name, ...rest } = props;
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, ref, value }, fieldState: { error } }) => (
                <Input
                    // @ts-ignore
                    ref={ref}
                    onBlur={onBlur}
                    onChange={e => onChange(e.target.value)}
                    value={value}
                    name={name}
                    error={error?.message}
                    {...rest}
                />
            )}
        />
    )
}

export default RHFInput