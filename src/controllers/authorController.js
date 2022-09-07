const AuthorModel = require("../models/authorModel")

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

module.exports.createAuthor = createAuthor





