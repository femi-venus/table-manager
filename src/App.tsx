import React from "react";

import "./App.css";
import TableManager from "./table-manager/TableManager";
import TableManagerProvider from "./table-manager/TableManagerProvider";

function App() {
  return (
    <div className="App">
      <TableManagerProvider>
        <TableManager />
      </TableManagerProvider>
    </div>
  );
}

export default App;
