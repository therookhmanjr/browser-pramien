"use client";

import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";
import { useState } from "react";

const Player = () => {
    const player = usePlayer();
    
    //const song = songs[parseInt(player.activeId)];

    const [song, setSong] = useState();

    const fetchSong = () => {
        fetch("http://localhost:8080/api/getSong", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: player.activeId
            }),
            
            })
            .then((res) => res.json())
            .then((res) => {
                setSong(res);
            })
            .catch(error => {
                console.error('Ошибка получения файлов:', error);
            });
  };

    

    return (
        <div
            className="
                fixed
                bottom-0
                bg-black
                w-full
                py-2
                h-[80px]
                px-4
                text-white
            "
        >
            {song && (<PlayerContent key={song} song={song} songUrl={song.file.filepath.replace('.', 'http://localhost:8080')} />)}
        </div>
    );
}

export default Player;