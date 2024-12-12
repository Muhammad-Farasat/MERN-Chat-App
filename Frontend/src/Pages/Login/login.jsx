import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../Hooks/useLogin';

function login() {

  const {loading, login} = useLogin()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(username, password);
  }

  return (
    
    <div className='flex justify-center items-center w-full h-full '>
        <div className=' bg-blue-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30  w-96 h-96 rounded-md p-6 ' >
            <h1 className='text-3xl font-bold text-center  '>Login</h1>

            <form className='form-control' onSubmit={handleSubmit} >

                <div>
                    <label className="form-control w-full max-w-xs">
                      <div className="label">
                        <span className="text-base ">Username</span>
                      </div>
                      <input type="text" placeholder="username..." className="input input-bordered w-full max-w-xs" value={username} onChange={(e) => setUsername(e.target.value) } />                
                    </label>
                </div>

                <div>
                    <label className="form-control w-full max-w-xs">
                      <div className="label">
                        <span className="text-base ">Password</span>
                      </div>
                      <input type="password" placeholder="Enter your password..." className="input input-bordered w-full max-w-xs" value={password} onChange={(e) => setPassword(e.target.value) } />                
                    </label>
                </div>

                <div className='mt-2' >
                  <Link to={"/signup"} className='hover:text-blue-400 hover:underline  ' >
                    Don't have an account
                  </Link>
                </div>



                <div className='flex justify-center mt-2 '>
                  <button className=" w-72 h-10 px-4 py-1 rounded-lg  bg-[#2a68c5] border-none text-md text-white ">
                    Login
                  </button>
                </div>
                



            </form>


        </div>
    </div>
    
  )
}

export default login