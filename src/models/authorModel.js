const mongoose =require("mongoose")

const authorSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true,
        enum: ["male","female","other"]
    },
    email:{
        type: String,
        unique: true,
        //match: /.+\@.+\..+/,
        required: true
    },
    password:{
        
        type: String,
        required: true
    }},

    { timestamps: true });

module.exports = mongoose.model('author', authorSchema)
   






