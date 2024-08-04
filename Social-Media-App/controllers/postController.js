const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({ title, content, authorId: req.user.id });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id, {
      include: [{
        model: User,
        as: 'author',
        attributes: ['username', 'email']
      }]
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await Post.findByPk(id);

    if (!post || post.authorId !== req.user.id) {
      return res.status(403).json({ error: 'You can only edit your own posts' });
    }

    post.title = title;
    post.content = content;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);

    if (!post || post.authorId !== req.user.id) {
      return res.status(403).json({ error: 'You can only delete your own posts' });
    }

    await post.destroy();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPostWithAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id, {
      include: {
        model: User,
        as: 'author',
        attributes: ['username', 'email']
      }
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
