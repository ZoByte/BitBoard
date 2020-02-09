import React from "react";
import { useSelector } from "react-redux";
import { IState } from "../Redux/IState";
import { Contrast } from "./Contrast";
import { IconButton } from "@material-ui/core";
import { Settings } from "@material-ui/icons";

export const Message = (props: {
  message: string;
  x: string;
  y: string;
  width: string;
  color?: string;
}) => {
  const editing = useSelector((state: IState) => state.editing);

  return (
    <div
      style={{
        top: props.y,
        left: props.x,
        width: props.width
      }}
      className="Message"
    >
      {editing ? (
        <div>
          <IconButton>
            <Settings style={{ fontSize: 18 }} />
          </IconButton>
        </div>
      ) : (
        undefined
      )}
      <h1 style={{ color: props.color }}>{props.message}</h1>
    </div>
  );
};
