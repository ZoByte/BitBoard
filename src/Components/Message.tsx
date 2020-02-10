import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IState } from "../Redux/IState";
import { IconButton } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import { SettingsDrawer } from "./SettingsDrawer";

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
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(props.message);

  return (
    <>
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
            <IconButton onClick={() => setSettingsOpen(true)}>
              <Settings style={{ fontSize: 18 }} />
            </IconButton>
          </div>
        ) : (
          undefined
        )}
        <h1 style={{ color: props.color }}>{message}</h1>
      </div>
      <SettingsDrawer
        open={settingsOpen}
        setOpen={setSettingsOpen}
        sliders={{}}
        textBoxes={{
          Message: {
            get: message,
            set: setMessage
          }
        }}
      />
    </>
  );
};
