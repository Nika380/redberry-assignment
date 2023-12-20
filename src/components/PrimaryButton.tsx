import { Button } from "antd";
import React from "react";

const PrimaryButton = ({ text }: any) => {
  return (
    <Button style={{ background: "#5D37F3 !important", color: "white" }}>
      {text}
    </Button>
  );
};

export default PrimaryButton;
