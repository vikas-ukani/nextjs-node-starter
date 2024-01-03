const mongoose = require('mongoose')

// const bcrypt = require('bcryptjs')
// const { stringify } = require('querystring')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name."]
    },
    email: {
        type: String,
        required: [true, "Please provide your email."],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User