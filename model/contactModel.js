const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
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