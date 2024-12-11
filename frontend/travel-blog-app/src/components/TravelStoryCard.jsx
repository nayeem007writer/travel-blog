/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaHeart } from "react-icons/fa6"
import { GrMapLocation } from "react-icons/gr";
import moment from 'moment'

const TravelStoryCard = ({
  imgUrl,
  title,
  story,
  date,
  visitedLocation,
  isFavourite,
  onEdit,
  onClick,
  onFavouriteClick

}) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white hover: shadow-lg hover: shadow-slate-200 transition-all ease-in-out relative cursor-pointer">
      <img src={imgUrl} alt={title}
      className="w-full h-56 object-cover rounded-lg"
      onClick={onClick}
      />

      <button className="w-19 h-19 flex items-center justify-center bg-white/40 rounded-lg border-white/38 absolute top-4 right-4" onClick={onFavouriteClick}>
        <FaHeart className={`icon-btn ${isFavourite ? "text-red-500": "text-white"}`}/>
      </button>
      <div className="p-4" onClick={onClick}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h6 className="text-sm font-medium">{title}</h6>
            <span className="text-xm text-slate-500">
              {date ? moment(date).format("Do MMM YYYY"): "-" }
            </span>
          </div>
        </div>
      <p className="text-xs text-slate-600 mt-2">{story?.slice(0,60)}</p>

      <div className=" inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded mt-2 mx2 py-1">
      <GrMapLocation className="text-xm"/>
      {visitedLocation}
      </div>
      </div>
    </div>
  )
}

export default TravelStoryCard
