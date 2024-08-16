import produce from "immer";
import { State, Action } from "./types";

export const reducer = produce((state: State, action: Action) => {
  switch (action.type) {
    case "setChecked":
      state.data = state.data.map((data, i) =>
        i === action.payload ? { ...data, checked: !data.checked } : data
      );
      break;

    case "deleteData":
      state.data = state.data.filter((_, index) => index !== action.payload);
      break;

    case "addData":
      state.data = [...state.data, action.payload];
      break;

    case "deleteFilteredData":
      state.data = state.data.filter((data) => !data.checked);
      break;

    case "displayDetails":
      state.display = !state.display;
      state.delete = false;
      state.log = false;
      state.add = false;
      break;

    case "displayLog":
      state.log = !state.log;
      state.display = false;
      state.delete = false;
      state.add = false;
      break;

    case "displayDelete":
      state.delete = !state.delete;
      state.display = false;
      state.log = false;
      state.add = false;
      break;

    case "displayAdd":
      state.add = !state.add;
      state.display = false;
      state.log = false;
      state.delete = false;
      break;

    case "setClearDropdown":
      state.clearDropdown = true;
      break;

    case "setDropdown":
      state.clearDropdown = false;
      break;

    default:
      break;
  }
});

export const initialState: State = {
  checked: false,
  display: false,
  delete: false,
  log: false,
  clearDropdown: false,
  add: false,
  data: [
    {
      checked: false,
      id: 1,
      name: "Potato",
      description: "It is healthy.",
      link: "https://en.wikipedia.org/wiki/Potato",
      should_cook: "Yes",
      nutrition: ["carbohydrates, ", "dietary fiber"],
      intake: "100g",
    },
    {
      checked: false,
      id: 2,
      name: "Tomato",
      description: "It is red.",
      link: "https://en.wikipedia.org/wiki/Tomato",
      should_cook: "No",
      nutrition: ["lycopene, ", "antioxidants"],
      intake: "200g",
    },
  ],
};
