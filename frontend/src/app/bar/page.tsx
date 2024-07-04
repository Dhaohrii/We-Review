// src/app/bar/page.tsx
'use client'; // Ensure client-side rendering

import React from 'react';
import { useShops, Shop } from '../../contexts/shopsContext';
import Link from 'next/link'; // Import Link from Next.js
import styles from './bar.module.css'; // Import the styles

const BarPage: React.FC = () => {
  const { shops } = useShops();
  const barShops = shops.filter(shop => shop.category === 'bar');

  return (
    <div className={styles.coffeeContainer}>
      <h2>Bars</h2>
      <div className={styles.coffeeList}>
        {barShops.map((shop: Shop) => (
          <div key={shop.id} className={styles.coffeeCard}>
            <img src={shop.logo} alt={shop.name} className={styles.coffeeImage} />
            <div className={styles.coffeeDetails}>
              <h3>{shop.name}</h3>
              <p>{shop.address}</p>
              <Link href={`/bar/${shop.id}`}>
                <span className={styles.detailsButton}>View Details</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarPage;
