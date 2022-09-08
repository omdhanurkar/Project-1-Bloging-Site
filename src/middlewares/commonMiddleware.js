const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const blogModel = require("../models/blogModel");
const BlogModel = require("../models/blogModel");
const { checkout } = require("../routes/route");


//==Athontication====
const authenticate = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) {
            res.status(404).send({ status: false, message: "token is required" });
        }
        let decodedToken = jwt.verify(token, "naman,om prakash,rohan,raman");
        if (!decodedToken) {
            res.status(404).send({ status: false, message: "token is invalid" });
        }
        req["decodedToken"] = decodedToken
        next();   //next function is called callback function it runs when user is authenticated means it successfully login

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });

    }
}
//==Authorisation==
const authorise = async function (req, res, next) {
    try {
        let blogToBeModified = req.params.blogId
        let authorLoggedIn = req.decodedToken.authorId
        let blogData = await BlogModel.findById(blogToBeModified)
        if (blogData.authorId != authorLoggedIn) {
            return res.status(404).send({ status: false, msg: "you are not authorized" })
        }
        next()
    }
    catch (error) {
        res.status(404).send({ status: false, msg: error.message })
    }
}

const deleteByQuery = async function (req, res, next) {
    try {


    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
}





module.exports.authenticate = authenticate;
module.exports.authorise = authorise;

module.exports.deleteByQuery = deleteByQuery

