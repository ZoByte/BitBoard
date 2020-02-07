import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { IState } from "../Redux/IState";

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
  withDarken: (props: { darkness: number }) => ({
    filter: `brightness(${props.darkness}%)`
  })
});

export const BackgroundImage = () => {
  const { blur, darkness } = useSelector((state: IState) => state);

  const styles = backgroundStyles({ darkness });

  return (
    <div
      className={`${styles.root} ${blur ? styles.withBlur : undefined} ${
        darkness ? styles.withDarken : undefined
      }`}
    ></div>
  );
};
