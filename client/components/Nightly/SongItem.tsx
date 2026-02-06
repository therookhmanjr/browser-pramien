"use client";

import Image from "next/image";
import { PlayButton } from "./PlayButton";

interface SongItemProps {
    data: any,
    onClick: (id: string) => void
}

export const SongItem: React.FC<SongItemProps> = ({
    data,
    onClick
}) => {

    return (
       <div
        onClick={() => onClick(data.id)}
        className="
            relative
            group
            flex
            flex-col
            items-center
            justify-center
            rounded-md
            overflow-hidden
            gap-x-4
            bg-[#42414d]/30
            cursor-pointer
            hover:bg-[#42414d]/80
            transition
            p-3
        "
       >
        <div
            className="
                relative
                aspect-square
                w-full
                h-full
                rounded-md
                overflow-hidden
            "
        >
            <Image
                className="
                    object-cover

                "
                fill
                src={data.image}
                alt="Image"
            />

        </div>
        <div className="flex flex-col items-start w-full pt-4 gap-y-1">
            <p className="font-semibold truncate w-full">
                {data.name}
            </p>
            <p
                className="
                    text-neutral-400
                    text-sm
                    pb-4
                    w-full
                    truncate
                "
            >
                {data.author}
            </p>
        </div>
        <div className="
            absolute
            bottom-24
            right-5
        ">
            <PlayButton />
        </div>
       </div>
    )
};