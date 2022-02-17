const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please enter your first name'],
    maxlength: [30, 'Your first name can not exceed 30 characters'],
    validate: [validator.isAlpha, 'Please enter only String values']
  },
  lastname: {
    type: String,
    required: [true, 'Please enter your last name'],
    maxlength: [30, 'Your last name can not exceed 30 characters'],
    validate: [validator.isAlpha, 'Please enter only String values']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email address'],
  },
  hashedPassword: {
    type: String,
    required: [true, 'Please enter your Password'],
    minlength: [6, 'Your password must be more than 6 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
userSchema.virtual('id').get(function(){
    return this._id.toHexString();
})

userSchema.set('toJSON',{
    virtuals:true,
})
module.exports =  mongoose.model('Users', userSchema);
