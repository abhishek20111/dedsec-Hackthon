import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function SignupS() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        rollno: '',
        unvisityId: '',
        section: '',
        email: '',
        password: ''
    });
    const { name, rollno, unvisityId, section, email, password } = formData;

    const handleInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/signupstudent', formData);
        console.log(response.data);
        navigate('/signins')  
    }
    return (
        <>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Sign up for student</h1>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="name"
                            value={name}
                            onChange={handleInputChange}
                            placeholder="Full Name" />

                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="rollno"
                            value={rollno}
                            onChange={handleInputChange}
                            placeholder="Roll No" />

                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="unvisityId"
                            value={unvisityId}
                            onChange={handleInputChange}
                            placeholder="Unversity ID" />

                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="section"
                            value={section}
                            onChange={handleInputChange}
                            placeholder="section" />

                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            placeholder="Email" />

                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            placeholder="Password" />

                        <button onClick={(e)=>handleSubmit(e)}
                        className='w-full text-center py-3 rounded bg-green-700 text-white hover:bg-green-dark focus:outline-none my-1'>submit</button>
                        
                        <div className="text-center text-sm text-grey-dark mt-4">
                            By signing up, you agree to the <tr></tr>
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Terms of Service
                            </a>
                            <br />
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Privacy Policy
                            </a>
                        </div>
                    </div>

                    <div className="text-grey-dark mt-6">
                        Already have an account?
                        <div className='flex'>

                        <NavLink className="no-underline m-auto border-b border-blue text-blue" exact to={'/signins'}>
                            Log in
                        </NavLink>.
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
