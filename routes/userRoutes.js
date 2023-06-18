const express = require('express')

const router = express.Router()

router.post('/register', (req, res) => {
    res.send("register")
})

router.post('/login', (req, res) => {
    res.send("login")
})

router.get("/current", (req, res) => {
    res.send("current")
})

module.exports = router