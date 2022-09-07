const AuthorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken");

const isValid = function (value) {
    if (typeof value === "string" && value.trim().length === 0) return false
    if (typeof value === "undefined" || value === null) return false
    return true
};

const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        if (!Object.keys(data).length) return res.status(404).send({ status: false, msg: "please enter author details" });
        if (!isValid(data.fname)) return res.status(404).send({ status: false, msg: "please enter first name" });
        if (!isValid(data.lname)) return res.status(404).send({ status: false, msg: "please enter last name" });
        if (!isValid(data.title)) return res.status(404).send({ status: false, msg: "please enter title" });
        if (!isValid(data.email)) return res.status(404).send({ status: false, msg: "please enter email address" });
        if (!isValid(data.password)) return res.status(404).send({ status: false, msg: "please enter password" });
        let savedData = await AuthorModel.create(data)
        res.status(201).send({ msg: savedData })
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}
//========================================================================================================================================================================
//  log in user
const loginAuthor = async function (req, res) {
    try {
        let email = req.body.email
        let password = req.body.password
        if (!email || !password) return res.status(404).send({ status: false, msg: "enter email and password" })
        let Author = await AuthorModel.findOne({ email: email, password: password })
        if (!Author) return res.send({ status: false, msg: " email or password is not correct" })

        let token = jwt.sign({
            authorId: Author._id.toString(),
            project: "mini project of blogging site",
            Group: "54"
        },
            "naman,om prakash,rohan,raman"


        )
        res.setHeader("x-api-key", token)
        res.status(200).send({ status: true, data: token })


    } catch (err) {
        res.status(500).send({ status: false, err: err.message })
    }
}

module.exports.createAuthor = createAuthor
module.exports.loginAuthor = loginAuthor


   






