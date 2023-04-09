const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email:{
        type: String,
    },
    
    message:String,
    Approve:{
        type:Boolean,
        default:false
    }
},{timestamps: true})

module.exports = mongoose.model('Grivence', userSchema);