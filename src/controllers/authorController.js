const AuthorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken");
const authorModel = require("../models/authorModel");


const isValid = function (value) {
    if (typeof value === "string" && value.trim().length === 0) return false
    if (typeof value === "undefined" || value === null) return false
    return true;
};

// ===title should be one of the following constants ===
const isValidTitle = function (title) {
    return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1
}

//create a author
const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length === 0)                                                         //request body should not empty
            return res.status(400).send({ status: false, message: "please enter author details" });

        if (!isValid(data.fname))
            return res.status(400).send({ status: false, message: "please enter first name" });

        if (!(/^[a-zA-Z]+$/i).test(data.fname))
            return res.status(400).send({ status: false, message: "please provide valid first name It should be in Alphabet format" });

        if (!isValid(data.lname))
            return res.status(400).send({ status: false, message: "please enter last name" });

        if (!(/^[a-zA-Z]+$/i).test(data.lname))
            return res.status(400).send({ status: false, message: "please enter valid last name It should be in Alphabet format" });

        if (!isValid(data.title))
            return res.status(400).send({ status: false, message: "please enter title" });

        if (!isValidTitle(data.title))
            return res.status(400).send({ status: false, message: "please enter valid title" });

        if (!isValid(data.email))
            return res.status(400).send({ status: false, message: "please enter email address" });

        if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.email))
            return res.status(400).send({ status: false, message: "please enter valid email" });


        const checkusedEmail = await authorModel.findOne({ email: data.email });
        if (checkusedEmail) {                                                             //check if emaild not already in used
            return res.status(400).send({ status: false, message: "email already used" });
        }

        if (!isValid(data.password))
            return res.status(400).send({ status: false, message: "please enter password" });

        if (!/^[a-zA-Z0-9@*#]{8,15}$/.test(data.password))
            return res.status(400).send({ status: false, message: "Use any special character and Numbers password" });

        let savedData = await AuthorModel.create(data)
        return res.status(201).send({ status: true, message: "Author has been created successfully ", data: savedData })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
// ========================================================================================================================================================================

//  log in user
const loginAuthor = async function (req, res) {
    try {
        let email = req.body.email
        let password = req.body.password
        if (!email || !password) return res.status(400).send({ status: false, message: "enter email and password" })
        let Author = await AuthorModel.findOne({ email: email, password: password })
        if (!Author) return res.status(404).send({ status: false, message: " email or password is not correct" })

        let token = jwt.sign({
            authorId: Author._id.toString(),
            project: "mini project of blogging site",
            Group: "54"
        },
            "naman,omprakash,rohan,raman"
        )
        res.setHeader("x-api-key", token);
        return res.status(201).send({ status: true, message: "loggedIn successfully", data: { data: token } })
    } catch (err) {
        return res.status(500).send({ status: false, err: err.message })
    }
}

module.exports.createAuthor = createAuthor
module.exports.loginAuthor = loginAuthor