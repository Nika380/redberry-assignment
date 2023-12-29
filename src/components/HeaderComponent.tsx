"use client";
import React, { useEffect, useState } from "react";
import Logo from "../assets/images/redberry-logo.png";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";
import LoginModal from "./LoginModal";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";

const HeaderComponent = () => {
  const isAuth = JSON.parse(window.localStorage.getItem("authed") || "false");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isOnAddBlog, setIsOnAddBlog] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.includes("add-blog")) {
      setIsOnAddBlog(true);
    } else {
      setIsOnAddBlog(false);
    }
  }, [pathname]);
  return (
    <>
      <div
        className="header-component"
        style={{ justifyContent: isOnAddBlog ? "space-evenly" : "" }}
      >
        <Image src={Logo} alt="" />
        {!isOnAddBlog && (
          <PrimaryButton
            text={isAuth ? "დაამატე ბლოგი" : "შესვლა"}
            handleClick={
              isAuth
                ? () => router.push("/blogs/add-blog")
                : () => setIsLoginModalOpen(true)
            }
          />
        )}
      </div>
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
    </>
  );
};

export default HeaderComponent;
