// import React from 'react'

import {  useNavigate, } from "react-router-dom"
import PasswordInput from "../../components/passwordInput"
import { useState } from "react"
import { validateEmail } from "../../utils/helper"
import  axiosInstant  from "../../utils//axios.constant"
const SignUP = () => {
  const [ email, setEmail ] = useState("");
  const [ name, setName ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ error, setError ] = useState(null);

  const nevigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    
    if(!name) {
      setError('Please enter the name');
      return
    }
    if(!validateEmail(email)) {
      setError('Please enter the valid email address');
      return
    }


    if(!password) {
      setError("Please enter the valid password")
      return
    }
     setError("");

     try {
      const response = await axiosInstant.post("/signup", {
        email: email,
        fullName: name,
        password: password,
      });

      if(response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        nevigate("/dashboard");
      }
     }
     catch(err) {
      if(
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        setError(err.response.data.message)
      } else {
        setError("An upaccepted error occurred. please try agian ")
      }
     }
  }
  return (
    <div className="h-screen bg-primary bg-opacity-20 overflow-hidden relative">
      <div className="login-ui-box right-10 -top-40"/>
      <div className="login-ui-box bg-cyan-200 -bottom-40 right-1/2"/>
      <div className="container h-screen flex items-center  justify-center px-28 mx-auto">
        <div className="w-2/4 h-[90vh] flex items-end  bg-bg-signup-bg-img bg-cover bg-center rounded-lg p-10 z-50">
          <div className="bg-blend-saturation">
            <h4 className="text-opacity-90 text-5xl text-white font-semibold leading-[58px]">
              Join the <br />Adventure
            </h4>
            <p className="text-[15px] text-opacity-100 text-white leading-6 pr-7 mt-4">
              record your travel experiences and memories in your personal
              travel journey.
            </p>
          </div>
        </div>
        <div className="w-2/4 h-[90vh] bg-white rounded-r-lg relative p-16 shadow-lg shadoe-cyan-200-20">
          
          <form onSubmit={handleSignin}>
            <h4 className="text-2xl font-semibold mb-7">Sign Up</h4>

            <input 
            type="text" 
            placeholder="full name" 
            className="input-box"
            value={name} 
            onChange={({target}) => (setName(target.value))}
            />
            <input 
            type="text" 
            placeholder="Email" 
            className="input-box"
            value={email} 
            onChange={({target}) => (setEmail(target.value))}
            />


            <PasswordInput
             value={password} 
             onChange={({target}) => (setPassword(target.value))}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type='submit'className="btn-primary ">CREATE</button>
          
            <p className="text-xs text-slate-500 text-center font-bold my-4 mt-7">Or</p>

            <button type="submit" className="btn-primary btn-light" onClick={() => (nevigate("/signin"))}>
               login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}


export default SignUP
