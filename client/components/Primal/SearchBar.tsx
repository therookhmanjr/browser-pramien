"use client";
import React, { useState, useEffect } from 'react';
import { BiSearch } from "react-icons/bi";
interface SearchBarProps {
    children?: React.ReactNode;
    className?: string;
    value?: string;
}



export const SearchBar: React.FC<SearchBarProps> = ({
    children,
    className,
    value
}) => {
    const [url, setUrl] = useState(value);
  useEffect(() => {
    
    document.addEventListener("keydown", (e) => {
      if (e.code == "Enter") {
        window.location.href = "http://localhost:3000/search?q=" + url;
      }
    })
  });
    return (
        <div className={className}>
        <BiSearch size={30} className="text-white" onClick={ e =>  useEffect(() => {window.location.href = "http://localhost:3000/search?q=" + url;})}/>
        <input
          
          onChange={e => {setUrl(e.currentTarget.value);}}
          defaultValue={value}
          type="text"
          className="bg-transparent w-full focus:outline-none ml-2 text-lg text-white"
        />
      </div>
    )
};