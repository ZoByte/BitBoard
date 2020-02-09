import React from "react";
import {
  Drawer,
  List,
  ListItem,
  Slider,
  makeStyles,
  Typography,
  Theme
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../Redux/IState";
import {
  ToggleSettingsDrawer,
  SetDarkness,
  SetBlur
} from "../Redux/AppReducer";

const DrawerStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "20vw",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1)
  }
}));

export const SettingsDrawer = () => {
  const dispatch = useDispatch();
  const classes = DrawerStyles();
  const { settingsDrawer, darkness, blur } = useSelector(
    (state: IState) => state
  );

  const updateDarkness = (event: any, value: number | number[]) => {
    if (typeof value === "number") {
      dispatch(SetDarkness(value));
    }
  };
  const updateBlur = (event: any, value: number | number[]) => {
    if (typeof value === "number") {
      dispatch(SetBlur(value));
    }
  };

  return (
    <Drawer
      open={settingsDrawer}
      onClose={() => dispatch(ToggleSettingsDrawer())}
    >
      <List className={classes.root}>
        <Typography gutterBottom>Darkness</Typography>
        <Slider
          defaultValue={darkness}
          valueLabelDisplay={"auto"}
          step={5}
          min={0}
          max={100}
          onChange={updateDarkness}
        />
        <Typography gutterBottom>Blur</Typography>
        <Slider
          defaultValue={blur}
          valueLabelDisplay={"auto"}
          step={5}
          min={0}
          max={100}
          onChange={updateBlur}
        />
      </List>
    </Drawer>
  );
};
