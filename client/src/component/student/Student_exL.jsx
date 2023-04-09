import React from 'react'
import { useEffect, useState } from 'react'
import { uploadcloudnary } from '../upload';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Student_exL() {
  const navigate = useNavigate()

  const initialValue = {
    mentorClub: '',
    TypeOfEvent: 'External',
    organisation:'',
    nameOfEvent: '',
    levelOfEvent:'',
    NOC:'',
    Invitaion:'',
    memberNo:'',
    startingTime: '',
    endingTime: '',
    certificate: '',
    LeaveForm: '',
    approve: false
  }

  const [userData, setUserData] = useState(initialValue)
  const [ImageChange1, setImage1Change] = useState('')
  const [ImageChange2, setImage2Change] = useState('')
  const [ImageChange3, setImage3Change] = useState('')
  const [ImageChange4, setImage4Change] = useState('')
  const { mentorClub, TypeOfEvent, NOC, memberNo, Invitaion, organisation, levelOfEvent, nameOfEvent, startingTime, endingTime, certificate, LeaveForm, approve } = userData

  useEffect(() => {
    console.log('Updated user data:', userData);
  }, [userData]);

  const onValueChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImageSubmit = async (e, img1, img2, img3, img4) => {
    e.preventDefault();
    console.log(ImageChange1);

    try {
      const data1 = await uploadcloudnary(img1)
      const data2 = await uploadcloudnary(img2)
      const data3 = await uploadcloudnary(img3)
      const data4 = await uploadcloudnary(img4)
      console.log(data1);
      console.log(data2);
      console.log(data4);

      setUserData((prevData) => ({
        ...prevData,
        certificate: data1.url,
        LeaveForm: data2.url,
        Invitaion:data3.url,
        NOC:data4.url
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
      mentorClub,
      studentRollNo:rollno_,
      eventDetails:{
        TypeOfEvent,
        organisation,
        nameOfEvent,
        levelOfEvent,
        NOC,
        Invitaion,
        memberNo,
        startingTime,
        endingTime,
        certificate,
        LeaveForm,
        approve
      }
    }
    axios.post('http://localhost:5000/event', dataSet)
      .then(response => {
        console.log("data response --"+JSON.stringify(response.data));

        navigate('/moniterS')
      })
      .catch(error => {
        response_backend = error
        console.log("error " + error);
      });
  }

  return (
    <div>
      <div>
        <div className="flex flex-col items-center outline-lime-600 w-screen p-9">
          <h2 className="font-bold text-4xl mb-6" >External Event Leave Form</h2>
          <form action="" method="get" className="first w-fit">
            <div className="first mt-8 flex justify-between">
              <label htmlFor="name" required>Organising Institute Name<spam className="text-red-600 font-bold">*</spam> : </label>
              <input type="text" name="organisation" value={organisation} onChange={(e) => onValueChange(e)} required className="outline w-36" />
            </div>
            <div className="flex justify-between mt-8">
              <label htmlFor="depart" required >Level of the event<spam className="text-red-600 font-bold">*</spam> :</label>
              <select name="levelOfEvent" onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} id="depart" placeholder="level" className=" outline w-36" required>
                <option value="" >Select</option>
                <option value="InterCollege">Inter College</option>
                <option value="State">State Level</option>
                <option value="National">National Level</option>
                <option value="International">International Level</option>

              </select>
            </div>

            <div className="flex justify-between mt-8">
              <label htmlFor="depart" required >Department<spam className="text-red-600 font-bold">*</spam> :</label>
              <select name="mentorClub" onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} id="depart" placeholder="level" className=" outline w-36" required>
                <option value="" >Select</option>
                <option value="Literario">CSE</option>
                <option value="Literario">EC</option>
                <option value="Ecell">Sports</option>
                <option value="GFG">Mechanical</option>

              </select>
            </div>

            <div className="first mt-8 flex justify-between">
              <label htmlFor="name" required>Name of Event: </label>
              <input type="text" name="nameOfEvent" value={nameOfEvent} onChange={(e) => onValueChange(e)} id="name" className="outline w-36" />
            </div>

            <div className="flex justify-between mt-8">
              <label>
                Enter start date and time<spam className="text-red-600 font-bold">*</spam>: </label>
              <input type="datetime-local" name="startingTime" value={startingTime} onChange={(e) => onValueChange(e)} className="outline w-36" required />
            </div>
            <div className="flex justify-between mt-8">
              <label >
                Enter end date and time<spam className="text-red-600 font-bold">*</spam>: </label>
              <input type="datetime-local" name="endingTime" value={endingTime} onChange={(e) => onValueChange(e)} className="outline w-36" required />
            </div>
            <div className="mt-8 flex justify-between">
              <legend>Members<spam className="text-red-600 font-bold">*</spam> : </legend>
              <div className="w-36">
                <input type="radio" id="Choice1" name="contact" value="yes"
                  className="ml-6" />
                <label htmlFor="contactChoice1" className="mr-3">Single</label>

                <input type="radio" id="Choice2" name="contact" value="No" />
                <label htmlFor="contactChoice2">Team</label>
              </div>
            </div>
            <div className="first mt-8 flex justify-between">
              <label htmlFor="name" required>Total memeber if more than 1</label>
              <input type="text" name="memberNo" value={memberNo} onChange={(e) => onValueChange(e)} placeholder='Mention Number' id="name" className="outline w-36" />
            </div>
            <div className="flex  flex-col justify-between mt-6">
              <label htmlFor="reward" className="font-semibold">Upload the invitation of the event<spam className="text-red-600 font-bold">*</spam> :</label>
              <input type="file" id="reward" onChange={(e) => setImage3Change(e.target.files[0])} name="reward"
              className="sm:ml-[10px]" />
            </div>
            <div className="flex  flex-col justify-between mt-6">
              <label htmlFor="reward" className="font-semibold">Upload NOC<spam className="text-red-600 font-bold">*</spam> :</label>
              <input type="file" id="reward" onChange={(e) => setImage4Change(e.target.files[0])} name="reward"
              className="sm:ml-[10px]" />
            </div>

            <div className="mt-8 flex justify-between">
              <legend>Rewards/Certificates<spam className="text-red-600 font-bold">*</spam> : </legend>
              <div className="w-36">
              
                <input type="radio" id="Choice2" name="contact" value="Yes" />
                <label htmlFor="contactChoice1" className="mr-3">Yes</label>
                <input type="radio" id="Choice2" name="contact" value="No" />
                <label htmlFor="contactChoice2">No</label>
              </div>
            </div>
            <div className="flex  flex-col justify-between mt-6">
              <label htmlFor="reward" className="font-semibold">If you have any certificates or reward please upload it </label>
              <input type="file" id="reward" onChange={(e) => setImage1Change(e.target.files[0])} name="reward"
              className="sm:ml-[10px]" />
            </div>

            <div className="flex  flex-col justify-between mt-6">
              <label htmlFor="reward" className="font-semibold">Upload Leave form<spam className="text-red-600 font-bold">*</spam> :</label>
              <input type="file" onChange={(e) => setImage2Change(e.target.files[0])} name="reward"
              className="sm:ml-[10px]" />
            </div>
            <button onClick={(e) => { handleImageSubmit(e, ImageChange1, ImageChange2, ImageChange3, ImageChange4) }} className="bg-white hover:bg-gray-100 mt-3 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Upload</button>

            <div className="ml-36 mt-8  ">

              <input type="submit" onClick={handleSubmit} className=" h-11 rounded-xl bg-slate-300 font-semibold hover:bg-slate-100 w-24 outline-slate-400 hover:outline-gray-500" />
            </div>

          </form>


        </div>
      </div>
    </div>
  )
}
