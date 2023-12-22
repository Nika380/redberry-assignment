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

const BlogsPage = () => {
  const [statusList, setStatusList] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const fetchStatusList = async () => {
    await API.get("/categories").then((res) => {
      setStatusList(res.data.data);
    });
  };
  const fetchBlogs = async () => {
    await API.get("/blogs").then((res) => {
      setBlogs(res.data.data);
    });
  };
  useEffect(() => {
    fetchStatusList();
    fetchBlogs();
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
            const isSelected = selectedCategories.includes(category.id);

            return (
              <button
                key={category.id}
                style={{
                  background: "none",
                  cursor: "pointer",
                  borderRadius: "20px",
                  border: `1px solid ${isSelected ? "black" : "transparent"}`,
                }}
                onClick={() => {
                  setSelectedCategories((prevSelectedCategories) =>
                    isSelected
                      ? prevSelectedCategories.filter(
                          (selectedId) => selectedId !== category.id
                        )
                      : [...prevSelectedCategories, category.id]
                  );
                }}
              >
                {/* Render your CategoryComponent here */}
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
        {blogs.map((blog) => {
          return (
            <BlogComponent
              imageSrc={blog.image}
              author={blog.author}
              createdAt={blog.publish_date}
              title={blog.title}
              categories={blog.categories}
              description={blog.description}
              blogId={blog.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default BlogsPage;
