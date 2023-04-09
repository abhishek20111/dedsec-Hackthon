const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student1')
const dotenv = require('dotenv');
const Mentor = mongoose.model('Mentor1')
const Grivence = mongoose.model('Grivence')

dotenv.config()



router.post('/signupstudent', async (req, res) => {
    const { name, rollno, unvisityId, section, email, password } = req.body;
    
    if (!name || !rollno || !unvisityId || !section || !email || !password) {
        return res.status(400).send({ error: "Please Fill all data" })
    }

    const data = await Student.findOne({ $or: [{ email: email }, { RollNo: rollno }] });
    if (data) {
        return res.status(422).json({ error: "user already exist" })
    }
    const user = Student({
        name,
        RollNo: rollno,
        unversityId: unvisityId,
        Section: section,
        email: email,
        password: password
    })
    try {
        await user.save();
        res.status(201).json({ message: "save data student1" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
})
router.post('/signupTeacher', async (req, res) => {
    const { name, unvisityId, email, clubName, password } = req.body;
    if (!name || !unvisityId || !clubName || !email || !password) {
        return res.status(400).send({ error: "Please Fill all data" })
    }

    const data = await Mentor.findOne({ $or: [{ email: email }, { unversityId: unvisityId }] });
    if (data) {
        return res.status(422).json({ error: "user already exist" })
    }
    const user = Mentor({
        name,
        unversityId: unvisityId,
        email: email,
        ClubName: clubName,
        password: password
    })
    try {
        await user.save();
        res.status(201).json({ message: "save data Mentor" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
})

router.post('/student-login', async (req, res) => {
    const { RollNo, password } = req.body;
    
    if (!RollNo || !password) {
        return res.status(400).send('Invalid input');
    }
    console.log("start");
    try {
    const student = await Student.findOne({ RollNo:RollNo });
    console.log("hi done "+RollNo+" " +student);
  
      if (!student || student.password !== password) {
        return res.status(401).json({ message: 'Invalid RollNo or password' });
      }
      return res.status(200).send(student);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Something went wrong');
    }
  });
router.post('/event', async (req, res) => {
    const { mentorClub, studentRollNo, eventDetails } = req.body;

    if (!mentorClub || !studentRollNo || !eventDetails) {
        return res.status(400).send('Invalid input');
    }
    try {
        const mentor = await Mentor.findOne({ ClubName: mentorClub });
        const student = await Student.findOne({ RollNo: studentRollNo });
        console.log("Mentor " + mentor);
        console.log("Student " + student);
        if (!mentor || !student) {
            return res.status(404).json({ message: 'Mentor or student not found' });
        }
        const existingEvent = await mentor.StudentDetails.find((e) => e.student.toString() === student._id.toString() && e.nameOfEvent === eventDetails.nameOfEvent);

        if (existingEvent) {
            return res.status(409).json({ message: 'Duplicate event details' });
        }

        const activity = {
            name: student.name,
            rollNo: student.RollNo,
            section: student.Section,
            email: student.email,
            unversityId: student.unversityId
        }

        const event = {
            student: student._id,
            studentDetailsIn: activity,
            TypeOfEvent: eventDetails.TypeOfEvent,
            nameOfEvent: eventDetails.nameOfEvent,
            startingTime: eventDetails.startingTime,
            endingTime: eventDetails.endingTime,
            certificate: eventDetails.certificate,
            organisation: eventDetails.organisation,
            levelOfEvent: eventDetails.levelOfEvent,
            NOC: eventDetails.NOC,
            memberNo: eventDetails.memberNo,
            Invitation: eventDetails.Invitation,
            LeaveForm: eventDetails.LeaveForm,
            Approve: eventDetails.approve
        };
        mentor.StudentDetails.push(event);

        const updatedMentor = await mentor.save();
        console.log("mentor " + mentor._id);
        return res.json({ Mentor: updatedMentor });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
});



router.get('/student/details', async (req, res) => {
    const { mentorClub } = req.body;
    if (!mentorClub) {
        return res.status(400).send('Invalid input');
    }
    try {
        const mentor = await Mentor.findOne({ ClubName: mentorClub })
            .populate({
                path: 'StudentDetails',
                populate: { path: 'student' },
            })
            .exec();

        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        console.log(mentor.StudentDetails);

        const studentDetails = mentor.StudentDetails;
        console.log("Mentor:", mentor.name);
        console.log("Student Details:", studentDetails);

        return res.json({ StudentDetails: studentDetails });

    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
});

async function updateStudentApproval(clubName, rollNo, approve) {
    try {
        const mentor = await Mentor.findOne({ ClubName: clubName });
        if (!mentor) {
            throw new Error('Club not found');
        }
        const studentDetails = mentor.StudentDetails.find(
            (sd) => sd.studentDetailsIn.rollNo === rollNo
        );
        if (!studentDetails) {
            throw new Error('Student not found');
        }

        studentDetails.Approve = approve;
        await mentor.save();
        return 'Student approval updated successfully';
    } catch (err) {
        throw new Error(err.message);
    }
}
router.post('/approve_student', async (req, res) => {
    const { ClubName, rollNo, Approve } = req.body;
    try {
        const message = await updateStudentApproval(ClubName, rollNo, Approve);
        res.status(200).json({ message });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.post('/eventDetails', async (req, res) => {
    try {
      const { Rollno } = req.body;
      console.log(Rollno);
      const mentor = await Mentor.findOne({ 'StudentDetails.studentDetailsIn.rollNo': Rollno });
      if (!mentor) {
        return res.status(404).json({ message: `Mentor not found for RollNo: ${Rollno}` });
      }
      const studentDetails = mentor.StudentDetails.filter((studentDetail) => studentDetail.studentDetailsIn.rollNo === Rollno);
      const eventDetails = studentDetails.map(({ TypeOfEvent, nameOfEvent, startingTime, endingTime, certificate, organisation, levelOfEvent, NOC, Invitaion, memberNo, Approve }) => ({ TypeOfEvent, nameOfEvent, startingTime, endingTime, certificate, organisation, levelOfEvent, NOC, Invitaion, memberNo, Approve }));
      return res.json(eventDetails);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });

// router.post('/take_data',async(req, res)=>{
//     const {name, email, message} = req.body;

//     if(!name || !email || !message){
//         return res.status(404).json({ message: `Not all details filled ` });
//     }
//     try{
//         const data = await Grivence()
//     }
    

// })

router.post('/take_data', async (req, res) => {
    const { name, email, message } = req.body;
  
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, Email, and Message are required' });
    }
  
    try {
      // Check if there is already a record with the same email
      const existingRecord = await Grivence.findOne({ email });
      if (existingRecord) {
        return res.status(409).json({ message: 'A record with this email already exists. Please use a different email.' });
      }
  
      // Save the data to the schema
      const grivence = new Grivence({ name, email, message });
      await grivence.save();
  
      return res.status(200).json({ message: 'Data Saved Successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// router.post('/event-active', async (req, res) => {
//     const { mentorClub, studentRollNo, eventDetails } = req.body;

//     if (!mentorClub || !studentRollNo || !eventDetails) {
//         return res.status(400).send('Invalid input');
//     }

//     try {
//         const mentor = await Mentor.findOne({ ClubName: mentorClub });

//         if (!mentor) {
//             return res.status(404).json({ message: 'Mentor not found' });
//         }

//         const student = await Student.findOne({ RollNo: studentRollNo });

//         if (!student) {
//             return res.status(404).json({ message: 'Student not found' });
//         }


//         // const existingEvent = mentor.StudentDetails.find((e) =>
//         //     e.student.toString() === student._id.toString() &&
//         //     e.nameOfEvent === eventDetails.nameOfEvent &&
//         //     e.TypeOfEvent === eventDetails.TypeOfEvent &&
//         //     e.startingTime === eventDetails.startingTime &&
//         //     e.endingTime === eventDetails.endingTime &&
//         //     e.certificate === eventDetails.certificate &&
//         //     e.organisation === eventDetails.organisation &&
//         //     e.levelOfEvent === eventDetails.levelOfEvent &&
//         //     e.NOC === eventDetails.NOC &&
//         //     e.memberNo === eventDetails.memberNo &&
//         //     Buffer.from(e.Invitaion).toString() === Buffer.from(eventDetails.Invitaion).toString() &&
//         //     e.Approve === eventDetails.Approve
//         // );

//         // if (existingEvent) {
//         //     return res.status(409).json({ message: 'Duplicate event details' });
//         // }

//         // const activity = {
//         //     name: student.name,
//         //     rollNo: student.RollNo,
//         //     section: student.Section,
//         //     email: student.email,
//         //     universityId: student.universityId
//         // };

//         // const event = {
//         //     student: student._id,
//         //     studentDetailsIn: activity,
//         //     TypeOfEvent: eventDetails.TypeOfEvent,
//         //     nameOfEvent: eventDetails.nameOfEvent,
//         //     startingTime: eventDetails.startingTime,
//         //     endingTime: eventDetails.endingTime,
//         //     certificate: eventDetails.certificate,
//         //     organisation: eventDetails.organisation,
//         //     levelOfEvent: eventDetails.levelOfEvent,
//         //     NOC: eventDetails.NOC,
//         //     memberNo: eventDetails.memberNo,
//         //     Invitaion: eventDetails.Invitaion,
//         //     Approve: eventDetails.Approve
//         // };

//         // mentor.StudentDetails.push(event);

//         const updatedMentor = await mentor.save();

//         return res.json({ mentor: updatedMentor });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send('Something went wrong');
//     }
// });


// router.post('/approve-event', async (req, res) => {
//     const { mentorClub, studentRollNo, approved } = req.body;

//     if (!mentorClub || !studentRollNo || approved === undefined) {
//         return res.status(400).send('Invalid input');
//     }

//     try {
//         const mentor = await Mentor.findOne({ ClubName: mentorClub });
//         const student = await Student.findOne({ RollNo: studentRollNo });

//         if (!mentor || !student) {
//             return res.status(404).json({ message: 'Mentor or student not found' });
//         }
//         const studentEvent = mentor.StudentDetails.find(sd => sd.student.toString() === student._id.toString() && sd._id.toString() === eventId);

//         if (!studentEvent) {
//             return res.status(404).json({ message: 'Event not found' });
//         }

//         studentEvent.Approve = approved;
//         const updatedMentor = await mentor.save();

//         console.log(`Updated mentor: ${updatedMentor.name}`);

//         return res.json({ message: `Event ${eventId} for student ${studentRollNo} has been ${approved ? 'approved' : 'rejected'}` });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send('Something went wrong');
//     }
// });

// router.post('/signin', (req, res)=>{ 
//     const {email, password} = req.body;
//     if(!email || !password){
//         return res.status(422).json({error: "Please add email and password"})
//     }

//     User.findOne({email: email}).then((saveUser)=>{
//         if(!saveUser){
//             return res.status(422).json({error: "Invalid User"})
//         }
//         bcrypt.compare(password, saveUser.password).
//         then((match)=>{
//             if(match){
//                 const {_id, name, email, userName} = saveUser

//                 res.json({token, user:{_id, name, email, userName}});
//                 console.log({token, user:{_id, name, email, userName}});
//             }else{
//                 return res.status(422).json({error: "Invalid Credentials"})
//             }
//         })

//     }).catch(err => console.log("error2 "+err))
// })

module.exports = router;

// const a={
//     "StudentDetails": [
//       {
//         "studentDetailsIn": {
//           "name": "dbhisdimoyhek",
//           "rollNo": "11",
//           "section": "ba",
//           "email": "abhi@gmail.com",
//           "unversityId": "34343231"
//         },
//         "student": {
//           "_id": "6430e3c9c617003e1ae90f30",
//           "name": "dbhisdimoyhek",
//           "RollNo": "11",
//           "unversityId": "34343231",
//           "Section": "ba",
//           "email": "abhi@gmail.com",
//           "password": "abhiswedshek@1234",
//           "events": [],
//           "createdAt": "2023-04-08T03:47:21.959Z",
//           "updatedAt": "2023-04-08T03:47:21.959Z",
//           "__v": 0
//         },
//         "TypeOfEvent": "Internal",
//         "nameOfEvent": "a1bc",
//         "startingTime": "314",
//         "endingTime": "1ab",
//         "certificate": "1abs",
//         "leaveForm": "324341",
//         "Approve": false,
//         "_id": "6430f42abce1c53117ef43d5"
//       },
//       {
//         "studentDetailsIn": {
//           "name": "abhisdimoyhek",
//           "rollNo": "21",
//           "section": "a",
//           "email": "dimp1y@gmail.com",
//           "unversityId": "3434231"
//         },
//         "student": {
//           "_id": "643077ec212fcba29cf1f238",
//           "name": "abhisdimoyhek",
//           "RollNo": "21",
//           "unversityId": "3434231",
//           "Section": "a",
//           "email": "dimp1y@gmail.com",
//           "password": "abhiswehek@1234",
//           "events": [],
//           "createdAt": "2023-04-07T20:07:08.786Z",
//           "updatedAt": "2023-04-07T20:07:08.786Z",
//           "__v": 0
//         },
//         "TypeOfEvent": "Internal",
//         "nameOfEvent": "a1bc",
//         "startingTime": "314",
//         "endingTime": "1ab",
//         "certificate": "1abs",
//         "leaveForm": "324341",
//         "Approve": false,
//         "_id": "6430f42ebce1c53117ef43da"
//       }
//     ]
//   }