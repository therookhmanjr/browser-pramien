"use client";


import { twMerge } from "tailwind-merge";
import React, { useState } from 'react';
import { title } from "process";
import { Icon } from "@/components/VideoPlayer/Icon";
interface HeaderProps {

    title?: string;
}
export const Header: React.FC<HeaderProps> = ({
    title
}) => {

    return (
            <div className="w-full bg-lightgrayy text-white flex text-5xl h-24 indent-8 relative pt-6 shadow-md shadow-[#262222] ">
                {title}
                <div className="block">
                    <input type="text" placeholder="Введите запрос" className="border-none w-[700px] indent-4 h-10 ml-[400px] bg-[#535263] text-3xl rounded-lg text-white" />
                </div>
                <Icon image="https://www.giantfreakinrobot.com/wp-content/uploads/2022/08/rick-astley.jpg"/>
            </div>
    )
};