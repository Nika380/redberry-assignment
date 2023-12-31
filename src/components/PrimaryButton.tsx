"use client";
import { Button } from "antd";
import React from "react";

const PrimaryButton = ({ text, width, height, handleClick, loading }: any) => {
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
      loading={loading}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
