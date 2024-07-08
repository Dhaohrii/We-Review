const conn = require('../Database/db');

module.exports = {
  getAll(callback) {
    const sql = 'SELECT * FROM comments';
    conn.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching all comments:', error.message);
        callback(error, null);
        return;
      }
      callback(null, results);
    });
  },

  add(commentsData, callback) {
    const { comment, id_shop, id_user } = commentsData;

    const query = 'INSERT INTO comments (comment, id_shop, id_user) VALUES (?, ?, ?)';
    const params = [comment, id_shop, id_user];

    conn.query(query, params, (err, results) => {
      if (err) {
        console.error('Error adding comments to database:', err.message);
        callback(err, null);
        return;
      }
      console.log('comments added to database successfully:', results);
      callback(null, results);
    });
  },

  getById(id, callback) {
    const query = 'SELECT * FROM comments WHERE id_shop = ?';
    conn.query(query, [id], (err, results) => {
      if (err) {
        console.error(`Error fetching comments by ID ${id}:`, err.message);
        callback(err, null);
        return;
      }
      console.log(`comments fetched by ID ${id} successfully:`, results);
      callback(null, results);
    });
  },

  update(id, comments, callback) {
    const {comment, id_shop, id_user } = comments;
    const query = 'UPDATE comments SET  comment=?, id_shop = ?, id_user = ? WHERE id = ?';
    const params = [comment, id_shop, id_user,id];
  
    conn.query(query, params, (err, results, fields) => {
      if (err) {
        console.error(`Error updating comments with ID ${id}:`, err.message);
        callback(err, null);
        return;
      }
      console.log(`comments with ID ${id} updated successfully:`, results);
      callback(null, results);
    });
  },

  delete(id, callback) {
    const query = 'DELETE FROM comments WHERE id = ?';
    conn.query(query, [id], (err, results) => {
      if (err) {
        console.error(`Error deleting comments with ID ${id}:`, err.message);
        callback(err, null);
        return;
      }
      console.log(`comments with ID ${id} deleted successfully:`, results);
      callback(null, results);
    });
  },
}