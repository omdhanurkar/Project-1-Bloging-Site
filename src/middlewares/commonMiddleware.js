const jwt = require("jsonwebtoken");


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
        let blogData = await blogModel.findById(blogToBeModified)
        if (blogData.authorId != authorLoggedIn) {
            return res.status(404).send({ status: false, msg: "you are not authorized" })
        }
        next()
    }
    catch (error) {
        res.status(404).send({ status: false, msg: error.message })
    }
}



module.exports.authenticate = authenticate;
module.exports.authorise = authorise;


