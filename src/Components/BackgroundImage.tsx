import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import { makeStyles } from "@material-ui/core";

const backgroundStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    position: "absolute",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(https://source.unsplash.com/1920x1080/?mountains)"
  },
  withBlur: {
    transform: "scale(1.1)",
    filter: "blur(8px)"
  },
  withDarken: (props: { darkness: string }) => ({
    filter: `brightness(${props.darkness})`
  })
});

export const BackgroundImage = () => {
  const appState = useContext(AppContext);
  const styles = backgroundStyles({ darkness: appState.darken });

  return (
    <div
      className={`${styles.root} ${
        appState.blur ? styles.withBlur : undefined
      } ${appState.darken ? styles.withDarken : undefined}`}
    ></div>
  );
};
