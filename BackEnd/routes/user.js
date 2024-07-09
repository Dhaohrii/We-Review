const express = require('express');
const route = express.Router();
const multer = require('multer');
const cloudinary = require('../cloudinary/cloudinary');

const { createUser, checkLogin, logout, getUserInfo, updateUserInfo } = require('../controllers/user');

const userCheck = require("../controllers/LogonChecker");

// Configure Multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Fetch user information
route.get('/info/:id', userCheck, getUserInfo);
// Update user information
route.put('/update', userCheck, upload.single('photo'), updateUserInfo);

// POST endpoint to handle image uploads to Cloudinary
route.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    const file = req.file;

    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'image', upload_preset: 'profile', public_id: 'avatar', allowed_formats: ['png', 'jpg', 'jpeg', 'tif'] },
        (error, result) => {
          if (error) {
            reject(new Error('Cloudinary upload failed'));
          } else {
            resolve(result);
          }
        }
      ).end(file.buffer);
    });

    // Return the URL of the uploaded image
    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error('Error handling image upload:', error.message);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// POST endpoint to create a user with a photo URL from Cloudinary
route.post('/add', upload.single('photo'), createUser);

route.post('/login', checkLogin);
route.get('/logout',logout);
route.get('/get/:id',getUserById)
route.get("/isloged", userCheck, (req, res) => {
  res.status(200).json({ user: req.user });
});
module.exports = route;
