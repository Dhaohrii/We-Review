const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const controller= require('../controllers/shop');
=======

>>>>>>> 869d9757c5c53e59cea59c39e9f456f47d55c49a

router.get('/', controller.getAllShop);
router.get('/:id', controller.getShopById);
router.get('/category/:category', controller.getByCategory);
router.post('/', controller.addshop);
router.put('/:id', controller.updateshop);
router.delete('/:id', controller.deleteshop);

module.exports = router;

