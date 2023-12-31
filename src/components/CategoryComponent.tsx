import { Typography } from "antd";
import React from "react";

const CategoryComponent = ({ id, textColor, backgroundColor, title }: any) => {
  return (
    <Typography
      key={id}
      style={{
        color: textColor,
        backgroundColor: backgroundColor,
        display: "inline-block",
        padding: "8px 16px",
        alignItems: "center",
        gap: "10px",
        borderRadius: "30px",
        whiteSpace: "nowrap",
      }}
    >
      {title}
    </Typography>
  );
};

export default CategoryComponent;
