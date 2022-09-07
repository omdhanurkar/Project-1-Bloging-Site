const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const blogController = require('../controllers/blogController')
const middleware = require('../middlewares/commonMiddleware');



router.post("/authors", authorController.createAuthor);

router.get("/login",authorController.loginAuthor);

router.post("/blogs",middleware.authenticate, blogController.createBlog);

router.get("/getBlogs",middleware.authenticate, blogController.getBlogs);

router.put("/updateblogs/:blogId",middleware.authenticate, blogController.updateBlogs);

router.put("/updateblogs/:blogId",middleware.authenticate, blogController.updateBlogs);

router.delete("/deleteblogs/:blogId", blogController.deleteblog);

router.delete("/deleteBlog",middleware.authenticate, blogController.deleteByQuery);



module.exports = router;

