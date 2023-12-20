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

export default function Index({ children }: any) {
  const [statusList, setStatusList] = useState<any[]>([]);
  const fetchStatusList = async () => {
    await API.get("/categories").then((res) => {
      setStatusList(res.data.data);
    });
  };
  useEffect(() => {
    fetchStatusList();
  }, []);
  return (
    <>
      <HeaderComponent />
      <div className="blog-section">
        <h1>ბლოგი</h1>
        <Image src={blogImage} alt="" />
      </div>
      <div className="categories-section">
        <div className="categories">
          {statusList.map((category) => {
            return (
              <CategoryComponent
                textColor={category.text_color}
                backgroundColor={category.background_color}
                title={category.title}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
