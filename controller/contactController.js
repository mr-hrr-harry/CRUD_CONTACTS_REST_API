const asyncHandler = require("express-async-handler")
const Contact = require("../model/contactModel")

//@desc: get all contacts
//@route: GET: /api/contacts
//@access: private

const getContacts = asyncHandler(async(req, res) => {                // select *
    const contacts = await Contact.find({user_id : req.user.id})
    res.status(200).json(contacts)
})

//@desc: get one contact
//@route: GET: /api/contacts/:id
//@access: private

const getContact = asyncHandler( async(req, res) => {       // select <id>

    const contact = await Contact.findById(req.params.id)
    console.log("Contact: ", contact)
    if(!contact){
        res.status(404)
        throw new Error("Data Not Present!")

        // const err = new Error("Data Not present!")       // (or)
        // err.statusCode = 404
        // throw err

    }
    res.status(200).json(contact)
})

//@desc: create new contact
//@route: POST: /api/contacts/
//@access: private

const createContact = asyncHandler(async(req, res) => {               // insert
    console.log(req.body)
    const {name, email, phoneNo} = req.body
    console.log(name + " " + email + " " + phoneNo)

    if(!name || !email || !phoneNo){
        res.status(400)
        throw new Error("Check out the fields for non empty!")
    }
    const contact = await Contact.create({
        name, email, phoneNo, user_id: req.user.id                             // stored in abode object
    })
    // res.status(201).json(contact) // (or)
    try{
        await contact.validate()
        res.status(201).json(await contact.save())                      // 201 ==> status of new creation
    }
    catch(err){
        console.log("Error: " + err)
    }
})

//@desc: update contact
//@route: PUT: /api/contact/:id
//@access: private

const updateContact = asyncHandler(async(req, res) => {             // update

    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("It seems contact doesn't exists!")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("Third party updation denied!")
    }

    const updated = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updated)
})

//@desc: delete contact
//@route: DELETE: /api/contact/:id
//@access: private

const deleteContact = asyncHandler(async(req, res) => {

    const contact  = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Oops, Contact not Found!")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("Third party deletion denied!")
    }

    await Contact.deleteOne({_id: req.params.id})
    res.status(200).json({"dataStatus": "Removed Successfully!"}) 
})

module.exports = {getContacts, getContact, createContact, updateContact, deleteContact}