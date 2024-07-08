const conn = require('../Database/db');

module.exports = {
  getAll(callback) {
    const sql = 'SELECT * FROM shop';
    conn.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching all shop:', error.message);
        callback(error, null);
        return;
      }
      callback(null, results);
    });
  },

  add(shopData, callback) {
    const { shopOwner_id, name, category, description, address, video, menu, logo } = shopData;

    const query = 'INSERT INTO shop (shopOwner_id, name, category, description, address, video, menu, logo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const params = [shopOwner_id, name, category, description, address, video, JSON.stringify(menu), logo];

    conn.query(query, params, (err, results) => {
      if (err) {
        console.error('Error adding shop to database:', err.message);
        callback(err, null);
        return;
      }
      console.log('Shop added to database successfully:', results);
      callback(null, results);
    });
  },

  getById(id, callback) {
    const query = 'SELECT * FROM shop WHERE id = ?';
    conn.query(query, [id], (err, results) => {
      if (err) {
        console.error(`Error fetching shop by ID ${id}:`, err.message);
        callback(err, null);
        return;
      }
      console.log(`Shop fetched by ID ${id} successfully:`, results);
      callback(null, results);
    });
  },

  update(id, shop, callback) {
    const { name, category, description, address, video, menu, logo, like, dislike } = shop;
    const query = 'UPDATE shop SET name = ?, category = ?, description = ?, address = ?, video = ?, menu = ?, logo = ?, \`like\` = ?, dislike= ? WHERE id = ?';
    const params = [name, category, description, address, video, JSON.stringify(menu), logo, like, dislike,id];
  
    conn.query(query, params, (err, results, fields) => {
      if (err) {
        console.error(`Error updating shop with ID ${id}:`, err.message);
        callback(err, null);
        return;
      }
      console.log(`Shop with ID ${id} updated successfully:`, results);
      callback(null, results);
    });
  },

  updateLike(id, shop, callback) {
    const { like} = shop;
    const query = 'UPDATE shop SET `like` = ? WHERE id = ?';
    const params = [like,id];
  
    conn.query(query, params, (err, results, fields) => {
      if (err) {
        console.error(`Error updating shop with ID ${id}:`, err.message);
        callback(err, null);
        return;
      }
      console.log(`Shop with ID ${id} updated successfully:`, results);
      callback(null, results);
    });
  },

  updateDislike(id, shop, callback) {
    const { dislike } = shop;
    const query = 'UPDATE shop SET `dislike` = ? WHERE id = ?';
    const params = [dislike,id];
  
    conn.query(query, params, (err, results, fields) => {
      if (err) {
        console.error(`Error updating shop with ID ${id}:`, err.message);
        callback(err, null);
        return;
      }
      console.log(`Shop with ID ${id} updated successfully:`, results);
      callback(null, results);
    });
  },

  delete(id, callback) {
    const query = 'DELETE FROM shop WHERE id = ?';
    conn.query(query, [id], (err, results) => {
      if (err) {
        console.error(`Error deleting shop with ID ${id}:`, err.message);
        callback(err, null);
        return;
      }
      console.log(`Shop with ID ${id} deleted successfully:`, results);
      callback(null, results);
    });
  },

  getByCategory(category, callback) {
    const query = 'SELECT * FROM shop WHERE category = ?';
    conn.query(query, [category], (err, results) => {
      if (err) {
        console.error(`Error fetching shop by ID ${category}:`, err.message);
        callback(err, null);
        return;
      }
      console.log(`Shop fetched by Category ${category} successfully:`, results);
      callback(null, results);
    });
  },

  
}