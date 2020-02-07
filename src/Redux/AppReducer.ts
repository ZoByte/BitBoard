import { IState } from "./IState";
import { createAction, createReducer } from "@reduxjs/toolkit";

const appState: IState = {
  blur: "8px",
  darkness: 30
};

function WithPayload<T>() {
  return (t: T) => ({ payload: t });
}

export const SetBlur = createAction("SET_BLUR", WithPayload<string>());
export const SetDarkness = createAction("SET_DARKNESS", WithPayload<number>());

export const AppReducer = createReducer(appState, builder =>
  builder
    .addCase(SetBlur, (state, action) => ({
      ...appState,
      blur: action.payload
    }))
    .addCase(SetDarkness, (state, action) => ({
      ...appState,
      darkness: action.payload
    }))
);
