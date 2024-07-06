const express=require('express');
const route=express.Router();
const { createUser, checkLogin } = require('../controllers/user');

route.post('/add',createUser);
route.post('/login',checkLogin)

module.exports = route;