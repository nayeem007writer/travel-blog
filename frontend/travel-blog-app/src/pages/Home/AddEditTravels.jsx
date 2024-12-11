/* eslint-disable react/prop-types */

import { MdAdd, MdClose, MdOutlineDateRange, MdUpdate } from "react-icons/md"
import DateSelector from "../../components/input/DateSelector"

const AddEditTravels = ({
  storyInfo,
  type,
  onClose,
  getAllStories,
}) => {

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
           />
           <div className="my-3">
              <DateSelector/>
           </div>
        </div>
      </div>
    </div>
  )
}

export default AddEditTravels
