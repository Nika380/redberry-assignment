"use client";
import { inputLabelStyles, labelSpaceStyles } from "@/assets/assets";
import { ErrorMark, SuccessIcon } from "@/assets/images/images";
import PrimaryButton from "@/components/PrimaryButton";
import SelectComponent from "@/components/SelectComponent";
import UploadImageComponent from "@/components/UploadImageComponent";
import API from "@/utils/API";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Space,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface AuthorState {
  authorCharlen: boolean | null;
  authorWordCount: boolean | null;
  onlyGeorgian: boolean | null;
  descCharlen: boolean | null;
  titleCharlen: boolean | null;
  emailCheck: boolean | null;
  imageChosen: boolean | null;
  categories: boolean | null;
}

const AddBlogPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<any>(null);
  const [textChecks, setTextChecks] = useState<AuthorState>({
    authorCharlen: null,
    authorWordCount: null,
    onlyGeorgian: null,
    descCharlen: null,
    titleCharlen: null,
    emailCheck: null,
    imageChosen: null,
    categories: null,
  });
  const [addedSuccessfully, setAddedSuccessfully] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    values.date = dayjs(values.date).format("YYYY-MM-DD");
    values.categories = categories;
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
    )
      .then(() => {
        setAddedSuccessfully(true);
        form.resetFields();
        setTextChecks({
          authorCharlen: null,
          authorWordCount: null,
          onlyGeorgian: null,
          descCharlen: null,
          titleCharlen: null,
          emailCheck: null,
          imageChosen: null,
          categories: null,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const georgianRegex = /^[\u10A0-\u10FF\s]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@redberry\.ge$/;

  const updateTextCheck = (key: keyof AuthorState, value: any) => {
    setTextChecks((prevChecks) => ({
      ...prevChecks,
      [key]: value,
    }));
  };
  const getAuthorClassName = () => {
    if (
      textChecks.authorCharlen === false ||
      textChecks.authorWordCount === false ||
      textChecks.onlyGeorgian === false
    ) {
      return "error";
    } else if (
      textChecks.authorCharlen === true &&
      textChecks.authorWordCount === true &&
      textChecks.onlyGeorgian === true
    ) {
      return "success";
    } else {
      return "";
    }
  };
  const getTextClassName = (
    condition: any,
    successClassName: string,
    errorClassName: string
  ) =>
    condition !== null ? (condition ? successClassName : errorClassName) : "";

  useEffect(() => {
    const isImageChosen = imageFile !== null || false;
    updateTextCheck("imageChosen", isImageChosen);
  }, [imageFile]);
  useEffect(() => {
    updateTextCheck("categories", categories.length > 0);
  }, [categories]);
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
          <Space className="add-blog pb">
            <Typography
              style={{
                color: "#1A1A1F",
                fontSize: "32px",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "40px",
                width: "600px",
                padding: "30px 0 50px 0",
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
                  <Input
                    placeholder="შეიყვანეთ ავტორი"
                    className={getAuthorClassName()}
                    onChange={(e) => {
                      updateTextCheck(
                        "authorCharlen",
                        e.target.value.length >= 4
                      );
                      updateTextCheck(
                        "onlyGeorgian",
                        georgianRegex.test(e.target.value)
                      );
                      updateTextCheck(
                        "authorWordCount",
                        e.target.value.trim().split(/\s+/).length >= 2
                      );
                    }}
                  />
                </Form.Item>
                <ul className="req-list">
                  <li
                    className={`req-text ${getTextClassName(
                      textChecks.authorCharlen,
                      "txt-success",
                      "txt-error"
                    )}`}
                  >
                    მინიმუმ 4 სიმბოლო
                  </li>
                  <li
                    className={`req-text ${getTextClassName(
                      textChecks.authorWordCount,
                      "txt-success",
                      "txt-error"
                    )}`}
                  >
                    მინიმუმ 2 სიტყვა
                  </li>
                  <li
                    className={`req-text ${getTextClassName(
                      textChecks.onlyGeorgian,
                      "txt-success",
                      "txt-error"
                    )}`}
                  >
                    მხოლოდ ქართული სიმბოლოები
                  </li>
                </ul>
              </Space>
              <Space className="title-space" {...labelSpaceStyles}>
                <Typography {...inputLabelStyles}>სათაური *</Typography>
                <Form.Item name={"title"}>
                  <Input
                    placeholder="შეიყვანეთ სათაური"
                    className={getTextClassName(
                      textChecks.titleCharlen,
                      "success",
                      "error"
                    )}
                    onChange={(e) => {
                      updateTextCheck(
                        "titleCharlen",
                        e.target.value.length >= 4
                      );
                    }}
                  />
                </Form.Item>
                <Typography
                  className={`req-text ${getTextClassName(
                    textChecks.titleCharlen,
                    "txt-success",
                    "txt-error"
                  )}`}
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
                  className={getTextClassName(
                    textChecks.descCharlen,
                    "success",
                    "error"
                  )}
                  onChange={(e) => {
                    updateTextCheck("descCharlen", e.target.value.length >= 4);
                  }}
                />
              </Form.Item>
              <Typography
                className={`req-text ${getTextClassName(
                  textChecks.descCharlen,
                  "txt-success",
                  "txt-error"
                )}`}
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
                <Form.Item name={"date"} initialValue={dayjs("12-02-2023")}>
                  <DatePicker />
                </Form.Item>
              </Space>
              <Form.Item name={"categories"}>
                <SelectComponent
                  setCategories={setCategories}
                  notifClass={getTextClassName(
                    textChecks.categories,
                    "success",
                    "error"
                  )}
                />
              </Form.Item>
            </Space>
            <Space {...labelSpaceStyles}>
              <Typography {...inputLabelStyles}>ელ-ფოსტა</Typography>
              <Form.Item name={"email"}>
                <Input
                  placeholder="Example@redberry.ge"
                  style={{
                    width: "290px",
                    height: "44px",
                    flexShrink: 0,
                    borderRadius: "12px",
                  }}
                  className={getTextClassName(
                    textChecks.emailCheck,
                    "success",
                    "error"
                  )}
                  onChange={(e) => {
                    updateTextCheck(
                      "emailCheck",
                      emailRegex.test(e.target.value)
                    );
                  }}
                />
              </Form.Item>
              {textChecks.emailCheck !== null && !textChecks.emailCheck && (
                <Typography
                  className="txt-error"
                  style={{
                    width: "290px",
                    display: "flex",
                    gap: "15px",
                    fontSize: "12px",
                    position: "relative",
                    top: "-20px",
                  }}
                >
                  <ErrorMark /> მეილი უნდა მთავრდებოდეს @redberry.ge-ით
                </Typography>
              )}
            </Space>
            <Button
              htmlType="submit"
              type="text"
              disabled={
                !Object.values(textChecks).every((value) => value === true)
              }
              loading={loading}
            >
              გამოქვეყნება
            </Button>
          </Space>
        </Space>
      </Form>
      <Modal
        open={addedSuccessfully}
        onCancel={() => setAddedSuccessfully(false)}
        footer={false}
        style={{ top: "260px" }}
      >
        <Space
          style={{
            width: "480px",
            height: "250px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SuccessIcon />
          <Typography
            style={{
              color: "#1A1A1F",
              textAlign: "center",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "32px",
              marginBottom: "45px",
            }}
          >
            ჩანაწი წარმატებით დაემატა
          </Typography>
          <PrimaryButton
            text={"მთავარ გვერდზე დაბრუნება"}
            width={"432px"}
            height={"44px"}
            handleClick={() => router.push("/blogs")}
          />
        </Space>
      </Modal>
    </>
  );
};

export default AddBlogPage;
