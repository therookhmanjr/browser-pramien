"use client";


import { twMerge } from "tailwind-merge";
import React, { useState } from 'react';
import { title } from "process";
import { Description } from "@/components/VideoPlayer/Description";

interface VideoProps {

    text?: string;
    image?: string;
    classname?: string

}
export const Video: React.FC<VideoProps> = ({
    text, image, classname
}) => {

    return (
        <div>
            <div className={twMerge("w-[350px] h-[200px] select-none mx-6 mt-12 ", classname)}> <img src={image} className="h-full w-full rounded-lg"/> </div>
            <Description text={text} name="Lksdfvniokfol"/>
            
        </div>
    )
};