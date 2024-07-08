"use client"
import { useState } from 'react';
import axios from 'axios';
import { z } from 'zod';
import styles from './register.module.css';

// Register component for user registration
export default function Register() {
  // State hooks for form data
  const [fullname, setfullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [photo, setphoto] = useState<File | null>(null);
  const [role, setRole] = useState('client');
  const [error, setError] = useState<{[key:string]:string}>({});

  // Validation schema using Zod
  const userValidation = z.object({
    fullname: z.string().min(3, "Please Enter a Valid Full Name"),
    email: z.string().email("Invalid Email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    phonenumber: z.string().min(8, "Please enter a valid Number").optional(),
    role: z.enum(['user', 'shopOwner', 'admin'], { message: "Please Select your Account Type" }),
    photo: z.string().optional(), // Adjust according to your schema
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phonenumber', phonenumber);
    if (photo) {
      formData.append('photo', photo); // Ensure `photo` is a File object
    }
    formData.append('role', role);

    try {
      // Client-side validation
      const validUser = userValidation.parse({
        fullname,
        email,
        password,
        phonenumber,
        role,
        photo: photo ? photo.name : '', // Adjust according to your schema
      });

      // Upload the image to the server and get the Cloudinary URL
      const uploadResponse = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const photoUrl = uploadResponse.data.url;

      // Add photo URL to user data
      validUser.photo = photoUrl;

      // Send user data to the server
      axios.post("http://localhost:5000/api/user/add", validUser)
        .then(() => {
          alert("User Added");
        })
        .catch((error) => {
          alert("Failed to add user. Please try again later.");
          console.error('Error adding user:', error);
        });
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        let newError: {[key:string]:string}={};
        error.errors.forEach((err)=>{
          newError[err.path[0]]=err.message;
        })
        setError(newError)
      } 
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Register</h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className={styles.formGroup}>
          {error.fullname && <p className={styles.error}>{error.fullname}</p>}
          <label className={styles.label}>Full Name</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setfullname(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          {error.email && <p className={styles.error}>{error.email}</p>}
          <label className={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          {error.password && <p className={styles.error}>{error.password}</p>}
          <label className={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          {error.phonenumber && <p className={styles.error}>{error.phonenumber}</p>}
          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            value={phonenumber}
            onChange={(e) => setphonenumber(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          {error.photo && <p className={styles.error}>{error.photo}</p>}
          <label className={styles.label}>Photo</label>
          <input
            type="file"
            onChange={(e) => setphoto(e.target.files ? e.target.files[0] : null)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          {error.role && <p className={styles.error}>{error.role}</p>}
          <label className={styles.label}>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={styles.select}
          >
            <option value="shopOwner">Shop Owner</option>
            <option value="user">User</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>Register</button>
      </form>
    </div>
  );
}
