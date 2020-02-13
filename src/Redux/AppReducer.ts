import { IState } from "./IState";
import { createAction, createReducer } from "@reduxjs/toolkit";
import { BitComponent } from "../types";

const appState: IState = {
  blur: 8,
  darkness: 30,
  bgQuery: "mountains",
  editing: false,
  settingsDrawer: false,
  components: {}
};

function WithPayload<T>() {
  return (t: T) => ({ payload: t });
}

export const ToggleEditing = createAction("TOGGLE_EDITING");
export const SetComponents = createAction(
  "SET_COMPONENTS",
  WithPayload<{
    [id: string]: BitComponent;
  }>()
);
export const AddComponent = createAction(
  "ADD_COMPONENT",
  WithPayload<BitComponent>()
);
export const SetPos = createAction(
  "SET_POS",
  WithPayload<{ id: string; x: number; y: number }>()
);
export const SetDimensions = createAction(
  "SET_DIMENSIONS",
  WithPayload<{
    id: string;
    width: number;
    height: number;
  }>()
);

export const AppReducer = createReducer(appState, builder =>
  builder
    .addCase(ToggleEditing, state => ({
      ...state,
      editing: !state.editing
    }))
    .addCase(SetComponents, (state, action) => ({
      ...state,
      components: action.payload
    }))
    .addCase(AddComponent, (state, action) => ({
      ...state,
      components: {
        ...state.components,
        [action.payload.id]: action.payload
      }
    }))
    .addCase(SetPos, (state, action) => ({
      ...state,
      components: {
        ...state.components,
        [action.payload.id]: {
          ...state.components[action.payload.id],
          x: action.payload.x,
          y: action.payload.y
        }
      }
    }))
    .addCase(SetDimensions, (state, action) => ({
      ...state,
      components: {
        ...state.components,
        [action.payload.id]: {
          ...state.components[action.payload.id],
          width: action.payload.width,
          height: action.payload.height
        }
      }
    }))
);
