"use client";
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div>
        <p>&copy; {new Date().getFullYear()} We review</p>
      </div>
    </footer>
  );
};

export default Footer;
