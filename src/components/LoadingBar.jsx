import React, {useEffect, useRef} from 'react'
import {useLocation} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

function TopBar() {
    const location = useLocation();
    const ref = useRef(null);
    useEffect(()=>{
        ref.current?.continuousStart();
        const interval = setTimeout(()=>{
            ref.current?.complete();
        } , 400)
        return ()=>{
            clearTimeout(interval);
        }
    },[location])
  return (
    <LoadingBar height={3} color="#3b82f6" ref={ref}/>
  )
}

export default TopBar