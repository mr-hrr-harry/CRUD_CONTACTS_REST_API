const express = require("express")
const errorHandler = require("./middleware/errorHandler")
const dotenv = require("dotenv").config()
const connectDB = require('./config/dbConnection.js')

const port = process.env.PORT
const app = express()

connectDB()
app.use(express.json())
app.use('/api/contacts', require('./routes/contactRoutes.js'))
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`)
})
