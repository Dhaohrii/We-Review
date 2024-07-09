const express = require('express');
const router = express.Router();
const controller=require("../controllers/shop")


router.get('/get', controller.getAllShop);
router.get('/get/:id', controller.getShopById);
router.get('/getuser/:shopOwnerId',controller. getShopByShopOwnerId)
router.get('/category/:category', controller.getByCategory);
router.post('/add', controller.addshop);
router.put('/update/:id', controller.updateshop);
router.put('/like/:id', controller.updateLikes);
router.put('/dislike/:id', controller.updateDislikes);
router.delete('/delete/:id', controller.deleteshop);

module.exports = router;

