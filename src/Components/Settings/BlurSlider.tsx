import React from "react";
import { Typography, Slider } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { SetBlur } from "../../Redux/AppReducer";
import { IState } from "../../Redux/IState";

export const BlurSlider = () => {
  const dispatch = useDispatch();
  const { blur } = useSelector((state: IState) => state);

  const updateBlur = (event: any, value: number | number[]) => {
    if (typeof value === "number") {
      dispatch(SetBlur(value));
    }
  };

  return (
    <>
      <Typography gutterBottom>Blur</Typography>
      <Slider
        defaultValue={blur}
        valueLabelDisplay={"auto"}
        step={5}
        min={0}
        max={100}
        onChange={updateBlur}
      />
    </>
  );
};
