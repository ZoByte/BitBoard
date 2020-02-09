import React from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { IState } from "../Redux/IState";

const backgroundStyles = makeStyles({
  root: (props: { darkness: number; blur: number }) => ({
    width: "100%",
    height: "100%",
    overflow: "hidden",
    position: "absolute",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(https://source.unsplash.com/1920x1080/?mountains)",
    transform: `scale(${1 + props.blur / 200})`,
    filter: `blur(${props.blur}px) brightness(${props.darkness}%)`
  })
});

export const BackgroundImage = () => {
  const { blur, darkness } = useSelector((state: IState) => state);

  const styles = backgroundStyles({ darkness, blur });

  return <div className={styles.root}></div>;
};
