import { useEffect, useState } from "react";
import _ from "lodash";
import "./tablemanager.css";

interface Props {
  items: string[];
  onChange: (options: string[]) => void;
}

export default function Dropdown(props: Props) {
  const { items, onChange } = props;
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);

  const handleChange = (item: string) => {
    setSelectedItem((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  useEffect(() => {
    onChange(selectedItem);
  }, [selectedItem, onChange]);

  const selectedOptions = _.join(selectedItem, ", ");

  return (
    <div className="cl--main">
      <div className="cl-header">
        <input
          className="cl--display"
          type="text"
          value={selectedOptions}
          onClick={() => setOpen(!open)}
          readOnly
        />
      </div>

      {open && (
        <div className="cl--items">
          {items.map((item, index) => (
            <label
              key={index}
              onChange={() => handleChange(item)}
              className="cl--item"
            >
              <input
                className="checkbox"
                checked={selectedItem.includes(item)}
                type="checkbox"
                onChange={() => onChange(selectedItem)}
              />
              {item}
              <br />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
