// src/pages/coffee/[coffeeId].tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Shop } from '../../../contexts/shopsContext';

const CoffeeDetailPage: React.FC = () => {
  const router = useRouter();
  const { coffeeId } = router.query; // Get coffeeId from URL query

  const [coffeeShop, setCoffeeShop] = useState<Shop | null>(null);

  useEffect(() => {
    const fetchCoffeeShop = async () => {
      try {
        const response = await axios.get<Shop>(`http://localhost:5000/api/shop/${coffeeId}`); // Adjust endpoint as per your API
        setCoffeeShop(response.data);
      } catch (error) {
        console.error('Error fetching coffee shop details:', error);
      }
    };

    if (coffeeId) {
      fetchCoffeeShop();
    }
  }, [coffeeId]);

  if (!coffeeShop) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{coffeeShop.name}</h2>
      <img src={coffeeShop.image} alt={coffeeShop.name} />
      <p>{coffeeShop.address}</p>
      <p>{coffeeShop.description}</p>
      <p>Menu: {JSON.stringify(coffeeShop.menu)}</p>

      <iframe width="560" height="315" src={coffeeShop.video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      {/* Add more details as needed */}
    </div>
  );
};

export default CoffeeDetailPage;
