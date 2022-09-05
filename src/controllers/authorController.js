const AuthorModel= require("../models/authorModel")

const isValidEmail = (value) => { 
        return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value.trim()) 
    //till $/regex
    }
   
const createAuthor= async function (req, res) {
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.status(201).send({data: authorCreated})
}




module.exports.createAuthor= createAuthor


