const express = require('express');
const router = express.Router();
const {
  getAllShop,
  getShopById,
  addShop,
  updateShop,
  deleteShop,
  getByCategory,
 
} = require('../controllers/shop');

router.get('/', getAllShop);
router.get('/:id', getShopById);
router.get('/category/:category', getByCategory);
router.post('/', addShop);
router.put('/:id', updateShop);
router.delete('/:id', deleteShop);


module.exports = router;

