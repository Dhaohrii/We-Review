// src/app/restaurant/page.tsx

'use client'; // Ensure client-side rendering

import React from 'react';
import { useShops, Shop } from '../../contexts/shopsContext';
import Link from 'next/link'; // Import Link from Next.js

const RestaurantPage: React.FC = () => {
  const { shops } = useShops();
  const restaurantShops = shops.filter(shop => shop.category === 'restaurant');

  return (
    <div>
      <h2>Restaurants</h2>
      <ul>
        {restaurantShops.map((shop: Shop) => (
          <li key={shop.id}>
            <img src={shop.image} alt={shop.name} />
            <div>
              <h3>{shop.name}</h3>
              <p>{shop.address}</p>
              <Link href={`/restaurant/${shop.id}`}>
                <a>View Details</a>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantPage;
