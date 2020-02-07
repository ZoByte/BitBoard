import React from "react";
import "./App.css";
import { Message } from "./Components/Message";
import { IconButton, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import { BackgroundImage } from "./Components/BackgroundImage";
import { Contrast } from "./Components/Contrast";
import { AppContextProvider } from "./AppContext";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const App = () => {
  return (
    <div className="App">
      <AppContextProvider>
        <ThemeProvider theme={theme}>
          <BackgroundImage />
          <Message
            message="hi"
            position={{ x: "15%", y: "3%", width: "50%" }}
          />
          <Contrast>
            <IconButton>
              <Settings />
            </IconButton>
          </Contrast>
        </ThemeProvider>
      </AppContextProvider>
    </div>
  );
};

const AppWithCTX = () => {
  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AppContextProvider>
  );
};

export default AppWithCTX;
