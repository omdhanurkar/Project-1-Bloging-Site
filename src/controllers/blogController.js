
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
//============================================================================================================================================================================================================================
const getBlogs = async function (req, res) {
    try {
        let data = req.query
        let data1 = await BlogModel.find({ $and: [data, { isDeleted: false }, { isPublished: true }] })
        res.status(200).send({ msg: data1 })
    } catch (err) {
        res.status(500).send({ msg: err.message })

    }
}
//============================================================================================================================================================================================================================
//PUT /blogs/:blogId.
const updateBlogs = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        let blogData = req.body;
        let updateBlog = await BlogModel.findOneAndUpdate(
            { _id: blogId, isDeleted: false },       //condition
            {
                $set: { title: blogData.title, body: blogData.body, isPublished: true, publishedAt: new Date() },   //want to update or push
                $push: { tags: blogData.tags, subcategory: blogData.subcategory }
            },
            { new: true }
        );
        if (!updateBlog) {
            res.status(404).send({ msg: 'Blog not found' })
        }
        res.status(200).send({ status: true, msg: updateBlog })

    } catch (err) {
        res.status(500).send({ satus: false, msg: err.message })
    }
};

//============================================================================================================================================================================================================================
//delete/blogs/:blogId
const deleteblog = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        let blogData = await BlogModel.findOneAndUpdate(
            { _id: blogId, isDeleted: false },
            { $set: { isDeleted: true, deletedAt: new Date() } },
        );
        //check if the blogData is not found
        if (!blogData) {
            res.status(404).send({ status: false, msg: 'Blog not found' })
        }
        res.status(200).send({ status: true, msg: "Blog has been Deleted" })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}
//============================================================================================================================================================================================================================
// DELETE /blogs?queryParams


module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updateBlogs = updateBlogs;
module.exports.deleteblog = deleteblog;
