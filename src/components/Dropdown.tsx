import { useEffect, useState } from "react";
import _ from "lodash";
import { Control, useController } from "react-hook-form";

interface Props {
  items: { id: number; value: string; label: string }[];
  onChange: (options: string[]) => void;
  options?: string[];
  control: Control<any>;
  name: string;
}

export default function Dropdown(props: Props) {
  const { items, control, name } = props;
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const {
    formState: { errors },
  } = useController({ control, name });
  const msg = _.toString(errors[name]?.message);

  const handleChange = (item: string) => {
    setSelectedItem((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const selectedOptions = _.join(selectedItem, ", ");

  return (
    <div className="cl--main">
      <div className="cl-header">
        <input
          className="cl--display"
          type="text"
          placeholder="Select..."
          value={selectedOptions}
          onClick={() => setOpen(!open)}
          {...control.register(name, {
            required: `${name} is required`,
          })}
          readOnly
        />
        {errors[name] && <div className="errors">{msg}</div>}
      </div>

      {open && (
        <div className="cl--items">
          {_.map(items, (item) => (
            <label
              key={item.id}
              onChange={() => handleChange(item.label)}
              className="cl--item"
            >
              <input
                className="checkbox"
                checked={selectedItem.includes(item.label)}
                type="checkbox"
                readOnly
              />
              {item.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
