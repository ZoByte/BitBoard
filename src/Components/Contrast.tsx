import React from "react";

// this darkens the background to make the child component more visible in light images
export const Contrast = (props: { children: JSX.Element }) => {
  return (
    <div
      style={{
        paddingLeft: "4px",
        paddingRight: "4px",
        paddingTop: "4px",
        paddingBottom: "4px",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: "8px"
      }}
    >
      {props.children}
    </div>
  );
};
