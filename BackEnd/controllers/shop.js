const shop = require('../models/shop');

module.exports = {
  getAllShop: function(req, res) {
    shop.getAll(function(err, results) {
      if (err) {
        console.error('Error fetching all shop:', err.message);
        res.status(500).json({ error: 'Failed to fetch all shop' });
        return;
      }
      res.status(200).json(results);
    });
  },

  getShopById: function(req, res) {
    const shopId = req.params.id;

    shop.getById(shopId, function(err, results) {
      if (err) {
        console.error(`Error fetching shop with ID ${shopId}:`, err.message);
        res.status(500).json({ error: `Failed to fetch shop with ID ${shopId}` });
        return;
      }
      res.status(200).json(results);
    });
  },


  addshop: function(req, res) {
    const { shopOwner_id, name, category, description, address, video, menu, logo } = req.body;

    // Validate required fields
    if (!shopOwner_id ||!name || !category || !description || !address || !video || !menu || !logo ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newShop = {
      shopOwner_id,
      name,
      category,
      description,
      address,
      video,
      menu,
      logo
    };

    shop.add(newShop, function(err, savedShop) {
      if (err) {
        console.error('Error adding shop:', err.message);
        return res.status(500).json({ error: 'Failed to add shop' });
      }
      res.status(200).json({ message: 'Shop added successfully', shop: savedShop });
    });
  },


  updateshop: function(req, res) {
    const shopId = req.params.id;
    const { name, category, description, address, video, menu, logo, like, dislike } = req.body;
  
    if (!menu) {
      console.error('Images is missing or null.');
      res.status(400).json({ error: 'Image is required.' });
      return;
    }
  
    const shops = {
        name,
        category,
        description,
        address,
        video,
        menu,
        logo,
        like,
        dislike
    };
  
    shop.update(shopId, shops, function(err, results) {
      if (err) {
        console.error(`Error updating shop with ID ${shopId}:`, err.message);
        res.status(500).json({ error: `Failed to update shop with ID ${shopId}` });
        return;
      }
      res.status(200).json({ message: `shop with ID ${shopId} updated successfully`, results });
    });
  },

  
  updateLikes: function(req, res) {

    const shopId = req.params.id;
    const {like}=req.body;
    shop.updateLike(shopId, {like}, function(err, results) {
      if (err) {
        console.error(`Error updating shop with ID ${shopId}:`, err.message);
        res.status(500).json({ error: `Failed to update shop with ID ${shopId}` });
        return;
      }
      res.status(200).json({ message: `shop with ID ${shopId} updated successfully`, results });
    });
  },

  updateDislikes: function(req, res) {

    const shopId = req.params.id;
    const {dislike}=req.body;
    shop.updateDislike(shopId, {dislike}, function(err, results) {
      if (err) {
        console.error(`Error updating shop with ID ${shopId}:`, err.message);
        res.status(500).json({ error: `Failed to update shop with ID ${shopId}` });
        return;
      }
      res.status(200).json({ message: `shop with ID ${shopId} updated successfully`, results });
    });
  },

  deleteshop: function(req, res) {
    const shopId = req.params.id;

    shop.delete(shopId, function(err, results) {
      if (err) {
        console.error(`Error deleting shop with ID ${shopId}:`, err.message);
        res.status(500).json({ error: `Failed to delete shop with ID ${shopId}` });
        return;
      }
      res.status(200).json({ message: `shop with ID ${shopId} deleted successfully`, results });
    });
  },

  getByCategory: function(req, res) {
    const categoryName = req.params.category;

    shop.getByCategory(categoryName, function(err, results) {
      if (err) {
        console.error(`Error fetching shop by category ${categoryName}:`, err.message);
        res.status(500).json({ error: `Failed to fetch shop by category ${categoryName}` });
        return;
      }
      res.status(200).json(results);
    });
  },

};