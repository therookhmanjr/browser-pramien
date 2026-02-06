"use client";


import { twMerge } from "tailwind-merge";
import React, { useState } from 'react';

interface SideButtonProps {
    children?: React.ReactNode;
    classname?: string;
    text?: string;
}
export const SideButton: React.FC<SideButtonProps> = ({
    children, text, classname
}) => {

    return (
        <button className={twMerge("bg-grayy text-center text-white pt-4 pb-5 mt-4 border-none w-[90%] cursor-pointer hover:opacity-90 rounded-lg", classname)}>
            {text}
        </button>
    )
};