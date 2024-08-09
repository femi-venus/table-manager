import produce from "immer";
import { State, Action } from "./Types";

export const reducer = produce((state: State, action: Action) => {
  switch (action.type) {
    case "setChecked":
      const changed_status = state.data.map((data, i) =>
        i === action.payload ? { ...data, checked: !data.checked } : data
      );
      state.data = changed_status;

      break;
    case "setName":
      state.name = action.payload;
      break;
    case "setDescription":
      state.description = action.payload;
      break;
    case "setLink":
      state.link = action.payload;
      break;
    case "setIntake":
      state.intake = action.payload;
      break;
    case "setCook":
      state.cook = action.payload;
      break;

    case "setNutrition":
      state.nutrition = action.payload;
      break;

    case "setData":
      state.data = action.payload;
      state.name = "";
      state.link = "";
      state.intake = "";
      state.description = "";
      state.cook = "";
      break;
    case "deleteData":
      const undeleted_data = state.data.filter(
        (data, index) => index !== action.payload
      );
      state.data = undeleted_data;
      break;

    case "deleteFilteredData":
      state.data = state.data.filter((data) => !data.checked);
      break;

    case "displayDetails":
      state.display = !state.display;
      break;
    default:
      break;
  }
});

export const initialState: State = {
  checked: false,
  name: "",
  description: "",
  link: "",
  intake: "",
  cook: "",
  nutrition: "",
  display: false,
  data: [
    {
      checked: false,
      name: "Potato",
      description: "It is healthy",
      link: "https://en.wikipedia.org/wiki/Potato",
      cook: "Yes",
      nutrition: "carbohydrates, dietary fiber",
      intake: "100g",
    },
    {
      checked: false,
      name: "Tomato",
      description: "It is red and belongs to the berry family.",
      link: "https://en.wikipedia.org/wiki/Tomato",
      cook: "Yes",
      nutrition: "lycopene, antioxidants",
      intake: "200g",
    },
  ],
};
