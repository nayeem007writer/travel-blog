/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react"
import { FaRegFileImage } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

const ImageSelector = ({image , setImage, handleDeleteImg}) => {
    const inputRef = useRef(null)
    const [ previewUrl, setPreviewUrl ] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if(file) {
            setImage(file)
        }
    };
    const onChooseFile = () => {
        inputRef.current.click();
    }

    const handleRemoveImage = () => {
        setImage(null)
        handleDeleteImg()
    }

    useEffect(() => {
        if(typeof image==='string') {
            setPreviewUrl(image)
        }
        else if(image) {
            setPreviewUrl(URL.createObjectURL(image));
        }

        else{
            setPreviewUrl(null)
        }
        return () => {
            if(previewUrl &&  typeof previewUrl === 'string' && !image) {
                URL.revokeObjectURL(previewUrl);
            }
        }
    },[image])

  return (
    <div>
      <input 
      type="file" 
      accept="image/*"
      onChange={handleImageChange} 
      className="hidden"
      ref={inputRef} />

      {!image?<button className="w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50"
      onClick={()=> onChooseFile()}
      >
        <div className="w-24 h-24  bg-cyan-50 rounded-full border-cyan-500">
            <FaRegFileImage  className="text-xl text-cyan-500 mx-auto"/>
            <br></br>
            <p className="text-sm text-slate-500">
                Browse image files to upload
            </p>
        </div>
      </button>:
   (    <div className="w-full relative">
        <img src={previewUrl} alt="loading.." className="w-full h-[300px] object-cover rounded-lg"/>
        <button 
       className="btn-small btn-delete absolute top-2 right-2"
       onClick={handleRemoveImage}
       >

        <MdDeleteOutline className="text-lg"/>
       </button>
       </div>)
      }
    </div>
)}

export default ImageSelector
