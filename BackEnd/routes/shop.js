const express = require('express');
const router = express.Router();
const controller=require("../controllers/shop")

>>>>>>> 869d9757c5c53e59cea59c39e9f456f47d55c49a

router.get('/get', controller.getAllShop);
router.get('/get/:id', controller.getShopById);
router.get('/category/:category', controller.getByCategory);
router.post('/add', controller.addshop);
router.put('/update/:id', controller.updateshop);
router.delete('/delete/:id', controller.deleteshop);

module.exports = router;

