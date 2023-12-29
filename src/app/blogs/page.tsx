"use client";
import blogImage from "../../assets/images/blog-png.png";
import Image from "next/image";
import CategoryComponent from "@/components/CategoryComponent";
import API from "@/utils/API";
import { useEffect, useState } from "react";
import BlogComponent from "@/components/BlogComponent";

const BlogsPage = () => {
  const [statusList, setStatusList] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<any[]>(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("selectedCategories") ?? "[]")
      : []
  );
  const [refreshData, setRefreshData] = useState<boolean>(true);
  const fetchStatusList = async () => {
    await API.get("/categories").then((res) => {
      setStatusList(res.data.data);
    });
  };
  const fetchBlogs = async () => {
    await API.get("/blogs")
      .then((res) => {
        let filteredBlogs = res.data.data;
        if (selectedCategories.length > 0) {
          filteredBlogs = res.data.data.filter((blog: any) =>
            blog.categories.some((category: any) => {
              return selectedCategories.includes(category.id);
            })
          );
        }
        setBlogs(filteredBlogs);
      })
      .finally(() => {
        localStorage.setItem(
          "selectedCategories",
          JSON.stringify(selectedCategories)
        );
        setRefreshData(false);
      });
  };
  const filterData = async (category: any) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category.id)
        ? prevSelectedCategories.filter(
            (selectedId) => selectedId !== category.id
          )
        : [...prevSelectedCategories, category.id]
    );
    setRefreshData(true);
  };
  useEffect(() => {
    fetchBlogs();
  }, [refreshData]);

  useEffect(() => {
    fetchStatusList();
  }, []);
  return (
    <>
      <div className="blog-section pb">
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
                onClick={() => filterData(category)}
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
