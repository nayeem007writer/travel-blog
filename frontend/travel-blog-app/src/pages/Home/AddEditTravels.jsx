/* eslint-disable react/prop-types */

import { MdAdd, MdClose, MdOutlineDateRange, MdUpdate } from "react-icons/md"
import DateSelector from "../../components/input/DateSelector"
import { useState } from "react"
import ImageSelector from "../../components/input/ImageSelector";
import TagInput from "../../components/input/TagInput";

const AddEditTravels = ({
  storyInfo,
  type,
  onClose,
  getAllStories,
}) => {

  const [visitedDate, setVisitedDate] = useState(null);
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [visitedLocation, setVisitedLocation] = useState("");
  const [storyImg, setStoryImg] = useState(null);

  const handleDeleteImg = async () => {}
  const handleAddUpdateClick = () => {

  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate700">
          {type === 'edit'? 'Add Story': 'Update Story'}
        </h5>
        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            { type==='edit' ?<button className="btn-small" onClick={()=> {}}>
              <MdAdd className="text-lg"/> ADD STORY
            </button>: <>
            <button className="btn-small" onClick={handleAddUpdateClick}>
              <MdUpdate className="text-lg"/>UPDATE STORY
            </button>
            {/* <button className="btn-small btn-delete" onClick={onClose}>
              <MdDeleteOutline  className="text-xl"/>DELETE STORY
            </button> */}
            </>}

            <button className="" onClick={()=>{}}>
              <MdClose className="text-xl text-slate-400" />
            </button>

          </div>
        </div>
      </div>
      
      <div>
        <div className="flex flex-col gap-2 pt-4">
          <label className="input-label">TITLE</label>
          <input
           type="text"
           className="text-2xl text-slate-950 outline-none"
           placeholder="A day at the great wall"
           value={title}
           onChange={({target}) => setTitle(target.value)}
           />
           <div className="my-3">
              <DateSelector date={visitedDate} setDate={setVisitedDate}/>
           </div>

           <ImageSelector image={storyImg} handleDeleteImg={handleDeleteImg} setImage={setStoryImg}/>

           <div className="flex flex-col gap-2 pt-4">
           <label className="input-label">STORY</label>
           <textarea name="" type='text' id=""
           className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
           rows={10}
           value={story}
           onChange={({target}) => setStory(target.value) }
           >

           </textarea>
           </div>
           <div className="pt-4 flex flex-col gap-2 ">
              <label className="input-label">VISITED LOCATION</label>
          <input
           type="text"
           className="text-sm text-slate-950 outline-none"
           placeholder="A day at the great wall"
           value={visitedLocation}
           onChange={({target}) => setVisitedLocation(target.value)}
           />
              
           </div>
        </div>
      </div>
    </div>
  )
}

export default AddEditTravels
