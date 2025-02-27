import React, { useEffect } from "react";
import useConversation from "../../Zustand/useConversation";
import { useAuthContext } from "../../Context/authContext";
import ConversationHead from "../ConversationHead/ConversationHead";
import Chats from "../Chats/Chats";
import ChatsInput from "../ChatsInput/ChatsInput";
import Conversation from "../Conversation/Conversation";

function ConversationRoom() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  useEffect(() => {
    
    return ()=>setSelectedConversation(selectedConversation)
    
  }, [setSelectedConversation]);
  

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedConversation(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setSelectedConversation]);

  return (
    <>
      {!selectedConversation ? (
        <div className="max-sm:h-screen conversation_room flex flex-col items-center justify-center h-full w-full text-center bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg">
          <p className="text-4xl text-gray-800">
            Welcome <br />
            <span className="font-bold text-blue-500">{`${authUser.user.fullName}`}</span>
          </p>
        </div>
      ) : (
        <div className=" max-sm:h-screen flex flex-col w-full h-full overflow-y-auto bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg">            
            <ConversationHead />

          <div className="flex-grow overflow-y-auto">
            <Chats />
          </div>

          
          <div className="sticky bottom-0">
            <ChatsInput />
          </div>
        </div>
      )}
    </>
  );
}

export default ConversationRoom;
