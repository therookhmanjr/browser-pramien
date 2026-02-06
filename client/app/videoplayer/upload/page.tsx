"use client";

import { useState, useEffect } from "react";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { SideBlock } from "@/components/VideoPlayer/SideBlock";
import { SideButton } from "@/components/VideoPlayer/SideButton";
import { SideBar } from "@/components/VideoPlayer/SIdeBar";
import { Header } from "@/components/VideoPlayer/Header";
import { Video } from "@/components/VideoPlayer/Video";

export default function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, []);

  const [file, setFile] = useState<File>();
  const [file1, setFile1] = useState<File>();
  const [filePreview, setFilePreview] = useState<string>();
  const [filePreview1, setFilePreview1] = useState<string>();
  const [fileEnter, setFileEnter] = useState(false);
  const [fileEnter1, setFileEnter1] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const upload = () => {
    if (!file || !file1 || !token) {
      alert("Missing video / preview / token");
      return;
    }

    const data = new FormData();
    data.append("token", token);
    data.append("name", name);
    data.append("description", description);
    data.append("previewFile", file1);
    data.append("videoFile", file);

    fetch("http://localhost:8080/api/uploadVideo", {
      method: "POST",
      body: data,
    });
  };

  return (
    <div className="w-full h-screen bg-grayy overflow-hidden">
      <Header title="YouTube" />

      <div className="flex h-lvh">
        <SideBar>
          <SideBlock>
            <SideButton text="Главная" />
            <SideButton text="Подписки" />
          </SideBlock>
        </SideBar>

        <div className="w-full overflow-y-auto">

          <p className="ml-12 text-white text-5xl">Загрузить видео</p>

          {/* VIDEO */}

          {!file && (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setFileEnter(true);
              }}
              onDragLeave={() => setFileEnter(false)}
              onDrop={(e) => {
                e.preventDefault();
                setFileEnter(false);

                if (e.dataTransfer.items) {
                  for (let i = 0; i < e.dataTransfer.items.length; i++) {
                    const item = e.dataTransfer.items[i];

                    if (item.kind === "file") {
                      const f = item.getAsFile();
                      if (f) {
                        setFile(f);
                        setFilePreview(URL.createObjectURL(f));
                      }
                    }
                  }
                }
              }}
              className={`mx-12 mt-6 w-80 h-60 border-dashed border-2 flex items-center justify-center ${
                fileEnter ? "border-4" : ""
              }`}
            >
              <label htmlFor="file">
                <MdOutlineDriveFolderUpload size={150} />
              </label>

              <input
                id="file"
                type="file"
                hidden
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    setFile(f);
                    setFilePreview(URL.createObjectURL(f));
                  }
                }}
              />
            </div>
          )}

          {/* PREVIEW */}

          {!file1 && (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setFileEnter1(true);
              }}
              onDragLeave={() => setFileEnter1(false)}
              onDrop={(e) => {
                e.preventDefault();
                setFileEnter1(false);

                if (e.dataTransfer.items) {
                  for (let i = 0; i < e.dataTransfer.items.length; i++) {
                    const item = e.dataTransfer.items[i];

                    if (item.kind === "file") {
                      const f = item.getAsFile();
                      if (f) {
                        setFile1(f);
                        setFilePreview1(URL.createObjectURL(f));
                      }
                    }
                  }
                }
              }}
              className={`mx-12 mt-6 w-80 h-60 border-dashed border-2 flex items-center justify-center ${
                fileEnter1 ? "border-4" : ""
              }`}
            >
              <label htmlFor="file1">
                <MdOutlineDriveFolderUpload size={150} />
              </label>

              <input
                id="file1"
                type="file"
                hidden
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    setFile1(f);
                    setFilePreview1(URL.createObjectURL(f));
                  }
                }}
              />
            </div>
          )}

          <input
            onInput={(e) => setName((e.target as HTMLInputElement).value)}
            placeholder="Название"
            className="ml-12 mt-6 block"
          />

          <input
            onInput={(e) =>
              setDescription((e.target as HTMLInputElement).value)
            }
            placeholder="Описание"
            className="ml-12 mt-4 block"
          />

          <button onClick={upload} className="ml-12 mt-6 text-white">
            Отправить
          </button>
        </div>

        <SideBar>
          <Video
            classname="w-[290px] h-[170px]"
            text="Demo"
            image="https://www.giantfreakinrobot.com/wp-content/uploads/2022/08/rick-astley.jpg"
          />
        </SideBar>
      </div>
    </div>
  );
}