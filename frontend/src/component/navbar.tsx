"use client"
import Link from 'next/link';
import React from 'react';
import "./navbar.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const [user, setUser] = useState<any>(null); // Adjusted to any for flexibility
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
  const logoutHandler=async function logout() {
    try {
      const response=await axios.get("http://localhost:5000/api/user/logout")
      alert(response.data.message);
      window.location.reload()
    } catch (error) {
      console.error('Something Wrong',error);
    }
  }
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Link to home page */}
        <Link href="/" passHref>
          <p className="navbar-logo">Logo</p>
        </Link>
        {/* Navbar items */}
        <div className="navbar-items">
          {/* Link to Home */}
          <Link href="/" passHref>
            <p className="navbar-item">Home</p>
          </Link>
          {/* Navbar dropdown */}
          <div className="navbar-dropdown">
            <button className="navbar-dropdown-btn">Shops</button>
            {/* Dropdown content */}
            <div className="navbar-dropdown-content">
              {/* Link to Coffee page */}
              <Link href="/coffee" passHref>
                <p className="navbar-dropdown-item">Coffee</p>
              </Link>
              {/* Link to Restaurant page */}
              <Link href="/restaurant" passHref>
                <p className="navbar-dropdown-item">Restaurant</p>
              </Link>
              {/* Link to Bar page */}
              <Link href="/bar" passHref>
                <p className="navbar-dropdown-item">Bar</p>
              </Link>
            </div>
          </div>
          {/* Link to About Us page */}
          <Link href="/aboutus" passHref>
            <p className="navbar-item">About Us</p>
          </Link>
          {/* Link to Contact Us page */}
          <Link href="/contact" passHref>
            <p className="navbar-item">Contact Us</p>
          </Link>
        </div>
        {/* Navbar search */}
        <div className="navbar-search">
          <input type="text" placeholder="Search..." />
          <button type="submit">Search</button>
        </div>
        {/* Conditional rendering for auth links */}
        {!user? (
          <div className="navbar-auth">
            <Link href="/login" passHref>
              <p className="navbar-auth-item">Login</p>
            </Link>
            <Link href="/register" passHref>
              <p className="navbar-auth-item">Register</p>
            </Link>
          </div>
        ) : (
          <div className="navbar-auth">
            <Link href="/profile" passHref>
              <p className="navbar-auth-item">Profile</p>
            </Link>
            <Link href="/" passHref>
              <p className="navbar-auth-item" onClick={logoutHandler} >Logout</p>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
