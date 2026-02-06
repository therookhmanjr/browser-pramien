"use client";


import { twMerge } from "tailwind-merge";
import React, { useRef, useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";

interface NoteProps {
    children?: React.ReactNode;
    classname?: string;
    text?: string;
    img?: string;
    type?: string;
    title?: string;
    id?: number;
    x?: number;
    y?: number;
    widt?: number;
    heigh?: number;
  
}
export const Note: React.FC<NoteProps> = ({
    children, text, img, type, title, classname, id, x, y, widt, heigh
}) => {

    const [position, setPosition] = useState({ x: x, y: y });
    const [dragging, setDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: x, y: y });

    const elementRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: widt, height: heigh });

  useEffect(() => {
    const element = elementRef.current;

    const sendResizeData = (width, height) => {
      fetch('http://localhost:8080/api/notes/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          width: width,
          height: height,
        }),
      }).then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
        sendResizeData(width, height);
      }
    });

    if (element) {
      resizeObserver.observe(element);
    }

    return () => {
      if (element) {
        resizeObserver.unobserve(element);
      }
    };
  }, [id]);

    const handleMouseDown = (event) => {
        setDragging(true);
        setStartPosition({
            x: event.clientX - position.x,
            y: event.clientY - position.y
        });
    };

    const handleMouseUp = () => {
        fetch('http://localhost:8080/api/notes/edit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: id,
              x: position.x,
              y: position.y,
            }),
          }).then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch((error) => console.error('Error:', error));
        setDragging(false);
    };

    const handleMouseMove = (event) => {
        if (dragging) {
            setPosition({
                x: event.clientX - startPosition.x,
                y: event.clientY - startPosition.y
            });
        }
    };

    const deleteNote = () => {
        fetch('http://localhost:8080/api/notes/delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: id,
            }),
          }).then(() => {location.reload()})
            
        
    }

    const changeText = (event) => {
      fetch('http://localhost:8080/api/notes/edit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
            text: event.target.innerHTML
          }),
        }).then(response => response.json())
          .then(data => console.log('Success:', data))
          .catch((error) => console.error('Error:', error));
  }
  const changeTitle = (event) => {
    fetch('http://localhost:8080/api/notes/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          title : event.target.innerHTML
        }),
      }).then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));
}

    if (type == "1") {
        return (

            <div className={twMerge(` bg-lightgrayy flex rounded-lg select-none absolute overflow-auto resize`, classname)}
            ref={elementRef}
                style={{
                    top: position.y,
                    left: position.x,
                    width: widt,
                    height: heigh
                }}>
                <MdDelete className="group-hover:opacity-100 opacity-100 cursor-pointer absolute m-auto right-1 top-1 hover:scale-110 transition duration-300 text-white" size={18} onClick={deleteNote}/>
                <div className="flex w-full" onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    style={{
                        cursor: dragging ? 'grabbing' : 'grab'
                    }}>
                    <img className="my-3 ml-7 rounded-lg max-w-72 max-h-72 inline-block" src={img} alt="" />
                    <div>
                    <p contentEditable onBlur={changeTitle} className="text-white text-3xl mt-2 text-center">{title}</p>
                    <p contentEditable onBlur={changeText} className="bg-lightgrayy text-white text-3lg ml-4 mt-3 inline-block whitespace-pre-wrap">{text}</p>
                    </div>

                </div>
            </div>



        )
    }

    if (type == "2") {
        return (
            <div className={twMerge(` bg-lightgrayy rounded-lg flex select-none absolute overflow-auto resize`, classname)}
            style={{
                top: position.y,
                left: position.x,
                width: widt,
                height: heigh
            }}>
                <MdDelete className="group-hover:opacity-100 opacity-100 cursor-pointer absolute m-auto right-1 top-1 hover:scale-110 transition duration-300 text-white" size={18} onClick={deleteNote}/>
                <div className="flex"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    style={{
                        cursor: dragging ? 'grabbing' : 'grab'
                    }}>
                   <div>
                    <p contentEditable onBlur={changeTitle} className="text-white text-3xl mt-2 text-center">{title}</p>
                    <p contentEditable onBlur={changeText} className="text-white text-3lg ml-6 mb-2  inline-block">{text}</p>
                    </div>
                    <img className="my-3 mr-7 rounded-lg max-w-72 max-h-72 inline-block" src={img} alt="" />
                </div>


            </div>
        )
    }

    if (type == "3") {
        return (
            <div className={twMerge(` bg-lightgrayy flex rounded-lg block select-none absolute overflow-auto resize`, classname)} onMouseDown={handleMouseDown}
            style={{
                top: position.y,
                left: position.x,
                width: widt,
                height: heigh
            }}>
                <MdDelete className="group-hover:opacity-100 opacity-100 cursor-pointer absolute m-auto right-1 top-1 hover:scale-110 transition duration-300 text-white" size={18} onClick={deleteNote}/>
                <div className=""
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    style={{
                        cursor: dragging ? 'grabbing' : 'grab'
                    }}>
                    <p contentEditable onBlur={changeTitle} className="text-white text-3xl text-center mt-2">{title}</p>
                    <img contentEditable className="my-3 mx-3 rounded-lg max-w-72 max-h-72" src={img} alt="" />
                    </div>
            </div>
        )
    }

    if (type == "4") {
        return (
            <div className={twMerge(` bg-lightgrayy flex rounded-lg select-none absolute resize max-w-[650px] max-h-[650px] overflow-hidden`, classname)} onMouseDown={handleMouseDown}
            style={{
                top: position.y,
                left: position.x,
                width: widt,
                height: heigh
            }}>
                <MdDelete className="group-hover:opacity-100 opacity-100 cursor-pointer absolute m-auto right-1 top-1 hover:scale-110 transition duration-300 text-white" size={18} onClick={deleteNote}/>
                <img className="my-2 mx-2 rounded-lg p-2" onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    style={{
                        cursor: dragging ? 'grabbing' : 'grab'
                    }} src={img} alt="" />
            </div>
        )
    }

    if (type == "5") {
        return (
            <div className={twMerge(` bg-lightgrayy rounded-lg flex select-none absolute`, classname)}>
                <img className="my-3 ml-7 rounded-lg max-w-72 max-h-72" src={img} alt="" />
                <div className="block ">
                    <p className="text-white text-3xl text-center mt-2">{title}</p>
                    <p className="text-white text-3lg ml-10 mb-2">{text}</p>
                </div>
            </div>
        )
    }



};