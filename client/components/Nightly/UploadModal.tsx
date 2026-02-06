"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface UploadModalProps {
    className?: string;
    hide?: any;
}


export const UploadModal: React.FC<UploadModalProps> = ({
    className,
    hide
}) => {
    const token = window.localStorage.getItem('token');
    const inputRef = useRef();
    const [name, setName] = useState<string>();
    const [selectedFile, setSelectedFile] = useState();
    
    // Handle the change event when a file is selected
    const handleOnChange = (event: any) => {
      setSelectedFile(event.target.files[0])
    };
  
    const onChooseFile = () => {
      inputRef.current.click();
    };
  
    

    const onSave = () => {
        const data = new FormData();

        data.append('file', selectedFile);
        data.append('token', token);
        data.append('name', name)

        fetch('http://localhost:8080/api/nightly/upload',
            {
                method: 'POST',
                body: data
            }
        )  
    }
    return (
        <div
             
            className="
                h-full
                flex
                fixed
                top-0
                left-0
                w-full
                z-50
                overflow-auto
            "
        > 
        
        <input
                type="file"
                ref={inputRef}
                onChange={handleOnChange}
                style={{ display: "none" }}
                accept="audio/*"
        />

            <div  className="h-[337px] w-[784px] bg-lightgrayy mx-auto my-0 fixed top-10 right-0 left-0  rounded-[5px] border-bordergrayy border-[1px]">
                <div className="text-base"></div>
                <div className="max-w-[492px] my-0 mx-auto p-[32px]">
                    <h3 className="text-[17px] font-semibold opacity-100 align-middle mt-0 mx-0 mb-[16px] text-topsitetextH3">Новый ярлык</h3>
                    <div className="flex text-[15px] text-topsitetextH3">
                    <div className="w-full text-[15px] text-topsitetextH3">
                    <p className="text-[17px] text-topsitetextH3">Заголовок</p>
                        <div className="relative text-[17px] text-topsitetextH3">
                            <input onChange={e => {setName(e.currentTarget.value);}} type="text" placeholder="Введите название"  className="bg-lightgrayy border-bordergrayy border-[1px] my-[8px] mx-0 px-[8px] py-0 h-[32px] w-full text-[15px] rounded-[3px]"/>
                        </div>
                    </div>
                    <li className=" p-0 mt-[24px] mx-0 mb-0 ms-[32px] w-[120px] rounded-[8px] inline-block">
                        <div className="relative ">
                            <div className="text-inherit block outline-none">
                                <div onClick={onChooseFile} className="border-[1px] border-linegrayy rounded-lg shadow-md bg-lightgrayy justify-center my-0 mx-auto h-[80px] w-[80px] cursor-pointer relative items-center flex text-[32px] font-extralight uppercase">
                                    {selectedFile && (
                                        <Image alt="" src={`/icon5.png`} className="w-full h-full" fill/>
                                    )}
                                </div>
                            </div>
                            <div className="absolute t-0 w-full h-full  "></div>
                        </div>
                    </li>  
                </div>
                </div>
                <div className="border-t flex flex-row flex-wrap m-0 pt-[15px] pb-0 px-[25px] justify-end border-linegrayy"> 
                    <button onClick={hide} className="ms-[10px] me-0 bg-lightgrayy border-[1px] border-linegrayy text-[#fbfbfe] rounded-[4px] cursor-pointer mb-[15px] py-[10px] px-[30px] whitespace-nowrap">Отмена</button>
                    <button onClick={onSave} className="ms-[10px] me-0 border-[1px] border-linegrayy text-[#2b2a33] bg-[#00ddff] rounded-[4px] text-inherit cursor-pointer mb-[15px] py-[10px] px-[30px] whitespace-nowrap">Сохранить</button>
                </div>
                
                
            </div>
        </div>
            
    )

};