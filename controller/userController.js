const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User= require('../model/userModel')

//@desc: POST: register user
//@route: /api/users/register
//@access: public

const registerUser = asyncHandler( async (req, res) => {

    const {username, emailid, password} = req.body
    if(!username || !emailid || !password){
        res.status(400)
        throw new Error("Check out the fields for non empty!")
    }
    const userAvailabe = await User.findOne({emailid: emailid})
    if(userAvailabe){
        res.status(400)
        throw new Error("User with same email already exits!")
    }

    //Hash Map
    const hashedPassword = await bcrypt.hash(password, 7)
    console.log("Password ", hashedPassword)

    const newUser = await User.create({
        username, emailid, password: hashedPassword, 
    })
    if(newUser){
        res.status(201).json({_id: newUser.id, email: newUser.emailid})
    }
    else{
        res.status(400)
        throw new Error("Invalid registaration details!")
    }
    
})

//@desc: login user
//@route: POST: /api/users/login
//@access: public

const loginUser = asyncHandler( async (req, res) => {
    res.json({message: "Old User"})
})

//@desc: curent user
//@route: GET: /api/users/current
//@access: private

const currentUser = asyncHandler( async (req, res) => {
    res.json({message: "User id"})
})

module.exports = {registerUser, loginUser, currentUser}