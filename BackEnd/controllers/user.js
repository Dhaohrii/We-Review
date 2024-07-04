const model = require("../models/user");
const bcrypt = require("bcrypt");
module.exports={
    async createUser(req,res){
        
        try{
            const validUser=model.userValidation.parse(req.body);
            const hash = await bcrypt.hash(validUser.password,10);
        validUser.password=hash;
        model.addUser(validUser,(err,results)=>{
            if(err){
               return res.status(500).json({ error: 'Error adding user to the database' })
            }
                res.status(201).json({message:'User created successfully'})
        })
        }
        catch(error){
            console.error('Error hashing password:', error);
            res.status(500).json({ error: 'Error hashing password' });
        }
        

    }
}