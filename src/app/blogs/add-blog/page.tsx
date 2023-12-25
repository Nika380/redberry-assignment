"use client";
import { inputLabelStyles, labelSpaceStyles } from "@/assets/assets";
import PrimaryButton from "@/components/PrimaryButton";
import SelectComponent from "@/components/SelectComponent";
import UploadImageComponent from "@/components/UploadImageComponent";
import API from "@/utils/API";
import { Button, DatePicker, Form, Input, Space, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddBlogPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<any>(null);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const handleSubmit = async (values: any) => {
    values.date = dayjs(values.date).format("YYYY-MM-DD");
    values.categories = [1, 2];
    await API.post(
      "/blogs",
      {
        author: values.author,
        title: values.title,
        image: imageFile,
        categories: values.categories,
        description: values.description,
        email: values.email,
        publish_date: values.date,
      },
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  };
  return (
    <>
      <Button
        className="arrow-btn back"
        style={{
          background: "#E4E3EB",
          position: "absolute",
          left: "80px",
          top: "100px",
        }}
        onClick={() => router.back()}
      ></Button>
      <Form form={form} onFinish={handleSubmit}>
        <Space
          style={{
            background: " #fbfaff !important",
            minHeight: "100vh",
            width: "100vw",
          }}
        >
          <Space className="add-blog">
            <Typography
              style={{
                color: "#1A1A1F",
                fontSize: "32px",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "40px",
                width: "600px",
              }}
            >
              ბლოგის დამატება
            </Typography>
            <UploadImageComponent setImageFile={setImageFile} />
            <Space
              style={{ display: "flex", gap: "25px", alignItems: "baseline" }}
            >
              <Space className="author-space" {...labelSpaceStyles}>
                <Typography {...inputLabelStyles}>ავტორი *</Typography>
                <Form.Item name={"author"}>
                  <Input placeholder="შეიყვანეთ ავტორი" className="success" />
                </Form.Item>
                {/* <Space
                  style={{ left: "30px", top: "-20px", position: "relative" }}
                >
                  
                </Space> */}
                <ul className="req-list">
                  <li className="req-text">მინიმუმ 4 სიმბოლო</li>
                  <li className="req-text">მინიმუმ 2 სიტყვა</li>
                  <li className="req-text">მხოლოდ ქართული სიმბოლოები</li>
                </ul>
              </Space>
              <Space className="title-space" {...labelSpaceStyles}>
                <Typography {...inputLabelStyles}>სათაური *</Typography>
                <Form.Item name={"title"}>
                  <Input placeholder="შეიყვანეთ სათაური" />
                </Form.Item>
                <Typography
                  className="req-text"
                  style={{ position: "relative", top: "-20px", left: "20px" }}
                >
                  მინიმუმ 4 სიმბოლო
                </Typography>
              </Space>
            </Space>
            <Space {...labelSpaceStyles}>
              <Typography {...inputLabelStyles}>აღწერა *</Typography>
              <Form.Item name={"description"}>
                <TextArea
                  style={{ width: "600px", height: "125px" }}
                  placeholder="შეიყვანეთ აღწერა"
                />
              </Form.Item>
              <Typography
                className="req-text"
                style={{ position: "relative", top: "-20px", left: "20px" }}
              >
                მინიმუმ 4 სიმბოლო
              </Typography>
            </Space>
            <Space>
              <Space {...labelSpaceStyles}>
                <Typography {...inputLabelStyles}>
                  გამოქვეყნების თარიღი *
                </Typography>
                <Form.Item name={"date"}>
                  <DatePicker defaultValue={dayjs("12-02-2023")} />
                </Form.Item>
              </Space>
              <Form.Item name={"categories"}>
                <SelectComponent />
              </Form.Item>
            </Space>
            <Space {...labelSpaceStyles}>
              <Typography {...inputLabelStyles}>ელ-ფოსტა</Typography>
              <Form.Item name={"email"}>
                <Input
                  placeholder="Example@redberry.ge"
                  style={{
                    width: "230px",
                    height: "44px",
                    flexShrink: 0,
                    borderRadius: "12px",
                  }}
                />
              </Form.Item>
            </Space>
            <Button htmlType="submit" type="text" disabled={buttonDisabled}>
              გამოქვეყნება
            </Button>
          </Space>
        </Space>
      </Form>
    </>
  );
};

export default AddBlogPage;
