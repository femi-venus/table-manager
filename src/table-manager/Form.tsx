import { useState } from "react";
import { Control, useController, useForm } from "react-hook-form";
import Dropdown from "../components/Dropdown";
import RadioInput from "../components/RadioInput";
import TextInput from "../components/TextInput";
import { config } from "./config";
import { Data } from "./types";
import { useTableContext } from "./TableManagerProvider";

interface FormProps {
  onSubmitData: (data: Data) => void;
}

function RadioFormField({ control }: { control: Control<any> }) {
  return (
    <div className="radio-input">
      Should cook?
      <RadioInput required name="should_cook" value="Yes" control={control} />
      <RadioInput required name="should_cook" value="No" control={control} />
    </div>
  );
}

export default function Form(props: FormProps) {
  const { data } = useTableContext();
  const { control, handleSubmit, setValue } = useForm<Data>();
  const [nutrition, setNutrition] = useState<string[]>([]);
  const { onSubmitData } = props;

  const onSubmit = (datas: Data) => {
    const highestId = data.length;
    onSubmitData({ ...datas, id: highestId + 1 });
    console.log("New Row Added!");
  };

  const handleSelectOption = (options: string[]) => {
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
          inputPattern={config.patterns.name}
        />
        <TextInput
          control={control}
          name="description"
          required
          inputPattern={config.patterns.description}
        />
        <TextInput
          control={control}
          name="link"
          required
          inputPattern={config.patterns.link}
        />

        <RadioFormField control={control} />

        <Dropdown
          items={config.nutrition}
          options={nutrition}
          onChange={handleSelectOption}
          control={control}
          name="nutrition"
        />
        <TextInput
          control={control}
          name="intake"
          required
          inputPattern={config.patterns.intake}
        />
        <button className="form-button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}
