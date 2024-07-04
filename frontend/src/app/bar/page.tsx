// src/app/bar/page.tsx

'use client'; // Ensure client-side rendering

import React from 'react';
import { useShops, Shop } from '../../contexts/shopsContext';
import Link from 'next/link'; // Import Link from Next.js

const BarPage: React.FC = () => {
  const { shops } = useShops();
  const barShops = shops.filter(shop => shop.category === 'bar');

  return (
    <div>
      <h2>Bars</h2>
      <ul>
        {barShops.map((shop: Shop) => (
          <li key={shop.id}>
            <img src={shop.image} alt={shop.name} />
            <div>
              <h3>{shop.name}</h3>
              <p>{shop.address}</p>
              <Link href={`/bar/${shop.id}`}>
                <a>View Details</a>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BarPage;
