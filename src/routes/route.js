const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const blogController = require('../controllers/blogController')
const middleware = require('../middlewares/commonMiddleware');


router.post("/authors", authorController.createAuthor); //Post api to create author

router.post("/login", authorController.loginAuthor); //Post api to login

router.post("/blogs", middleware.authenticate, blogController.createBlog);  //post api to create blog

router.get("/getBlogs", middleware.authenticate, blogController.getBlogs);  //get api to get blog

router.put("/updateblogs/:blogId", middleware.authenticate, middleware.authorise, blogController.updateBlogs);  //put api to update blog

 router.delete("/deleteblogs/:blogId", middleware.authenticate, middleware.authorise, blogController.deleteblog); // delete api to delete blog

router.delete("/deleteBlog", middleware.authenticate, middleware.authorise, blogController.deleteByQuery); //delete api to deleteByQuery the blog



module.exports = router;

