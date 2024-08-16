import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { TableContextProps, Data } from "./types";
import { reducer, initialState } from "./TableReducer";

const TableContext = createContext<TableContextProps | null>(null);

export default function TableManagerProvider(props: PropsWithChildren<{}>) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDelete = (index: number) => {
    dispatch({ type: "deleteData", payload: index });
  };

  function handleSelect(index: number) {
    dispatch({ type: "setChecked", payload: index });
  }

  function handleFilteredDelete() {
    dispatch({ type: "displayDelete" });
  }

  function handleDeleteYes() {
    dispatch({ type: "deleteFilteredData" });
  }

  function handleDeleteNo() {
    dispatch({ type: "displayDelete" });
  }

  function handleDetails() {
    dispatch({ type: "displayDetails" });
  }

  function handleLog() {
    dispatch({ type: "displayLog" });
    const filteredData = state.data.filter((data) => data.checked === true);
    console.log(filteredData);
  }

  function handleAdd() {
    dispatch({ type: "displayAdd" });
  }

  function handleAddData(data: Data) {
    dispatch({ type: "addData", payload: data });
  }

  const memoizedValue = useMemo(
    () => ({
      state,
      handleDelete,
      handleSelect,
      handleFilteredDelete,
      handleDeleteYes,
      handleDeleteNo,
      handleDetails,
      handleLog,
      handleAdd,
      handleAddData,
    }),
    [state]
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
