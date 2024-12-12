import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import  useSignup  from '../../Hooks/useSignup';

function signup() {

  
  const [inputs, setInputs] = useState({
    fullName: '',
    username:'',
    // email: '',
    gender: '',
    password: '',
    confirmPassword: '',
  })
  
  const {loading, signup} = useSignup();

  const submitForm = async (e) =>{
    e.preventDefault();
    console.log(inputs)
    await signup(inputs)
  }

  return (

    <div className='flex justify-center items-center w-full h-full '>
        <div className=' bg-blue-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30  w-[30%] rounded-md p-6 ' >
            <h1 className='text-3xl font-bold text-center  '>Sign-up</h1>

            <form className='form-control' onSubmit={submitForm} >

                <div className='mt-2'>
                    <label className="form-control w-full max-w-sm">
                      <div className="label">
                        <span className="text-base ">Fullname</span>
                      </div>
                      <input type="text" placeholder="fullname..." className="input input-bordered w-full max-w-sm" value={inputs.fullName} onChange={(e) => setInputs({...inputs, fullName: e.target.value})}  />                
                    </label>
                </div>

                <div className='mt-2'>
                    <label className="form-control w-full max-w-sm">
                      <div className="label">
                        <span className="text-base ">Username</span>
                      </div>
                      <input type="text" placeholder="username..." className="input input-bordered w-full max-w-sm" value={inputs.username} onChange={(e) => setInputs({...inputs, username: e.target.value})} />                
                    </label>
                </div>

                {/* <div className='mt-2'>
                    <label className="form-control w-full max-w-sm">
                      <div className="label">
                        <span className="text-base ">Email</span>
                      </div>
                      <input type="email" placeholder="your email..." className="input input-bordered w-full max-w-sm" value={inputs.email} onChange={(e) => setInputs({...inputs, email: e.target.value})} />                
                    </label>
                </div> */}

                <div className='mt-2'>
                    <label className="form-control w-full max-w-sm">
                      <div className="label">
                        <span className="text-base ">Password</span>
                      </div>
                      <input type="password" placeholder="Enter your password..." className="input input-bordered w-full max-w-sm" value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})} />                
                    </label>
                </div>

                <div className='mt-2'>
                    <label className="form-control w-full max-w-sm">
                      <div className="label">
                        <span className="text-base ">Confirm Password</span>
                      </div>
                      <input type="password" placeholder="Confirm  password..." className="input input-bordered w-full max-w-sm" value={inputs.confirmPassword} onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})} />                
                    </label>
                </div>

                <div className='mt-2 flex space-x-6 '>
                  <label className="label cursor-pointer space-x-2  ">
                    <span className="label-text">Male</span>
                    <input type="radio" className="radio" checked={inputs.gender === "male" } onChange={(e) => setInputs({...inputs, gender: "male"})} />
                  </label>
                  <label className="label cursor-pointer space-x-2  ">
                    <span className="label-text">Female</span>
                    <input type="radio"  className="radio" checked={inputs.gender === "female" } onChange={(e) => setInputs({...inputs, gender: "female"})}  />
                  </label>
                </div>

                <div className='mt-3' >
                  <Link to={"/login"} className='hover:text-blue-400 hover:underline  ' >
                    Already have an account?
                  </Link>
                </div>



                <div className='flex justify-center mt-3 '>
                  <button className=" w-80 h-10 px-4 py-1 rounded-lg  bg-[#2a68c5] border-none text-md text-white ">
                    sign up
                    </button>
                </div>
                



            </form>


        </div>
    </div>
  )
}

export default signup