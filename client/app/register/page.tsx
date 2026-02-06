'use client';

import { redirect } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useState } from 'react';


export default function Home() {
  if (global.window?.localStorage.getItem('token')) {
    redirect('http://localhost:3000/')
  }
  const resultRef = useRef();
  const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const LOGIN_REGEXP = /^[a-zA-Z0-9]+$/;
  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const register = () => {
    if (!password && !login && !email && !passwordRepeat) {
      resultRef.current.innerHTML = "Fields must not be empty!";
      return
    }
    if (password != passwordRepeat) {
      resultRef.current.innerHTML = "Passwords don't match";
      return
    }
    if (!email.match(EMAIL_REGEXP)) {
      resultRef.current.innerHTML = "Email must match template: email@email.com";
      return
    }
    if (!login.match(LOGIN_REGEXP)) {
      resultRef.current.innerHTML = `Login must not include unique symbols like: ! @ # $ % ^ & * ( ) ~ " № ; : ? = + - / , \ | _`;
      return
    }

    fetch('http://localhost:8080/api/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: login,
        email: email,
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
          <h1 className="text-center text-white text-3xl">Register</h1>
          <p className="text-center text-white mt-4">Please fill in this form to create an account</p>
          <hr className="border-white border mb-6" />

          <label className="text-white pl-1"><b>Login</b></label>
          <input type="text" placeholder="Enter Login" required className="w-full border-none h-10 mt-1 mb-5 bg-[#535263] rounded-lg text-white pl-3" onChange={e => setLogin(e.target.value)} />

          <label className="text-white pl-1"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" required className="w-full border-none h-10 mt-1 mb-5 bg-[#535263] rounded-lg text-white pl-3" onChange={e => setEmail(e.target.value)} />

          <label className="text-white pl-1"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" required className="w-full border-none h-10 mt-1 mb-5 bg-[#535263] rounded-lg text-white pl-3" onChange={e => setPassword(e.target.value)} />

          <label className="text-white mt-9 pl-1"><b>Repeat Password</b></label>
          <input type="password" placeholder="Repeat Password" required className="w-full  border-none h-10 mt-1 mb-4 bg-[#535263] rounded-lg text-white pl-3" onChange={e => setPasswordRepeat(e.target.value)} />


          <p className="text-center text-white" ref={resultRef}></p>
          <button onClick={register} className="bg-[#00b6f6] text-white pt-4 pb-5 mt-3 mb-0 border-none cursor-pointer w-full hover:opacity-90 rounded-lg">Register</button>
          <hr className="border border-white mb-4 mt-4"></hr>


          <p className="text-center text-white my-2">Already have an account?<a className="text-sky-600" href="http://localhost:3000/sign"> Sign in</a></p>
        </div>

      </div>
    </div>
  );
}
