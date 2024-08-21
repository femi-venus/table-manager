import "./tablemanager.css";
import _ from "lodash";
import { config } from "./config";
import Form from "./Form";
import { useTableContext } from "./TableManagerProvider";
import { Data } from "./types";
import { useEffect, useState } from "react";

function Table() {
  const { items, checkedIds, SetSelectRow, SetDeleteRow } = useTableContext();

  return (
    <table className="table">
      <thead>
        <tr>
          {_.map(config.headers, (header, key) => (
            <th key={key} className="table-header">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {_.map(items, (content, index) => (
          <tr key={index} className="table--body">
            <td>
              <input
                type="checkbox"
                checked={_.includes(checkedIds, content.id)}
                onChange={() => SetSelectRow(content.id)}
              />
            </td>
            <td>{content.id}</td>
            <td>{content.name}</td>
            <td>{content.description}</td>
            <td>
              <a href={content.link}>{content.link}</a>
            </td>
            <td>{content.should_cook}</td>
            <td>{content.nutrition}</td>
            <td>{content.intake}</td>
            <td>
              <button onClick={() => SetDeleteRow(content.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function TableControlTab() {
  const {
    SetDisplayAction,
    items,
    checkedIds,
    displaySection,
    SetConfirmDelete,

    SetAddData,
  } = useTableContext();
  const filteredData = _.filter(items, (data) =>
    _.includes(checkedIds, data.id)
  );

  function SetAddDataSubmit(data: Data) {
    SetAddData(data);
  }

  if (displaySection === "LOG") {
    console.log(filteredData);
  }
  return (
    <>
      <div className="table-filters">
        <button
          className="table-button"
          onClick={() => SetDisplayAction("DETAILS")}
        >
          Details
        </button>
        <button
          className="table-button"
          onClick={() => SetDisplayAction("LOG")}
        >
          Log
        </button>
        <button
          className="table-button"
          onClick={() => SetDisplayAction("REMOVE")}
        >
          Delete
        </button>
        <button
          className="table-button"
          onClick={() => SetDisplayAction("ADD")}
        >
          Add
        </button>
      </div>
      <div>
        {_.size(filteredData) === 1 && displaySection === "DETAILS" && (
          <div>
            {_.map(filteredData, (data, index) => (
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

        {_.size(filteredData) >= 1 && displaySection === "REMOVE" && (
          <div className="table--delete">
            <p>Do you want to delete the selected items?</p>
            <button
              className="table-button"
              onClick={() => SetConfirmDelete(true)}
            >
              Yes
            </button>
            <button
              className="table-button"
              onClick={() => SetConfirmDelete(false)}
            >
              No
            </button>
          </div>
        )}
        {displaySection === "ADD" && (
          <div className="table--form">
            <Form onSubmitData={SetAddDataSubmit} />
          </div>
        )}
      </div>
    </>
  );
}

export default function TableManager() {
  return (
    <div className="table-manager">
      <Table />
      <TableControlTab />
    </div>
  );
}
