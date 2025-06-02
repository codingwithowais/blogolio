import React, { useEffect, useState } from 'react'
import {CheckCircle  , XCircle} from 'lucide-react'
import { useDispatch } from 'react-redux';
import {hideMessage} from '../store/messageSlice'

function Message({children , duration = 2000 , type = "success"}) {
   const dispatch = useDispatch();
    useEffect(()=>{
        const timeOut = setTimeout(()=>{
            dispatch(hideMessage());
        }, duration);
        return ()=>{
            clearTimeout(timeOut);
        }      
    },[duration])
    const baseStyles = "flex items-center gap-2 px-4 py-3 rounded-xl text-sm md:text-base shadow-md transition-all";
    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-600" />,
        error: <XCircle className="w-5 h-5 text-red-600" />,
        info: <span className="w-2 h-2 bg-blue-500 rounded-full" />
    }
    const types = {
        success: "bg-green-100 text-green-800 border border-green-300",
        error: "bg-red-100 text-red-800 border border-red-300",
        info: "bg-blue-100 text-blue-800 border border-blue-300",
    }
  return (
  <div className={`${baseStyles} ${types[type]}`}>
    {icons[type]} 
    <span className='flex-1 text-center'>{children}</span>
  </div>)
}

export default Message