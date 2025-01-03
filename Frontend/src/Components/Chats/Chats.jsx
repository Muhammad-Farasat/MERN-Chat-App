import React, { useState, useEffect, useRef } from 'react';
import useListenMessage from '../../Hooks/useListenMessage';
import { useGetMessage } from '../../Hooks/useGetMessage';
import { useAuthContext } from '../../Context/authContext';



function Chats() {

    const { messages = [] } = useGetMessage();
    const { authUser } = useAuthContext();
    const messagesEndRef = useRef(null)

    // console.log("Here in chat component");
    useListenMessage()

    useEffect(()=>{
        if(messagesEndRef.current){
            messagesEndRef.current.scrollIntoView({ block: "end" }); // Corrected "behaviour" typo
        }
    },[messages])

    if(!authUser || !authUser.user || !Array.isArray(messages)){
      <div className="flex justify-center items-center font-bold text-3xl mt-32">
        <p>Loading...</p>
      </div>
    }

  return (
    <>
      <div className="chats">
        {messages.length > 0 ? (
          messages.map((msg) => {
            if (!authUser?.user) return null;
            const isSender = authUser.user.id === msg.senderId;
            const messageChat = !isSender ? "chat-start" : "chat-end";
            const chatStyle = isSender ? "bg-blue-500" : "";
          
            return (
              <div key={msg._id} className={`chat ${messageChat}  `}>
                <div className={`chat-bubble text-white ${chatStyle} break-words `}>
                  {msg.message}
                </div>
                <div className="chat-footer">
                  <time>
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>
              </div>
            );
          })
        ) : (
            <div className=' flex justify-center items-center font-bold text-3xl mt-32 '>
              <p>Start chating</p>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
}

export default Chats;
