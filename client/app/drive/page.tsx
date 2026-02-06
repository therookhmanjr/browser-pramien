'use client';

import { redirect } from 'next/navigation';
import { TopSite } from "@/components/Drive/TopSite";
import { useEffect, useRef, useState } from "react";
import React, { ChangeEvent } from 'react';

export const revalidate = 0;
export const dynamic = 'force-dynamic'

export default function Home() {

  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, []);

  useEffect(() => {
  if (token) fetchFiles();
}, [token]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState()
  const [files, setFiles] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState('');
  const [searchItem, setSearchItem] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Element[]>([]);
  const [hoveredFile, setHoveredFile] = useState(null);

  const handleFileHover = (file: React.SetStateAction<null>) => {
    setHoveredFile(file);
  };

  useEffect(() => {
    fetchFiles();
  }, [sortBy]);

  const fileIcons: Record<string, string> = {
    '.jpg': '/images/icon_image.png',
    '.png': '/images/icon_image.png',
    '.bmp': '/images/icon_image.png',
    '.gif': '/images/icon_image.png',
    '.tif': '/images/icon_image.png',
    '.pdf': '/images/icon_image.png',
    '.jpeg': '/images/icon_image.png',
    '.docx': '/images/icon_text.png',
    '.doc': '/images/icon_image.png',
    '.wav': '/images/icon_music.png',
    '.aac': '/images/icon_music.png',
    '.midi': '/images/icon_music.png',
    '.txt': '/images/icon_text.png',
    '.mp4': '/images/icon_video.png',
    '.avi': '/images/icon_video.png',
    '.wmv': '/images/icon_video.png',
    '.flv': '/images/icon_video.png',
    '.rar': '/images/icon_archive.png',
    '.zip': '/images/icon_archive.png',
    '.7z': '/images/icon_archive.png',
    '.gzip': '/images/icon_archive.png',
    '.exe': '/images/exe.png',
    '.mov': '/images/icon_video.png',
  }

  const getFileIcon = (extension: string) => {
    if (fileIcons[extension]) {
      const icon = fileIcons[extension];
      //console.log(`Extension: ${extension}, Icon: ${icon}`);
      return icon;
    } else {
      //console.warn(`No icon found for extension: ${extension}`);
      return '/images/icon_default.png';
    }
  };

  const fetchFiles = () => {
  if (!token) return; // ← ВАЖНО

  fetch("http://localhost:8080/api/getFilesByUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
    cache: "no-store",
  })
    .then((res) => res.json())
    .then((res) => {
      let sortedFiles = res;

      if (sortBy === "name") {
        sortedFiles = res.slice().sort((a: any, b: any) => {
          const fileNameA = a.filepath.split("/").pop().toLowerCase();
          const fileNameB = b.filepath.split("/").pop().toLowerCase();
          return fileNameA.localeCompare(fileNameB);
        });
      }

      setFiles(sortedFiles);
    })
    .catch((error) => {
      console.error("Ошибка получения файлов:", error);
    });
};


  const handleSearchElements = (e: any) => {
    const value = e.target.value;
    setSearchItem(value)
  };


  const handleOnChange = (e: any) => {
    const uploadedFile = e.target.files[0];
    const formData = new FormData();

    formData.append('file', uploadedFile);
    formData.append('token', token);

    const rawResponse = fetch("http://localhost:8080/api/upload", {
      method: 'POST',
      body: formData
    }).then(() => {
      fetchFiles();
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortBy = e.target.value.toString();
    setSortBy(selectedSortBy);
  };



  // const onSave = () => {
  //     let data = new FormData()
  //     data.append('file', selectedFile);
  //     fetch("http://localhost:8080/api/createFile", {
  //         method: "POST",
  //         headers: {
  //             'Content-Type': 'multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD'
  //         },
  //         body: data
  //     })
  // }
  return (

    <div className="w-screen h-full bg-grayy absolute overflow-visible">

      <div className="w-full h-10q bg-grayy float-start">
        <h1 className="w-10q h-fit mt-2q ml-3q float-start font-bold cursor-default italic text-white  lg:text-4xl md:text-2xl">ДИСК</h1>
        <button className="w-3q h-5q  transition cursor-auto rounded-tl-lg rounded-bl-lg bg-lightgrayy mt-2q ml-5q  absolute italic font-bold lg:text-xl md:text-base  text-white ">  <img src={"./images/liked.png"} alt="" className="w-30 h-30  m-1q static" /></button>
        <input className="w-45q h-5q min-h-35 outline-none cursor-default rounded-tr-lg rounded-br-lg bg-lightgrayy ml-7q mt-2q absolute text-2xl text-white" value={searchItem}
          onChange={handleSearchElements} />
      </div>



      <div className="lg:w-1/3 lg:mr-q sm:w-0 lg:h-4/6 sm:h-0 lg:visible sm:collapse bg-bordergrayy float-right rounded-lg ">
        <h1 className="text-center mt-3q  lg:text-4xl md:text-2xl sm:text-0 sm:w-0 sm:h-0 font-bold italic text-white cursor-default lg:visible sm:collapse ml-30q">Предпросмотр</h1>
      </div>

      <div className="lg:w-1/6 sm:w-1/3 h-5/6  mt-3 bg-grayy float-start">
        <div>
          <input type="file" ref={inputRef} onChange={handleOnChange} className="w-6/12 h-fit min-w-130 hover:bg-bordergrayy transition cursor-pointer text-white rounded-lg bg-lightgrayy italic ml-17q mt-2q sticky lg:text-lg md:text-base float-start font-bold " />
        </div>
        <button className="w-6/12 h-fit min-w-104 rounded-lg hover:bg-bordergrayy transition cursor-pointer ml-16q mt-3 text-white italic lg:text-2xl md:text-base float-start font-bold">Удаление</button>
        <button className="w-6/12 h-fit min-w-104 rounded-lg hover:bg-bordergrayy transition cursor-pointer ml-16q mt-3 text-white italic lg:text-2xl md:text-base float-start font-bold">Все папки</button>
        <button className="w-6/12 h-fit min-w-104 rounded-lg hover:bg-bordergrayy transition cursor-pointer mx-16q mt-3 text-white italic lg:text-2xl md:text-base float-left font-bold">Все фото</button>

        <button className="w-6/12 h-fit min-w-104 rounded-lg hover:text-white hover:bg-bordergrayy transition cursor-pointer ml-16q mt-11q italic lg:text-2xl md:text-base font-bold float-start text-bordergrayy">Общие</button>
        <button className="w-6/12 h-fit min-w-104 rounded-lg hover:text-white hover:bg-bordergrayy transition cursor-pointer mx-16q mt-3 italic lg:text-2xl md:text-base font-bold float-start text-bordergrayy">Личные</button>
        <button className="w-6/12 h-fit min-w-104 rounded-lg hover:text-white hover:bg-bordergrayy transition cursor-pointer ml-16q  mt-3 lg:text-2xl md:text-base italic font-bold float-start text-bordergrayy">Создать папку</button>

      </div>




      <div className="lg:w-1/2 sm:w-2/3 bg-grayy 1000:h-1/5 h-9q float-right">
        <select value={sortBy} onChange={handleSortChange} className="w-2/5 h-5/6 lg:text-3xl md:text-xl ml-3q outline-none cursor-default rounded-lg text-white bg-lightgrayy hover:bg-bordergrayy  mt-3q text-center">
          <option value='' className="w-1/5 h-1/2 1300:min-w-130 min-w-110 min-h-57 max-h-68 hover:bg-bordergrayy transition cursor-pointer rounded-lg text-white mx-4q bg-lightgrayy italic font-bold float-start  lg:text-xl md:text-base">Все файлы</option>
          <option value='documents' className="w-1/5 h-1/2 1300:min-w-130 min-w-110 min-h-57 max-h-68 hover:bg-bordergrayy transition cursor-pointer rounded-lg text-white mx-4q bg-lightgrayy italic font-bold float-start  lg:text-xl md:text-base">Документы</option>
          <option value='tabels' className="w-1/5 h-1/2 1300:min-w-130 min-w-110 min-h-57 max-h-68 hover:bg-bordergrayy transition cursor-pointer rounded-lg text-white mx-4q bg-lightgrayy italic font-bold float-start  lg:text-xl md:text-base">Таблицы</option>
          <option value='presentations' className="w-1/5 h-1/2 1300:min-w-130 min-w-110 min-h-57 max-h-68 hover:bg-bordergrayy transition cursor-pointer rounded-lg text-white mx-4q bg-lightgrayy italic font-bold float-start  lg:text-xl md:text-base">Презентации</option>
          <option value='images' className="w-1/5 h-1/2 1300:min-w-130 min-w-110 min-h-57 max-h-68 hover:bg-bordergrayy transition cursor-pointer rounded-lg text-white mx-4q bg-lightgrayy italic font-bold float-start  lg:text-xl md:text-base">Изображения</option>
          <option value='videos' className="w-1/5 h-1/2 1300:min-w-130 min-w-110 min-h-57 max-h-68 hover:bg-bordergrayy transition cursor-pointer rounded-lg text-white mx-4q bg-lightgrayy italic font-bold float-start  lg:text-xl md:text-base">Видео</option>
          <option value='labels' className="w-1/5 h-1/2 1300:min-w-130 min-w-110 min-h-57 max-h-68 hover:bg-bordergrayy transition cursor-pointer rounded-lg text-white mx-4q bg-lightgrayy italic font-bold float-start  lg:text-xl md:text-base">Ярлыки</option>
          <option value='folders' className="w-1/5 h-1/2 1300:min-w-130 min-w-110 min-h-57 max-h-68 hover:bg-bordergrayy transition cursor-pointer rounded-lg text-white mx-4q bg-lightgrayy italic font-bold float-start  lg:text-xl md:text-base">Папки</option>
          <option value='sites' className="w-1/5 h-1/2 1300:min-w-130 min-w-110 min-h-57 max-h-68 hover:bg-bordergrayy transition cursor-pointer rounded-lg text-white mx-4q bg-lightgrayy italic font-bold float-start  lg:text-xl md:text-base">Сайты</option>
          <option value='audios' className="w-1/5 h-1/2 1300:min-w-130 min-w-110 min-h-57 max-h-68 hover:bg-bordergrayy transition cursor-pointer rounded-lg text-white mx-4q bg-lightgrayy italic font-bold float-start  lg:text-xl md:text-base">Аудиофайлы</option>
          <option value='archives' className="w-1/5 h-1/2 1300:min-w-130 min-w-110 min-h-57 max-h-68 hover:bg-bordergrayy transition cursor-pointer rounded-lg text-white mx-4q bg-lightgrayy italic font-bold float-start  lg:text-xl md:text-base">Архивы(ZIP)</option>
        </select>

        <select value={sortBy} onChange={handleSortChange} className="w-2/5 h-5/6 lg:text-3xl md:text-xl ml-3q outline-none cursor-default rounded-lg text-white bg-lightgrayy hover:bg-bordergrayy float-right mt-3q mx-3q text-center">
          <option value="" className="w-1/5 h-1/3 1300:min-w-130 min-w-93 min-h-57 max-h-68 hover:bg-bordergrayy transition cursor-pointer rounded-tl-lg rounded-bl-lg text-white mt-4 bg-lightgrayy  italic float-start lg:text-xl md:text-xs sm:text-xs font-bold" >Сортировать по</option>
          <option value="name" className="w-1/5 h-1/3 1300:min-w-130 min-w-93 min-h-57 max-h-68 hover:bg-bordergrayy transition cursor-pointer text-white mt-4 bg-lightgrayy italic float-start lg:text-xl md:text-xs font-bold sm:text-xs">Названию</option>
        </select>
        <div className="w-full mx-auto mt-10 flex text-white flex-wrap">
          {Array.isArray(files) && files.length > 0 ? (
            files.map((file, index) => {
              const filePath = file.filepath;
              const fileName = filePath.split('/').pop();
              const extensionIndex = fileName.lastIndexOf('.');
              const fileNameWithoutExtension = fileName.substring(0, extensionIndex);
              const fileExtension = fileName.substring(extensionIndex).toLowerCase();

              let truncatedFileName = fileNameWithoutExtension;
              if (truncatedFileName.length > 6) {
                truncatedFileName = truncatedFileName.substring(0, 6) + '...';
              }

              const title = truncatedFileName + (fileExtension.startsWith('.') ? fileExtension : `.${fileExtension}`);

              const matchesSearch = title.toLowerCase().includes(searchItem.toLowerCase());

              return matchesSearch ? (
                <TopSite key={index} icon={getFileIcon(fileExtension)} title={title} onClick={() => window.location.href = `http://localhost:8080/download?fileid=${file.id}`} className='mt-10' />
              ) : null;
            })
          ) : (
            <p className="text-lg text-white font-mono">No files available</p>
          )}

        </div>
      </div>


    </div>
  );
}