"use client";

import { useRef, useState } from "react";

export default function Home() {
    const inputRef = useRef();
    const [selectedFile, setSelectedFile] = useState();



    const handleOnChange = (e: any) => {

        const uploadedFile = e.target.files[0];
        const formData = new FormData();
        
        const token = global.window?.localStorage.getItem('token')
        formData.append( 'data', uploadedFile );
        formData.append( 'token', token );
    
        const rawResponse = fetch("http://localhost:8080/api/upload", {
                method: 'POST',
                body: formData
        });
        
    };

    // const onSave = () => {
    //     let data = new FormData()
    //     data.append('file', selectedFile);
    //     fetch("http://localhost:8080/api/createFile", {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD'
    //         },
    //         body: data
    //     })
    // }
    return (
    <div>
        
        <input 
            type="file" 
            ref={inputRef}
            onChange={handleOnChange}
            />
    </div>
    );
}
