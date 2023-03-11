const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        tyepe:String,
        required:true,
        unique:true
    },
    tags:{
        type:String,
        default: "General"
    },
    date:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('notes', NotesSchema);