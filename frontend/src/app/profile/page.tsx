"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './profile.module.css';

interface User {
  fullname: string;
  email: string;
  phonenumber: string;
  photo: string;
  role: string;
}

interface Shop {
  id: string;
  name: string;
  description: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [shops, setShops] = useState<Shop[]>([]);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  useEffect(() => {
    // Fetch user information
    axios.get(`http://localhost:5000/api/user/info/${user.id}`)
      .then(response => {
        setUser(response.data);
        setFullname(response.data.fullname);
        setEmail(response.data.email);
        setPhonenumber(response.data.phonenumber);
        // If user is shop owner, fetch shops
        if (response.data.role === 'shopOwner') {
          axios.get('http://localhost:5000/api/shop/getuser/:shopOwnerId')
            .then(response => setShops(response.data))
            .catch(error => console.error('Error fetching shops:', error));
        }
      })
      .catch(error => console.error('Error fetching user information:', error));
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phonenumber', phonenumber);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      await axios.put('http://localhost:5000/api/user/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Profile</h1>
      <form onSubmit={handleUpdate} encType="multipart/form-data">
        <div className={styles.formGroup}>
          <label className={styles.label}>Full Name</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Photo</label>
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Update</button>
      </form>
      {user.role === 'shopOwner' && (
        <div className={styles.shopsContainer}>
          <h2 className={styles.subheading}>My Shops</h2>
          <button className={styles.button}>Add New Shop</button>
          <div className={styles.shops}>
            {shops.map((shop) => (
              <div key={shop.id} className={styles.shop}>
                <h3 className={styles.shopName}>{shop.name}</h3>
                <p className={styles.shopDescription}>{shop.description}</p>
                <button className={styles.button}>Edit</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
