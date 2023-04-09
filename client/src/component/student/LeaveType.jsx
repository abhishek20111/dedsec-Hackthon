import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function LeaveType() {
    const navigate = useNavigate();

    const logout = ()=>{
        localStorage.clear();
        navigate('/signins')
    }
    return (
        <div className='flex w-[100vw] h-[100vh]'>
            <div className='m-auto '>
                <h1 className='text-3xl m-[96px]  font-bold '>Leave Type</h1>

                <NavLink exact to={'/studentIn'} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    Apply Internal Leave</NavLink>
                <NavLink exact to={'/studentExt'} className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    Apply External Leave</NavLink>
                <button onClick={logout} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                    Logout</button>

                    <NavLink exact to={'/moniterS'} className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Monitor</NavLink>
            </div>

        </div>
    )
}
