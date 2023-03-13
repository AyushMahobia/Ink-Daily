const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required: true,
    },
    date:{
        type:Date,
        default: Date.now
    }
})
const User = mongoose.model('user', UserSchema);
// User.createIndexes(); not a good way to add uniqueness
module.exports = User
