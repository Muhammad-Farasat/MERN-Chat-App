import React from "react";
import useConversation from "../../Zustand/useConversation";

function ConversationHead() {
  const { selectedConversation } = useConversation();

  return (
    <>
      <div className=" max-sm:sticky max-sm:top-0 max-sm:z-10 flex flex-col w-full bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg px-4 py-3 rounded-lg shadow-md">
        <div className="flex items-center space-x-6">
          {/* Profile Picture */}
          <div className="avatar">
            <div className="w-16 h-16 rounded-full border-2 border-blue-500 overflow-hidden">
              <img
                src={selectedConversation.profilePic}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* User Info */}
          <div>
            <p className="text-lg font-bold text-gray-800">
              {selectedConversation.fullName}
            </p>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-300"></div>
      </div>
    </>
  );
}

export default ConversationHead;
