import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const RecruiterLogin = () => {

    const [state,setState]=useState('Login')
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');

    const [image,setImage]=useState(false);

    const [isTextDataSubmitted,setIsTextDataSubmitted]=useState(false);

    const{setShowRecruiterLogin}=useContext(AppContext)

    const onSubmitHandler=async(e)=>{
      e.preventDefault()
      if(state==='Sign Up' && !isTextDataSubmitted){
        setIsTextDataSubmitted(true);
      }
    }
    
useEffect(()=>{
  document.body.style.overflow='hidden'
  return ()=>{
     document.body.style.overflow='unset'
  }
},[])

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
        <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>
          <h1 className='font-medium text-center text-2xl text-neutral-700'>Recruiter {state}</h1>
          <p className='text-sm'>Welcome back! Please sign in to continue</p>

        {state==='Sign Up' && isTextDataSubmitted 
        ? <>
        <div className='flex items-center gap-4 my-10'>
          <label htmlFor="image">
            <img className='w-16 rounded-full cursor-pointer' src={image?URL.createObjectURL(image) : assets.upload_area} alt="" />
            <input onChange={e=>setImage(e.target.files[0])} type="file" id='image' hidden />
          </label>
          <p>Upload Company <br /> logo</p>
        </div>
        </>
        :  <>
            {state!='Login' && (
              <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
              <img src={assets.person_icon} alt="" />
              <input onChange={e=>setName(e.target.value)} value ={name} type="text" placeholder='Company Name' required className='outline-none text-sm'/>
            </div>
            )}

            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
              <img src={assets.email_icon} alt="" />
              <input type="email" placeholder='Email id' required onChange={e=>setEmail(e.target.value)} value={email} className='outline-none text-sm'/>
            </div>

            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
              <img src={assets.lock_icon} alt="" />
              <input type="password" placeholder='Password' required onChange={e=>setPassword(e.target.value)} value={password} className='outline-none text-sm'/>
            </div>

          </>}

            {state==='Login' && (
              <p className='text-sm text-blue-600 mt-4 cursor-pointer'>Forget Passoword?</p>
            )}
          
          <button className='bg-blue-600 w-full py-2 rounded-full mt-4 text-white' type='submit'>
            {state==='Login' ? 'login': isTextDataSubmitted? 'create account' : 'Next'}
          </button>


          {state==='Login'
          ? <p className='mt-5 text-center'>Don't have an account? <span onClick={()=>setState("Sign Up")} className='text-blue-600 cursor-pointer'>Sign Up</span></p> : <p className='mt-5 text-center'>Already have an account? <span onClick={()=>setState("Login")} className='text-blue-600 cursor-pointer'>Login</span></p>}


          <img src={assets.cross_icon} className='absolute top-5 right-5 cursor-pointer' onClick={e=>setShowRecruiterLogin(false)}/>
        </form>
    </div>
  )
}

export default RecruiterLogin