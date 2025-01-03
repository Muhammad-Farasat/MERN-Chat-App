import React from "react";
import useConversation from "../../Zustand/useConversation";
import { useSocketContext } from "../../Context/socketContext";

function Conversation({ conversation, lastIdx, onUserClick }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;

  const { online } = useSocketContext();
  const isOnline = online.includes(conversation._id);
  // console.log("This is online", online);

  const handleClick = () =>{
    if (isSelected) {
      console.log("Already open");
      return
    }
    setSelectedConversation(conversation)
    onUserClick(conversation._id, conversation)
    console.log("Conversations component: ", conversation._id);
  }

  return (
    <>
      <div
        className={` conversation flex items-center py-3 px-4 space-x-4 cursor-pointer rounded-md transition-all duration-300 hover:bg-blue-500 hover:text-white ${
          isSelected ? "bg-blue-500 text-white" : "bg-white text-gray-800"
        }`}
        onClick={handleClick}
      >
       
        <div className={`avatar relative ${isOnline ? "online" : ""}`}>
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-400">
            <img
              src={conversation.profilePic}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div>
          <p className="text-base font-medium">{conversation.fullName}</p>
        </div>
      </div>

      
      {!lastIdx && <div className="h-px bg-gray-300 mx-4 my-2"></div>}
    </>
  );
}

export default Conversation;
