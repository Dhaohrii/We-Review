const db=require("../Database/db");
const bcrypt =require("bcrypt");
const { error } = require("console");
const {z}=require("zod");
const { password } = require("../Database/config");

module.exports={
userValidation:z.object({
    fullname:z.string().min(3,"Please Enter a Valid Full Name"),
    email:z.string().email("invalid Email"),
    password:z.string().min(8,"Password must be at least 8 characters"),
    phonenumber:z.string().min(8,"Please enter a valid Number").optional(),
    role: z.enum(['user', 'shopOwner', 'admin']),
    photo: z.string().optional(),
}),
login:z.object({
email:z.string().email("invalid Email"),
password:z.string().min(8,"Password must be at least 8 characters")
}),
getUserByEmail:function(email,callback){
const sql="SELECT * FROM `user` WHERE email=?";
db.query(sql,email,(err,results)=>{
    if(err){
        return callback(err,null)
    }
    return callback(null,results)
})
},   
// Method to add a new user to the database
addUser(userData, callback) {
    const { fullname, email, password, phonenumber, role, photo } = userData;
    const query = 'INSERT INTO user (fullname, email, password, phonenumber, role, photo) VALUES (?, ?, ?, ?, ?, ?)';
    const params = [fullname, email, password, phonenumber, role, photo];

    db.query(query, params, (err, results) => {
      if (err) {
        console.error('Error adding user to database:', err.message);
        callback(err, null);
        return;
      }
      console.log('User added to database successfully:', results);
      callback(null, results);
    });
  }
}