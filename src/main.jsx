import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store.js'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllPosts from './pages/AllPosts.jsx'
import Post from './pages/Post.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import AuthLayout from './components/authLayout.jsx'
import Bookmarks from './pages/Bookmarks.jsx'
import TopBar from './components/LoadingBar.jsx'
import { useState } from 'react'
import ForgetPassword from './pages/ForgetPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      },
      {
        path: "/signup",
        element: <AuthLayout authentication={false}>
          <Signup />
        </AuthLayout>
      },
      {
        path: '/add-post',
        element: <AuthLayout authentication>
          <AddPost />
        </AuthLayout>
      },
      {
        path: '/all-posts',
        element: <AuthLayout authentication>
          <AllPosts  />
        </AuthLayout>
      },
      {
        path: '/edit-post/:slug',
        element: <AuthLayout authentication>
          <EditPost />
        </AuthLayout>
      },
      {
        path: '/bookmarks',
        element: <AuthLayout authentication>
          <Bookmarks/>
        </AuthLayout>
      },
      {
        path: 'post/:slug',
        element: <Post />
      },
      {
        path: '/forget-password',
        element: <ForgetPassword/>
      },
      {
        path: '/reset-password',
        element: <ResetPassword/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>

      <RouterProvider router={router} />

    </Provider>
  </StrictMode>,
)
