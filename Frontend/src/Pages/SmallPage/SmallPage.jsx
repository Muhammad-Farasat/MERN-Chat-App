import React, { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import SideBar from "../../Components/SideBar/SideBar.jsx";
import SmallConversationPage from './SmallConversationPage.jsx'
import useConversation from "../../Zustand/useConversation.js";
import { useAuthContext } from "../../Context/authContext.jsx";
import Login from "../Login/login.jsx";

const SmallPage = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  useEffect(() => {
    // Restore selected conversation from localStorage when the app loads
    if (!selectedConversation) {
      const storedConversation = localStorage.getItem("selectedConversation");
      if (storedConversation) {
        setSelectedConversation(JSON.parse(storedConversation));
      }
    }
  }, [selectedConversation, setSelectedConversation]);

  return (
    <div className="app hidden max-sm:flex bg-gradient-to-br from-blue-200 to-blue-800">
      <Routes>
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />

        {authUser ? (
          <>
            <Route
              path="/"
              element={
                <SideBar
                  onUserClick={(conversationId, conversation) => {
                    setSelectedConversation(conversation)
                    navigate(`/conversation/${conversationId}`);
                  }}
                />
              }
            />
            <Route
              path="/conversation/:id"
              element={<SmallConversationPage />}
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </div>
  );
};

export default SmallPage;
