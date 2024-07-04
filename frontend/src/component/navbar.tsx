"use client";

import Link from 'next/link';

import "./navbar.css"
const Navbar: React.FC = () => {
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
                    <Link href="/contact" passHref>
                        <p className="navbar-item">Contact Us </p>
                    </Link>
                </div>
                {/* Navbar search */}
                <div className="navbar-search">
                    <input type="text" placeholder="Search..." />
                    <button type="submit">Search</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
