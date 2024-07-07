// src/pages/coffee/[coffeeId].tsx



// const CoffeeDetailPage: React.FC<CoffeeDetailProps> = ({ coffeeId, initialCoffeeShop }) => {





// export const getServerSideProps = async (context: any) => {
//   const { coffeeId } = context.query;
  
//   try {
//     const response = await axios.get(`http://localhost:5000/api/shop/get/${coffeeId}`);
//     const initialCoffeeShop = response.data;

//     return {
//       props: {
//         coffeeId,
//         initialCoffeeShop,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching initial data:', error);
//     return {
//       notFound: true,
//     };
//   }
// };

// // export default CoffeeDetailPage;'use client'; // Ensure client-side rendering
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Shop } from '../../../contexts/shopsContext';

interface CoffeeDetailPageProps {
  params: { coffeeId: string };
}

const CoffeeDetailPage: React.FC<CoffeeDetailPageProps> = ({ params }) => {
  const coffeeId = params.coffeeId;
  const [coffeeShop, setCoffeeShop] = useState<Shop | null>(null);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  useEffect(() => {
    const fetchCoffeeShop = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/shop/get/${coffeeId}`);
        
        setCoffeeShop(response.data);
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
    <div>
      <h2>{coffeeShop.name}</h2>
      <img src={coffeeShop.logo} alt={coffeeShop.name} />
      <p>{coffeeShop.address}</p>
      <p>{coffeeShop.description}</p>
      <p>Menu: {JSON.stringify(coffeeShop.menu)}</p>

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
