import React, { useState } from "react";
import {
  Drawer,
  List,
  makeStyles,
  Theme,
  Typography,
  Slider,
  Input
} from "@material-ui/core";

interface TextBoxes {
  [key: string]: {
    get: string;
    set: React.Dispatch<React.SetStateAction<string>>;
  };
}

interface Sliders {
  [key: string]: {
    get: number;
    set: React.Dispatch<React.SetStateAction<number>>;
  };
}

const DrawerStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "20vw",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1)
  }
}));

const DrawerContext = React.createContext<
  | {
      open: () => void;
      close: () => void;
      setSliders: React.Dispatch<React.SetStateAction<Sliders>>;
      setTextBoxes: React.Dispatch<React.SetStateAction<TextBoxes>>;
    }
  | undefined
>(undefined);

export const useDrawer = () => {
  const drawer = React.useContext(DrawerContext);
  if (!drawer) throw Error("gib context");
  return drawer;
};

export const DrawerProvider = (props: { children: JSX.Element }) => {
  const classes = DrawerStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [sliders, setSliders] = useState<Sliders>({});
  const [textBoxes, setTextBoxes] = useState<TextBoxes>({});
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DrawerContext.Provider
      value={{
        open: handleOpen,
        close: handleClose,
        setSliders,
        setTextBoxes
      }}
    >
      {props.children}
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List className={classes.root}>
          {Object.keys(sliders).map(slider => {
            return (
              <React.Fragment key={slider}>
                <Typography gutterBottom>{slider}</Typography>
                <Slider
                  defaultValue={sliders[slider].get}
                  valueLabelDisplay={"auto"}
                  step={5}
                  min={0}
                  max={100}
                  onChange={(event: any, value: number | number[]) => {
                    if (typeof value === "number") {
                      sliders[slider].set(value);
                    }
                  }}
                />
              </React.Fragment>
            );
          })}
          {Object.keys(textBoxes).map(text => {
            return (
              <React.Fragment key={text}>
                <Typography gutterBottom>{text}</Typography>
                <Input
                  style={{ width: "100%" }}
                  defaultValue={textBoxes[text].get}
                  onChange={(
                    event: React.ChangeEvent<
                      HTMLTextAreaElement | HTMLInputElement
                    >
                  ) => {
                    textBoxes[text].set(event.target.value);
                  }}
                />
              </React.Fragment>
            );
          })}
        </List>
      </Drawer>
    </DrawerContext.Provider>
  );
};
