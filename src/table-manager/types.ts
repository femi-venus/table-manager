export interface Data {
  checked: boolean;
  id: number;
  name: string;
  description: string;
  link: string;
  should_cook: string;
  nutrition: string[];
  intake: string;
}

export interface State {
  checked: boolean;
  display: boolean;
  delete: boolean;
  log: boolean;
  clearDropdown: boolean;
  add: boolean;
  data: Data[];
}

export type Action =
  | { type: "setChecked"; payload: number }
  | { type: "deleteData"; payload: number }
  | { type: "addData"; payload: Data }
  | { type: "deleteFilteredData" }
  | { type: "displayDetails" }
  | { type: "displayLog" }
  | { type: "displayDelete" }
  | { type: "setClearDropdown" }
  | { type: "setDropdown" }
  | { type: "displayAdd" };

export interface TableContextProps {
  state: State;
  handleDelete: (index: number) => void;
  handleSelect: (index: number) => void;
  handleFilteredDelete: () => void;
  handleDeleteYes: () => void;
  handleDeleteNo: () => void;
  handleDetails: () => void;
  handleLog: () => void;
  handleAdd: () => void;
  handleAddData: (data: Data) => void;
}
