/* eslint-disable no-unused-vars */
// import React from 'react'

import { useCallback, useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import { useNavigate } from "react-router-dom";
import TravelStoryCard from "../../components/TravelStoryCard";
import { MdAdd } from 'react-icons/md'
import Modal from 'react-modal'
import axiosInstant from "../../utils/axios.constant"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEditTravels from "./AddEditTravels";

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const [allStories, setAllStories ] = useState([]);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null
  })

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

  ///make story favourite
  const upateisFav = async(data) => {
    const storyId = data._id;
    try{
       const response = await axiosInstant.patch(`/update-is-favourite/${storyId}`,
        {
          isFavourite: !data.isFavourite
        });

       if(response.data && response.data.story)  {
        toast.success('stories update successfully')
        getAllStories();
       }

    }
    catch(err) {
      console.log(err)
    }
  }
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

    <button
     className="w-16 h-16 flex items-center   rounded-full bg-primary hover:bg-cyan-400 fixed right-9 bottom-10"
     onClick={() => {
      setOpenAddEditModal({ isShown: true, type: 'add', data: null});

     }}
     >

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          }
        }}
        appElement={document.getElementById('root')}
        className='model-box'>
          <AddEditTravels 
           type={openAddEditModal.type}
           storyInfo={openAddEditModal.data}
           onClose={() => {
            setOpenAddEditModal({isShown: false, type: 'add', data: null})

           }}
           getAllStories={getAllStories}
           />
        </Modal>

      <MdAdd className='text-[52px] pl-2  text-white'/>
      </button>      

    <ToastContainer />
    </>
  )
}

export default Home
