
const AuthorModel = require("../models/authorModel");
const BlogModel = require("../models/blogModel")


const createBlog = async function (req, res) {
    try {
        let data = req.body
        let authorId = req.body.authorId
        if (!authorId) {
            res.status(404).send({ status: false, msg: "authorId is not found" })
        }
        let allData = await AuthorModel.findOne({ _id: authorId })
        if (!allData) {
            res.status(404).send({ status: false, msg: "authorid not valid" })

        }
        let blogCreated = await BlogModel.create(data)

        res.status(201).send({ msg: blogCreated })

    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

const getBlogs =async function(req,res){
    try {
        
        // let authorId = req.query.authorId
        // let category = req.query.category
        // let tags = req.query.tags
        // let subcategory = req.query.subcategory
        let data =req.query
        

        let data1 = await BlogModel.find({$and: [data, { isDeleted: false }, { isPublished: false }]})
        res.status(200).send({msg:data1})
    } catch (err) {
        res.status(500).send({ msg: err.message })

    }
}
module.exports.createBlog = createBlog
module.exports.getBlogs =getBlogs