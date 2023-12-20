"use client";
/* eslint-disable react/jsx-key */
import ExitIcon from "@/components/ExitIcon";
import HeaderComponent from "@/components/HeaderComponent";
import SelectComponent from "@/components/SelectComponent";
import UploadImageComponent from "@/components/UploadImageComponent";
import blogImage from "../assets/images/blog-png.png";
import Image from "next/image";
import CategoryComponent from "@/components/CategoryComponent";
import API from "@/utils/API";
import { useEffect, useState } from "react";
import BlogComponent from "@/components/BlogComponent";
import testImage from "../assets/images/black-rainbeer.png";

export default function Index({ children }: any) {
  return (
    <>
      <HeaderComponent />
      {children}
    </>
  );
}
