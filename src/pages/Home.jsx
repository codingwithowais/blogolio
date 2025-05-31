import React, { useState, useEffect } from 'react'
import Container from '../components/container/Container'
import dbServices from '../appwrite/config'
import Postcard from '../components/Postcard'
import { useOutletContext } from 'react-router-dom'


function Home() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const { searchInput } = useOutletContext();
    const fetchPosts = async () => {
        const response = await dbServices.getAllPost();
        if (response) {
            setPosts(response.documents);
        }
    }
    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        if (!searchInput.trim()) {
            setFilteredPosts(posts);
        }
        setFilteredPosts(posts.filter((post) => post.title.toLowerCase().includes(searchInput.trim().toLowerCase()) || post.content.toLowerCase().includes(searchInput.trim().toLowerCase())));
    }, [posts, searchInput])
    return (
    // <div className='py-8 w-screen'>
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

    <div className="py-8 w-full">
  <Container>
    <div className="flex flex-wrap -mx-2">
      {filteredPosts.length ? (
        filteredPosts.map((post) => (
          <div
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
            key={post.$id}
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

export default Home