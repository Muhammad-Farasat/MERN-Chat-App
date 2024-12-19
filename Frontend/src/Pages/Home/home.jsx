import React from "react";
import SideBar from "../../Components/SideBar/SideBar";
import ConversationRoom from "../../Components/ConversationRoom/ConversationRoom";

function home() {
  return (
    <div className=" max-sm:hidden flex justify-center items-center w-full h-screen bg-gradient-to-br from-blue-200 to-blue-800">
      <div className="flex bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg w-[90vw] h-[90vh] overflow-hidden">
        <div className="w-1/4 max-md:w-[40%] max-lg:w-[40%] ">
          <SideBar />
        </div>

        {/* <div className="divider divider-horizontal bg-white bg-opacity-30 w-px"></div> */}

        <div className="w-3/4 max-md:w-[60%] max-lg:w-[60%] ">
          <ConversationRoom />
        </div>
      </div>
    </div>
  );
}

export default home;
