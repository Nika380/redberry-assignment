import { Typography } from "antd";
import React from "react";

const CategoryComponent = ({ textColor, backgroundColor, title }: any) => {
  return (
    <Typography
      style={{
        color: textColor,
        backgroundColor: backgroundColor,
        display: "inline-block",
        padding: "8px 16px",
        alignItems: "flex-start",
        gap: "10px",
        borderRadius: "30px",
      }}
    >
      {title}
    </Typography>
  );
};

export default CategoryComponent;
