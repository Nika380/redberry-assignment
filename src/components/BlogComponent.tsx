/* eslint-disable react/jsx-key */
"use client";
import { Button, Typography } from "antd";
import Image from "next/image";
import React from "react";
import CategoryComponent from "./CategoryComponent";
import arrowImage from "../assets/images/Arrow.png";
import { useRouter } from "next/navigation";

const BlogComponent = ({
  imageSrc,
  author,
  createdAt,
  title,
  categories,
  description,
  blogId,
}: any) => {
  const router = useRouter();
  return (
    <div className="blog-component">
      <Image
        src={imageSrc}
        alt=""
        // layout="responsive"
        width={410}
        height={330}
        style={{ borderRadius: "20px" }}
      />
      <Typography style={{ fontSize: "16px", color: "#1A1A1F" }}>
        {author}
      </Typography>
      <Typography style={{ fontSize: "12px", color: "#85858D" }}>
        {createdAt}
      </Typography>
      <Typography style={{ fontSize: "22px" }}>
        EOMM-ის მრჩეველთა საბჭოს ნინო ეგაძე შეუერთდა
      </Typography>
      <div className="category-list">
        <div className="categories">
          {categories.map((category: any) => {
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
      <Typography
        style={{
          color: "#404049",
          fontSize: "22px",
          height: "60px",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {
          "lorem wqsadsadsadsa dsa d sad sasa sa dsadsadsa   dsa dsadsadsadssa dsasa sa dsa dsadsa dsa  dsa dsa jdsakfbsakjf eafndsgb dsbafhubdg dsa dsagdvYUDBSA FDSGH DUABFDBSADBGSHJ DSAHUJBAYUSHJ N AIHUSFHAUTA A  UAUSIDHISAUFIEA"
        }
      </Typography>
      <Button
        type="text"
        style={{ color: "#5D37F3", display: "flex", alignItems: "center" }}
        onClick={() =>
          router.push(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/blogs/${blogId}`)
        }
      >
        სრულად ნახვა <Image src={arrowImage} alt="" />
      </Button>
    </div>
  );
};

export default BlogComponent;
