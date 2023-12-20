"use client";
import API from "@/utils/API";
import { Select, Typography } from "antd";
import React, { useEffect, useState } from "react";
import CategoryComponent from "./CategoryComponent";

const { Option } = Select;
const SelectComponent = () => {
  const [optionsList, setOptionsList] = useState<any[]>([]);
  const fetchOptionsList = async () => {
    await API.get("/categories").then((res) => {
      setOptionsList(res.data.data);
    });
  };
  useEffect(() => {
    fetchOptionsList();
  }, []);
  return (
    <div className="select-component">
      <h1 className="header-text">კატეგორია*</h1>
      <Select
        style={{
          width: "290px",
          height: "44px",
        }}
        placeholder="აირჩიეთ კატეგორია"
        mode="multiple"
        maxTagCount={"responsive"}
      >
        {optionsList.length > 0 &&
          optionsList?.map((option: any) => {
            return (
              <Option key={option.id} value={option.id}>
                <CategoryComponent
                  textColor={option.text_color}
                  backgroundColor={option.background_color}
                  title={option.title}
                />
              </Option>
            );
          })}
      </Select>
    </div>
  );
};

export default SelectComponent;
