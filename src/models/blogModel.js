const mongoose = require("mongoose")
const moment=require("moment")
const objId = mongoose.Schema.Types.ObjectId


const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: objId,
        ref: "author",
        required: true
    },       
    tags: [String],
    category: {
        type: String,
        required: true
    },
    subcategory: [String],
    deletedAt: String,
    isDeleted: {
        type: Boolean,
        default: false
    },
    publishedAt: String,
    isPublished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

<<<<<<< HEAD
module.exports = mongoose.model("Blog", blogSchema)
=======
module.exports = mongoose.model("Blog", blogSchema)
>>>>>>> 6b8cb64aef898a1a21e51f12138eabfcfe7ddb2a
