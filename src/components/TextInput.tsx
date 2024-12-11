import _ from "lodash";
import { ComponentProps } from "react";
import { Control, useController } from "react-hook-form";

type TextInputProps = ComponentProps<"input"> & {
  control: Control<any>;
  name: string;
  required: boolean;
  inputPattern: RegExp;
};

export default function TextInput({
  control,
  name,
  required,
  inputPattern,
}: TextInputProps) {
  const {
    formState: { errors },
  } = useController({ control, name });

  const msg = _.toString(errors[name]?.message);
  return (
    <div>
      <input
        type="text"
        className="text-input"
        placeholder={name}
        {...control.register(name, {
          required: required && `${name} is required`,
          pattern: { value: inputPattern, message: "Invalid input !" },
        })}
      />
      {errors[name] && <div className="errors">{msg}</div>}
    </div>
  );
}
