"use client";
import React, { useState } from "react";
import Logo from "../assets/images/redberry-logo.png";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";
import LoginModal from "./LoginModal";

const HeaderComponent = () => {
  const isAuth = false;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  return (
    <>
      <div className="header-component">
        <Image src={Logo} alt="" />
        <PrimaryButton
          text={isAuth ? "დაამატე ბლოგი" : "შესვლა"}
          handleClick={() => setIsLoginModalOpen(true)}
        />
      </div>
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
    </>
  );
};

export default HeaderComponent;
