import React,{useState , useEffect} from 'react'
import Container from '../components/container/Container'
import AddPost from '../components/post-form/PostForm'
import { useNavigate , useParams } from 'react-router-dom'
import dbServices from '../appwrite/config'

function EditPost() {
    const [post , setPost] = useState(null);
    const navigate = useNavigate();
    const {slug} = useParams();
    useEffect(()=>{
        if(slug){
            dbServices.getSinglePost(slug).then(res => {
                if(res){
                    
                    setPost(res);
                }else{
                    navigate('/');
                }
            })
        }else{
            navigate('/');
        }
    }, [slug , navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <AddPost post = {post}/>
        </Container>
    </div>
  ): null
}

export default EditPost