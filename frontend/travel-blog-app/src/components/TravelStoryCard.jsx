/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaHeart } from "react-icons/fa6"
import { GrMapLocation } from 'react-icons/gr'

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
    </div>
  )
}

export default TravelStoryCard
