const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log(
            "DB Connected!",
            "\nDB_Host: " + connect.connection.host,
            "\nDB_Name: " + connect.connection.name
        )
    }
    catch(err){
        console.log("Oops! " + err)
        process.exit(1)
    }
}

module.exports = connectDB