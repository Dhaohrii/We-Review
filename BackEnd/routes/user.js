const express=require('express');
const route=express.Router();
const multer = require('multer');
const cloudinary = require('../cloudinary/cloudinary');
const { createUser, checkLogin } = require('../controllers/user');
const userCheck=require("../controllers/LogonChecker")

// Configure Multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST endpoint to handle image uploads to Cloudinary
route.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    const file = req.file;

    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) {
          reject(new Error('Cloudinary upload failed'));
        } else {
          resolve(result);
        }
      }).end(file.buffer);
    });

    // Return the URL of the uploaded image
    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error('Error handling image upload:', error.message);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// POST endpoint to create a user with a photo URL from Cloudinary
route.post('/add', upload.single('photo'), async (req, res) => {
  const { fullname, email, password, phonenumber, role } = req.body;

  try {
    let photoUrl = '';
    if (req.file) {
      // Upload image to Cloudinary if a file is provided
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) {
            reject(new Error('Cloudinary upload failed'));
          } else {
            resolve(result);
          }
        }).end(req.file.buffer);
      });
      photoUrl = result.secure_url;
    }

    // Create user data with the photo URL
    const userData = {
      fullname,
      email,
      password,
      phonenumber,
      role,
      photo: photoUrl, // Photo URL from Cloudinary
    };

    // Call createUser controller with the user data
    createUser(userData, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save user data' });
      }
      res.status(200).json({ message: 'User data saved successfully', results });
    });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

route.post('/login', checkLogin);

route.get("/isloged", userCheck, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = route;