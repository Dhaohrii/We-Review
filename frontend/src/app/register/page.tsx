"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './register.module.css';


const Register = () => {
  const [fullname, setfullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [photo, setphoto] = useState<File | null>(null);
  const [role, setRole] = useState('client');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phonenumber', phonenumber);
    if (photo) {
      formData.append('photo', photo);
    }
    formData.append('role', role);

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      setError(data.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Register</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className={styles.formGroup}>
      <label className={styles.label}>fullname</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setfullname(e.target.value)}
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
          <label className={styles.label}>phonenumber</label>
          <input
            type="text"
            value={phonenumber}
            onChange={(e) => setphonenumber(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>photo</label>
          <input
            type="file"
            onChange={(e) => setphoto(e.target.files ? e.target.files[0] : null)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}
            className={styles.select}>
            <option value="shopOwner">ShopOwner</option>
            <option value="user">User</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>Register</button>
      </form>
    </div>
  );}