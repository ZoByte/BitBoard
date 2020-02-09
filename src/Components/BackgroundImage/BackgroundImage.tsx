import React, { useState } from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../Redux/IState";
import { Contrast } from "../Contrast";
import { Settings } from "@material-ui/icons";
import { ToggleSettingsDrawer } from "../../Redux/AppReducer";
import { SettingsDrawer } from "../SettingsDrawer";

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
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [blur, setBlur] = useState<number>(8);
  const [darkness, setDarkness] = useState<number>(30);
  const [bgQuery, setBGQuery] = useState<string>("mountains");
  const styles = backgroundStyles({ darkness, blur, bgQuery });

  const openSettings = () => {
    setSettingsOpen(true);
  };

  return (
    <>
      <div className={styles.root}></div>
      <Contrast>
        <IconButton onClick={openSettings}>
          <Settings />
        </IconButton>
      </Contrast>
      <SettingsDrawer
        open={settingsOpen}
        setOpen={setSettingsOpen}
        sliders={{
          Darkness: {
            get: darkness,
            set: setDarkness
          },
          Blur: {
            get: blur,
            set: setBlur
          }
        }}
        textBoxes={{
          "Image Query": {
            get: bgQuery,
            set: setBGQuery
          }
        }}
      />
    </>
  );
};
