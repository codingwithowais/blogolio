import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import dbServices from '../appwrite/config'
import Button from '../components/Button'
import Container from '../components/container/Container'
import parse from 'html-react-parser'
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import {formatDistanceToNow} from 'date-fns'
import commentServices from '../appwrite/comments'
import { useDispatch } from 'react-redux'
import {showMessage} from '../store/messageSlice'



function Post() {
    const dispatch = useDispatch();
    const [post, setPost] = useState(null);
    const [commentInput , setCommentInput] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [likesArray, setLikesArray] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [bookmarksArray , setBookMarksArray] = useState([]);
    const [bookmarksCount , setBookmarksCount] = useState(0);
    const [isBookmarked , setIsBookmarked] = useState(false);
    const [comments , setComments] = useState([]);

    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    const isAdmin = userData && post ? userData.$id === post.userId : false;
      const bookmarkHandle = (e)=>{
    e.preventDefault();
    if(!userData){
      navigate('/login');
      return;
    }
    let updatedBookmarks = [];
    if (isBookmarked) {
      updatedBookmarks = bookmarksArray.filter((id) => id != userData.$id);
      setBookMarksArray(updatedBookmarks);
    } else {
      updatedBookmarks = [...bookmarksArray, userData.$id];
      setBookMarksArray(updatedBookmarks);
    }
    setBookmarksCount((prev)=> isBookmarked ? prev-1: prev+1);
    setIsBookmarked(!isBookmarked);
    dbServices.updatePost($id, { title, content, featuredImage, userId, status, likes , Bookmarks: updatedBookmarks }).then((res) => {
    })
  }
    const handleClick = () => {
        if (!userData) {
            navigate('/login');
            return;
        }
        let updatedLikes = [];
        if (isLiked) {
            updatedLikes = likesArray.filter((id) => id != userData.$id);
            setLikesArray(updatedLikes);
        } else {
            updatedLikes = [...likesArray, userData.$id];
            setLikesArray(updatedLikes);
            setIsAnimating(true);
            setTimeout(() => {
                setIsAnimating(false);
            }, 500)
        }
        setLikesCount((prev) => isLiked ? prev - 1 : prev + 1);
        setIsLiked(!isLiked);
        dbServices.updatePost(slug, { ...post, likes: updatedLikes }).then((res) => {
        })
    }
    useEffect(() => {
        if (slug) {
            dbServices.getSinglePost(slug).then(res => {
                if (res) {
                    setPost(res);
                    console.log(dbServices.previewImage(post.featuredImage));
                } else {
                    navigate('/');
                }
            })
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    useEffect(() => {
        console.log(userData);
        
        if (post && userData && post.likes.includes(userData.$id)) {
            setIsLiked(true);
        }
        else {
            setIsLiked(false);
        }
        if(post && userData && post.Bookmarks.includes(userData.$id)){
            setIsBookmarked(true);
        }
        if (post) {
            setLikesCount(post.likes.length);
            setLikesArray(post.likes);
            setBookmarksCount(post.Bookmarks.length);
            setBookMarksArray(post.Bookmarks);
        }
    }, [post]);

    useEffect(()=>{
        commentServices.getAllComments(slug).then((res)=>{
            if(res){
                setComments(res.documents);
            }
        })
    },[post]);

    const deletePost = () => {
        dbServices.deletePost(slug).then(res => {
            if (res) {
                dbServices.deleteImage(post.featuredImage).then(response => {
                    if (response) {
                        dispatch(showMessage({type:"success" , text: "Post deleted successfully"}))
                        navigate('/');
                    }
                })
            }
        })
    }

 

    const handleAddComment = ()=>{
        commentServices.addComment({postId : slug , userId : userData.$id , username: userData.name , content: commentInput}).then((res)=>{
            console.log(res);
            setComments((prev)=> [...prev , res]);
        }).catch((err)=>{
            console.log(err); 
        }).finally(setCommentInput(""));
    }

    return post ? (
        <div className='py-8'>
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={dbServices.previewImage(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                    {isAdmin && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}

                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
                <div className='flex flex-wrap justify-between'>

                    <button onClick={handleClick} className="flex items-center space-x-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={isLiked ? "red" : "none"}
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            className={`w-6 h-6 transition-transform duration-200 ease-in-out 
                                  ${isLiked ? "text-red-500" : "text-gray-500"}
                                  ${isAnimating ? "scale-125 animate-ping-fast" : ""}
                                `}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.8 6.2a5.5 5.5 0 00-9.3-1.6l-.5.6-.5-.6A5.5 5.5 0 002.2 6.2 5.5 5.5 0 003.7 14l7.8 7.8 7.8-7.8a5.5 5.5 0 002.5-7.8z"
                            />
                        </svg>
                        <span className="text-sm text-gray-600">{likesCount}</span>
                    </button>
                            <div className='text-sm text-gray-500 flex flex-col items-center'>
                                Posted {formatDistanceToNow(new Date(post.$createdAt))} ago
                      {post.$updatedAt !== post.$createdAt && (
                        <span className="ml-2 text-gray-300">
                          • Edited {formatDistanceToNow(new Date(post.$updatedAt))} ago
                        </span>
                      )}
                        </div>
                    <button
                        onClick={bookmarkHandle}
                        className={`text-xl transition-all duration-300 ${isBookmarked ? "text-yellow-500" : "text-gray-400"
                            } hover:scale-110 flex items-center space-x-1 `}
                        title={isBookmarked ? "Remove Bookmark" : "Add to Bookmarks"}
                    >
                        {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                        <span className="text-sm text-gray-600">{bookmarksCount}</span>

                    </button>
                </div>


                <div className="mt-10">
 {userData && <h3 className="text-xl font-semibold mb-4">Comments</h3>}

  {/* Comment Input */}
   {userData && <div className="flex items-start gap-3 mb-6">
    {/* <img 
      src={currentUser?.avatar || '/default-avatar.png'} 
      alt="User Avatar" 
      className="w-10 h-10 rounded-full object-cover" 
    />  */}
    <textarea 
      value={commentInput}
      onChange={(e) => setCommentInput(e.target.value)}
      placeholder="Write a comment..."
      className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      rows={3}
    ></textarea>
    <button 
      onClick={handleAddComment}
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
    >
      Comment
    </button>
  </div>}

  <div className="mt-6 mb-4 border-b pb-2">
   <h3 className="text-lg font-semibold text-gray-800">
    {comments.length ? comments.length === 1 ? 'Comment' : 'Comments': "No Comments Yet"} 
  </h3> 
</div>


  {/* Comments List */}
  <div className="space-y-6">
    {comments.map(comment => (
      <div key={comment.$id} className="flex gap-3">
        {/* <img 
          src={comment.userAvatar || '/default-avatar.png'} 
          alt="User" 
          className="w-10 h-10 rounded-full object-cover" 
        /> */}
        <div className="bg-gray-100 p-3 rounded-md w-full relative">
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold text-gray-800">
              {comment.username || "Anonymous"}
            </p>
            {/* <span className="text-xs text-gray-500">{formatDistanceToNow(new Date(comment.createdAt))}</span> */}
          </div>
          <p className="mt-1 text-gray-700">{comment.content}</p>
          
          {comment.userId === userData?.$id && (
            <button 
     onClick={() => {
  commentServices.deleteComment(comment.$id)
    .then((success) => {
      if (success) {
        setComments(prev => prev.filter(note => note.$id !== comment.$id));
      } else {
        console.error("Failed to delete comment");
        // Optionally show error UI here
      }
    })
    .catch((err) => {
      console.error("Delete comment error:", err);
      // Optionally show error UI here
    });
}}
              className="absolute top-2 right-2 text-sm text-red-500 hover:underline"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
</div>


            </Container>

        </div>
    ) : null
}

export default Post