import axios from 'axios';
import { Hotel } from '@/types/hotel';
import { getRandomHotelImage } from './images';

// Create axios instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getHotelRecommendations = async (prompt: string): Promise<Hotel[]> => {
  try {
    const response = await api.post('/hotels/recommend', { prompt });
    return response.data;
  } catch (error) {
    console.error('Error fetching hotel recommendations:', error);
    throw error;
  }
};

// Utility to create sample hotel data (in case no backend is available)
export const generateSampleHotels = (prompt: string): Hotel[] => {
  // This would be replaced with actual API data in production
  const dummyHotels: Hotel[] = [
    {
      id: 100,
      name: "STAY24 Signature Hotel",
      location: "Berlin",
      country: "Germany",
      stars: 5,
      rating: 9.7,
      ratingText: "Exceptional",
      price: 289,
      pricePerNight: 289,
      description: "Our flagship luxury hotel featuring elegant rooms, state-of-the-art facilities, and personalized service.",
      image: "",
      tags: ["Luxury", "Business", "City Center", "Fine Dining"],
      badge: {
        text: "STAY24 Pick",
        type: "bestValue"
      }
    },
    {
      id: 101,
      name: "Ocean Paradise Resort",
      location: "Maldives",
      country: "Maldives",
      stars: 5,
      rating: 9.5,
      ratingText: "Exceptional",
      price: 599,
      pricePerNight: 599,
      description: "Stunning overwater bungalows with private pools and direct access to crystal clear waters.",
      image: "",
      tags: ["Overwater", "Private Pool", "All-Inclusive", "Honeymoon"],
      badge: {
        text: "Top Rated",
        type: "popular"
      }
    },
    {
      id: 102,
      name: "Historic Old Town Hotel",
      location: "Prague",
      country: "Czech Republic",
      stars: 4,
      rating: 8.9,
      ratingText: "Excellent",
      price: 175,
      pricePerNight: 175,
      description: "Charming boutique hotel in a restored medieval building in the heart of Prague's Old Town.",
      image: "",
      tags: ["Historic", "Boutique", "Central Location", "Breakfast Included"],
      badge: {
        text: "15% OFF",
        type: "discount"
      }
    },
    {
      id: 103,
      name: "Desert Oasis Resort",
      location: "Dubai",
      country: "UAE",
      stars: 5,
      rating: 9.2,
      ratingText: "Excellent",
      price: 450,
      pricePerNight: 450,
      description: "Luxurious desert retreat with private villas, infinity pools, and traditional Arabic architecture.",
      image: "",
      tags: ["Desert Views", "Private Villas", "Spa", "5-Star Dining"],
      badge: {
        text: "Flash Deal",
        type: "flashDeal"
      }
    },
    {
      id: 104,
      name: "Mountain View Lodge",
      location: "Banff",
      country: "Canada",
      stars: 4,
      rating: 8.8,
      ratingText: "Very Good",
      price: 245,
      pricePerNight: 245,
      description: "Cozy mountain lodge with panoramic views of the Canadian Rockies and access to premium ski slopes.",
      image: "",
      tags: ["Mountain Views", "Skiing", "Fireplace", "Nature Trails"],
    }
  ];
  
  // Return the dummy hotels instead of the sample hotels
  return dummyHotels;
};
