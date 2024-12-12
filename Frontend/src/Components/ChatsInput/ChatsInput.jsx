import React, { useState } from 'react';
import { useSendMessage } from '../../Hooks/useSendMessage';
import { IoIosSend } from 'react-icons/io';




function ChatsInput() {


    const [newMessage, setNewMessage] = useState([]); 
    
    const { loading: sendLoading, sendMessage } = useSendMessage();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage) return;
        await sendMessage(newMessage);
        setNewMessage('');
    }

  return (
    <>
        <form action="" onSubmit={handleSubmit} className="inputs flex items-center w-full p-4 shadow-lg sticky bottom-0">
                        <input
                            type="text"
                            placeholder="Send a message"
                            className="input input-bordered w-full rounded-md px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="ml-4 text-2xl text-gray-500 hover:text-gray-700"
                        >
                            {sendLoading ? (
                            <div className="loading loading-spinner"></div>
                            ) : (
                            <IoIosSend />
                            )}
                        </button>
                    </form>
    </>
  )
}

export default ChatsInput