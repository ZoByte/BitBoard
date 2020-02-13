import { BitComponent } from "../types";

export interface IState {
  blur: number;
  darkness: number;
  bgQuery: string;
  editing: boolean;
  settingsDrawer: boolean;
  components: {
    [id: string]: BitComponent;
  };
}
