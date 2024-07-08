"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Shop } from '../../../contexts/shopsContext';
import { useParams } from 'next/navigation';

const CoffeeDetailPage: React.FC = () => {
  const params = useParams();
  const coffeeId = params.Id;
  const [coffeeShop, setCoffeeShop] = useState<Shop | null>(null);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  useEffect(() => {
    const fetchCoffeeShop = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/shop/get/${coffeeId}`);
        setCoffeeShop(response.data[0]);
      } catch (error) {
        console.error('Error fetching coffee shop details:', error);
      }
    };

    if (!hasFetched) {
      fetchCoffeeShop();
      setHasFetched(true);
    }
  }, [coffeeId, hasFetched]);

  if (!coffeeShop) {
    return <div>Loading...</div>;
  }

  return (
    <div className="shop-detail">
      <h2>{coffeeShop.name}</h2>
      <img src={coffeeShop.logo} alt={coffeeShop.name} className="shop-logo" />
      <p className="shop-address">{coffeeShop.address}</p>
      <p className="shop-description">{coffeeShop.description}</p>
      <div className="shop-menu">
        <h3>Menu</h3>
        <div className="menu-items">
          {coffeeShop.menu.map((item, index) => (
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
        src={coffeeShop.video}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      {/* Add more details as needed */}
    </div>
  );
};

export default CoffeeDetailPage;
