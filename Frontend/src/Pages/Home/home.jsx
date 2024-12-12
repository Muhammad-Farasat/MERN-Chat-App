import React from 'react'
import SideBar from '../../Components/SideBar/SideBar'
import ConversationRoom from '../../Components/ConversationRoom/ConversationRoom'

function home() {
  return (

    <div className='flex justify-center items-center '>
        <div className=' flex bg-clip-padding w-[100vw] h-[100vh] backdrop-filter backdrop-blur-sm bg-opacity-30s rounded-md '>
            <SideBar />
            <div className="divider divider-horizontal "></div>
            <ConversationRoom />
        </div>
    </div>
  )
}

export default home