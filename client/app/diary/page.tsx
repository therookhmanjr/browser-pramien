"use client";

import { redirect } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { getData } from "@/essentials";
import { Note } from "@/components/Diary/Note";
import React, { useEffect, useRef, useState } from 'react';
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4 } from "react-icons/ri";

export default function Home() {
  var result;
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  const dateRef = useRef(null);

  const [notes, setNotes] = useState<any[]>([]);
  const token = global.window?.localStorage.getItem('token')

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    fetch("http://localhost:8080/api/notes/getByDate", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token,
        date: dateRef.current.value
      }),
      cache: 'no-store'
    })
      .then((res) => res.json())
      .then((res) => {
        
        setNotes(res);
      })
      .catch(error => {
        console.error('Ошибка получения файлов:', error);
      });
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    fetchNotes();
  };

  const createNote = (type) => {
    fetch("http://localhost:8080/api/notes/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token,
        date: dateRef.current.value,
        type: type
      }),
      cache: 'no-store'
    })
      
      .then(() => {
       fetchNotes()
      })
      
  }

  return (
    <div className="w-full h-screen bg-grayy no-scrollbar overflow-hidden">
      <div className="w-full bg-lightgrayy text-white text-5xl h-24 indent-14 relative pt-6 shadow-md shadow-[#262222]">
        DIARY
        <input
          className="ml-[650px] bg-lightgrayy dark:[color-scheme:dark]"
          type="date"
          id="datePicker"
          name="datePicker"
          value={selectedDate}
          onChange={handleDateChange}
          ref={dateRef}
        />
      </div>


      <div className="flex h-lvh">
        <div className="h-lvh bg-lightgrayy w-72 block">
          <Note classname="w-[200px] h-[200px] mx-2 mt-5 relative" type="5" img="https://kartinki.pibig.info/uploads/posts/2023-04/1682095257_kartinki-pibig-info-p-kartinka-neizvestnogo-cheloveka-arti-vkont-1.jpg" />
          <Note classname="w-[200px] h-[200px] mx-2 relative" type="5" img="https://kartinki.pibig.info/uploads/posts/2023-04/1682095257_kartinki-pibig-info-p-kartinka-neizvestnogo-cheloveka-arti-vkont-1.jpg" />
          <Note classname="w-[200px] h-[200px] mx-2 relative" type="5" img="https://kartinki.pibig.info/uploads/posts/2023-04/1682095257_kartinki-pibig-info-p-kartinka-neizvestnogo-cheloveka-arti-vkont-1.jpg" />
          <Note classname="w-[200px] h-[200px] mx-2 relative" type="5" img="https://kartinki.pibig.info/uploads/posts/2023-04/1682095257_kartinki-pibig-info-p-kartinka-neizvestnogo-cheloveka-arti-vkont-1.jpg" />

        </div>

        <div className="w-full h-lvh">
          <div className="w-full relative bg-white text-black text-3xl h-12 indent-2 pt-1 flex ">
          <RiNumber1 className="hover:scale-110 transition cursor-pointer" size={40} onClick={() => {createNote(1)}}/>
          <RiNumber2 className="hover:scale-110 transition cursor-pointer" size={40} onClick={() => {createNote(2)}}/>
          <RiNumber3 className="hover:scale-110 transition cursor-pointer" size={40} onClick={() => {createNote(3)}}/>
          <RiNumber4 className="hover:scale-110 transition cursor-pointer" size={40} onClick={() => {createNote(4)}}/>
          </div>
          <div className="h-full bg-grayy relative overflow-y-auto">
            {/* <Note id={1} classname="w-[1500px] mx-16 mt-10" type="1" title="Title" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, odio sint quidem repudiandae animi at numquam commodi est itaque! Sequi, optio sunt. Consequatur magni quibusdam, repellendus voluptate eum esse sunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, odio sint quidem repudiandae animi at numquam commodi est itaque! Sequi, optio sunt. Consequatur magni quibusdam, repellendus voluptate eum esse sunt." img="https://kartinki.pibig.info/uploads/posts/2023-04/1682095257_kartinki-pibig-info-p-kartinka-neizvestnogo-cheloveka-arti-vkont-1.jpg" />

            <Note classname="w-[700px] mx-16 mt-96" type="1" title="Title" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, odio sint quidem repudiandae animi at numquam commodi est itaque! Sequi, optio sunt. Consequatur magni quibusdam, repellendus. Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt." img="https://kartinki.pibig.info/uploads/posts/2023-04/1682095257_kartinki-pibig-info-p-kartinka-neizvestnogo-cheloveka-arti-vkont-1.jpg" />

            <Note classname="w-[700px] mx-16 mt-[384px] ml-[865px]" type="1" title="Title" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, odio sint quidem repudiandae animi at numquam commodi est itaque! Sequi, optio sunt. Consequatur magni quibusdam, repellendus. Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt." img="https://kartinki.pibig.info/uploads/posts/2023-04/1682095257_kartinki-pibig-info-p-kartinka-neizvestnogo-cheloveka-arti-vkont-1.jpg" />

            <Note classname="w-[1500px] mx-16 mt-[850px]" type="2" title="Title" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, odio sint quidem repudiandae animi at numquam commodi est itaque! Sequi, optio sunt. Consequatur magni quibusdam, repellendus. Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt." img="https://kartinki.pibig.info/uploads/posts/2023-04/1682095257_kartinki-pibig-info-p-kartinka-neizvestnogo-cheloveka-arti-vkont-1.jpg" />

            <Note classname="w-[700px] mx-16 mt-[1190px]" type="2" title="Title" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, odio sint quidem repudiandae animi at numquam commodi est itaque! Sequi, optio sunt. Consequatur magni quibusdam, repellendus. Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt." img="https://kartinki.pibig.info/uploads/posts/2023-04/1682095257_kartinki-pibig-info-p-kartinka-neizvestnogo-cheloveka-arti-vkont-1.jpg" />
            <Note classname="w-[700px] mx-16 mt-[1190px] ml-[865px]" type="2" title="Title" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, odio sint quidem repudiandae animi at numquam commodi est itaque! Sequi, optio sunt. Consequatur magni quibusdam, repellendus. Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt.Consequatur magni quibusdam, repellendus voluptate eum esse sunt." img="https://kartinki.pibig.info/uploads/posts/2023-04/1682095257_kartinki-pibig-info-p-kartinka-neizvestnogo-cheloveka-arti-vkont-1.jpg" />


            <Note classname=" mx-16 mt-[1660px]" type="3" title="Title" img="https://kartinki.pibig.info/uploads/posts/2023-04/1682095257_kartinki-pibig-info-p-kartinka-neizvestnogo-cheloveka-arti-vkont-1.jpg" />
            <Note classname="mx-16 mt-[1660px] ml-[465px]" type="3" title="Title" img="https://kartinki.pibig.info/uploads/posts/2023-04/1682095257_kartinki-pibig-info-p-kartinka-neizvestnogo-cheloveka-arti-vkont-1.jpg" />
            <Note classname="mx-16 mt-[1660px] ml-[865px] " type="4" img="https://kartinki.pibig.info/uploads/posts/2023-04/1682095257_kartinki-pibig-info-p-kartinka-neizvestnogo-cheloveka-arti-vkont-1.jpg" />


            <Note classname="w-[700px] mx-16 mt-[2800px] bg-grayy" type="1" /> */}
           
            {Array.isArray(notes) && notes.length > 0 ? (
              notes.map((note, index) => {
                
                return (
                  <Note id={note.id} text={note.text} img={note.image} type={note.type} title={note.title} x={note.x == 0 ? note.width*2 : note.x} y={note.y == 0 ? note.height*2 : note.y} widt={note.width} heigh={note.height} key={index}/>
                ) ;
              })
            ) : (
              <p className="text-lg text-white font-mono">No notes available</p>
            )}


          </div>

        </div>

      </div>




    </div>

  );
}
