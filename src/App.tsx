import React from "react";
import { IconButton, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Provider, useDispatch } from "react-redux";
import "./App.css";
import { Message } from "./Components/Message";
import { Settings } from "@material-ui/icons";
import { BackgroundImage } from "./Components/BackgroundImage";
import { Contrast } from "./Components/Contrast";
import { store } from "./Redux/store";
import { ToggleSettingsDrawer } from "./Redux/AppReducer";
import { SettingsDrawer } from "./Components/SettingsDrawer";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const App = () => {
  const dispatch = useDispatch();

  return (
    <div className="App">
      <BackgroundImage />
      <Message message="hi" position={{ x: "15%", y: "3%", width: "50%" }} />
      <Contrast>
        <IconButton onClick={() => dispatch(ToggleSettingsDrawer())}>
          <Settings />
        </IconButton>
      </Contrast>
      <SettingsDrawer />
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
