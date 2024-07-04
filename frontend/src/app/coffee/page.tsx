// src/app/coffee/page.tsx

'use client'; // Ensure client-side rendering

import React from 'react';
import { useShops, Shop } from '../../contexts/shopsContext';
import Link from 'next/link'; // Import Link from Next.js

const CoffeePage: React.FC = () => {
  const { shops } = useShops();
  const coffeeShops = shops.filter(shop => shop.category === 'coffee');

  return (
    <div>
      <h2>Coffee Shops</h2>
      <ul>
        {coffeeShops.map((shop: Shop) => (
          <li key={shop.id}>
            <img src={shop.image} alt={shop.name} />
            <div>
              <h3>{shop.name}</h3>
              <p>{shop.address}</p>
              <Link href={`/coffee/${shop.id}`}>
                <a>View Details</a>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoffeePage;
