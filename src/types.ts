type BaseBitComponent = {
  id: string;
  x: string;
  y: string;
  width: string;
};

export type BitComponent = BaseBitComponent &
  (
    | {
        type: "message";
        color: string;
        message: string;
      }
    | {
        type: "button";
        color?: "inherit" | "primary" | "secondary" | "default";
        message: string;
        variant?: "text" | "outlined" | "contained";
      }
  );
