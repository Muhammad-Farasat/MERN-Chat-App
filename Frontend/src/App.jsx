import { useState, useEffect } from "react";
import "./App.css";
import Login from "./Pages/Login/login.jsx";
import Signup from "./Pages/Signup/signup.jsx";
import Home from "./Pages/Home/home.jsx";
import { Routes, Route, Navigate } from "react-router-dom"; // No need for BrowserRouter here
import { useAuthContext } from "./Context/authContext.jsx";
import { Toaster } from "react-hot-toast";
import SmallPage from "./Pages/SmallPage/SmallPage.jsx";

function App() {
  const { authUser } = useAuthContext();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div>
        <Routes>
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <Signup />}
          />

          {isSmallScreen && (
            <Route path="*" element={<SmallPage />} />
          )}

          {!isSmallScreen && (
            <>
              <Route
                path="/"
                element={authUser ? <Home /> : <Navigate to="/login" />}
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </div>

      <Toaster />
    </>
  );
}

export default App;
