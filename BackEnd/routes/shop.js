const express = require('express');
const router = express.Router();


router.get('/', controller.getAllShop);
router.get('/:id', controller.getShopById);
router.get('/category/:category', controller.getByCategory);
router.post('/', controller.addshop);
router.put('/:id', controller.updateshop);
router.delete('/:id', controller.deleteshop);

module.exports = router;

