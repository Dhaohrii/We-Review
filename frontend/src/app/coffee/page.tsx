// src/app/coffee/page.tsx
'use client'; // Ensure client-side rendering

import React from 'react';
import { useShops } from '../../contexts/shopsContext';

const CoffeePage: React.FC = () => {
  const { shops } = useShops();
  const coffeeShops = shops.filter(shop => shop.category === 'coffee');

  return (
    <div>
      <h2>Coffee Shops</h2>
      <ul>
        {coffeeShops.map(shop => (
          <li key={shop.id}>
            <img src={shop.image} alt={shop.name} />
            <div>
              <h3>{shop.name}</h3>
              <p>{shop.address}</p>
              <button onClick={() => console.log(`Details for ${shop.name}`)}>
                View Details
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoffeePage;
