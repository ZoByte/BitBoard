import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IState } from "../Redux/IState";
import { IconButton } from "@material-ui/core";
import { Settings } from "@material-ui/icons";

export const Message = (props: {
  message: string;
  x: string;
  y: string;
  width: string;
  height: string;
  color?: string;
}) => {
  const editing = useSelector((state: IState) => state.editing);
  const [hovering, setHovering] = useState<boolean>(false);

  return (
    <div
      style={{
        top: props.y,
        left: props.x,
        width: props.width,
        height: props.height
      }}
      className="Message"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {editing && hovering ? (
        <div style={{ float: "left", position: "absolute" }}>
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
