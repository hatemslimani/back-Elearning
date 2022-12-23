const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    // image: {
    //     type: String,
    //     required: true
    // },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})
module.exports = mongoose.model('User', userSchema)