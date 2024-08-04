const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');


exports.createComment = async (req, res) => {
  try {
    const { content, postId } = req.body;
    const comment = await Comment.create({ content, postId, userId: req.user.id });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [{
        model: Post,
        as: 'post',
      }, {
        model: User,
        as: 'user',
        attributes: ['username', 'email']
      }]
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const comment = await Comment.findByPk(id);

    if (!comment || comment.userId !== req.user.id) {
      return res.status(403).json({ error: 'You can only edit your own comments' });
    }

    comment.content = content;
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);

    if (!comment || comment.userId !== req.user.id) {
      return res.status(403).json({ error: 'You can only delete your own comments' });
    }

    await comment.destroy();
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
