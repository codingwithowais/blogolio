import {useState , useEffect} from 'react'
import {useLocation} from 'react-router-dom'

function useSpinner(delay = 500){
    const location = useLocation();
    const [loader , setLoader] = useState(false);
    useEffect(()=>{
        setLoader(true);
        let interval = setTimeout(()=>{
            setLoader(false);
        }, delay)
        return ()=>{
            clearTimeout(interval);
        }
    },[location.pathname])
    return loader;
}
export default useSpinner;