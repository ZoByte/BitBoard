import React from "react";

interface IAppContext {
  blur: boolean;
  darken: string;
}

export const AppContextProvider = (props: { children: JSX.Element }) => {
  return (
    <AppContext.Provider
      value={{
        blur: true,
        darken: "20%"
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const AppContext = React.createContext<IAppContext>({
  blur: true,
  darken: "0%"
});
