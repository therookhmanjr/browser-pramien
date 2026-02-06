"use client";


import { twMerge } from "tailwind-merge";
import React, { useState } from 'react';
import { title } from "process";

interface IconProps {
    image?: string
    classname?: string;
}
export const Icon: React.FC<IconProps> = ({
  image, classname
}) => {

    return (
        <div className={twMerge("w-16 h-16 ml-[450px]", classname)}> <img src={image} className="w-full h-full rounded-full"/> </div>
    )
};