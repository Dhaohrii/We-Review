const express = require('express');
const router = express.Router();
const controler= require('../controllers/shop');

router.get('/', getAllShop);
router.get('/:id', getShopById);
router.get('/category/:category', getByCategory);
router.post('/', addShop);
router.put('/:id', updateShop);
router.delete('/:id', deleteShop);

module.exports = router;

