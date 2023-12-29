"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import folderAddImage from "../assets/images/folder-add.png";
import galleryPng from "../assets/images/gallery.png";
import ExitIcon from "./ExitIcon";

const UploadImageComponent = ({ setImageFile }: any) => {
  const [fileChosen, setFileChosen] = useState(false);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (!fileChosen) {
      setImageFile(null);
    }
  }, [fileChosen]);

  return (
    <div className="image-upload">
      <h1 className="header-text">ატვირთეთ ფოტო</h1>
      {!fileChosen ? (
        <>
          <label htmlFor="file" className="image-input">
            <input
              type="file"
              name="file"
              id="file"
              onChange={(e: any) => {
                const reader = new FileReader();
                reader.onload = function (event: any) {
                  const binaryData = event.target.result;
                  setImageFile(binaryData);
                  setFileChosen(true);
                  setFileName(e.target.files[0].name);
                };

                if (e.target.files.length > 0) {
                  const file = e.target.files[0];
                  reader.readAsArrayBuffer(file);
                }
              }}
            />

            <p className="ant-upload-drag-icon">
              <Image src={folderAddImage} alt="" />
            </p>
            <p className="ant-upload-text">
              ჩააგდეთ ფაილი აქ ან <span>აირჩიეთ ფაილი</span>
            </p>
          </label>
        </>
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
