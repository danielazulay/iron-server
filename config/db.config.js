
const mongoose = require('mongoose')

function connectToDB() {
    return mongoose.connect(process.env.MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
}

module.exports = connectToDB