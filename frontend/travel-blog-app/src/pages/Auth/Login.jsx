// import React from 'react'

import { Navigate } from "react-router-dom"

const Login = () => {
  return (
    <div className="h-screen bg-primary bg-opacity-20 overflow-hidden relative">
      <div className="container h-screen flex items-center  justify-center px-28 mx-auto">
        <div className="w-2/4 h-[90vh] flex items-end  bg-bg-login-bg-img bg-cover bg-center rounded-lg p-10 z-50">
          <div className="bg-blend-saturation">
            <h4 className="text-opacity-90 text-5xl text-white font-semibold leading-[58px]">
              Capture Your <br />journey
            </h4>
            <p className="text-[15px] text-opacity-100 text-fuchsia-950 leading-6 pr-7 mt-4">
              record your travel experiences and memories in your personal
              travel journey.
            </p>
          </div>
        </div>
        <div className="w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadoe-cyan-200-20">
          <form onSubmit={()=> {}}>
            <h4 className="text-2xl font-semibold mb-7">Sign In</h4>
            <input type="text" placeholder="Email" className="input-box" />

            <button type='submit'className="btn-primary">LOGIN</button>
            <p className="text-xs text-slate-500 text-center my-4">Or</p>
            <button type="submit" className="" onClick={() => {Navigate('/signup')}}>
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
