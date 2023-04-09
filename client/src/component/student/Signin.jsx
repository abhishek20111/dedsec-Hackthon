import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    RollNo: '',
    password: ''
  });
  const { RollNo, password } = formData;

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const getDetailsFromBackend = async()=>{
    // e.preventDefault();
    const Rollno_ = formData.RollNo;
    console.log("coming " + Rollno_);
    const response = await axios.post('http://localhost:5000/eventDetails', {Rollno: Rollno_});
    
    localStorage.setItem('studentDetails',JSON.stringify(response.data))
    console.log("data "+ JSON.stringify(response.data));
  }
  

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const response = await axios.post('http://localhost:5000/student-login', formData);
    console.log(response.data)
    localStorage.setItem('Details',JSON.stringify(response.data));
    navigate('/leavetype')

  }
  return (
    <>
      <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto my-10">
            <div className="text-center">
              <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Sign in Student</h1>
              <p className="text-gray-500 dark:text-gray-400">Sign in to access your account</p>
            </div>
            <div className="m-7">
              <div className="mb-6">
                <label htmlFor="text" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Roll No</label>
                <input type="text" name="RollNo" value={RollNo} onChange={handleInputChange} placeholder="Roll No" className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
              </div>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-400">password</label>
                  <a href="#!" className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300">Forgot password?</a>
                </div>
                <input type="password" name="password" value={password} onChange={handleInputChange} placeholder="Your password" className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
              </div>
              <div className="mb-6">
                <button onClick={(e)=>{handleSubmit(e); getDetailsFromBackend();}} type="button" className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">Sign in</button>
              </div>
              <p className="text-sm text-center text-gray-400">Don&#x27;t have an account yet? 
              <NavLink exact to={'/signups'} className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800">
                Sign up
              </NavLink>.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
