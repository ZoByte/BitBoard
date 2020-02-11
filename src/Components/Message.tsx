import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IState } from "../Redux/IState";
import { IconButton } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import { BitComponentBase } from "./BitComponentBase";
import { useDrawer } from "./SettingsDrawer";

export const Message = (props: {
  message: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}) => {
  const drawer = useDrawer();
  const editing = useSelector((state: IState) => state.editing);
  const [hovering, setHovering] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(props.message);
  const openSettings = () => {
    drawer.setSliders({});
    drawer.setTextBoxes({
      Message: {
        get: message,
        set: setMessage
      }
    });
    drawer.open();
  };

  return (
    <BitComponentBase
      editing={editing}
      x={props.x}
      y={props.y}
      width={props.width}
      height={props.height}
    >
      <div
        className={`Message ${editing ? "Editing" : null}`}
        onMouseOver={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {editing && hovering ? (
          <div style={{ float: "left", position: "absolute" }}>
            <IconButton onClick={openSettings}>
              <Settings style={{ fontSize: 18 }} />
            </IconButton>
          </div>
        ) : (
          undefined
        )}
        <h1 style={{ color: props.color }}>{message}</h1>
      </div>
    </BitComponentBase>
  );
};
