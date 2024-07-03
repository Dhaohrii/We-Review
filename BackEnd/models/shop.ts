import { Connection, MysqlError } from 'mysql';
const conn: Connection = require('../Database/db');

interface Shop {
  shopOwner_id: number;
  name: string;
  category: string;
  description: string;
  address: string;
  video: string;
  menu: string[];
  logo: string;
  like: number;
  dislike: number;
}

interface Callback<T> {
  (error: MysqlError | null, results: T | null): void;
}

module.exports = {
  getAll(callback: Callback<any>): void {
    const sql = 'SELECT * FROM shop';
    conn.query(sql, (error: MysqlError, results: any) => {
      if (error) {
        console.error('Error fetching all shop:', error.message);
        callback(error, null);
        return;
      }
      callback(null, results);
    });
  },

  add(shop: Shop, callback: Callback<any>): void {
    const { shopOwner_id, name, category, description, address, video, menu, logo, like, dislike } = shop;
    const query = 'INSERT INTO shop (shopOwner_id, name, category, description, address, video, menu, logo, like, dislike) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const params = [shopOwner_id, name, category, description, address, video, JSON.stringify(menu), logo, like, dislike];
    
    conn.query(query, params, (err: MysqlError, results: any) => {
      if (err) {
        console.error('Error adding shop to database:', err.message);
        callback(err, null);
        return;
      }
      console.log('Shop added to database successfully:', results);
      callback(null, results);
    });
  },

  getById(id: number, callback: Callback<any>): void {
    const query = 'SELECT * FROM shop WHERE id = ?';
    conn.query(query, [id], (err: MysqlError, results: any) => {
      if (err) {
        console.error(`Error fetching shop by ID ${id}:`, err.message);
        callback(err, null);
        return;
      }
      console.log(`Shop fetched by ID ${id} successfully:`, results);
      callback(null, results);
    });
  },

  update(id: number, shop: Partial<Shop>, callback: Callback<any>): void {
    const { name, category, description, address, video, menu, logo, like, dislike } = shop;
    const query = 'UPDATE shop SET name = ?, category = ?, description = ?, address = ?, video = ?, menu = ?, logo = ?, like = ?, dislike = ? WHERE id = ?';
    const params = [name, category, description, address, video, JSON.stringify(menu), logo, like, dislike, id];
  
    conn.query(query, params, (err: MysqlError, results: any) => {
      if (err) {
        console.error(`Error updating shop with ID ${id}:`, err.message);
        callback(err, null);
        return;
      }
      console.log(`Shop with ID ${id} updated successfully:`, results);
      callback(null, results);
    });
  },

  delete(id: number, callback: Callback<any>): void {
    const query = 'DELETE FROM shop WHERE id = ?';
    conn.query(query, [id], (err: MysqlError, results: any) => {
      if (err) {
        console.error(`Error deleting shop with ID ${id}:`, err.message);
        callback(err, null);
        return;
      }
      console.log(`Shop with ID ${id} deleted successfully:`, results);
      callback(null, results);
    });
  },

  getByCategory(category: string, callback: Callback<any>): void {
    const query = 'SELECT * FROM shop WHERE category = ?';
    conn.query(query, [category], (err: MysqlError, results: any) => {
      if (err) {
        console.error(`Error fetching shop by Category ${category}:`, err.message);
        callback(err, null);
        return;
      }
      console.log(`Shop fetched by Category ${category} successfully:`, results);
      callback(null, results);
    });
  }
}
