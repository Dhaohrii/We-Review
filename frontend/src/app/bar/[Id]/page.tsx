"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Shop } from '../../../contexts/shopsContext';
interface BarDetailPageProps {
  params: { barId: string };
}

const BarDetailPage: React.FC<BarDetailPageProps> = ({params}) => {
 
  const barId=params.barId;

  const [bar, setBar] = useState<Shop | null>(null);

  useEffect(() => {
    const fetchBar = async () => {
      try {
        const response = await axios.get<Shop>(`http://localhost:5000/api/shop/${barId}`); // Adjust endpoint as per your API
        setBar(response.data);
      } catch (error) {
        console.error('Error fetching bar details:', error);
      }
    };

    if (barId) {
      fetchBar();
    }
  }, [barId]);

  if (!bar) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{bar.name}</h2>
      <img src={bar.image} alt={bar.name} />
      <p>{bar.address}</p>
      <p>{bar.description}</p>
      <p>Menu: {JSON.stringify(bar.menu)}</p>

      <iframe width="560" height="315" src={bar.video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      {/* Add more details as needed */}
    </div>
  );
};

export default BarDetailPage;
