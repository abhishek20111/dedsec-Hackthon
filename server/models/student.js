const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    RollNo:{
        type: String,
        require: true,
         
    },
    unversityId:{ 
        type: String,
        require: true
    },
    Section:{
        type: String,
        require: true
    },
    email:{
        type: String,
    },
    password:{
        type: String,
        require: true
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor1',
      }],

},{timestamps: true})

module.exports = mongoose.model('Student1', userSchema);