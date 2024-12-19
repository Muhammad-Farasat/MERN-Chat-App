import { useState, useEffect } from 'react';
import './App.css'
import Login from './Pages/Login/login.jsx';
import Signup from './Pages/Signup/signup.jsx'
import Home from './Pages/Home/home.jsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './Context/authContext.jsx';
import { Toaster } from 'react-hot-toast';
import SideBar from './Components/SideBar/SideBar.jsx';
import Chats from './Components/Chats/Chats.jsx';
import ConversationRoom from './Components/ConversationRoom/ConversationRoom.jsx';
import useConversation from './Zustand/useConversation.js';


function App() {

  const {authUser} = useAuthContext()
  const {selectedConversation, setSelectedConversation} = useConversation()
  const [showSidebar, setShowSidebar] = useState(true);

  
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <>

<div className="app hidden max-sm:flex  ">
      {/* Sidebar */}
      {showSidebar && (
        <div className="sidebar max-sm:w-full sm:w-1/4">
          <SideBar onUserClick={() => setShowSidebar(false)} />
        </div>
      )}

      {/* Conversation Room */}
      {!showSidebar &&  (
        <div className=" max-sm:w-full sm:w-3/4">
          <ConversationRoom  />
        </div>
      )}
    </div>


      <Router>
        <Routes>
          <Route path="/" element={ authUser ? <Home /> : <Navigate to={"/login"} />} />
          <Route path="/signup" element={ authUser ? <Navigate to={"/"} /> : <Signup />} />
          <Route path="/login" element={ authUser ? <Navigate to={"/"} /> : <Login />} />
        </Routes>
      </Router>
      <Toaster/>
      
    </>
  )
}

export default App
