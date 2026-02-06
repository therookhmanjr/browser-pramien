"use client";

import Image from "next/image";



interface MediaItemProps {
    data: any,
    onClick: (id: string) => void
}

export const MediaItem: React.FC<MediaItemProps> = ({
    data,
    onClick
}) => {

    const handleClick = () => {
        if (onClick) {
            return onClick(data.id)
        }
    }

    return (
       <div
        onClick={handleClick}
        className="
            flex
            items-center
            gap-x-3
            cursor-pointer
            hover:bg-[#42414d]/50
            w-full
            p-2
            rounded-md
        "
       >
            <div
                className="
                    relative
                    rounded-md
                    min-h-[48px]
                    min-w-[48px]
                    overflow-hidden
                "
            >
                <Image
                    fill
                    src={`/icon5.png`}
                    alt="Image"
                    className="object-cover"
                />
            </div>
            <div className="
                flex
                flex-col
                gap-y-1
                overflow-hidden
            ">
                <p className="
                    text-white
                    truncate
                ">
                    {data.title}
                </p>
                <p className="
                    text-neutral-400
                    text-sm
                    truncate
                ">
                    {data.author.fullName}
                </p>
            </div>
       </div>
    )
};