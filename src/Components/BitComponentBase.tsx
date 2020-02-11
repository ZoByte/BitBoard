import React, { useState } from "react";

let initialPercentX = 0;
let initialPercentY = 0;

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
      const offsetX = percentX - initialPercentX;
      const offsetY = percentY - initialPercentY;
      if (Math.floor(offsetX / 5) !== 0) {
        setX(Math.floor(offsetX / 5) * 5);
      }
      if (Math.floor(offsetY / 5) !== 0) {
        setY(Math.floor(offsetY / 5) * 5);
      }
    }
  };

  const dragStart = (event: React.MouseEvent<HTMLElement>) => {
    if (props.editing) {
      initialPercentX = (event.pageX / window.innerWidth) * 100 - x;
      initialPercentY = (event.pageY / window.innerHeight) * 100 - y;
      setDragging(true);
    }
  };

  const dragEnd = () => {
    if (props.editing && dragging) {
      setDragging(false);
    }
  };

  return (
    <div
      onMouseDown={dragStart}
      onMouseUp={dragEnd}
      onMouseMove={mouseMove}
      onMouseLeave={dragEnd}
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
