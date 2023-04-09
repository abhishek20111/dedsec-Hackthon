import React from 'react'
import { useEffect, useState } from 'react'
import { uploadcloudnary } from '../upload';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Internal() {
  const navigate = useNavigate()

  const initialValue = {
    mentorClub: '',
    TypeOfEvent: 'Internal',
    nameOfEvent: '',
    startingTime: '',
    endingTime: '',
    certificate: '',
    LeaveForm: '',
    approve: false
  }

  const [userData, setUserData] = useState(initialValue)
  const [ImageChange1, setImage1Change] = useState('')
  const [ImageChange2, setImage2Change] = useState('')
  const { mentorClub, TypeOfEvent, nameOfEvent, startingTime, endingTime, certificate, LeaveForm, approve } = userData

  useEffect(() => {
    console.log('Updated user data:', userData);
  }, [userData]);

  const onValueChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImageSubmit = async (e, img1, img2) => {
    e.preventDefault();
    console.log(ImageChange1);

    try {
      const data1 = await uploadcloudnary(img1)
      const data2 = await uploadcloudnary(img2)
      console.log(data1);
      console.log(data2);

      setUserData((prevData) => ({
        ...prevData,
        certificate: data1.url,
        LeaveForm: data2.url
      }));
      // console.log(userData);
    } catch (err) { console.log(err) }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const student = JSON.parse(localStorage.getItem("Details"));
    console.log(student);
    let rollno_ = '';
    if (student) {
      Object.entries(student).forEach(([key, value]) => {
        if (key === 'RollNo') {
          console.log(value);
          rollno_ = value
        }
      });
    }
    const dataSet = {
      mentorClub:mentorClub,
      studentRollNo:rollno_,
      eventDetails:{
        TypeOfEvent,
        nameOfEvent,
        startingTime,
        endingTime,
        certificate,
        LeaveForm,
        approve
      }
    }
    axios.post('http://localhost:5000/event', dataSet)
      .then(response => {
        console.log(response.data);
        navigate('/moniterS')
      })
      .catch(error => {
        response_backend = error
        console.log("error " + error);
      });
  }

  return (
    <div>
      <div className="flex flex-col items-center mt-5 sm[550]:mr-96 p-9 ">
        <h2 className="font-bold text-4xl mb-6 " >Internal Event Leave Form</h2>
        <form action="" method="get" className="first w-fit">
          <div className="flex justify-between mt-8">
            <label htmlFor="club" required>Club Name<spam className="text-red-600 font-bold">*</spam>: </label>
            <select name="mentorClub" onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}  className="outline w-44" required>
              <option value=""> </option>
              <option value="Ninad">Ninad</option>
              <option value="Literario">Literario</option>
              <option value="Datum">Datum</option>
              <option value="Dedsec">Dedsec</option>
              <option value="Ecell">Ecell</option>
              <option value="GFG">GFG</option>
            </select>
          </div>
          <div className="flex justify-between mt-8">
            <label htmlFor="depart" required >Department Name<spam className="text-red-600 font-bold">*</spam>:</label>
            <select name="depart" className=" outline w-44" required>
              <option value=""> </option>
              <option value="CS">CS</option>
              <option value="Biotech">Biotech</option>
              <option value="BBA">BBA</option>
              <option value="EC">EC</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Law">Law</option>
              <option value="MBA">MBA</option>
            </select>
          </div>
          <div className="first mt-8 flex justify-between">
            <label htmlFor="name" required>Name of Event: </label>
            <input type="text" name="nameOfEvent" value={nameOfEvent} onChange={(e) => onValueChange(e)} id="name" className="outline w-44" />
          </div>


          <div className="flex justify-between mt-8">
            <label>
              Enter start date of the event<spam className="text-red-600 font-bold">*</spam>: </label>
            <input type="datetime-local" name="startingTime" value={startingTime} onChange={(e) => onValueChange(e)} className="outline w-44" required />
          </div>

          <div className="flex justify-between mt-8">
            <label >
              Enter end date of the event: </label>
            <input type="datetime-local" name="endingTime" value={endingTime} onChange={(e) => onValueChange(e)} className="outline w-44" />
          </div>
          <div className="mt-8 flex justify-between">
            <lable >Rewards/Certificates<spam className="text-red-600 font-bold">*</spam>: </lable>

            <input type="file" id="reward" onChange={(e) => setImage1Change(e.target.files[0])} name="reward"
              className="sm:ml-[10px]" />
          </div>

          <div className="mt-8 flex justify-between">
            <lable >Leave Form<spam className="text-red-600 font-bold">*</spam>: </lable>

            <input type="file" onChange={(e) => setImage2Change(e.target.files[0])} name="reward"
              className="sm:ml-[10px]" />
          </div>
          <button onClick={(e) => { handleImageSubmit(e, ImageChange1, ImageChange2) }} class="bg-white hover:bg-gray-100 mt-3 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Upload</button>


          <div className="ml-36 mt-8  ">
            <input type="submit" onClick={handleSubmit} className=" h-11 rounded-xl bg-slate-300 font-semibold hover:bg-slate-100 w-24 outline-slate-400 hover:outline-gray-500" />
          </div>
        </form>



      </div>
    </div>
  )
}
