const model=require("../models/user");
const bcrypt=require("bcrypt");
const {getToken}=require('./jwtGen.js');


    async function createUser(req,res){
        
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

    async function checkLogin(req, res) {
        try {
            const { email, password } = req.body;
    
            model.getUserByEmail(email, async (err, results) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: 'Database error' });
                }
    
                if (!results || results.length === 0) {
                    return res.status(404).json({ error: 'User not found' });
                }
    
                const user = results[0]; // Assuming there should be only one user with the given email
    
                try {
                    // Check if user.password exists before comparing
                    if (user.password) {
                        const isValidPassword = await bcrypt.compare(password, user.password);
                        if (isValidPassword) {
                            const token = getToken(user.id, user.email, user.fullname, user.role);
                            res.cookie('token',token,{httpOnly:true,maxAge:1000*60*60})
                            res.status(200).json({ message: 'Login successful' });
                        } else {
                            res.status(401).json({ error: 'Invalid password' });
                        }
                    } else {
                        res.status(500).json({ error: 'User data not in expected format' });
                    }
                } catch (error) {
                    console.error('Error comparing passwords:', error);
                    res.status(500).json({ error: 'Error comparing passwords' });
                }
            });
        } catch (error) {
            console.error("Internal server error:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    
    async function logout(req, res) {
        try{
            res.clearCookie("token")
            res.status(200).json({ message: 'Logout successful' })
        }
         catch (error) {
            console.error("Internal server error:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
        
    }
    async function getUserInfo(req, res) {
        try {
          const id = req.params.id;
          const user = await model.getUserById(id);
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
          res.status(200).json(user);
        } catch (error) {
          console.error('Error fetching user information:', error.message);
          res.status(500).json({ error: 'Failed to fetch user information' });
        }
      }
      
      async function updateUserInfo(req, res) {
        try {
          const userId = req.user.id;
          const updatedData = { ...req.body };
      
          if (req.file) {
            const result = await new Promise((resolve, reject) => {
              cloudinary.uploader.upload_stream({ resource_type: 'image' }, { upload_preset: 'profile', public_id: 'avatar', allowed_formats: ['png', 'jpg', 'jpeg', 'tif'] }, (error, result) => {
                if (error) reject(new Error('Cloudinary upload failed'));
                else resolve(result);
              }).end(req.file.buffer);
            });
            updatedData.photo = result.secure_url;
          }
      
          if (updatedData.password) {
            const hash = await bcrypt.hash(updatedData.password, 10);
            updatedData.password = hash;
          }
      
          await model.updateUser(userId, updatedData);
          res.status(200).json({ message: 'User information updated successfully' });
        } catch (error) {
          console.error('Error updating user information:', error.message);
          res.status(500).json({ error: 'Failed to update user information' });
        }
    }

    async function getUserById(req, res) {
        const userId = req.params.id;
    
        model.getById(userId, function(err, results) {
          if (err) {
            console.error(`Error fetching user with ID ${userId}:`, err.message);
            res.status(500).json({ error: `Failed to fetch user with ID ${userId}` });
            return;
          }
          res.status(200).json(results);
        });
      }
module.exports = { createUser, checkLogin , logout, getUserInfo, updateUserInfo};
