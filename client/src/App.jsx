import './App.css'
import Monitor from './component/student/Monitor.jsx'
import SignupS from './component/student/SignupS'
import { Routes, Route } from 'react-router-dom'
import SigninM from './component/Mentor/SigninM'
import Signup from './component/Mentor/Signup'
import Signin from './component/student/Signin'
import Student_In from './component/student/Stident_InL.jsx'
import Student_Ex from './component/student/Student_exL.jsx'
import LeaveType from './component/student/LeaveType'
import MonitorS from './component/student/Monitor.jsx'
import SectionMontior from './component/student/SectionMontior'
import Home from './component/Home'

function App() {
  return (
    <>
    
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/studentIn' element={<Student_In/>}/>
        <Route path='/studentExt' element={<Student_Ex/>}/>
        <Route path='/signups' element={<SignupS/>}/>
        <Route path='/signins' element={<Signin/>}/> 
        <Route path='/signupm' element={<Signup/>}/> 
        <Route path='/signinm' element={<SigninM/>}/> 
        <Route path='/leavetype' element={<LeaveType/>}/>
        <Route path='/moniterS' element={<SectionMontior/>}/>
      </Routes>
    </>
  )
}

export default App
