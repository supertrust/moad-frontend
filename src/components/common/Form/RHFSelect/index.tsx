import Select, { SelectProps } from "../../Select";
import { Controller, useFormContext } from "react-hook-form";

export interface RHFSelectProps extends SelectProps {
    name: string;
}

const RHFSelect = (props: RHFSelectProps) => {
    const { name, ...rest } = props;
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, ref, value }, fieldState: { error } }) => (
                // @ts-ignore
                <Select
                    onBlur={onBlur}
                    onChange={(e) => {
                        onChange(e.target.value);
                    }}
                    value={value || ""}
                    name={name}
                    {...rest}
                />
            )}
        />
    )
}

export default RHFSelect