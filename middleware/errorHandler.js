const {constants} = require("../constants")
const errorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode ? err.statusCode : 500
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Error!", messgae: err.message, stackTrace: err.stack, })
            break

        case constants.UNAUTHORISED_ERROR:
            res.json({ title: "Unauthorised Access!", message: err.message, stackTrace: err.stack, })
            break

        case constants.FORBIDDEN:
            res.json({ title: "Forbidden Access!", message: err.message, stackTrace: err.stack, })
            break

        case constants.NOT_FOUND:
            res.json({ title: "Data Not Found!", message: err.message, stackTrace: err.stack, })
            break

        case constants.SERVER_ERROR:
            res.json({ title: "Server Error!", message: err.message, stackTrace: err.stack, })
            break

        default: 
            console.log("No Error! You may proceed: " + statusCode)
            break;
    }
}

module.exports = errorHandler