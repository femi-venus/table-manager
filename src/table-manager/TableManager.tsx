import React from "react";
import "./tablemanager.css";

import _ from "lodash";

import { config } from "./config";
import Form from "./Form";
import { useTableContext } from "./TableManagerProvider";
import { Data } from "./types";

function Table() {
  const { state, handleSelect, handleDelete } = useTableContext();

  return (
    <table className="table">
      <thead>
        <tr>
          {config.headers.map((header, key) => (
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
            <td>{content.should_cook}</td>
            <td>{content.nutrition}</td>
            <td>{content.intake}</td>
            <td>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Filters() {
  const {
    state,
    handleDetails,
    handleLog,
    handleFilteredDelete,
    handleAdd,
    handleAddData,
  } = useTableContext();
  return (
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
      <button className="table-button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

function Displays() {
  const { state, handleDeleteYes, handleDeleteNo, handleAddData } =
    useTableContext();
  const filtered_data = state.data.filter((data) => data.checked === true);

  function handleAddDataSubmit(data: Data) {
    handleAddData(data);
  }

  return (
    <div>
      {_.size(filtered_data) === 1 && state.display && (
        <div>
          {filtered_data.map((data, index) => (
            <div key={index} className="table--details">
              <p>{data.name} is a superfood. </p>
              <p>{data.description}</p>
              {data.should_cook === "Yes" && <p>It must be cooked.</p>}
              {data.should_cook === "No" && <p>It can be consumed raw.</p>}
              <p>It is a source of nutrients like {data.nutrition}.</p>
              <p>
                For more info: <a href={data.link}>{data.link}</a>
              </p>
            </div>
          ))}
        </div>
      )}
      {_.size(filtered_data) >= 1 && state.delete && (
        <div className="table--delete">
          <p>Do you want to delete the selected items?</p>
          <button className="table-button" onClick={handleDeleteYes}>
            Yes
          </button>
          <button className="table-button" onClick={handleDeleteNo}>
            No
          </button>
        </div>
      )}
      {state.add && (
        <div className="table--form">
          <Form onSubmitData={handleAddDataSubmit} />
        </div>
      )}
    </div>
  );
}

export default function TableManager() {
  return (
    <div className="table-manager">
      <Table />
      <Filters />
      <Displays />
    </div>
  );
}
