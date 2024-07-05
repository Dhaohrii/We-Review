const express = require('express');
const router = express.Router();
const controller=require("../controllers/comments")

router.get('/get', controller.getAllComments);
router.get('/get/:id', controller.getCommentsById);
router.post('/add', controller.addComment);
router.put('/update/:id', controller.updateComment);
router.delete('/delete/:id', controller.deleteComment);

module.exports = router;