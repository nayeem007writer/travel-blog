/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from 'react'
import { useNavigate } from 'react-router-dom';
import LOGO from '../assets/black_on_white.svg';
import ProfileInfo from './ProfileInfo';


const Navbar = (props) => {
    const isToken = localStorage.getItem('token')
    const navigate = useNavigate()
    const onLogout = () => {
        localStorage.clear()
        navigate('/signin');
    }
   console.log(props)
  return (

    <div className='bg-white flex items-center justify-between px-6 drop-shadow sticky top-0 z-10'>
      <img className='size-14 px-100' src={LOGO} alt="" />

      {isToken && (<ProfileInfo userInfo={props.userInfo} onLogout={onLogout}/>)}
      {/* <h2>{props.userInfo ? props.userInfo.name : 'Loading...'}</h2> */}

    </div>
  )
}

export default Navbar

