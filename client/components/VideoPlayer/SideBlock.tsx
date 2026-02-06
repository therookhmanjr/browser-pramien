"use client";


import { twMerge } from "tailwind-merge";
import React, { useState } from 'react';

interface SideBlockProps {
    children?: React.ReactNode;
    classname?: string;
    title?: string;
}
export const SideBlock: React.FC<SideBlockProps> = ({
    children, title, classname
}) => {

    return (
        <div className="block text-center">
            {children}
            <hr className="border-white border mb-6 mt-4"></hr>
        </div>
    )
};