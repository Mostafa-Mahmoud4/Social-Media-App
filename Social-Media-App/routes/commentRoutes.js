const express = require('express');
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, commentController.createComment);
router.get('/', commentController.getComments);
router.put('/:id', authMiddleware, commentController.updateComment);
router.delete('/:id', authMiddleware, commentController.deleteComment);

module.exports = router;
