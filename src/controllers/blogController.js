const AuthorModel = require("../models/authorModel");
const BlogModel = require("../models/blogModel")

const isValid = function (value) {
    if (typeof value === "string" && value.trim().length === 0) return false
    if (typeof value === "undefined" || value === null) return false
    return true;
};

//======================================================================================================================================================================================================

const createBlog = async function (req, res) {
    try {
        let data = req.body
        let authorId = req.body.authorId
        //if data is not availeble in body
        if (Object.keys(data).length === 0) return res.status(404).send({ status: false, msg: "provide some data in body" })

        //checking all detail in body is correct or it might not be available
        if (!isValid(data.title))
            return res.status(404).send({ status: false, msg: "title is required" })  //

        // if (!(/^[a-zA-Z]+$/i).test(data.title))
        //     return res.status(404).send({ status: false, msg: "title should be in alphabet format" });

        if (!isValid(data.body))
            return res.status(404).send({ status: false, msg: "body is required" })

        if (!isValid(data.authorId))
            return res.status(404).send({ status: false, msg: "authorId is required" })

        if (!data.authorId) {
            return res.status(404).send({ status: false, msg: "authorId is not found" })
        }

        let author = await AuthorModel.findById({ _id: authorId })
        if (!author) {
            return res.status(404).send({ status: false, msg: "authorid not valid" })
        }
        if (data.authorId !== req.decodedToken.authorId) {
            return res.status(404).send({ status: false, msg: "Can't use another authorId" })
        }
        if (!isValid(data.category)) { return res.status(404).send({ status: false, msg: "category is required" }) }

        let blogCreated = await BlogModel.create(data)
        res.status(201).send({ status: true, msg: blogCreated })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

//============================================================================================================================================================================================================================

const getBlogs = async function (req, res) {
    try {
        let data = req.query;
        if (!data) { return res.status(404).send({ status: false, msg: "No data found in query" }) }
        let getBlog = await BlogModel.find({ isPublished: true, isDeleted: false, ...data })  // distructered bcoz we will put more than 1 key in queryParams
        if (getBlog.length == 0)
            return res.status(404).send({ status: false, msg: "no such documents found" })

        res.status(200).send({ status: true, data: getBlog })
        // console.log(getData)

    } catch (err) {
        res.status(500).send({ status: false, msg: err.massage })
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
            return res.status(404).send({ msg: 'Blog not found' })
        }
        return res.status(200).send({ status: true, msg: updateBlog })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
};

//============================================================================================================================================================================================================================

//delete/blogs/:blogId
const deleteblog = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        if (!blogId) return res.status(404).send({ msg: 'BlogId not found' });
        let blogData = await BlogModel.findOneAndUpdate(
            { _id: blogId, isDeleted: false },
            { $set: { isDeleted: true, deletedAt: new Date() } },
            { new: true }
        );
        //check if the blogData is not found
        if (!blogData) {
            return res.status(404).send({ status: false, msg: 'Blog not found' })
        }
        return res.status(200).send({ status: true, msg: "Blog has been Deleted" })
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
//============================================================================================================================================================================================================================

// DELETE /blogs?queryParams
const deleteByQuery = async function (req, res) {
    try {
        const data = req.query
        const category = req.query.category
        const authorId = req.query.authorId
        const tagName = req.query.tags
        const subcategory = req.query.subcategory
        const isPublished = req.query.isPublished

        //check if the query field is empty
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Enter the details of blog that you would like to delete" })

        //check if data already deleted or not
        const findDeleted = await BlogModel.findOne(data)
        if (findDeleted.isDeleted == true) return res.status(404).send({ status: false, msg: "blog is already deleted" })

        //finding document using query params
        const delectingBlog = await BlogModel.updateMany({ $or: [{ category: category }, { authorId: authorId }, { tags: tagName }, { subcategory: subcategory }, { isPublished: isPublished }] },
            { $set: { isDeleted: true, deletedAt: new Date() } })


        if (delectingBlog == null) return res.status(404).send({ status: false, msg: "Blog not found" })


        return res.status(200).send({ status: true, msg: "Blog has been deleted" })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updateBlogs = updateBlogs;
module.exports.deleteblog = deleteblog;
module.exports.deleteByQuery = deleteByQuery;
