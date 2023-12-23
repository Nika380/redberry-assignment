import { Button } from "antd";
import React from "react";

const PrimaryButton = ({ text, width, height, handleClick }: any) => {
  return (
    <Button
      style={{
        background: "#5D37F3",
        color: "white",
        border: "none",
        width: width,
        height: height,
      }}
      onClick={() => handleClick()}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
