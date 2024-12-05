/* eslint-disable no-unused-vars */
// import React from 'react'

import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import { useNavigate } from "react-router-dom";
import axiosInstant from "../../utils/axios.constant";

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const [allStories, setAllStories ] = useState({});

  const getAllStories = async () => {
    try{
      const response = await axiosInstant.get('/get-all-story');
      if(response.data && response.data.stories) {
        setAllStories(response.data.stories);
      } 
    } catch (err) {
      console.log(`unexpected error araise ,please try agian ${err}`)
    }
  } 

  const getUserInfo = async () => {
    try{
      const response = await axiosInstant.get('/get-user');

      if(response.data.user && response.data) {
        console.log(response)
        setUserInfo(response.data.user)
      }
    }
    catch(err) {
      if(err.response.status ===401) {
        localStorage.clear();
        navigate("/signin")
      }
    }
  }

  useEffect(()=> {
    getAllStories()
    getUserInfo();
    return () => {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])



  return (
    <>
    <Navbar userInfo= {userInfo}/>
    <div className="container mx-auto py-10">
      <div className="flex- gap-7">
        <div className="flex-1"></div>
        <div className="w-[320px]"></div>
      </div>
    </div>
    </>
  )
}

export default Home
