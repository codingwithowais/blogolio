import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Container from '../container/Container'
import LogoutBtn from "./LogutBtn"
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../Logo'

function Header({ searchInput, setSearchInput }) {
  const authStatus = useSelector(state => state.auth.status)
  const navigate = useNavigate();


  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },

    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,

    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: "Bookmarks",
      slug: "/bookmarks",
      active: authStatus
    }
  ]
  return (


    // Responsive Design
    <header className="sticky top-0 z-[999] py-3 shadow bg-gray-500 w-full">
      <Container>
        <nav className="flex flex-col md:flex-row md:items-center w-full gap-4 md:gap-8 justify-between">
          {/* Logo and Search */}
          <div className="flex flex-col md:flex-row w-full items-start md:items-center gap-2 md:gap-4">
            <Link to="/" className="w-full md:w-auto flex justify-center md:justify-start">
              <Logo width="60px" />
            </Link>
            <div className="relative w-full sm:w-72 md:w-80 lg:w-96">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              />
            </div>
          </div>


          {/* Navigation */}
          <ul className="flex flex-wrap gap-4 items-center justify-center md:justify-end w-full md:w-auto">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>

      </Container>
    </header>



  )
}

export default Header