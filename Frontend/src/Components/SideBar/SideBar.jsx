import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import Conversation from "../Conversation/Conversation";
import uselogout from "../../Hooks/useLogout";
import { useGetConversation } from "../../Hooks/useGetConversation";
import useConversation from "../../Zustand/useConversation";
import toast from "react-hot-toast";

function SideBar({onUserClick}) {
  const { loading, logout } = uselogout();
  const { conversations } = useGetConversation();
  const { setSelectedConversation } = useConversation();
  const [search, setSearch] = useState("");

  const sortedConversations = conversations.sort((a,b)=>{
    const aTime = new Date(a.lastMessageTime).getTime();
    const bTime = new Date(b.lastMessageTime).getTime();

    return bTime-aTime;

  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Atleast 3 letter..!");
    }
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLocaleLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("")
    } else {
      toast.error("No user found");
      console.log("Error in sidebar component");
    }
  };

  return (
    <div className="w-full px-4 pt-6 h-full flex flex-col bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg  ">
      <form className="flex items-center mb-4" onSubmit={handleSubmit}>
        <label className=" border border-black rounded-md w-full flex items-center gap-2 relative">
          <input
            type="text"
            className="grow bg-[#111] border-black text-[#fff] border  rounded-md outline-none px-3 py-2 "
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="text-xl p-2 absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer">
            <FaSearch />
          </div>
        </label>
      </form>

      <div className="divider"></div>

      <div className="flex-grow overflow-y-auto">
        {sortedConversations.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            lastMessage={conversation.lastMessage}
            lastIdx={idx === conversations.length - 1}
            onUserClick={onUserClick}
          />
        ))}
        {loading && (
          <div className="loading loading-spinner mx-auto text-gray-500 mt-4"></div>
        )}
      </div>

      <div onClick={logout} className="sticky bottom-0 flex items-center justify-center cursor-pointer font-bold gap-2 text-lg text-red-500 py-2">
        <MdLogout/>
        <p>Logout</p>
      </div>
    </div>
  );
}

export default SideBar;
