import React from "react";
import { Typography, Input } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { SetBGQuery } from "../../Redux/AppReducer";
import { IState } from "../../Redux/IState";

export const SourceQueryBox = () => {
  const dispatch = useDispatch();
  const { bgQuery } = useSelector((state: IState) => state);

  const updateQuery = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch(SetBGQuery(event.target.value));
  };

  return (
    <>
      <Typography gutterBottom>Background Image Query</Typography>
      <Input
        style={{ width: "100%" }}
        defaultValue={bgQuery}
        onChange={updateQuery}
      />
    </>
  );
};
