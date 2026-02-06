"use client";

import { BiPencil } from "react-icons/bi";
import { IoMdDownload } from "react-icons/io";
import { twMerge } from "tailwind-merge";

interface TopSiteProps {
    className?: string;
    title?: string;
    url?: string;
    icon?: string;
    onClick?: any;
    index?: number;
}



export const TopSite: React.FC<TopSiteProps> = ({
    className,
    title,
    url,
    icon,
    onClick,
    index
}) => {
    return (
        <div className={twMerge("group text-center pt-5 px-4 pb-1 hover:bg-hov rounded-lg transition cursor-pointer relative", className)}  >
            <IoMdDownload className="group-hover:opacity-100 opacity-0 absolute m-auto right-1 top-1 hover:scale-110 transition duration-300" size={18} onClick={onClick}/>
            <div>
            <div className="bg-lightgrayy w-20 h-20 mx-1 justify-center items-center flex rounded-lg shadow-lg ">
            
            <img
                src={icon}
                className="w-12 h-12 shadow-gray-400"
            />
            
            </div>
            
            <p className="tracking-tight text-sm mt-2 ">{title}</p>
            </div>
        </div> 
    )

};