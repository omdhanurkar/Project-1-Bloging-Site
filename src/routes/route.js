const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const blogController = require('../controllers/blogController')

router.post("/authors", authorController.createAuthor);
router.post("/blogs", blogController.createBlog);

router.get("/getBlogs", blogController.getBlogs);
// router.put("/update",blogController.update)
router.put("/updateblogs/:blogId", blogController.updateBlogs);
router.delete("/deleteblogs/:blogId", blogController.deleteblog);

router.delete("/deleteBlog", blogController.deleteByQuery);
module.exports = router;

