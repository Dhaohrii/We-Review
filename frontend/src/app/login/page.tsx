// pages/login.tsx
'use client'; // Marking this file as client-side
import React, { useState , useEffect} from 'react';
import axios from 'axios'; // Import Axios
import styles from './login.module.css'; // Importing CSS module
import { useRouter } from 'next/navigation';


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router=useRouter();
  const [user,setUser]=useState<any>();
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
      }

    } catch (error:any) {
      console.log(error)
      setError(error.response.data.error);
    }
  };
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/isloged', { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        console.error('Error checking login status:', error);
        setUser(null); // Handle error or set user to null
      }
    };

    checkLoginStatus();
  }, []);
  useEffect(()=>{
    if(user){
      router.push('/')
    }
  })

  return (
    <div className={styles['login-container']}>
      {!user && (
        <>
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
        </>
      )}
    </div>
  );
};

export default LoginPage;
