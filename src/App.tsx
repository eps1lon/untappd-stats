import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";

import Header from "./Header";
import Body from "./Body";

export const Context = React.createContext({ version: "unknown" });
const theme = createMuiTheme();

function App() {
  const context = { version: "0.0.1" };

  return (
    <Context.Provider value={context}>
      <ThemeProvider theme={theme}>
        <main>
          <Header />
          <Body />
        </main>
      </ThemeProvider>
    </Context.Provider>
  );
}

export default App;
