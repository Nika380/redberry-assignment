import React from "react";

const ArrowBtnComponent = ({ goBack }: any) => {
  return <div className={`arrow-btn ${goBack ? "back" : "next"}`}></div>;
};

export default ArrowBtnComponent;
