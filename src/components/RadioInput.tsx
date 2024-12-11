import _ from "lodash";
import { ComponentProps } from "react";
import { Control, useController } from "react-hook-form";

type RadioInputProps = ComponentProps<"input"> & {
  control: Control<any>;
  value: string;
  name: string;
  required: boolean;
};

export default function RadioInput({
  control,
  required,
  value,
  name,
}: RadioInputProps) {
  const {
    formState: { errors },
  } = useController({
    control,
    name,
  });
  const msg = _.toString(errors[name]?.message);
  return (
    <label>
      <input
        type="radio"
        value={value}
        {...control.register(name, {
          required: required && `Select any one option`,
        })}
      />
      {value}
      {errors[name] && <div className="errors">{msg}</div>}
    </label>
  );
}
