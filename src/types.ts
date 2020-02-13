export interface BaseBitComponent {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface MessageProps extends BaseBitComponent {
  type?: "message";
  color: string;
  message: string;
}

export interface ButtonProps extends BaseBitComponent {
  type?: "button";
  color?: "inherit" | "primary" | "secondary" | "default";
  message: string;
  variant?: "text" | "outlined" | "contained";
}

export interface SearchProps extends BaseBitComponent {
  type?: "search";
  placeholder: string;
  provider: "google" | "bing" | "ecosia" | "yahoo" | "duckduckgo";
}

export type BitComponent = MessageProps | ButtonProps | SearchProps;
