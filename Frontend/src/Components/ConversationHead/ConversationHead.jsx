import React from "react";
import useConversation from '../../Zustand/useConversation';


function ConversationHead() {
    const { selectedConversation } = useConversation();
    
    
    
    return (
    <>
      <div className="head">
        <div className="flex items-center mt-4 space-x-8">
          <div className="avatar">
            <div className="w-14 rounded-full">
              <img src={selectedConversation.profilePic} alt="Profile" />
            </div>
          </div>
          <div className="font-bold text-xl">
            <p>{selectedConversation.fullName}</p>
          </div>
        </div>
        <div className="divider"></div>
      </div>
    </>
  );
}

export default ConversationHead;
