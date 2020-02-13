import React from "react";
import { BitComponentBase } from "./BitComponentBase";
import { useSelector } from "react-redux";
import { IState } from "../Redux/IState";
import { SearchProps } from "../types";

export const SearchComponent = (props: SearchProps) => {
  const editing = useSelector((state: IState) => state.editing);

  return (
    <BitComponentBase
      editing={editing}
      id={props.id}
      x={props.x}
      y={props.y}
      width={props.width}
      height={props.height}
    >
      <div />
    </BitComponentBase>
  );
};
