"use client";
import API from "@/utils/API";
import { Select, Typography } from "antd";
import React, { useEffect, useState } from "react";

const { Option } = Select;
const SelectComponent = () => {
  const [optionsList, setOptionsList] = useState<any[]>([]);
  const fetchOptionsList = async () => {
    await API.get("/categories").then((res) => {
      console.log(res.data.data);
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
                <Typography
                  style={{
                    color: option.text_color,
                    backgroundColor: option.background_color,
                    display: "inline-block",
                    padding: "8px 16px",
                    alignItems: "flex-start",
                    gap: "10px",
                    borderRadius: "30px",
                  }}
                >
                  {option.title}
                </Typography>
              </Option>
            );
          })}
      </Select>
    </div>
  );
};

export default SelectComponent;
