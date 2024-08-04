const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment')


exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  res.json({ message: 'Logout successful' });
};

exports.getUserWithPostAndComments = async (req, res) => {
  try {
    const { userId, postId } = req.params;

    
    const post = await Post.findOne({
      where: {
        id: postId,
        authorId: userId 
      },
      include: [
        {
          model: User,
          as: 'author', 
          attributes: { exclude: ['password'] }
        }
      ]
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found or does not belong to the user.' });
    }

    
    const comments = await Comment.findAll({
      where: {
        postId: postId
      }
    });

    
    post.comments = comments;

    
    res.json(post);
    
  } catch (error) {
    console.error('Error fetching post with comments:', error);
    res.status(500).json({ message: 'Error fetching post with comments.' });
  }
};