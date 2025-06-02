
// import './App.css'
import { login, logout } from './store/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/auth'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ClipLoader from 'react-spinners/ClipLoader'
import useSpinner from './hooks/useSpinner'
import { useState } from 'react'
import { set } from 'react-hook-form'
import Message from './components/Message'


function App() {
  const loading = useSpinner();
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const show = useSelector(state => state.message.show);
  const type = useSelector(state => state.message.type);
  const text = useSelector(state => state.message.text);
  useEffect(() => {
    authService.currUser().then((userData) => {
      if (userData) {


        dispatch(login(userData));
      }
      else {
        dispatch(logout());
      }
    })
  }, []);




  return (

    // Responsive Design

    <div className="min-h-screen flex flex-col bg-gray-400">
      <Header searchInput={searchInput} setSearchInput={setSearchInput} />
      {show && <Message type={type} duration={2000}>{text}</Message>}
      <main className="flex-grow bg-gray-300 px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader color="#123abc" size={60} />
          </div>
        ) : (
          <Outlet context={{ searchInput }} />
        )}
      </main>

      <Footer />
    </div>

  )



}

export default App
