const express = require("express")
const router = express.Router()
const {getContacts, getContact, createContact, updateContact, deleteContact} = require("../controller/contactController")
const tokenValidate = require("../middleware/validateTokenHandler")

router.use(tokenValidate)

router.route('/').get(getContacts).post(createContact)

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)

module.exports = router 
