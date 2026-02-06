"use client";

import { redirect } from "next/navigation";
import { useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function Home() {

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const resultRef = useRef();
  const onLogin = () => {
   
    
      fetch('http://localhost:8080/api/login', {
        method: "POST",
         headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: login,
          password: password
        })
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.error) {
          resultRef.current.innerHTML = data.error;
        } else {
          global.window?.localStorage.setItem('token', data.token)
          global.window.location.href = 'http://localhost:3000/';
        }
      })
  }

  return (
  <div className="w-full h-screen bg-grayy absolute">
    <div className="w-96 bg-lightgrayy mt-24 m-auto rounded-lg">

      <div className="p-4">
        <h1 className="text-center text-white text-3xl">Signing</h1>
        <p className="text-center text-white mt-4">Please fill in this form to login an account</p>
        <hr className="border-white border mb-6"/>

        <label className="text-white pl-1"><b>Login</b></label>
        <input type="text" placeholder="Enter Login" required className="w-full border-none h-10 mt-1 mb-5 bg-[#535263] rounded-lg text-white pl-3" onChange={e => setLogin(e.target.value)}/>

        <label className="text-white pl-1"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" required className="w-full border-none h-10 mt-1 mb-5 bg-[#535263] rounded-lg text-white pl-3" onChange={e => setPassword(e.target.value)}/>

        <p className="text-center text-white" ref={resultRef}></p>
        <button onClick={onLogin} className="bg-[#00b6f6] text-white pt-4 pb-5 mt-3 mb-0 border-none cursor-pointer w-full hover:opacity-90 rounded-lg">Sign in</button>
  <hr className="border border-white mb-4 mt-4"></hr>

        <p className="text-center text-white my-2">Already haven’t an account?<a className="text-sky-600" href="http://localhost:3000/register"> Register</a></p>
      </div>

    </div>
  </div>
  );
}
