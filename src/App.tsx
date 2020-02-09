import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Provider } from "react-redux";
import "./App.css";
import { Message } from "./Components/Message";
import { BackgroundImage } from "./Components/BackgroundImage/BackgroundImage";
import { store } from "./Redux/store";
import { SettingsDrawer } from "./Components/SettingsDrawer";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const App = () => {
  return (
    <div className="App">
      <BackgroundImage />
      <Message message="hi" position={{ x: "15%", y: "3%", width: "50%" }} />
    </div>
  );
};

const AppWithCTX = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  );
};

export default AppWithCTX;
