"use client";

import { SongItem } from "@/components/Nightly/SongItem";
import useOnPlay from "@/hooks/useOnPlay";

interface PageContentProps {
    songs?: any[]
}


export const PageContent: React.FC<PageContentProps> = ({
    songs
}) => {



    const songss = [
        {id: 0, name: "Song", image: '/images/liked.png', author: "fxckfallen", song: '/test/test.mp3'},
        {id: 1, name: "xD", image: '/images/liked.png', author: "maks ", song: '/test/test.mp3'},
        {id: 2, name: "stockholm", image: '/images/liked.png', author: "shadowraze", song: '/test/test.mp3'},
        {id: 3, name: "Where is my mind?", image: '/images/liked.png', author: "Серега Пират", song: '/test/test.mp3'},
        {id: 4, name: "Aomine Daiki", image: '/images/liked.png', author: "quizzzmeow", song: '/test/test.mp3'},
        {id: 5, name: "asd", image: '/images/liked.png', author: "YaYaYa", song: '/test/test.mp3'},
    ]
    const onPlay = useOnPlay(songss);
    return (
        <div
            className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-8
                gap-4
                mt-4
            ">
                {
                    songss.map((song) => (
                        <SongItem
                            key={song.id}
                            onClick={(id: string) => {onPlay(id)}}
                            data={song}
                        />
                    ))
                }

        </div>
    )
};