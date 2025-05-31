import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import Postcard from '../components/Postcard'
import dbServices from '../appwrite/config'
import { useSelector } from 'react-redux'
import {useOutletContext} from 'react-router-dom'

function Bookmarks() {
    const {searchInput} = useOutletContext();
    const [posts, setPosts] = useState([]);
    const [bookmarksPost , setBookmarksPost] = useState([]);
    const [loading , setLoading] = useState(true);
    const [filteredBookmarks , setFilteredBookmarks] = useState([]);
    const [searchActive , setSearchActive] = useState(false);
    const userData = useSelector(state => state.auth.userData);
    useEffect(() => {
        dbServices.getAllPost().then(response => {
            if (response) {
                setPosts(response.documents);
            }
        })
    }, []);

        useEffect(()=>{
          setBookmarksPost(posts.filter((post)=> post.Bookmarks.includes(userData.$id)));
         setTimeout(()=>{
            setLoading(false);
         } , 1000)
        },[posts]);

        useEffect(()=>{
            if(!searchInput.trim()){
                setFilteredBookmarks(bookmarksPost);
                setSearchActive(false);
                return;
            }
            setFilteredBookmarks(bookmarksPost.filter((post => post.title.toLowerCase().includes(searchInput.toLowerCase().trim()) || post.content.toLowerCase().includes(searchInput.toLowerCase().trim()))))
            setSearchActive(true);
        },[bookmarksPost, searchInput]);

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap -mx-2'>
                    {filteredBookmarks.length ? filteredBookmarks.map((post) => (
                        <div className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4' key={post.$id}>
                            <Postcard post={post} />
                        </div>
                    )) : !loading ? searchActive ? <div className="text-center w-full text-gray-500 text-lg mt-4">No Results Found</div>:<div className="text-center w-full text-gray-500 text-lg mt-4">No Bookmarks Posts</div>:null}
                </div>
            </Container>
        </div>
    )
}

export default Bookmarks