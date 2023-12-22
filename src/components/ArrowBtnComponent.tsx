import React from "react";

const ArrowBtnComponent = ({ goBack, handleClick }: any) => {
  return (
    <div
      className={`arrow-btn ${goBack ? "back" : "next"}`}
      onClick={() => handleClick()}
    ></div>
  );
};

export default ArrowBtnComponent;
