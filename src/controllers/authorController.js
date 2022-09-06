const AuthorModel = require("../models/authorModel")

// const isValidEmail = (value) => {
//     return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value.trim())
//     //till $/regex
// }

const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        let savedData = await AuthorModel.create(data)
        res.status(201).send({ msg: savedData })
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

module.exports.createAuthor = createAuthor





