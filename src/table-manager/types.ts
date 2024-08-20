export interface Data {
  id: number;
  name: string;
  description: string;
  link: string;
  should_cook: string;
  nutrition: string[];
  intake: string;
}

export type DisplaySection = "NONE" | "DETAILS" | "LOG" | "REMOVE" | "ADD";

export interface State {
  checkedIds: number[];
  clearDropdown: boolean;
  data: Data[];
  displaySection: DisplaySection;
}

export type Action =
  | { type: "set-selected"; payload: number }
  | { type: "delete-data"; payload: number }
  | { type: "add-data"; payload: Data }
  | { type: "delete-filtered-data" }
  | { type: "!delete-filtered-data" }
  | { type: "display-data"; payload: DisplaySection };

export interface TableContextProps {
  checkedIds: number[];
  clearDropdown: boolean;
  data: Data[];
  displaySection: DisplaySection;
  SetDeleteRow: (index: number) => void;
  SetSelectRow: (index: number) => void;
  SetConfirmDelete: () => void;
  SetIgnoreDelete: () => void;
  SetAddData: (data: Data) => void;
  SetDisplayAction: (
    DisplaySection: "DETAILS" | "LOG" | "REMOVE" | "ADD" | "NONE"
  ) => void;
}
