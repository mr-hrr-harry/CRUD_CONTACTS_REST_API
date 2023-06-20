const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User= require('../model/userModel')
require('dotenv')

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
        res.status(201).json({Userid: newUser.id, emailid: newUser.emailid})       // just to print the inserted data
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
    const {emailid, password} = req.body
    if(!emailid || !password){
        res.status(400)
        throw new Error("Enter all the fields!")
    }
    const user = await User.findOne({emailid: emailid})
    if(user && (bcrypt.compare(password, user.password)) ){          //compare user entry with db password!
        
        const accessToken = jwt.sign(
            {
                user:{
                    username: user.username,            // Generate a web token using the 3 credentials
                    emailid: user.emailid,
                    id: user.id,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "20m"
            }
        )
        res.status(200).json({AccessToken : accessToken})
    }
    else{
        res.status(401)
        throw new Error("Incorrect user credentials!")
    }
})

//@desc: curent user
//@route: GET: /api/users/current
//@access: private

const currentUser = asyncHandler( async (req, res) => {
    res.json(req.user)
})

module.exports = {registerUser, loginUser, currentUser}