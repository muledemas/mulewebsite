import React, { useState } from 'react';
import login from '../images/login.jpg'
import { Link } from 'react-router-dom';

export default function SignIn() {
  const [formData,setFormData] = useState({email:'',
password:''});

const {email,password} = formData;

function onChange(e){
  //console.log(e.target.value);
  setFormData((prevState)=>({
    ...prevState,[e.target.id]:e.target.value
  }))
}
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src={login} alt="sign in" className='w-full rounded-2xl'/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form>
            <input type='email' id='email' value={email} placeholder='Email address' onChange={onChange} className='w-full text-xl px-4 py-2 bg-white text-gray-700 border-gray-300 rounded transition ease-in-out mb-4'/>
            <input type='password' id='password' value={password} placeholder='Password' onChange={onChange} className='w-full text-xl px-4 py-2 bg-white text-gray-700 border-gray-300 rounded transition ease-in-out'/>

            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mt-3'>Don't have an account?<Link className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-2' to="/sign-up">Register</Link> </p>
              <p className='mt-3'><Link to="/forgot-password" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out '>Forgot-password</Link></p>
            </div>
            <button type='submit' className='w-full bg-blue-600 py-3 px-7 mt-3 text-white uppercase rounded text-sm font-medium shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>Sign in</button>
          </form>
        </div>
      </div>
    </section>
  )
}
