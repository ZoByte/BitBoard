import React, { useState } from "react";
import { Button, Box } from "@material-ui/core";

let initialPercentX = 0;
let initialPercentY = 0;
let initialPercentW = 0;
let initialPercentH = 0;

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

  const mouseMove = (event: MouseEvent) => {
    if (dragging) {
      const percentX = (event.pageX / window.innerWidth) * 100;
      const percentY = (event.pageY / window.innerHeight) * 100;
      const offsetX = percentX - initialPercentX;
      const offsetY = percentY - initialPercentY;
      if (Math.floor(offsetX / 5) >= 0) {
        setX(Math.floor(offsetX / 5) * 5);
      }
      if (Math.floor(offsetY / 5) >= 0) {
        setY(Math.floor(offsetY / 5) * 5);
      }
    }
  };

  const dragStart = (event: React.MouseEvent<HTMLElement>) => {
    if (props.editing) {
      initialPercentX = (event.pageX / window.innerWidth) * 100 - x;
      initialPercentY = (event.pageY / window.innerHeight) * 100 - y;
      window.onmousemove = mouseMove;
      window.onmouseup = dragEnd;
      setDragging(true);
    }
  };

  const dragEnd = () => {
    if (props.editing && dragging) {
      setDragging(false);
      window.onmousemove = null;
      window.onmouseup = null;
    }
  };

  const resizeEnd = (event: MouseEvent) => {
    window.onmouseup = null;
    window.onmousemove = null;
  };

  const resizeMove = (event: MouseEvent, corner: number) => {
    const percentX = (event.pageX / window.innerWidth) * 100;
    const percentY = (event.pageY / window.innerHeight) * 100;
    const snapX = Math.floor(percentX / 5) * 5;
    const snapY = Math.floor(percentY / 5) * 5;
    switch (corner) {
      // bottom right
      case 0: {
        if (Math.floor(percentX / 5) >= 0) {
          setWidth(width + (snapX - initialPercentX));
        }
        if (Math.floor(percentY / 5) >= 0) {
          setHeight(height + (snapY - initialPercentY));
        }
        break;
      }
      // bottom left
      case 1: {
        if (Math.floor(percentX / 5) >= 0) {
          setX(x + (snapX - initialPercentX));
          setWidth(width - (snapX - initialPercentX));
        }
        if (Math.floor(percentY / 5) >= 0) {
          setHeight(height + (snapY - initialPercentY));
        }
        break;
      }
      // top right
      case 2: {
        if (Math.floor(percentX / 5) >= 0) {
          setWidth(width + (snapX - initialPercentX));
        }
        if (Math.floor(percentY / 5) >= 0) {
          setY(y + (snapY - initialPercentY));
          setHeight(height - (snapY - initialPercentY));
        }
        break;
      }
      // top left
      case 3: {
        if (Math.floor(percentX / 5) >= 0) {
          setX(x + (snapX - x));
          setWidth(width - (snapX - initialPercentX));
        }
        if (Math.floor(percentY / 5) >= 0) {
          setY(y + (snapY - initialPercentY));
          setHeight(height - (snapY - initialPercentY));
        }
        break;
      }
    }
  };

  const resizeStart = (
    event: React.MouseEvent<HTMLElement>,
    corner: number
  ) => {
    initialPercentW = width;
    initialPercentH = height;
    initialPercentX = (event.pageX / window.innerWidth) * 100;
    initialPercentY = (event.pageY / window.innerHeight) * 100;
    window.onmouseup = resizeEnd;
    window.onmousemove = (event: MouseEvent) => resizeMove(event, corner);
  };

  return (
    <>
      <div
        onMouseDownCapture={dragStart}
        onMouseUpCapture={dragEnd}
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
      {props.editing ? (
        <>
          <Box
            component="div"
            className="ResizeGrip"
            style={{
              top: `calc(${y + height}% - 4px)`,
              left: `calc(${x + width}% - 4px)`
            }}
            bgcolor="primary.main"
            onMouseDown={event => resizeStart(event, 0)}
          />
          <Box
            component="div"
            className="ResizeGrip"
            style={{
              top: `calc(${y + height}% - 4px)`,
              left: `calc(${x}% - 4px)`
            }}
            bgcolor="primary.main"
            onMouseDown={event => resizeStart(event, 1)}
          />
          <Box
            component="div"
            className="ResizeGrip"
            style={{
              top: `calc(${y}% - 4px)`,
              left: `calc(${x + width}% - 4px)`
            }}
            bgcolor="primary.main"
            onMouseDown={event => resizeStart(event, 2)}
          />
          <Box
            component="div"
            className="ResizeGrip"
            style={{
              top: `calc(${y}% - 4px)`,
              left: `calc(${x}% - 4px)`
            }}
            bgcolor="primary.main"
            onMouseDown={event => resizeStart(event, 3)}
          />
        </>
      ) : (
        undefined
      )}
    </>
  );
};
