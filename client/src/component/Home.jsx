import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Home() {
  return (
    <div className='w-[100vw] h-[100vh] flex'>
    
      <div className='text-3xl bg-green-400 font-bold m-auto'><NavLink exact className='text-7xl p-3 font-bold' to={'/leavetype'}>Student</NavLink></div>
      <div className='text-3xl bg-green-400 font-bold m-auto'><NavLink exact className='text-7xl p-3 font-bold' to={'/mentor'}>Mentor</NavLink></div> 
      
    </div>
  )
}
