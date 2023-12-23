"use client";
import React, { useState } from "react";
import Logo from "../assets/images/redberry-logo.png";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";
import LoginModal from "./LoginModal";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const HeaderComponent = () => {
  const { isAuth } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const router = useRouter();
  return (
    <>
      <div className="header-component">
        <Image src={Logo} alt="" />
        <PrimaryButton
          text={isAuth ? "დაამატე ბლოგი" : "შესვლა"}
          handleClick={
            isAuth
              ? () => router.push("/blogs/add-blog")
              : () => setIsLoginModalOpen(true)
          }
        />
      </div>
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
    </>
  );
};

export default HeaderComponent;
