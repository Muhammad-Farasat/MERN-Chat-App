import Conversation from '../model/conversation.model.js'
import Message from '../model/message.model.js'
import { getReceiverId, io } from '../socket/socket.js';

export const sendMessage = async (req, res) =>{
    try {
        
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user.id

        let conversation =  await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        })
        if (!conversation) {
            conversation =  await Conversation.create({
                participants: [senderId, receiverId]
            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })            
        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }
        await Promise.all([conversation.save(), newMessage.save()]);
        res.status(201).json(newMessage)


        const receiverSocketId = getReceiverId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

    } catch (error) {
        
        res.status(500).json({error: "Error in send message controller"});
        console.log("Error in send message controller.")

    }
} 

export const getMessage = async (req, res) =>{
    try {
        
        const {id: userToChatID} = req.params;
        const senderID = req.user.id;
        
        const conversation = await Conversation.findOne({
            participants: {$all : [userToChatID, senderID]},
        }).populate("messages");

        if(!conversation) return res.status(200).json({})

        const messages = conversation.messages;

        res.status(200).json(messages);       

    } catch (error) {
        console.log("Error in get message", error.message)
        res.status(500).json({error: "Internal server errror"})
    }
}