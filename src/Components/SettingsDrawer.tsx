import React from "react";
import {
  Drawer,
  List,
  makeStyles,
  Theme,
  Typography,
  Slider,
  Input
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../Redux/IState";
import { ToggleSettingsDrawer, SetBlur } from "../Redux/AppReducer";
import { DarknessSlider } from "./BackgroundImage/Settings/DarknessSlider";
import { BlurSlider } from "./BackgroundImage/Settings/BlurSlider";
import { SourceQueryBox } from "./BackgroundImage/Settings/SourceQueryBox";

const DrawerStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "20vw",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1)
  }
}));

export const SettingsDrawer = (props: {
  open: boolean;
  setOpen: (newVal: boolean) => void;
  sliders: {
    [key: string]: {
      get: number;
      set: React.Dispatch<React.SetStateAction<number>>;
    };
  };
  textBoxes: {
    [key: string]: {
      get: string;
      set: React.Dispatch<React.SetStateAction<string>>;
    };
  };
}) => {
  const classes = DrawerStyles();

  return (
    <Drawer open={props.open} onClose={() => props.setOpen(false)}>
      <List className={classes.root}>
        {Object.keys(props.sliders).map(slider => {
          return (
            <>
              <Typography gutterBottom>{slider}</Typography>
              <Slider
                value={props.sliders[slider].get}
                valueLabelDisplay={"auto"}
                step={5}
                min={0}
                max={100}
                onChange={(event: any, value: number | number[]) => {
                  if (typeof value === "number") {
                    props.sliders[slider].set(value);
                  }
                }}
              />
            </>
          );
        })}
        {Object.keys(props.textBoxes).map(text => {
          return (
            <>
              <Typography gutterBottom>Background Image Query</Typography>
              <Input
                style={{ width: "100%" }}
                value={props.textBoxes[text].get}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLTextAreaElement | HTMLInputElement
                  >
                ) => {
                  props.textBoxes[text].set(event.target.value);
                }}
              />
            </>
          );
        })}
      </List>
    </Drawer>
  );
};
