const jwt = require("jsonwebtoken");




const authenticate = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) {
            res.status(404).send({ status: false, message: "token is required" });
        }
        let decodedToken = jwt.verify(token, "naman,om prakash,rohan,raman");
        if (!decodedToken) {res.status(404).send({ status: false, message:"token is invalid" });
        }
        next();

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });

    }
}



module.exports.authenticate = authenticate;