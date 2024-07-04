const express=require('express');
const route=express.Router();
const controller=require("../controllers/user")

route.post('/add',controller.createUser);

module.exports = route;