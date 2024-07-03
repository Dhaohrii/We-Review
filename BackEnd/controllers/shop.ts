import { Request, Response } from 'express';
import shop from '../models/shop';

module.exports = {
  getAllShop: function (req: Request, res: Response): void {
    shop.getAll((err: Error, results: any) => {
      if (err) {
        console.error('Error fetching all shop:', err.message);
        res.status(500).json({ error: 'Failed to fetch all shop' });
        return;
      }
      res.status(200).json(results);
    });
  },

  getShopById: function (req: Request, res: Response): void {
    const shopId = parseInt(req.params.id, 10);

    shop.getById(shopId, (err: Error, results: any) => {
      if (err) {
        console.error(`Error fetching shop with ID ${shopId}:`, err.message);
        res.status(500).json({ error: `Failed to fetch shop with ID ${shopId}` });
        return;
      }
      res.status(200).json(results);
    });
  },

  addShop: function (req: Request, res: Response): void {
    const { shopOwner_id, name, category, description, address, video, menu, logo, like, dislike } = req.body;
    const newShop = {
      shopOwner_id,
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

    shop.add(newShop, (err: Error, results: any) => {
      if (err) {
        console.error('Error adding shop:', err.message);
        res.status(500).json({ error: 'Failed to add shop' });
        return;
      }
      res.status(200).json({ message: 'Shop added successfully', results });
    });
  },

  updateShop: function (req: Request, res: Response): void {
    const shopId = parseInt(req.params.id, 10);
    const { name, category, description, address, video, menu, logo, like, dislike } = req.body;

    if (!menu) {
      console.error('Menu is missing or null.');
      res.status(400).json({ error: 'Menu is required.' });
      return;
    }

    const updatedShop = {
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

    shop.update(shopId, updatedShop, (err: Error, results: any) => {
      if (err) {
        console.error(`Error updating shop with ID ${shopId}:`, err.message);
        res.status(500).json({ error: `Failed to update shop with ID ${shopId}` });
        return;
      }
      res.status(200).json({ message: `Shop with ID ${shopId} updated successfully`, results });
    });
  },

  deleteShop: function (req: Request, res: Response): void {
    const shopId = parseInt(req.params.id, 10);

    shop.delete(shopId, (err: Error, results: any) => {
      if (err) {
        console.error(`Error deleting shop with ID ${shopId}:`, err.message);
        res.status(500).json({ error: `Failed to delete shop with ID ${shopId}` });
        return;
      }
      res.status(200).json({ message: `Shop with ID ${shopId} deleted successfully`, results });
    });
  },

  getByCategory: function (req: Request, res: Response): void {
    const categoryName = req.params.category;

    shop.getByCategory(categoryName, (err: Error, results: any) => {
      if (err) {
        console.error(`Error fetching shop by category ${categoryName}:`, err.message);
        res.status(500).json({ error: `Failed to fetch shop by category ${categoryName}` });
        return;
      }
      res.status(200).json(results);
    });
  },
};
