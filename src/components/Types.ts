export interface Data {
  checked: boolean;
  name: string;
  description: string;
  link: string;
  cook: string;
  nutrition: string;
  intake: string;
}
export interface State {
  checked: boolean;
  name: string;
  description: string;
  link: string;
  cook: string;
  nutrition: string;
  intake: string;
  data: Data[];
  display: boolean;
}
export type Action =
  | { type: "setChecked"; payload: number }
  | { type: "setName"; payload: string }
  | { type: "setDescription"; payload: string }
  | { type: "setLink"; payload: string }
  | { type: "setIntake"; payload: string }
  | { type: "setCook"; payload: string }
  | { type: "setNutrition"; payload: string }
  | { type: "setData"; payload: Data[] }
  | { type: "deleteData"; payload: number }
  | { type: "deleteFilteredData" }
  | { type: "displayDetails" };
