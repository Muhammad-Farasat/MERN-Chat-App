import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import Conversation from '../Conversation/Conversation';
import uselogout from '../../Hooks/useLogout';
import { useGetConversation } from '../../Hooks/useGetConversation';
import useConversation from '../../Zustand/useConversation';
import toast from 'react-hot-toast';



function SideBar() {
    const {loading, logout} = uselogout()
    const { conversations } = useGetConversation();
    const {setSelectedConversation} = useConversation()
    

    const [search, setSearch] = useState("")

    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(!search) return
        if(search.length<3){
            return toast.error('Atleast 3 letter..!')
        }
        const conversation = conversations.find((c)=>c.fullName.toLowerCase().includes(search.toLocaleLowerCase()))

        if(conversation){
            setSelectedConversation(conversation)
            setSearch("")
        }else toast.error("No user found")


    }

   
  return (
    <div className=' w-2/6  px-4 pt-6 '>

        <form className='flex items-center space-x-10' onSubmit={handleSubmit}>
            <label className="input w-full input-bordered flex items-center gap-2 relative  ">
                <input type="text" className="grow" placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />

                <div className=' text-xl p-2 absolute inset-y-0 pe-3 end-0 text-[#6e6767] flex items-center  cursor-pointer '>
                    <FaSearch />
                </div>
            </label>
        </form>

        <div className="divider"></div>

        <div>
            {conversations.map((conversation, idx) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    lastIdx={idx === conversations.length - 1}
                />
            ))}
            {
                loading ? <div className='loading loading-spinner mx-auto '></div> : null
            }
        </div>

        <div className='flex items-center justify-center cursor-pointer font-bold gap-2 text-xl text-[#ff3131] mt-3 absolute bottom-6 '>
            <MdLogout onClick={logout} />
            <p>Logout</p>
        </div>

    </div>
  )
}

export default SideBar