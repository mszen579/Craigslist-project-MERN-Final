//Models/User.js
const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    jobTitle:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema);
