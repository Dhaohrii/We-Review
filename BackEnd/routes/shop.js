const express = require('express');
const router = express.Router();
const controller=require("../controllers/shop")


router.get('/get', controller.getAllShop);
router.get('/get/:id', controller.getShopById);
router.get('/category/:category', controller.getByCategory);
router.post('/add', controller.addshop);
router.put('/update/:id', controller.updateshop);
router.delete('/delete/:id', controller.deleteshop);

module.exports = router;

