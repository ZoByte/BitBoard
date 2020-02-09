import React, { useEffect, useState } from "react";
import {
  createMuiTheme,
  ThemeProvider,
  IconButton,
  Typography,
  Button
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
import { BitComponent } from "./types";
import { Grid } from "./Components/Grid";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const App = () => {
  const dispatch = useDispatch();
  const [components, setComponents] = useState<BitComponent[]>([]);
  const editing = useSelector((state: IState) => state.editing);

  useEffect(() => {
    const rawComponents = localStorage.getItem("components");
    if (typeof rawComponents === "string") {
      const parsedComponents = JSON.parse(rawComponents);
      if (Array.isArray(parsedComponents)) {
        setComponents(parsedComponents as BitComponent[]);
      }
    }
  }, []);

  return (
    <div className="App">
      <BackgroundImage />
      <Grid />
      {components.map((component: BitComponent) => {
        switch (component.type) {
          case "button": {
            return (
              <Button variant={component.variant} color={component.color}>
                {component.message}
              </Button>
            );
          }
          case "message": {
            return (
              <Message
                key={component.id}
                message={component.message}
                x={component.x}
                y={component.y}
                width={component.width}
                color={component.color}
              />
            );
          }
          default: {
            return undefined;
          }
        }
      })}
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
