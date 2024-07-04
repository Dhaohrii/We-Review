// components/Navbar.tsx
import Link from 'next/link';
import React from 'react';
import "./navbar.css"

interface NavbarProps {
  isLoggedIn?: boolean; // Make isLoggedIn optional
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn = false }) => {
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
        {!isLoggedIn ? (
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
            <Link href="/logout" passHref>
              <p className="navbar-auth-item">Logout</p>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
