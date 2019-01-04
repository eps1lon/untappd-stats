import React from "react";

import Header from "./Header";
import Body from "./Body";

export const Context = React.createContext({ version: "unknown" });

function App() {
  const context = { version: "0.0.1" };

  return (
    <Context.Provider value={context}>
      <main>
        <Header />
        <Body />
      </main>
    </Context.Provider>
  );
}

export default App;
