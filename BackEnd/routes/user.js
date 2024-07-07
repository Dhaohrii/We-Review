const express=require('express');
const route=express.Router();
const { createUser, checkLogin } = require('../controllers/user');
const userCheck=require("../controllers/LogonChecker")

route.post('/add',createUser);
route.post('/login',checkLogin)
route.get("/isloged",userCheck,(req,res)=>{
    res.status(200).json({user:req.user})
  });

module.exports = route;