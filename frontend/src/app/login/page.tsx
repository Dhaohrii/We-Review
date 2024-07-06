// pages/login.tsx
'use client'; // Marking this file as client-side
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import styles from './login.module.css'; // Importing CSS module

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Example endpoint for login (replace with your actual API endpoint)
      const response = await axios.post('https://api.example.com/login', {
        email,
        password
      });

      // Handle successful login
      console.log('Login successful:', response.data);
      setIsLoggedIn(true); // Set isLoggedIn to true upon successful login

    } catch (error) {
      // Handle login error
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className={styles['login-container']}>
      <h2>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
