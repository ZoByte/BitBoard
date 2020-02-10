import React, { useState } from "react";

export const BitComponentBase = (props: {
  children: JSX.Element;
  editing: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
}) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [x, setX] = useState(props.x);
  const [y, setY] = useState(props.x);
  const [width, setWidth] = useState(props.width);
  const [height, setHeight] = useState(props.height);

  const mouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (dragging) {
      const percentX = (event.pageX / window.innerWidth) * 100;
      const percentY = (event.pageY / window.innerHeight) * 100;
      console.log(Math.round(percentX / 10));
      if (Math.round(percentX / 10) !== x) {
        setX(Math.round(percentX / 10) * 10);
      }
      if (Math.round(percentY / 10) !== y) {
        setY(Math.round(percentY / 10) * 10);
      }
    }
  };

  const dragStart = (event: React.MouseEvent<HTMLElement>) => {
    if (props.editing) {
      console.log(event.screenX);
      setDragging(true);
    }
  };

  const dragEnd = () => {
    if (props.editing && dragging) {
      setDragging(false);
      console.log("drag end");
    }
  };

  return (
    <div
      onMouseDown={dragStart}
      onMouseUp={dragEnd}
      onMouseMove={mouseMove}
      style={{
        position: "absolute",
        top: `${y}%`,
        left: `${x}%`,
        width: `${width}%`,
        height: `${height}%`
      }}
      className={props.editing ? "Editing" : undefined}
    >
      {props.children}
    </div>
  );
};
