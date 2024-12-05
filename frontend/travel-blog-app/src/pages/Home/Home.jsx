/* eslint-disable no-unused-vars */
// import React from 'react'

import { useCallback, useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import { useNavigate } from "react-router-dom";
import TravelStoryCard from "../../components/TravelStoryCard";
import axiosInstant from "../../utils/axios.constant"


const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const [allStories, setAllStories ] = useState([]);

  const getAllStories = async () => {
    try{
      // const response = await axiosInstant.get("/get-all-story",)
      const response = await axiosInstant.get('/all-story');
      console.log(response)
      if(response.data.stories&& response.data) {
        setAllStories(response.data.stories);
      } 
      else {
        console.log("No stories found in the response.");
      }
    } catch (err) {
      console.log(`unexpected error araise ,please try agian ${err}`)
    }
  }

  const getUserInfo = async () => {
    try{
      const response = await axiosInstant.get('/get-user',);

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

  const handleEdit = (data) => {}
  const handleViewStory =(data) => {}
  const upateisFav = async(data) => {}
  useEffect(()=> {
    getAllStories();
    getUserInfo();
    return () => {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])



  return (
    <>
    <Navbar userInfo= {userInfo}/>
    <div className="container mx-auto py-10">
      <div className="flex gap-7">
        <div className="flex-1">
          {allStories.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {allStories.map((item) => {
                return (
                  <TravelStoryCard 
                  
                  key={item._id}
                  imgUrl={item.imageUrl}
                  title={item.title}
                  story={item.story}
                  date={item.visitedDate}
                  visitedLocation= {item.visitedLocation}
                  isFavourite= {item.isFavourite}
                  onEdit={() => handleEdit(item)}
                  onClick={()=> handleViewStory(item)}
                  onFavouriteClick={()=> upateisFav(item)}
                  />
                )
              })}
            </div>
          ):
          (<>Empty Card Here</>)
          }
        </div>
        <div className="w-[320px]"></div>
      </div>
    </div>

    </>
  )
}

export default Home
