import { useState } from "react";
import { Control, useController, useForm } from "react-hook-form";
import Dropdown from "../components/Dropdown";
import RadioInput from "../components/RadioInput";
import TextInput from "../components/TextInput";
import { config } from "./config";
import { Data } from "./types";

interface FormProps {
  onSubmitData: (data: Data) => void;
}

function RadioFormField({ control }: { control: Control<any> }) {
  // const {
  //   formState: { errors },
  // } = useController({
  //   control,
  //   name,
  // });
  return (
    <div className="radio-input">
      Should cook?
      <RadioInput required name="should_cook" value="Yes" control={control} />
      <RadioInput required name="should_cook" value="No" control={control} />
    </div>
  );
}

export default function Form(props: FormProps) {
  const { control, handleSubmit, setValue } = useForm<Data>();
  const [nutrition, setNutrition] = useState<string[]>([]);
  const { onSubmitData } = props;

  const patterns = {
    name: /^[A-Za-z]+$/,
    description: /^[A-Z][a-zA-Z\s,;:'"-]*[.!?]$/,
    link: /^(https?:\/\/)?([\w\d-]+\.)+[a-z]{2,6}(:\d{1,5})?(\/[^\s]*)?$/,
    intake: /^\d+(\.\d+)?\s?g$/,
  };

  const onSubmit = (data: Data) => {
    onSubmitData(data);
  };

  const handleNutrition = (options: string[]) => {
    setNutrition(options);
    setValue("nutrition", options);
  };

  return (
    <div className="input-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          control={control}
          name="name"
          required
          inputPattern={patterns.name}
        />
        <TextInput
          control={control}
          name="description"
          required
          inputPattern={patterns.description}
        />
        <TextInput
          control={control}
          name="link"
          required
          inputPattern={patterns.link}
        />

        <RadioFormField control={control} />

        <Dropdown
          items={config.nutrition}
          options={nutrition}
          onChange={handleNutrition}
          control={control}
          name="nutrition"
        />
        <TextInput
          control={control}
          name="intake"
          required
          inputPattern={patterns.intake}
        />
        <button className="form-button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}
