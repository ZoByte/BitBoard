import React from "react";

export const Draggable = (props: {
  children: JSX.Element;
  editing: boolean;
}) => {
  const dragStart = () => {
    if (props.editing) {
      console.log("epic");
    }
  };

  return <div onMouseDown={dragStart}>{props.children}</div>;
};
