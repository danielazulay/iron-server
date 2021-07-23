const mongoose = require('mongoose');

function connectToDb(){

    return mongoose.connect("mongodb://localhost:27017/authIntro",{
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
}

module.exports = connectToDb