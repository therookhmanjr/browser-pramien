'use client';

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
import { Icon } from "@/components/VideoPlayer/Icon";
import { Comment } from "@/components/VideoPlayer/Comments";
import { useEffect, useRef } from "react";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const id = searchParams["id"] ?? ""; 

  // if (!global.window?.localStorage.getItem('token')) {
  //  redirect('http://localhost:3000/')  
  // }
  const token = global.window?.localStorage.getItem('token')

  const [results, setResults] = useState(null); // Initialize as null to differentiate between loading and an empty object

  useEffect(() => {
    if (id) {
      fetchResults();
    }
  }, [id]); // Ensure that the effect runs when `id` changes

  const fetchResults = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/getVideo", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id }),
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data); // Log the API response
      setResults(data);
    } catch (error) {
      console.error('Ошибка получения файлов:', error);
    }
  };

  
//  const results = await getData(`http://localhost:8080/api/getVideo`, {id: id}, "POST")

  
    if (results === null) {
      return <div>Loading...</div>; // Show loading state while fetching data
    }
    if (results.file) {
    return (<div className="w-full h-screen bg-grayy no-scrollbar overflow-hidden ">
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

          <video controls preload="none" className="w-[1180px] h-[600px] mt-[50px] ml-[50px] rounded-lg">
            <source src={results.file.filepath.replace(".", "http://localhost:8080")}/>
            <track
              src="/path/to/captions.vtt"
              kind="subtitles"
              srcLang="en"
              label="English"
            />
            Your browser does not support the video tag.
          </video>
          <div className="ml-[50px] mt-[10px] text-white text-3xl ">
            <p>{results.name}</p>
          </div>




          <div className="ml-[50px] mt-[20px] text-white w-[1180px] min-h-[73px] bg-lightgrayy rounded-lg flex">
        <p className="text-transparent">1</p>
        <Icon classname="mt-1.5 ml-4" image="https://www.giantfreakinrobot.com/wp-content/uploads/2022/08/rick-astley.jpg" />
        <div className="block">
        <p className="ml-6 mt-1.5">{results.author.fullName}</p>
        <p className="ml-6 mt-2">300 тыс. подписчиков</p>
        </div>
        <b><SideButton text="Подписаться" classname="bg-white hover:opacity-90 rounded-2xl w-[200px] h-10 ml-[20px] text-black p-0"/></b>
        <SideButton text="Like" classname="bg-[#535263] hover:opacity-90 rounded-2xl w-[100px] h-10 ml-[300px] text-white p-0"/>
        <SideButton text="Dislike" classname="bg-[#535263] hover:opacity-90 rounded-2xl w-[100px] h-10 ml-[30px] text-white p-0"/>
        <SideButton text="Reporting" classname="bg-[#535263] hover:opacity-90 rounded-2xl w-[100px] h-10 ml-[30px] text-white p-0"/>
      </div>
          <div className="rounded-lg mt-[20px] ml-[50px] text-white flex w-[1180px] min-h-[200px] bg-lightgrayy">
            <p className="text-transparent">1</p>
            <p className="mt-4 ml-4">{results.description}</p>
          </div>
          <p className="text-3xl text-white ml-[50px] mt-[20px]">Comments</p>

          <div className="flex">
          <input type="text" placeholder="Введите комментарий" className="border-none w-[860px] indent-4 h-10 ml-[50px] mt-[20px] bg-lightgrayy text-3xl rounded-lg text-white" />
          <SideButton text="Отправить" classname="bg-lightgrayy w-[300px] h-10 ml-[20px] mt-[20px] bg-[#535263] p-0"/>

          </div>

          <Comment name="kdsfmbvkiodfb" text="klrmfvgkldfmgkldmfg"/>
          <Comment name="kdsfmbvkiodfb" text="klrmfvgkldfmgkldmfg"/>
          <Comment name="kdsfmbvkiodfb" text="klrmfvgkldfmgkldmfg"/>
          <Comment name="kdsfmbvkiodfb" text="klrmfvgkldfmgkldmfg"/>
          <Comment name="kdsfmbvkiodfb" text="klrmfvgkldfmgkldmfg"/>
          <Comment name="kdsfmbvkiodfb" text="klrmfvgkldfmgkldmfg"/>
          <Comment name="kdsfmbvkiodfb" text="klrmfvgkldfmgkldmfg"/>
          <Comment name="kdsfmbvkiodfb" text="klrmfvgkldfmgkldmfg"/>
          <Comment name="kdsfmbvkiodfb" text="klrmfvgkldfmgkldmfg"/>
          <div className="w-[350px] h-[200px] bg-grayy rounded-lg select-none mx-6 mt-12"> </div>

        </div>


        <div className="flex h-lvh ">
          <SideBar classname="bg-grayy ">
            <Video classname="w-[290px] h-[170px]" text="DMNEOLISG" image="https://www.giantfreakinrobot.com/wp-content/uploads/2022/08/rick-astley.jpg" />
            <Video classname="w-[290px] h-[170px]" text="DMNEOLISG" image="https://www.giantfreakinrobot.com/wp-content/uploads/2022/08/rick-astley.jpg" />
            <Video classname="w-[290px] h-[170px]" text="DMNEOLISG" image="https://www.giantfreakinrobot.com/wp-content/uploads/2022/08/rick-astley.jpg" />
            <Video classname="w-[290px] h-[170px]" text="DMNEOLISG" image="https://www.giantfreakinrobot.com/wp-content/uploads/2022/08/rick-astley.jpg" />
            <Video classname="w-[290px] h-[170px]" text="DMNEOLISG" image="https://www.giantfreakinrobot.com/wp-content/uploads/2022/08/rick-astley.jpg" />
            <div className="w-[290px] h-[100px] bg-grayy rounded-lg select-none mx-6 mt-12"> </div>

          </SideBar>

        </div>


      </div>

    </div>)
  }
}
