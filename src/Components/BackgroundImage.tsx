import React, { useState } from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { IState } from "../Redux/IState";
import { useDrawer } from "./SettingsDrawer";

const backgroundStyles = makeStyles({
  root: (props: { darkness: number; blur: number; bgQuery: string }) => ({
    width: "100%",
    height: "100%",
    overflow: "hidden",
    position: "absolute",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(https://source.unsplash.com/1920x1080/?${props.bgQuery})`,
    transform: `scale(${1 + props.blur / 200})`,
    filter: `blur(${props.blur}px) brightness(${props.darkness}%)`
  })
});

export const BackgroundImage = () => {
  const drawer = useDrawer();
  const [blur, setBlur] = useState<number>(8);
  const [darkness, setDarkness] = useState<number>(30);
  const [bgQuery, setBGQuery] = useState<string>("mountains");
  const styles = backgroundStyles({ darkness, blur, bgQuery });
  const editing = useSelector((state: IState) => state.editing);

  const openSettings = () => {
    drawer.setSliders({
      Darkness: {
        get: darkness,
        set: setDarkness
      },
      Blur: {
        get: blur,
        set: setBlur
      }
    });
    drawer.setTextBoxes({
      "Image Query": {
        get: bgQuery,
        set: setBGQuery
      }
    });
    drawer.open();
  };

  return (
    <>
      <div className={styles.root}></div>
      {editing ? (
        <div style={{ position: "absolute" }}>
          <IconButton onClick={openSettings}>
            <Settings />
          </IconButton>
        </div>
      ) : (
        undefined
      )}
    </>
  );
};
