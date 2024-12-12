import { set } from "mongoose"
import {create} from "zustand"

const useConversation = create( (set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({selectedConversation}),
    messages: [],
    setMessages: (messages) => {
        if (Array.isArray(messages)) {
        set({ messages });
    } else {
        console.error("Invalid messages type, must be an array:", messages);
    }}
}))

export default useConversation