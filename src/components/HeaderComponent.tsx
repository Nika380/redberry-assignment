import React from "react";
import Logo from "../assets/images/redberry-logo.png";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";

const HeaderComponent = () => {
  const isAuth = false;
  return (
    <div className="header-component">
      <Image src={Logo} alt="" />
      <PrimaryButton text={isAuth ? "დაამატე ბლოგი" : "შესვლა"} />
    </div>
  );
};

export default HeaderComponent;
