import React, { useEffect, useCallback } from "react";
import { Box } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { SetPos, SetDimensions } from "../Redux/AppReducer";

let initialX = 0;
let initialY = 0;
let initialW = 0;
let initialH = 0;
let dragging = false;
let resizing = false;
let currentCorner = 0;

type BitComponentBaseProps = {
  children: JSX.Element;
  editing: boolean;
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export const BitComponentBase = ({
  children,
  editing,
  id,
  x,
  y,
  width,
  height
}: BitComponentBaseProps) => {
  const dispatch = useDispatch();

  const preventGhostDrag = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const setX = useCallback(
    (inX: number) => {
      dispatch(SetPos({ id, x: inX, y }));
    },
    [dispatch, id, y]
  );
  const setY = useCallback(
    (inY: number) => {
      dispatch(SetPos({ id, x, y: inY }));
    },
    [dispatch, id, x]
  );
  const setW = useCallback(
    (inW: number) => {
      dispatch(SetDimensions({ id, width: inW, height }));
    },
    [dispatch, height, id]
  );
  const setH = useCallback(
    (inH: number) => {
      dispatch(SetDimensions({ id, width, height: inH }));
    },
    [dispatch, id, width]
  );

  const dragMove = useCallback(
    (event: MouseEvent) => {
      if (dragging) {
        preventGhostDrag(event);
        const percentX = (event.pageX / window.innerWidth) * 100;
        const percentY = (event.pageY / window.innerHeight) * 100;
        const offsetX = percentX - initialX;
        const offsetY = percentY - initialY;
        if (Math.floor(offsetX / 5) >= 0) {
          setX(Math.floor(offsetX / 5) * 5);
        }
        if (Math.floor(offsetY / 5) >= 0) {
          setY(Math.floor(offsetY / 5) * 5);
        }
      }
    },
    [setX, setY]
  );

  const dragStart = (event: React.MouseEvent<HTMLElement>) => {
    if (editing) {
      initialX = (event.pageX / window.innerWidth) * 100 - x;
      initialY = (event.pageY / window.innerHeight) * 100 - y;
      window.onmousemove = dragMove;
      window.onmouseup = dragEnd;
      dragging = true;
    }
  };

  const dragEnd = useCallback(() => {
    if (editing && dragging) {
      dragging = false;
      window.onmousemove = null;
      window.onmouseup = null;
    }
  }, [editing]);

  const resizeEnd = (event: MouseEvent) => {
    resizing = false;
    window.onmouseup = null;
    window.onmousemove = null;
  };

  const resizeMove = useCallback(
    (event: MouseEvent) => {
      preventGhostDrag(event);
      const percentX = (event.pageX / window.innerWidth) * 100;
      const percentY = (event.pageY / window.innerHeight) * 100;
      const snapX = Math.floor(percentX / 5) * 5;
      const snapY = Math.floor(percentY / 5) * 5;
      switch (currentCorner) {
        // bottom right
        case 0: {
          if (Math.floor(percentX / 5) >= 0) {
            setW(initialW + (snapX - initialX));
          }
          if (Math.floor(percentY / 5) >= 0) {
            setH(initialH + (snapY - initialY));
          }
          break;
        }
        // bottom left
        case 1: {
          if (Math.floor(percentX / 5) >= 0) {
            setX(initialX + (snapX - initialX));
            setW(initialW - (snapX - initialX));
          }
          if (Math.floor(percentY / 5) >= 0) {
            setH(initialH + (snapY - initialY));
          }
          break;
        }
        // top right
        case 2: {
          if (Math.floor(percentX / 5) >= 0) {
            setW(initialW + (snapX - initialX));
          }
          if (Math.floor(percentY / 5) >= 0) {
            setY(initialY + (snapY - initialY));
            setH(initialH - (snapY - initialY));
          }
          break;
        }
        // top left
        case 3: {
          if (Math.floor(percentX / 5) >= 0) {
            setX(initialX + (snapX - x));
            setW(initialW - (snapX - initialX));
          }
          if (Math.floor(percentY / 5) >= 0) {
            setY(initialY + (snapY - initialY));
            setH(initialH - (snapY - initialY));
          }
          break;
        }
      }
    },
    [setH, setW, setX, setY, x]
  );

  const resizeStart = (
    event: React.MouseEvent<HTMLElement>,
    corner: number
  ) => {
    initialX = (event.pageX / window.innerWidth) * 100;
    initialY = (event.pageY / window.innerHeight) * 100;
    initialW = width;
    initialH = height;
    resizing = true;
    currentCorner = corner;
    window.onmouseup = resizeEnd;
    window.onmousemove = resizeMove;
  };

  useEffect(() => {
    if (resizing) {
      window.onmouseup = resizeEnd;
      window.onmousemove = resizeMove;
    } else if (dragging) {
      window.onmouseup = dragEnd;
      window.onmousemove = dragMove;
    }
  }, [dragEnd, dragMove, resizeMove, x, y, width, height]);

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
        className={editing ? "Editing" : undefined}
      >
        {children}
      </div>
      {editing ? (
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
