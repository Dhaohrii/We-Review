"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Shop } from '../../../contexts/shopsContext';

const RestaurantDetailPage: React.FC = () => {
  const params = useParams();
  const restaurantId = params.Id;

  const [restaurant, setRestaurant] = useState<Shop | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/shop/get/${restaurantId}`); // Adjust endpoint as per your API
        setRestaurant(response.data[0]);
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
    <div className="shop-detail">
      <h2>{restaurant.name}</h2>
      <img src={restaurant.logo} alt={restaurant.name} className="shop-logo" />
      <p className="shop-address">{restaurant.address}</p>
      <p className="shop-description">{restaurant.description}</p>
      <div className="shop-menu">
        <h3>Menu</h3>
        <div className="menu-items">
          {restaurant.menu.map((item, index) => (
            <div key={index} className="menu-item">
              <img src={item} alt={`Menu item ${index + 1}`} className="menu-image" />
              <p>{item.name}</p>
              <p>{item.price}</p>
            </div>
          ))}
        </div>
      </div>
      <iframe
        width="560"
        height="315"
        src={restaurant.video}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      {/* Add more details as needed */}
    </div>
  );
};

export default RestaurantDetailPage;
