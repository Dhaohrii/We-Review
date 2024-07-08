"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Shop } from '../../../contexts/shopsContext';

interface CoffeeDetailPageProps {
  params: { coffeeId: string };
}

const CoffeeDetailPage: React.FC<CoffeeDetailPageProps> = ({ params }) => {
  const coffeeId = params.coffeeId;
  const [coffeeShop, setCoffeeShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoffeeShop = async () => {
      try {
        const response = await axios.get<Shop>(`http://localhost:5000/api/shop/get/${coffeeId}`);
        setCoffeeShop(response.data);
      } catch (error) {
        setError('Error fetching coffee shop details.');
        console.error('Error fetching coffee shop details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoffeeShop();
  }, [coffeeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!coffeeShop) {
    return <div>No coffee shop found.</div>;
  }

  console.log({ coffeeShop });

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {Object.entries(coffeeShop).map(([key, value]) => (
        <div key={key}>
          {key === 'name' && <h2>{value}</h2>}
          {key === 'logo' && <img src={coffeeShop.logo} alt={coffeeShop.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />}
          {key === 'address' && <p><strong>Address:</strong> {coffeeShop.address}</p>}
          {key === 'description' && <p>{value}</p>}
          {key === 'menu' && <p><strong>Menu:</strong> {JSON.stringify(value)}</p>}
          {key === 'video' && (
            <iframe
              width="560"
              height="315"
              src={value}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      ))}
    </div>
  );
};

export default CoffeeDetailPage;
