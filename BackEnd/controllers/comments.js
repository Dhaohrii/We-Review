const comments = require('../models/comments');

module.exports = {
  getAllComments: function(req, res) {
    comments.getAll(function(err, results) {
      if (err) {
        console.error('Error fetching all comments:', err.message);
        res.status(500).json({ error: 'Failed to fetch all comments' });
        return;
      }
      res.status(200).json(results);
    });
  },

  getCommentsById: function(req, res) {
    const commentId = req.params.id;

    comments.getById(commentId, function(err, results) {
      if (err) {
        console.error(`Error fetching comment with ID ${commentId}:`, err.message);
        res.status(500).json({ error: `Failed to fetch comment with ID ${commentId}` });
        return;
      }
      res.status(200).json(results);
    });
  },


  addComment: function(req, res) {
    const { comment, id_shop, id_user } = req.body;

    // Validate required fields
    if (!comment || !id_shop || !id_user ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newComment = {
      comment,
      id_shop,
      id_user
    };

 comments.add(newComment, function(err, savedComment) {
      if (err) {
        console.error('Error adding shop:', err.message);
        return res.status(500).json({ error: 'Failed to add comment' });
      }
      res.status(200).json({ message: 'Comment added successfully', comments: savedComment });
    });
  },




  updateComment: function(req, res) {
    const commentId = req.params.id;
    const { comment } = req.body;
  
    if (!comment) {
      console.error('Comment is missing or null.');
      res.status(400).json({ error: 'Comment is required.' });
      return;
    }
  
    const Comment = {
       comment
    };
  
    comments.update(commentId, Comment, function(err, results) {
      if (err) {
        console.error(`Error updating comment with ID ${commentId}:`, err.message);
        res.status(500).json({ error: `Failed to update comment with ID ${commentId}` });
        return;
      }
      res.status(200).json({ message: `comment with ID ${commentId} updated successfully`, results });
    });
  },

  deleteComment: function(req, res) {
    const commentId = req.params.id;

    shop.delete(commentId, function(err, results) {
      if (err) {
        console.error(`Error deleting comment with ID ${commentId}:`, err.message);
        res.status(500).json({ error: `Failed to delete comment with ID ${commentId}` });
        return;
      }
      res.status(200).json({ message: `comment with ID ${commentId} deleted successfully`, results });
    });
  },
}