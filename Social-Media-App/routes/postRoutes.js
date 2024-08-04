const express = require('express');
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, postController.createPost);
router.get('/:id', postController.getPost);
router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);
router.get('/:id/author', postController.getPostWithAuthor);

module.exports = router;
