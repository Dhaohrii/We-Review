'use client';

import React from 'react';
import { useShops, Shop } from '../../contexts/shopsContext';
import Link from 'next/link';
import styles from './coffee.module.css';

const CoffeePage: React.FC = () => {
  const { shops } = useShops();
  const coffeeShops = shops.filter((shop: Shop) => shop.category === 'coffee');

  return (
    <div className={styles.coffeeContainer}>
      <div className={styles.coffeeList}>
        {coffeeShops.map((shop: Shop) => (
          <div key={shop.id} className={styles.coffeeCard}>
            <img className={styles.coffeeImage} src={shop.logo} alt={shop.name} />
            <div className={styles.coffeeDetails}>
              <h3>{shop.name}</h3>
              <p>{shop.address}</p>
              <Link href={`/coffee/${shop.id}`}>
                <span className={styles.detailsButton}>View Details</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoffeePage;
