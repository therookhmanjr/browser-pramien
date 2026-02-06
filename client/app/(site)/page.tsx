"use client";

import { SearchBar } from "@/components/Primal/SearchBar";
import { TopSite } from "@/components/Primal/TopSite";
import { TopSiteModal } from "@/components/Primal/TopSiteModal";
import { useState } from "react";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState(0);
  let results = []
  
  const def = `{
    "title": "Primal",
    "url": "http://localhost:3000", 
    "file": "/icon5.png"
  }`
  let f = false
  for (let i = 0; i < 8; i++){
    
    let result = global.window?.localStorage.getItem(i.toString()) || def
    results.push(JSON.parse(result))
    if (result != def) f = true;
  }

  if (!f) {
    global.window?.localStorage.setItem("0", JSON.stringify({
      title: 'Диск',
      url: "http://localhost:3000/drive",
      file: "/icon5.png"
    }))
    global.window?.localStorage.setItem("1", JSON.stringify({
      title: 'Дневник',
      url: "http://localhost:3000/diary",
      file: "/icon5.png"
    }))
    global.window?.localStorage.setItem("2", JSON.stringify({
      title: 'NeYoutube',
      url: "http://localhost:3000/videoplayer",
      file: "/icon5.png"
    }))
    global.window?.localStorage.setItem("3", JSON.stringify({
      title: 'Nightly',
      url: "http://localhost:3000/nightly",
      file: "/icon5.png"
    }))
    global.window?.localStorage.setItem("4", JSON.stringify({
      title: 'Mail',
      url: "http://localhost:3000/mail",
      file: "/icon5.png"
    }))
    results = []
    for (let i = 0; i < 8; i++){
      let result = global.window?.localStorage.getItem(i.toString()) || def
      results.push(JSON.parse(result))
    }
  }
  return (
    <div className="place-items-center bg-grayy w-screen  sm:h-full xl:h-screen lg:h-screen md:h-screen  gap-0">
      {
        modalVisible && 
        <TopSiteModal key={index} index={index} hide={() => {setModalVisible(false)}}/>
      }
      <h1 className="text-transparent">1</h1>
      <div className="flex justify-center items-center mt-52">
        <img src={`/icon5.png`} alt="" className="w-20 h-20 text-center mr-2"/>
        <h1 className="text-center font-bold text-5xl font-monsterrat text-white align-middle">
          Primal 
        </h1>
      </div>
      <SearchBar className="flex rounded-md bg-lightgrayy justify-center items-center border-lightgrayy border-4 xl:w-720 lg:w-600 md:w-360 sm:w-266 mx-auto h-12 mt-8" />
      <div className="xl:w-960 lg:w-720 md:w-484  sm:w-240 mx-auto mt-10 flex text-white flex-wrap">
        
      <TopSite icon={results[0].file} title={results[0].title} url={results[0].url} onClick={() => {setIndex(0); setModalVisible(true)}}/>
      <TopSite icon={results[1].file} title={results[1].title} url={results[1].url} onClick={() => {setIndex(1); setModalVisible(true)}}/>
      <TopSite icon={results[2].file} title={results[2].title} url={results[2].url} onClick={() => {setIndex(2); setModalVisible(true)}}/>
      <TopSite icon={results[3].file} title={results[3].title} url={results[3].url} onClick={() => {setIndex(3); setModalVisible(true)}}/>
      <TopSite icon={results[4].file} title={results[4].title} url={results[4].url} onClick={() => {setIndex(4); setModalVisible(true)}}/>
      <TopSite icon={results[5].file} title={results[5].title} url={results[5].url} onClick={() => {setIndex(5); setModalVisible(true)}}/>
      <TopSite className="xl:visible lg:invisible sm:invisible md:visible pt-5 px-4 pb-1" icon={results[6].file} title={results[6].title} url={results[6].url} onClick={() => {setIndex(6); setModalVisible(true)}}/>
      <TopSite className="xl:visible lg:invisible sm:invisible md:visible pt-5 px-4 pb-1" icon={results[7].file} title={results[7].title} url={results[7].url} onClick={() => {setIndex(7); setModalVisible(true)}}/>
        
      </div>
    </div>
  );
}
