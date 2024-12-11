import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { DisplaySection, TableContextProps, State, Data } from "./types";
import { reducer, initialState } from "./TableReducer";
import _ from "lodash";

const TableContext = createContext<TableContextProps | null>(null);

export default function TableManagerProvider(props: PropsWithChildren<{}>) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const SetSelectRow = (id: number) => {
    dispatch({ type: "set-selected", payload: id });
  };

  const SetDeleteRow = (id: number) => {
    dispatch({ type: "delete-data", payload: id });
  };

  const SetConfirmDelete = (option: boolean) => {
    dispatch({ type: "delete-filtered-data", payload: option });
  };

  const SetAddData = (data: Data) => {
    dispatch({ type: "add-data", payload: data });
  };

  const SetDisplayAction = (actionType: DisplaySection) => {
    dispatch({ type: "display-data", payload: actionType });
  };

  const memoizedValue = useMemo(
    () => ({
      displaySection: state.displaySection,
      data: state.data,
      clearDropdown: state.clearDropdown,
      checkedIds: state.checkedIds,
      items: state.items,
      SetDeleteRow,
      SetSelectRow,
      SetConfirmDelete,

      SetAddData,
      SetDisplayAction,
    }),
    [state, dispatch]
  );

  return (
    <TableContext.Provider value={memoizedValue}>
      {children}
    </TableContext.Provider>
  );
}

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
};
