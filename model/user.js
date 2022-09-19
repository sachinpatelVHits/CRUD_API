const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
		trim: true
    },
    mobile: {
        type: String,
        required: true,
        maxlength: 10,
		trim: true
    },
    emailID: {
        type: String,
        required: true,
		trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
		trim: true
    },
    city: {
        type: String,
        required: true,
		trim: true
    },
    country: {
        type: String,
        required: true,
		trim: true
    },
    jwt : {
        type : [String],
        required: false
    },
    createdAt: {
        type: Date,
        default: Date()
      },
})

const userModel = mongoose.model('userdata', userSchema)
module.exports = userModel