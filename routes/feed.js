const express = require('express')
const { body } = require('express-validator')

const feedController = require("../controller/feed")

const router = express.Router()

router.get('/posts',feedController.getPosts)

// POST /feed/post
router.post('/post', [
    body('title').trim().isLength({min:5}),
    body('content').trim().isLength({min:5})
],feedController.createPost);

module.exports = router