import React, { useDebugValue, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import dbServices from '../appwrite/config'
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { useSelector } from 'react-redux'
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { formatDistanceToNow } from 'date-fns'
import { MessageCircle } from 'lucide-react'
import commentServices from '../appwrite/comments';



function Postcard({ post: { $id, title, featuredImage, likes, content, userId, status, Bookmarks, $createdAt, $updatedAt, username } }) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const userData = useSelector(state => state.auth.userData);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [likesArray, setLikesArray] = useState(likes);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarksArray, setBookmarksArray] = useState(Bookmarks);
  const [bookmarksCount, setBookmarksCount] = useState(Bookmarks.length);
  const [comments, setComments] = useState(0);

  const bookmarkHandle = (e) => {
    e.preventDefault();
    if (!userData) {
      navigate('/login');
      return;
    }
    let updatedBookmarks = [];
    if (isBookmarked) {
      updatedBookmarks = bookmarksArray.filter((id) => id != userData.$id);
      setBookmarksArray(updatedBookmarks);
    } else {
      updatedBookmarks = [...bookmarksArray, userData.$id];
      setBookmarksArray(updatedBookmarks);
    }
    setBookmarksCount((prev) => isBookmarked ? prev - 1 : prev + 1);
    setIsBookmarked(!isBookmarked);
    dbServices.updatePost($id, { title, content, featuredImage, userId, status, likes, Bookmarks: updatedBookmarks }).then((res) => {
    })
  }

  const handleClick = (e) => {
    e.preventDefault();
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
    dbServices.updatePost($id, { title, content, featuredImage, userId, status, likes: updatedLikes, Bookmarks }).then((res) => {
    })
  }
  useEffect(() => {
    if (userData && likesArray.includes(userData.$id)) {
      setIsLiked(true);
    }
    if (userData && bookmarksArray.includes(userData.$id)) {
      setIsBookmarked(true);
    }
    commentServices.getAllComments($id).then(res => {
      if (res) {
        setComments(res.documents.length);
      }
    })
  }, []);

  return (

    // Responsive Component
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 space-y-4">

        {/* Header: Username & Time */}
        <div className="flex flex-wrap justify-between items-center gap-2">
          <p className="text-sm font-medium text-gray-700">Posted by {username}</p>
          <div className="text-sm text-gray-500 text-right">
            {formatDistanceToNow(new Date($createdAt))} ago
            {/* Uncomment if showing edit time */}
            {/* $updatedAt !== $createdAt && (
          <span className="ml-2 text-gray-400">
            • Edited {formatDistanceToNow(new Date($updatedAt))} ago
          </span>
        ) */}
          </div>
        </div>

        {/* Featured Image */}
        <div className="w-full">
          <img
            src={dbServices.previewImage(featuredImage)}
            alt={title}
            className="rounded-xl object-cover w-full max-h-[300px] sm:max-h-[400px]"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold break-words">{title}</h2>

        {/* Footer Actions */}
        <div className="flex flex-wrap justify-between items-center gap-4 mt-2">

          {/* Like Button */}
          <button onClick={handleClick} className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isLiked ? "red" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              className={`w-6 h-6 transition-transform duration-200 ease-in-out 
            ${isLiked ? "text-red-500" : "text-gray-500"} 
            ${isAnimating ? "scale-125 animate-ping-fast" : ""}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.8 6.2a5.5 5.5 0 00-9.3-1.6l-.5.6-.5-.6A5.5 5.5 0 002.2 6.2 5.5 5.5 0 003.7 14l7.8 7.8 7.8-7.8a5.5 5.5 0 002.5-7.8z"
              />
            </svg>
            <span className="text-sm text-gray-600">{likesCount}</span>
          </button>

          {/* Comments */}
          <Link
            to={`/post/${$id}`}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{comments}</span>
          </Link>

          {/* Bookmark Button */}
          <button
            onClick={bookmarkHandle}
            className={`text-xl transition-all duration-300 ${isBookmarked ? "text-yellow-500" : "text-gray-400"
              } hover:scale-110 flex items-center gap-1`}
            title={isBookmarked ? "Remove Bookmark" : "Add to Bookmarks"}
          >
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            <span className="text-sm text-gray-600">{bookmarksCount}</span>
          </button>
        </div>
      </div>
    </Link>



  )
}

export default Postcard