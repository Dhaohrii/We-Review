// contexts/ShopsContext.tsx
'use client'; // Mark as client-side component
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'; // Import ReactNode
import axios from 'axios';

// Define a type for Shop
export interface Shop {
  logo: string | undefined;
  video: string | undefined;
  id: number;
  name: string;
  category: 'coffee' | 'restaurant' | 'bar';
  address: string;
  image: string;
  description: ReactNode; // Use ReactNode for description
  menu: (menu: any) => React.ReactNode; // Adjust menu type and function definition
}

// Define a type for ShopsContext
interface ShopsContextType {
  shops: Shop[];
  setShops: React.Dispatch<React.SetStateAction<Shop[]>>;
}

// Create the context
const ShopsContext = createContext<ShopsContextType | undefined>(undefined);

// Custom hook to use ShopsContext
export const useShops = () => {
  const context = useContext(ShopsContext);
  if (!context) {
    throw new Error('useShops must be used within a ShopsProvider');
  }
  return context;
};

// Provider component for ShopsContext
interface ShopsProviderProps {
  children: React.ReactNode;
}

export const ShopsProvider: React.FC<ShopsProviderProps> = ({ children }) => {
  const [shops, setShops] = useState<Shop[]>([]); // Initialize with an empty array

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get<Shop[]>('http://localhost:5000/api/shop/get'); // Adjust endpoint as per your API
        setShops(response.data);
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };

    fetchShops();
  }, []); // Empty dependency array ensures effect runs only once

  return (
    <ShopsContext.Provider value={{ shops, setShops }}>
      {children}
    </ShopsContext.Provider>
  );
};
