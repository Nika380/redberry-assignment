/* eslint-disable react/jsx-key */
"use client";
import ExitIcon from "@/components/ExitIcon";
import HeaderComponent from "@/components/HeaderComponent";
import SelectComponent from "@/components/SelectComponent";
import UploadImageComponent from "@/components/UploadImageComponent";
import blogImage from "../../assets/images/blog-png.png";
import Image from "next/image";
import CategoryComponent from "@/components/CategoryComponent";
import API from "@/utils/API";
import { useEffect, useState } from "react";
import BlogComponent from "@/components/BlogComponent";
import testImage from "../../assets/images/black-rainbeer.png";

const blogData = {
  id: 186,
  title: "Blog title",
  description: "Blog description",
  image:
    "https://api.blog.redberryinternship.ge/storage/images/W4pCjs13njoi6t5QW4Cvj6g0TnxW0GxMNGCNMnHW.svg",
  publish_date: "2023-11-19",
  categories: [
    {
      id: 1,
      title: "მარკეტი",
      text_color: "#FFFFFF",
      background_color: "#FFBB2F",
    },
    {
      id: 2,
      title: "აპლიკაცია",
      text_color: "#FFFFFF",
      background_color: "#1CD67D",
    },
    {
      id: 3,
      title: "ხელოვნური ინტელექტი",
      text_color: "#FFFFFF",
      background_color: "#B11CD6",
    },
    {
      id: 4,
      title: "UI/UX",
      text_color: "#FFFFFF",
      background_color: "#FA5757",
    },
    {
      id: 5,
      title: "კვლევა",
      text_color: "#FFFFFF",
      background_color: "#70CF25",
    },
  ],
  author: "გელა გელაშვილი",
  email: "gigagiorgadze@redberry.ge",
};
const BlogsPage = () => {
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
      <div className="blog-section">
        <h1>ბლოგი</h1>
        <Image src={blogImage} alt="" />
      </div>
      <div className="categories-section">
        <div className="categories">
          {statusList.map((category) => {
            return (
              <button
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                <CategoryComponent
                  textColor={category.text_color}
                  backgroundColor={category.background_color}
                  title={category.title}
                />
              </button>
            );
          })}
        </div>
      </div>
      <div className="blogs">
        <BlogComponent
          imageSrc={testImage}
          author={blogData.author}
          createdAt={blogData.publish_date}
          title={blogData.title}
          categories={blogData.categories}
          description={blogData.description}
          blogId={blogData.id}
        />
        <BlogComponent
          imageSrc={testImage}
          author={blogData.author}
          createdAt={blogData.publish_date}
          title={blogData.title}
          categories={blogData.categories}
          description={blogData.description}
          blogId={blogData.id}
        />
        <BlogComponent
          imageSrc={testImage}
          author={blogData.author}
          createdAt={blogData.publish_date}
          title={blogData.title}
          categories={blogData.categories}
          description={blogData.description}
          blogId={blogData.id}
        />
        <BlogComponent
          imageSrc={testImage}
          author={blogData.author}
          createdAt={blogData.publish_date}
          title={blogData.title}
          categories={blogData.categories}
          description={blogData.description}
          blogId={blogData.id}
        />
        <BlogComponent
          imageSrc={testImage}
          author={blogData.author}
          createdAt={blogData.publish_date}
          title={blogData.title}
          categories={blogData.categories}
          description={blogData.description}
          blogId={blogData.id}
        />
        <BlogComponent
          imageSrc={testImage}
          author={blogData.author}
          createdAt={blogData.publish_date}
          title={blogData.title}
          categories={blogData.categories}
          description={blogData.description}
          blogId={blogData.id}
        />
      </div>
    </>
  );
};

export default BlogsPage;
