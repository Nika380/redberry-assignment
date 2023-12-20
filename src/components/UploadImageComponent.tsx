"use client";
import React, { useState } from "react";
import Dragger from "antd/es/upload/Dragger";
import Image from "next/image";
import folderAddImage from "../assets/images/folder-add.png";
import { Button, UploadProps } from "antd";
import galleryPng from "../assets/images/gallery.png";
import ExitIcon from "./ExitIcon";

const UploadImageComponent = () => {
  const [fileChosen, setFileChosen] = useState(true);
  const [fileName, setFileName] = useState("Rame.jpg");

  const props: UploadProps = {
    name: "image",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      setFileName(info.file.name);
      const { status } = info.file;
      if (status === "done") {
        setFileChosen(true);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const handleFileChange = (info: any) => {
    console.log("File status:", info.file.status);
    console.log("File response:", info.file.response);

    if (info.file.status === "done") {
      // Wait for a while to make sure the file is fully uploaded
      setTimeout(() => {
        // Now check if the status is okay
        if (
          info.file.response &&
          (info.file.response.status === "done" ||
            info.file.response.status === "okay")
        ) {
          setFileChosen(true);
        } else {
          // Handle the case when the status is not okay
          console.error("File upload failed or status is not okay");
        }
      }, 1000); // You can adjust the timeout value as needed
    }
  };

  return (
    <div className="image-upload">
      <h1 className="header-text">ატვირთეთ ფოტო</h1>
      {!fileChosen ? (
        <Dragger
          //   name="image"
          //   multiple={true}
          style={{
            background: "#F4F3FF !important",
            width: "600px",
            height: "180px",
          }}
          {...props}
        >
          <p className="ant-upload-drag-icon">
            <Image src={folderAddImage} alt="" />
          </p>
          <p className="ant-upload-text">
            ჩააგდეთ ფაილი აქ ან <span>აირჩიეთ ფაილი</span>
          </p>
        </Dragger>
      ) : (
        <div className="file-uploaded">
          <div className="image-info">
            <Image src={galleryPng} alt="" />
            <p>{fileName}</p>
          </div>
          <button
            style={{ background: "none", border: "none" }}
            onClick={() => {
              setFileChosen(false);
              setFileName("");
            }}
          >
            <ExitIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadImageComponent;
