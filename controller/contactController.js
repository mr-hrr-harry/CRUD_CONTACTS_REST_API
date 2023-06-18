const asyncHandler = require("express-async-handler")
const Contact = require("../model/contactModel")

//@desc: get all contacts
//@route: /api/contacts
//@access: public
const getContacts = asyncHandler(async(req, res) => {                // select *
    const contacts = await Contact.find()
    res.status(200).json(contacts)
})

//@desc: get one contact
//@route: /api/contacts/:id
//@access: public
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
//@route: /api/contacts/
//@access: public
const createContact = asyncHandler(async(req, res) => {               // insert
    console.log(req.body)
    const {name, email, phoneNo} = req.body
    console.log(name + " " + email + " " + phoneNo)

    if(!name || !email || !phoneNo){
        res.status(400)
        throw new Error("Check out the fields for non empty!")
    }
    const contact = await Contact.create({
        name, email, phoneNo,                                        // stored in abode object
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
//@route: /api/contact/:id
//@access: public
const updateContact = asyncHandler(async(req, res) => {             // update

    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("It seems contact doesn't exists!")
    }
    const updated = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updated)
})

//@desc: delete contact
//@route: /api/contact/:id
//@access: public
const deleteContact = asyncHandler(async(req, res) => {

    const contact  = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Oops, Contact not Found!")
    }

    await Contact.deleteOne({_id: req.params.id})
    res.status(200).json({"dataStatus": "Removed Successfully!"})
})

module.exports = {getContacts, getContact, createContact, updateContact, deleteContact}