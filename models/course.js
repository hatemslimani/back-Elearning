const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'category',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    contents: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    lessons:[
        {
            name:{
                type: String,
                required: true
            },
            videoLink:{
                type: String,
                required: true
            },
            created_at: {
                type: Date,
                required: true,
                default: Date.now
            }
        }],
    comments:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'user',
            },
            comment:{
                type: String,
                required: true
            },
            created_at: {
                type: Date,
                required: true,
                default: Date.now
            }
        }],
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})
module.exports = mongoose.model('course', courseSchema)