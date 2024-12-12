import './App.css'
import Login from './Pages/Login/login.jsx';
import Signup from './Pages/Signup/signup.jsx'
import Home from './Pages/Home/home.jsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './Context/authContext.jsx';
import { Toaster } from 'react-hot-toast';

function App() {

  const {authUser} = useAuthContext()

  return (
    <>

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
