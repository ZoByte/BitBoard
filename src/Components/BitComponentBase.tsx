import React from "react";

export const BitComponentBase = (props: {
  children: JSX.Element;
  editing: boolean;
  x: string;
  y: string;
  width: string;
  height: string;
}) => {
  const dragStart = () => {
    if (props.editing) {
      console.log("epic");
    }
  };

  return (
    <div
      onMouseDown={dragStart}
      style={{
        position: "absolute",
        top: props.y,
        left: props.x,
        width: props.width,
        height: props.height
      }}
      className={props.editing ? "Editing" : undefined}
    >
      {props.children}
    </div>
  );
};
