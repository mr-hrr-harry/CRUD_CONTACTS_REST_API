const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please add the contact Name!"]
    },
    email:{
        type: String,
        required: [true, "Please add the contact Email id"]
    },
    phoneNo:{
        type: String,
        required: [true, "Please add the contact Phone Number"]
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Contact', contactSchema)