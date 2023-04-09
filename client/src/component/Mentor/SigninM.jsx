import React,{ useState }  from 'react'
import { NavLink } from 'react-router-dom'

export default function SigninM() {
  const [formData, setFormData] = useState({
    universityid: '',
    password: ''
  });
  const { universityid, password } = formData;

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);

  }
  return (
    <>
      <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto my-10">
            <div className="text-center">
              <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Sign in for Mentor</h1>
              <p className="text-gray-500 dark:text-gray-400">Sign in to access your account</p>
            </div>
            <div className="m-7">
              <div className="mb-6">
                <label htmlFor="text" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">University Id</label>
                <input type="text" name="universityid" value={ universityid} onChange={handleInputChange} placeholder="University Id" className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
              </div>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-400">Password</label>
                  <a href="#!" className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300">Forgot password?</a>
                </div>
                <input type="password" name="password" value={password} onChange={handleInputChange} placeholder="Your Password" className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
              </div>
              <div className="mb-6">
                <button onSubmit={handleSubmit} type="button" className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">Sign in</button>
              </div>
              <p className="text-sm text-center text-gray-400">Don&#x27;t have an account yet? 
              <NavLink className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800">Sign up
              </NavLink>.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}