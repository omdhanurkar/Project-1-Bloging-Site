const jwt = require("jsonwebtoken");
const BlogModel = require("../models/blogModel");

//==Athontication====
const authenticate = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) res.status(400).send({ status: false, message: "token is required" });

        let decodedToken = jwt.verify(token, "naman,omprakash,rohan,raman", (error, decodedToken) => {
            if (error) {
                res.status(401).send({ status: false, message: "token is invalid" });
            }
            req["decodedToken"] = decodedToken
            next();   //next function is called callback function it runs when user is authenticated means it successfully login
        });
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message });

    }
}
//===========================================================================================================================================================================================================================

//==Authorisation==
const authorise = async function (req, res, next) {
    try {
        let blogToBeModified = req.params.blogId
        let authorLoggedIn = req.decodedToken.authorId
        let blogData = await BlogModel.findById(blogToBeModified)
        if (blogData.authorId != authorLoggedIn) {
            return res.status(403).send({ status: false, msg: "you are not authorized" })
        }
        next()
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

//===========================================================================================================================================================================================================================

//===authorisation for deleteByQuery===

const authdeleteByQuery = async function (req, res, next) {
    try {
        let Data = req.query
        let blogs = await BlogModel.find(Data)
        if (blogs.length == 0) {
            return res.status(404).send({ status: false, msg: "No blogs found" })
        }
        let authorLoggedIn = req.decodedToken.authorId
        const authCheck = blogs.filter(blog => blog.authorId.toString() === authorLoggedIn);
        if (authCheck.length == 0) {
            return res.status(403).send({ status: false, msg: "Not Authorised" })
        }
        next()
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.authenticate = authenticate;
module.exports.authorise = authorise;
module.exports.authdeleteByQuery = authdeleteByQuery;

