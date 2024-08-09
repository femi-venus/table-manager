import React from "react";
import "./tablemanager.css";
import { useReducer } from "react";
import { reducer, initialState } from "./TableReducer";
import _ from "lodash";
import Dropdown from "./Dropdown";

export default function Table() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const headers = [
    " ",
    "id",
    "Name",
    "Description",
    "Link",
    "ShouldCook",
    "Nutrition",
    "intake per Day",
    "Actions",
  ];

  const nutrition = [
    "Vitamin C",
    "dietary fiber",
    "antioxidants",
    "Potassium",
    "vitamin B6",
    "flavonoids",
    "Vitamin A (beta-carotene)",
    "vitamin K",
    " Iron",
    " calcium",
    "magnesium",
    "lycopene",
  ];

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "setName", payload: e.target.value });
  };
  const handleDesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "setDescription", payload: e.target.value });
  };
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "setLink", payload: e.target.value });
  };
  const handleIntakeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "setIntake", payload: e.target.value });
  };

  const handleDelete = (index: number) => {
    dispatch({ type: "deleteData", payload: index });
  };
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "setCook", payload: e.target.value });
  };
  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const newData = {
      checked: state.checked,
      name: state.name,
      description: state.description,
      link: state.link,
      cook: state.cook,
      nutrition: state.nutrition,
      intake: state.intake,
    };

    dispatch({ type: "setData", payload: [...state.data, newData] });
  }

  function handleNutrition(items: string[]) {
    const nutrients = _.join(items, ", ");
    dispatch({ type: "setNutrition", payload: nutrients });
  }
  const filtered_data = state.data.filter((data) => data.checked === true);
  function handleSelect(index: number) {
    dispatch({ type: "setChecked", payload: index });
  }
  function handleFilteredDelete() {
    dispatch({ type: "deleteFilteredData" });
  }
  function handleDetails() {
    dispatch({ type: "displayDetails" });
  }
  function handleLog() {
    console.log(filtered_data);
  }

  return (
    <div className="table-manager">
      <table className="table">
        <thead>
          <tr>
            {headers.map((header, key) => (
              <th key={key} className="table-header">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {state.data.map((content, index) => (
            <tr key={index} className="table--body">
              <td>
                <input
                  type="checkbox"
                  checked={content.checked}
                  onChange={() => handleSelect(index)}
                />
              </td>
              <td>{index + 1}</td>
              <td>{content.name}</td>
              <td>{content.description}</td>
              <td>
                <a href={content.link}>{content.link}</a>
              </td>
              <td>{content.cook}</td>
              <td>{content.nutrition}</td>
              <td>{content.intake}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr className="table--input">
            <td></td>

            <td>{state.data.length + 1}</td>

            <td>
              <input type="text" onChange={handleNameChange} />
            </td>
            <td>
              <input type="text" onChange={handleDesChange} />
            </td>
            <td>
              <input type="text" onChange={handleLinkChange} />
            </td>
            <td>
              <div>
                <input
                  type="radio"
                  value="Yes"
                  onChange={handleChecked}
                  checked={state.cook === "Yes"}
                  readOnly
                />
                Yes
                <input
                  type="radio"
                  value="No"
                  onChange={handleChecked}
                  checked={state.cook === "No"}
                  readOnly
                />
                No
              </div>
            </td>
            <td>
              <Dropdown
                items={nutrition}
                onChange={(options: string[]) => handleNutrition(options)}
              />
            </td>
            <td>
              <input type="text" onChange={handleIntakeChange} />
            </td>
            <td>
              <button onClick={handleClick}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="table-filters">
        <button className="table-button" onClick={handleDetails}>
          Details
        </button>
        <button className="table-button" onClick={handleLog}>
          Log
        </button>
        <button className="table-button" onClick={handleFilteredDelete}>
          Delete
        </button>
      </div>
      {state.display && _.size(filtered_data) === 1 && (
        <div>
          {filtered_data.map((data, index) => (
            <div key={index} className="table--details">
              <p>{data.name} is a superfood. </p>
              <p>{data.description}</p>
              {data.cook === "Yes" && <p>It must be cooked.</p>}
              {data.cook === "No" && <p>It can be consumed raw.</p>}
              <p>It is a source of nutrients like {data.nutrition}</p>
              <p>
                For more info: <a href={data.link}>{data.link}</a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
