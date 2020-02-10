import { IState } from "./IState";
import { createAction, createReducer } from "@reduxjs/toolkit";

const appState: IState = {
  blur: 8,
  darkness: 30,
  bgQuery: "mountains",
  editing: false,
  settingsDrawer: false
};

function WithPayload<T>() {
  return (t: T) => ({ payload: t });
}

export const ToggleEditing = createAction("TOGGLE_EDITING");

export const AppReducer = createReducer(appState, builder =>
  builder.addCase(ToggleEditing, (state, action) => ({
    ...state,
    editing: !state.editing
  }))
);
