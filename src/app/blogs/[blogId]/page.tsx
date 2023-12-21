"use client";
import ArrowBtnComponent from "@/components/ArrowBtnComponent";
import API from "@/utils/API";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const SingleBlogPage = () => {
  const { blogId } = useParams();
  const fetchData = async () => {
    await API.get(`/blogs/${blogId}`).then((res) => {
      console.log(res.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <ArrowBtnComponent goBack={true} />
      <div className="single-blog-page">SingleBlogPage</div>
    </>
  );
};

export default SingleBlogPage;
