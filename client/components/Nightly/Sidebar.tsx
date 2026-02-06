"use client";

import { useEffect, useMemo, useState } from "react";
import { Box } from "./Box";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import SidebarItem from "./SidebarItem";
import Library from "./Library";



interface SidebarProps {
    children?: React.ReactNode;
    className?: string;
    hide?: any;
}



const Sidebar: React.FC<SidebarProps> = ({
    children,
    className,
    hide
}) => {
    const pathname = usePathname();
    const token = global.window?.localStorage.getItem('token')
    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname !== '/nightly/search',
            href: '/nightly'
        },
        {
            icon: BiSearch,
            label: 'Search',
            active: pathname === '/nightly/search',
            href: '/nightly/search'
        }
    ], [pathname])

    const [songs, setSongs] = useState();

    const fetchSongs = () => {
        fetch("http://localhost:8080/api/getSongsByUser", {
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
            .then((res) => {
                setSongs(res);
            })
            .catch(error => {
                console.error('Ошибка получения файлов:', error);
            });
  };

    // const songs = [
    //     {id: 0, name: "Song", image: '/images/liked.png', author: "fxckfallen", song: '/test/test.mp3'},
    //     {id: 1, name: "xD", image: '/images/liked.png', author: "maks ", song: '/test/test.mp3'},
    //     {id: 2, name: "stockholm", image: '/images/liked.png', author: "shadowraze", song: '/test/test.mp3'},
    //     {id: 3, name: "Where is my mind?", image: '/images/liked.png', author: "Серега Пират", song: '/test/test.mp3'},
    //     {id: 4, name: "Aomine Daiki", image: '/images/liked.png', author: "quizzzmeow", song: '/test/test.mp3'},
    //     {id: 5, name: "asd", image: '/images/liked.png', author: "YaYaYa", song: '/test/test.mp3'},
    // ]
    useEffect(() => {
        fetchSongs();
      }, []);
    return (
        <div className={className}>
            <div className="
                hidden
                md:flex
                flex-col
                gap-y-2
                bg-black
                h-full
                w-[300px]
                p-2
            ">
                <Box>
                    <div className="
                        flex
                        flex-col
                        gap-y-4
                        px-5
                        py-4
                    ">
                        {routes.map((item) => (
                            <SidebarItem
                             key={item.label}
                             {...item}
                             />
                        ))}
                    </div>
                </Box>
                <Box className='overflow-y-auto h-full'>
                    {songs && (
                        <Library hide={() => hide()} songs={songs} />
                    )}
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    )
};

export default Sidebar;