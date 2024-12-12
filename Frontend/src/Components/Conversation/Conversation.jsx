import React from 'react'
import useConversation from '../../Zustand/useConversation'
import { useSocketContext } from '../../Context/socketContext';


function Conversation({conversation, lastIdx}) {

    const {selectedConversation, setSelectedConversation} = useConversation()
    const isSelected = selectedConversation?._id === conversation._id

    const {online} = useSocketContext()
    const isOnline = online.includes(conversation._id);
    // console.log("This is online", online);


  return (
    <>
        <div className={`flex items-center py-2 px-2 space-x-6 hover:bg-blue-500 ${isSelected ? 'bg-blue-500' : ''} ` }
        onClick={()=>setSelectedConversation(conversation)}
        >

            <div className={`avatar ${isOnline ? 'online' : ''} `}>
                <div className="w-12 rounded-full">
                    <img src={conversation.profilePic} />
                </div>
            </div>

            <div>
                <p className=' text-lg font-semibold '>
                    {conversation.fullName}
                </p>
            </div>
        </div>

        { !lastIdx && <div className='divider m-1 '></div> }
    </>

  )
}

export default Conversation