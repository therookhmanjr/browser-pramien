"use client";


import { twMerge } from "tailwind-merge";
import React, { useState } from 'react';
import { title } from "process";
import { Icon } from "@/components/VideoPlayer/Icon";

interface ActionsButtonsProps {

    text?: string;
    classname?: string;
    name?: string

}
export const ActionsButton: React.FC<ActionsButtonsProps> = ({
    text, classname, name
}) => {

    return (
        <div className="ml-[50px] mt-[20px] text-white w-[1180px] min-h-[73px] bg-lightgrayy rounded-lg flex">
        <p className="text-transparent">1</p>
        <Icon classname="mt-1.5 ml-4" image="https://www.giantfreakinrobot.com/wp-content/uploads/2022/08/rick-astley.jpg" />
        <div className="block">
        <p className="ml-6 mt-1.5">@{name}</p>
        <p className="ml-6 mt-2">{text}</p>
        </div>
      </div>

    )
};