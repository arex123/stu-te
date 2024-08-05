const express = require('express')
const formController = require('../controller/form')
const router = express.Router()

router.get('/',formController.loadWeb)

router.post('/createBlog',formController.createBlog)

router.get('/getBlogs',formController.getBlogs)

router.post('/addComment',formController.addComment)
router.delete('/deleteComment/:id',formController.delComment)

module.exports = router