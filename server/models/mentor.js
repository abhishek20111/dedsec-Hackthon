const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const Mentor = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    unversityId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    ClubName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true,
    },
    StudentDetails: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student1',
        },
        studentDetailsIn: {
            name: {
              type: String,
            },
            rollNo: {
              type: String,
            },
            section: {
              type: String,
            },
            email:{
                type:String
            },
            unversityId:String
           
          },
        TypeOfEvent: String,
        nameOfEvent: {
            type: String,
        },
        startingTime: {
            type: String,
        },
        endingTime: {
            type: String,
        },
        certificate: {
            type: String,
        },
        
        organisation: {
            type: String,
        },

        levelOfEvent: {
            type: String,
        },
        NOC: {
            type: String,
        },
        Invitaion: { type: String },
        memberNo:{ type: String, default:"Single"},
        Approve:{
            type: Boolean,
            default:false
        }

    }],
    Report: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Mentor1', Mentor);