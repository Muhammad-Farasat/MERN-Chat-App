import React, { useEffect } from 'react';
import useConversation from '../../Zustand/useConversation';
import { useAuthContext } from '../../Context/authContext';
import ConversationHead from '../ConversationHead/ConversationHead';
import Chats from '../Chats/Chats';
import ChatsInput from '../ChatsInput/ChatsInput';

function ConversationRoom() {

    const { selectedConversation, setSelectedConversation } = useConversation();
    const { authUser } = useAuthContext();
    
    useEffect(()=>{
        return ()=>setSelectedConversation(null)
    },[setSelectedConversation])

    return (
        <>
            {!selectedConversation ? (
                <p className="text-4xl text-center m-auto">Welcome <br /> <span className='font-bold'>{`${authUser.user.fullName}`}</span> </p>
            ) : (
                <div className="flex flex-col w-full overflow-y-scroll ">
                    
                    {/* Chat Header */}
                    <ConversationHead />

                    {/* Chat Messages */}
                    <Chats />

                    {/* Chat Input */}
                    <ChatsInput />

                </div>
            )}
        </>
    );
}

export default ConversationRoom;
