import React from "react";
import {
  createMuiTheme,
  ThemeProvider,
  IconButton,
  Typography
} from "@material-ui/core";
import { Provider, useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Message } from "./Components/Message";
import { BackgroundImage } from "./Components/BackgroundImage";
import { store } from "./Redux/store";
import { Contrast } from "./Components/Contrast";
import { Edit, Check } from "@material-ui/icons";
import { ToggleEditing } from "./Redux/AppReducer";
import { IState } from "./Redux/IState";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const App = () => {
  const dispatch = useDispatch();
  const editing = useSelector((state: IState) => state.editing);

  return (
    <div className="App">
      <BackgroundImage />
      <Message message="hi" position={{ x: "15%", y: "3%", width: "50%" }} />
      <div style={{ position: "absolute", bottom: "0", right: "0" }}>
        <Contrast>
          <IconButton onClick={() => dispatch(ToggleEditing())}>
            {editing ? <Check /> : <Edit />}
          </IconButton>
        </Contrast>
      </div>
      {editing ? (
        <div style={{ position: "absolute", bottom: 0, left: 0 }}>
          <Contrast>
            <Typography color="primary"> Now In Edit Mode </Typography>
          </Contrast>
        </div>
      ) : (
        undefined
      )}
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
