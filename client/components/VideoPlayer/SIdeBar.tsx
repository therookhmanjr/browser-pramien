"use client";


import { twMerge } from "tailwind-merge";
import React, { useState } from 'react';

interface SideBarProps {
    children?: React.ReactNode;
    classname?: string;
}
export const SideBar: React.FC<SideBarProps> = ({
    children, classname
}) => {

    return (
      
            <div className={twMerge("h-lvh bg-lightgrayy w-96 block overflow-y-auto", classname)}>
                {children}
            </div>
        

    )
};