import React,{useState , useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
export default function Protected({children , authentication = true}){
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status);
    const [loading , setLoading] = useState(true)
    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate('/login')
        }else if(!authentication && authStatus !== authentication){
            navigate('/');
        }
       setLoading(false);
    },[authStatus , authentication])
    return loading ? (
        <h1>Loading</h1>
    ): (<>{children}</>)
}