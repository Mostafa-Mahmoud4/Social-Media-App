const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', authMiddleware, userController.logout);
router.get('/:userId/posts/:postId', authMiddleware, userController.getUserWithPostAndComments);

module.exports = router;
