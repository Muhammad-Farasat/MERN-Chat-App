import React, { useState, useEffect, useRef } from 'react';
import useListenMessage from '../../Hooks/useListenMessage';
import { useGetMessage } from '../../Hooks/useGetMessage';
import { useAuthContext } from '../../Context/authContext';



function Chats() {

    const { messages = [] } = useGetMessage();
    const { authUser } = useAuthContext();
    const messagesEndRef = useRef(null)

    useListenMessage()

    useEffect(()=>{
        if(messagesEndRef.current){
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" }); // Corrected "behaviour" typo
        }
    },[ messages])

  return (
    <>
      <div className="chats">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg) => {
            if (!authUser?.user) return null;
            const isSender = authUser.user.id === msg.senderId;
            const messageChat = isSender ? "chat-end" : "chat-start";
            const chatStyle = isSender ? "bg-blue-500" : "";
          
            return (
              <div key={msg._id} className={`chat ${messageChat}  `}>
                <div className={`chat-bubble text-white ${chatStyle}`}>
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
          <p>Start chating</p>
        )}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
}

export default Chats;
