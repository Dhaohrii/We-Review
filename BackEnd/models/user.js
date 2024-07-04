const db=require("../Database/db");
const bcrypt =require("bcrypt");
const { error } = require("console");
const {z}=require("zod");

module.exports={
userValidation:z.object({
    fullname:z.string().min(3,"Please Enter a Valid Full Name"),
    email:z.string().email("invalid Email"),
    password:z.string().min(8,"Password must be at least 8 characters"),
    phonenumber:z.string().min(8,"Please enter a valid Number").optional(),
    role: z.enum(['user', 'shopOwner', 'admin']),
    photo: z.string().optional(),
}),   
addUser: function(user,callback){
    const sql="INSERT INTO `user` SET ?";
    db.query(sql,user,(err,results)=>{
        if(err){
            return callback(err,null)
        }
        return callback(null,results)
    });
}

}