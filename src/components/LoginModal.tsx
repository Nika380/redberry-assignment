import { Button, Form, Input, Modal, Space, Typography } from "antd";
import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import API from "@/utils/API";
import { ErrorMark, SuccessIcon } from "@/assets/images/images";

const LoginModal = ({ isOpen, setIsOpen }: any) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [form] = Form.useForm();
  const handleLogin = async () => {
    const email = form.getFieldValue("email");
    await API.post("/login", { email: email })
      .then((res) => {
        setIsSuccess(true);
      })
      .catch(() => {
        setIsError(true);
      });
  };
  return (
    <Form form={form}>
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={false}
        style={{ top: "260px" }}
      >
        <Space
          style={{
            width: "480px",
            height: "250px",
            display: "flex",
            flexDirection: "column",
            // gap: "30px",
            justifyContent: isSuccess ? "center" : "",
          }}
          className="login-modal"
        >
          {!isSuccess ? (
            <>
              <Typography
                style={{
                  color: "#1A1A1F",
                  textAlign: "center",
                  fontSize: "24px",
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: "32px",
                  marginTop: "45px",
                }}
              >
                შესვლა
              </Typography>
              <Space
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  style={{
                    color: "#1A1A1F",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "20px",
                  }}
                >
                  ელ-ფოსტა
                </Typography>
                <Form.Item name={"email"}>
                  <Input
                    placeholder="Example@redberry.ge"
                    // value={email}
                    // onChange={(value: any) => {
                    //   setEmail(value.data);
                    //   console.log(value);
                    // }}
                    style={{
                      width: "432px",
                      height: "44px",
                      flexShrink: 0,
                      borderRadius: "12px",
                      // border: " 1.5px solid #5D37F3",
                      // background: "#F7F7FF",
                    }}
                    className={isError ? "error" : ""}
                  />
                </Form.Item>
                {isError && (
                  <Typography
                    style={{
                      color: "red",
                      display: "flex",
                      position: "relative",
                      top: "-20px",
                    }}
                  >
                    <ErrorMark />
                    ელ-ფოსტა არ მოიძებნა
                  </Typography>
                )}
              </Space>
              <PrimaryButton
                text={"შესვლა"}
                width={"432px"}
                height={"44px"}
                handleClick={handleLogin}
              />
            </>
          ) : (
            <>
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
                წარმატებული ავტორიზაცია
              </Typography>
              <PrimaryButton
                text={"კარგი"}
                width={"432px"}
                height={"44px"}
                handleClick={() => setIsOpen(false)}
              />
            </>
          )}
        </Space>
      </Modal>
    </Form>
  );
};

export default LoginModal;
