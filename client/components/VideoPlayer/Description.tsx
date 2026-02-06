"use client";


import { twMerge } from "tailwind-merge";
import React, { useState } from 'react';
import { title } from "process";
import { Icon } from "@/components/VideoPlayer/Icon";

interface DescriptionProps {

    text?: string;
    classname?: string;
    name?: string

}
export const Description: React.FC<DescriptionProps> = ({
    text, classname, name
}) => {

    return (
        <div className="text-white flex mt-3">
        <p className="text-transparent">1</p>
        <Icon classname="mt-1.5 ml-4 w-12 h-12" image="https://www.giantfreakinrobot.com/wp-content/uploads/2022/08/rick-astley.jpg" />
        <div className="block">
        <b><p className="ml-6 mt-1.5 text-2xl">{text}</p></b>
        <p className="ml-6 mt-2">@{name}</p>
        </div>
      </div>

    )
};