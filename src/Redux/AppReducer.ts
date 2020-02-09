import { IState } from "./IState";
import { createAction, createReducer } from "@reduxjs/toolkit";

const appState: IState = {
  blur: 8,
  darkness: 30,
  bgQuery: "mountains",
  settingsDrawer: false
};

function WithPayload<T>() {
  return (t: T) => ({ payload: t });
}

export const SetBlur = createAction("SET_BLUR", WithPayload<number>());
export const SetDarkness = createAction("SET_DARKNESS", WithPayload<number>());
export const SetBGQuery = createAction("SET_BG_QUERY", WithPayload<string>());
export const ToggleSettingsDrawer = createAction("TOGGLE_SETTINGS_DRAWER");

export const AppReducer = createReducer(appState, builder =>
  builder
    .addCase(SetBlur, (state, action) => ({
      ...state,
      blur: action.payload
    }))
    .addCase(SetDarkness, (state, action) => ({
      ...state,
      darkness: action.payload
    }))
    .addCase(SetBGQuery, (state, action) => ({
      ...state,
      bgQuery: action.payload
    }))
    .addCase(ToggleSettingsDrawer, state => ({
      ...state,
      settingsDrawer: !state.settingsDrawer
    }))
);
