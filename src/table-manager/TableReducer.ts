import produce from "immer";
import { State, Action } from "./types";
import _ from "lodash";
import { useEffect } from "react";

export const reducer = produce((state: State, action: Action) => {
  switch (action.type) {
    case "set-selected":
      const id = action.payload;
      const isChecked = _.includes(state.checkedIds, id);
      state.checkedIds = isChecked
        ? _.filter(state.checkedIds, (checkedId) => checkedId !== id)
        : [...state.checkedIds, id];
      break;

    case "delete-data":
      state.data = state.data;
      state.items = _.filter(state.items, (data) => data.id !== action.payload);

      break;

    case "add-data":
      state.data = [...state.data, action.payload];
      state.items = [...state.items, action.payload];
      break;

    case "delete-filtered-data":
      if (action.payload) {
        state.items = _.filter(
          state.items,
          (data) => !_.includes(state.checkedIds, data.id)
        );
        state.checkedIds = [];
      } else {
        state.checkedIds = [];
      }
      break;

    case "display-data":
      switch (action.payload) {
        case "REMOVE":
          state.displaySection = "REMOVE";
          break;
        case "DETAILS":
          state.displaySection = "DETAILS";
          break;
        case "LOG":
          state.displaySection = "LOG";
          break;
        case "ADD":
          state.displaySection = "ADD";
          break;
      }
      break;

    default:
      break;
  }
});

export const initialState: State = {
  checkedIds: [],

  clearDropdown: false,
  items: [
    {
      id: 1,
      name: "Potato",
      description: "It is healthy.",
      link: "https://en.wikipedia.org/wiki/Potato",
      should_cook: "Yes",
      nutrition: ["Carbohydrates, ", "Dietary fiber"],
      intake: "100g",
    },
    {
      id: 2,
      name: "Tomato",
      description: "It is red.",
      link: "https://en.wikipedia.org/wiki/Tomato",
      should_cook: "No",
      nutrition: ["Lycopene, ", "Antioxidants"],
      intake: "200g",
    },
  ],
  displaySection: "NONE",
  data: [
    {
      id: 1,
      name: "Potato",
      description: "It is healthy.",
      link: "https://en.wikipedia.org/wiki/Potato",
      should_cook: "Yes",
      nutrition: ["Carbohydrates, ", "Dietary fiber"],
      intake: "100g",
    },
    {
      id: 2,
      name: "Tomato",
      description: "It is red.",
      link: "https://en.wikipedia.org/wiki/Tomato",
      should_cook: "No",
      nutrition: ["Lycopene, ", "Antioxidants"],
      intake: "200g",
    },
  ],
};
