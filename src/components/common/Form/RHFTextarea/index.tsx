import Textarea, { TextareaProps } from "../../Textarea";
import { Controller, useFormContext } from "react-hook-form";

export interface RHFTextareaProps extends TextareaProps {
  name: string;
}

const RHFTextarea = (props: RHFTextareaProps) => {
  const { name, ...rest } = props;
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, ref, value },
        fieldState: { error },
      }) => (
        <Textarea
          // @ts-ignore
          ref={ref}
          onBlur={onBlur}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          name={name}
          error={error?.message}
          {...rest}
        />
      )}
    />
  );
};

export default RHFTextarea;
