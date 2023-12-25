"use client";
import API from "@/utils/API";
import { Select, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import CategoryComponent from "./CategoryComponent";
import { inputLabelStyles, labelSpaceStyles } from "@/assets/assets";

const { Option } = Select;
const SelectComponent = ({ setCategories }: any) => {
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
    <Space className="select-component" {...labelSpaceStyles}>
      <Typography {...inputLabelStyles}>კატეგორია *</Typography>
      <Select
        style={{
          width: "290px",
          height: "44px",
        }}
        placeholder="აირჩიეთ კატეგორია"
        mode="multiple"
        maxTagCount={"responsive"}
        onChange={(categories) => {
          setCategories(categories);
        }}
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
    </Space>
  );
};

export default SelectComponent;
