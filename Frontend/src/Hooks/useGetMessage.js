import React, { useEffect, useState } from 'react'
import useConversation from '../Zustand/useConversation'
import toast from 'react-hot-toast'

export const useGetMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessage = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("auth-token");
                const res = await fetch(
                    `/api/message/${selectedConversation._id}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await res.json();
                console.log("Fetched messages:", data); // Debugging log
                if (data.error) throw new Error(data.error);
                setMessages(data || []); // Ensure data is an array
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (selectedConversation?._id) getMessage();
    }, [selectedConversation?._id, setMessages]);

    return { loading, messages: messages || [] }; // Ensure messages is always an array
};

