"use client";

import { redirect } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { getData } from "@/essentials";
import { Note } from "@/components/Diary/Note";
import React, { useState } from 'react';
import { SideBlock } from "@/components/VideoPlayer/SideBlock";
import { SideButton } from "@/components/VideoPlayer/SideButton";
import { SideBar } from "@/components/VideoPlayer/SIdeBar";
import { Header } from "@/components/VideoPlayer/Header";
import { Video } from "@/components/VideoPlayer/Video";
import { useEffect, useRef } from "react";


export default function Home() {
  // if (!global.window?.localStorage.getItem('token')) {
  //  redirect('http://localhost:3000/')  
  // }
  const token = global.window?.localStorage.getItem('token')
  const [videos, setVideos] = useState<any[]>([])
  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = () => {
    fetch("http://localhost:8080/api/getAllVideos", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token
      }),
      cache: 'no-store'
    })
      .then((res) => res.json())
      .then((res) => setVideos(res))
      .catch(error => {
        console.error('Ошибка получения файлов:', error);
      });
  };

  return (
    <div className="w-full h-screen bg-grayy no-scrollbar overflow-hidden">
      <Header title="YouTube" />
      <div className="flex h-lvh">
        <SideBar>
          <SideBlock>
            <SideButton text="Главная" />
            <SideButton text="Подписки" />
          </SideBlock>
          <p className="text-center text-white mt-4 text-2xl">Вы</p>
          <SideBlock>
            <SideButton text="Мой канал" />
            <SideButton text="История" />
            <SideButton text="Ваши видео" />
            <SideButton text="Плейлисты" />
            <SideButton text="Понравившиеся" />
          </SideBlock>
          <p className="text-center text-white mt-4 text-2xl">Подписки</p>
          <hr className="border-white border mb-6 mt-32"></hr>
          <p className="text-center text-white mt-4 text-2xl">Другие возможности</p>
          <SideBlock>
            <SideButton text="Настройки" />
            <SideButton text="Жалобы" />
          </SideBlock>
          <p className="text-center text-white mt-32 text-3xl"></p>
        </SideBar>



        <div className="w-full h-lvh overflow-y-auto ">
          <div className="h-full bg-grayy grid grid-cols-4 gap-1 ">
           
            {/* <Video text="DMNEOLISG" image="https://www.giantfreakinrobot.com/wp-content/uploads/2022/08/rick-astley.jpg" /> */}
            {Array.isArray(videos) && videos.length > 0 ? (
          videos.map((video, index) => {
            return <Video text={video.name} image="https://www.giantfreakinrobot.com/wp-content/uploads/2022/08/rick-astley.jpg" />
          })
        ) : (
          <p className="text-lg text-white font-mono">No videos available</p>
        )}

          </div>
        </div>
      </div>

    </div>
  );
}
