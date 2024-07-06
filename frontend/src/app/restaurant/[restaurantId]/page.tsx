// src/pages/restaurant/[restaurantId].tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Shop } from '../../../contexts/shopsContext';

const RestaurantDetailPage: React.FC = () => {
  const router = useRouter();
  const { restaurantId } = router.query; // Get restaurantId from URL query

  const [restaurant, setRestaurant] = useState<Shop | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get<Shop>(`http://localhost:5000/api/shop/${restaurantId}`); // Adjust endpoint as per your API
        setRestaurant(response.data);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      }
    };

    if (restaurantId) {
      fetchRestaurant();
    }
  }, [restaurantId]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{restaurant.name}</h2>
      <img src={restaurant.image} alt={restaurant.name} />
      <p>{restaurant.address}</p>
      <p>{restaurant.description}</p>
      <p>Menu: {JSON.stringify(restaurant.menu)}</p>

      <iframe width="560" height="315" src={restaurant.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      {/* Add more details as needed */}
    </div>
  );
};

export default RestaurantDetailPage;
