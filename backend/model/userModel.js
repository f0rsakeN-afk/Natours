const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'UserName is required'],
        trim: true
    },
    photo: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address'],
        trim: true,
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'please enter your password'],
        minlength: [8, 'Password must be at least 8 characters']
    },
    passwordConfirm: {
        type: String,
        required: [true, 'PasswordConfirm is required'],
        validate: {
            validator: function (val) {
                return val === this.password
            }
        }
    }
})

const User = mongoose.model('users', userSchema)
module.exports = User;