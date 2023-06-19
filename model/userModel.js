const mongoose = require('mongoose')

const userSchema= mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please Enter Username!"],
    },
    emailid:{
        type: String,
        required: [true, "Please enter Email Id!"],
        unique: [true, "Email account already exists! Back to Login ?"],
    },
    password:{
        type: String,
        required: [true, "Please enter password"],
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema)