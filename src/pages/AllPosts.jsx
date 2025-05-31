import React , {useEffect , useState} from 'react'
import Postcard from '../components/Postcard'
import dbServices from '../appwrite/config'
import Container from '../components/container/Container'
import {useOutletContext} from 'react-router-dom'

function AllPosts() {
    const [posts , setPosts] = useState([]);
    const {searchInput} = useOutletContext();
    const [filteredPosts, setFilteredPosts] = useState([])
    useEffect(()=>{
        dbServices.getAllPost().then(response => {
            if(response){
                setPosts(response.documents);
            }
        })
    },[])
    useEffect(()=>{
        if(!searchInput.trim()){
            setFilteredPosts(posts);
        }
        setFilteredPosts(posts.filter((post)=> post.title.toLowerCase().includes(searchInput.trim().toLowerCase()) || post.content.toLowerCase().includes(searchInput.trim().toLowerCase())));
    },[posts , searchInput])
  return (
    // <div className='w-full py-8'>
    //     <Container>
    //         <div className='flex flex-wrap'>
    //         {filteredPosts.length ? filteredPosts.map((post)=>(
    //            <div className='p-2 w-1/4' key={post.$id}>
    //                 <Postcard post = {post}/>
    //            </div>
    //         )): posts.length  ?  <div className="text-center w-full text-gray-500 text-lg mt-4">No results found</div>: null}
    //         </div>
    //     </Container>
    // </div>

    <div className="w-full py-8">
  <Container>
    <div className="flex flex-wrap -mx-2">
      {filteredPosts.length ? (
        filteredPosts.map((post) => (
          <div
            key={post.$id}
            className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
          >
            <Postcard post={post} />
          </div>
        ))
      ) : posts.length ? (
        <div className="text-center w-full text-gray-500 text-lg mt-4">
          No results found
        </div>
      ) : null}
    </div>
  </Container>
</div>

  )
}

export default AllPosts