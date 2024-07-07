// pages/login.tsx
'use client'; // Marking this file as client-side
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import styles from './login.module.css'; // Importing CSS module
import { useRouter } from 'next/navigation';


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router=useRouter();
  axios.defaults.withCredentials=true;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password
      });
      if (response.status === 200) {
        router.push("/");
        setTimeout(() => {
          window.location.reload();
        }, 10);
      }

    } catch (error:any) {
      console.log(error)
      setError(error.response.data.error);
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
