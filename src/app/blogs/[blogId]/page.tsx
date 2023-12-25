/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
"use client";
import API from "@/utils/API";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Button, Carousel } from "antd";
import BlogComponent from "@/components/BlogComponent";
import CategoryComponent from "@/components/CategoryComponent";

const SingleBlogPage = () => {
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState<any>({ categories: [] });
  const [allBlogs, setAllBlogs] = useState<any[]>([]);
  const router = useRouter();

  const fetchData = async () => {
    await API.get(`/blogs/${blogId}`).then((res) => {
      setBlogData(res.data);
    });
  };
  const fetchAllBlogs = async () => {
    await API.get(`/blogs`).then((res) => {
      setAllBlogs(res.data.data);
    });
  };
  const ref: any = useRef();

  useEffect(() => {
    fetchData();
    fetchAllBlogs();
  }, []);
  return (
    <>
      <Button
        className="arrow-btn back"
        onClick={() => router.back()}
        style={{
          background: "#E4E3EB",
          position: "absolute",
          left: "80px",
          top: "100px",
        }}
      />
      <div className="single-blog-page">
        <div className="blog-info-section">
          <Image src={blogData.image} alt="" width={720} height={330} />
          <div className="blog-head">
            <div className="author-data">
              <h1>{blogData.author}</h1>
              <p>
                {blogData.publish_date} • {blogData.email}
              </p>
            </div>
            <div className="title">{blogData.title}</div>
            <div className="categories">
              {blogData?.categories?.map((category: any) => {
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
          <h1 className="blog-text">{blogData.description}</h1>
        </div>
        <div className="similar-blogs">
          <div className="header">
            <h1>მსგავსი სტატიები</h1>
            <div className="btns">
              <div className="prev-btn">
                <Button
                  className="arrow-btn back"
                  onClick={() => ref.current.prev()}
                />
              </div>
              <div className="next-btn">
                <Button
                  className="arrow-btn next"
                  onClick={() => ref.current.next()}
                />
              </div>
            </div>
          </div>
          <Carousel ref={ref}>
            {allBlogs
              .reduce((slides, blog, index) => {
                if (index % 3 === 0) {
                  slides.push([]);
                }
                slides[slides.length - 1].push(blog);
                return slides;
              }, [])
              .map((slideBlogs: any, slideIndex: any) => (
                <div key={slideIndex} className="blogs-list">
                  {slideBlogs.map((blog: any) => (
                    <BlogComponent
                      key={blog.id}
                      imageSrc={blog.image}
                      author={blog.author}
                      createdAt={blog.publish_date}
                      title={blog.title}
                      categories={blog.categories}
                      description={blog.description}
                      blogId={blog.id}
                    />
                  ))}
                </div>
              ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default SingleBlogPage;
