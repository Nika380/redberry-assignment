/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
"use client";
import ArrowBtnComponent from "@/components/ArrowBtnComponent";
import API from "@/utils/API";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "antd";
import BlogComponent from "@/components/BlogComponent";
import CategoryComponent from "@/components/CategoryComponent";

const SingleBlogPage = () => {
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState<any>({ categories: [] });
  const [allBlogs, setAllBlogs] = useState<any[]>([]);
  //   const carouselRef: any = useRef(null);

  //   const goTo = () => {
  //     if (carouselRef.current.slickNext()) {
  //       carouselRef.current.slickNext();
  //     }
  //   };

  //   const goTo = () => {
  //     if (carouselRef.current.slickPrev()) {
  //       carouselRef.current.slickPrev();
  //     }
  //   };
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
  const goTo = (slide: any) => {
    console.log(slide);
    ref.current.goTo(slide, false);
  };
  useEffect(() => {
    fetchData();
    fetchAllBlogs();
  }, []);
  return (
    <>
      <ArrowBtnComponent goBack={true} />
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
                <ArrowBtnComponent goBack={true} handleClick={goTo} />
              </div>
              <div className="next-btn">
                <ArrowBtnComponent goBack={false} handleClick={goTo} />
              </div>
            </div>
          </div>
          <Carousel ref={ref}>
            <div className="blogs-list">
              {allBlogs.map((blog) => {
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
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default SingleBlogPage;
