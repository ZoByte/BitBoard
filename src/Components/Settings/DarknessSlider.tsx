import React from "react";
import { Typography, Slider } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { SetDarkness } from "../../Redux/AppReducer";
import { IState } from "../../Redux/IState";

export const DarknessSlider = () => {
  const dispatch = useDispatch();
  const { darkness } = useSelector((state: IState) => state);

  const updateDarkness = (event: any, value: number | number[]) => {
    if (typeof value === "number") {
      dispatch(SetDarkness(value));
    }
  };

  return (
    <>
      <Typography gutterBottom>Darkness</Typography>
      <Slider
        defaultValue={darkness}
        valueLabelDisplay={"auto"}
        step={5}
        min={0}
        max={100}
        onChange={updateDarkness}
      />
    </>
  );
};
