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
  const hotels: Hotel[] = [
    {
      id: 1,
      name: "The Grand Resort & Spa",
      location: "Bali",
      country: "Indonesia",
      stars: 5,
      rating: 9.2,
      ratingText: "Excellent",
      price: 349,
      pricePerNight: 349,
      description: "Luxury beachfront resort with stunning ocean views, multiple infinity pools, and award-winning restaurants.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Beachfront", "Pool", "Spa", "Free WiFi"],
      badge: {
        text: "Best Value",
        type: "bestValue"
      }
    },
    {
      id: 2,
      name: "Urban Boutique Hotel",
      location: "Barcelona",
      country: "Spain",
      stars: 4,
      rating: 8.8,
      ratingText: "Very Good",
      price: 189,
      pricePerNight: 189,
      description: "Modern boutique hotel located in the heart of Barcelona with easy access to major attractions and family amenities.",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["City Center", "Rooftop Bar", "Family-friendly"],
      badge: {
        text: "20% OFF",
        type: "discount"
      }
    },
    {
      id: 3,
      name: "Parisian Elegance Hotel",
      location: "Paris",
      country: "France",
      stars: 4,
      rating: 9.0,
      ratingText: "Excellent",
      price: 229,
      pricePerNight: 229,
      description: "Charming boutique hotel in central Paris, just minutes from the Louvre and other major attractions.",
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Boutique", "Restaurant", "Near Attractions"]
    },
    {
      id: 4,
      name: "Alpine Mountain Resort",
      location: "Swiss Alps",
      country: "Switzerland",
      stars:
5,
      rating: 9.5,
      ratingText: "Exceptional",
      price: 399,
      pricePerNight: 399,
      description: "Luxury all-inclusive mountain resort featuring world-class spa, fine dining, and stunning Alpine views.",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["All-inclusive", "Spa", "Mountain View"],
      badge: {
        text: "Popular",
        type: "popular"
      }
    },
    {
      id: 5,
      name: "City Central Budget Hotel",
      location: "London",
      country: "UK",
      stars: 3,
      rating: 7.9,
      ratingText: "Good",
      price: 119,
      pricePerNight: 119,
      description: "Affordable hotel in central London, walking distance to major attractions and public transport.",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Budget-friendly", "City Center", "Free Breakfast"],
      badge: {
        text: "Flash Deal",
        type: "flashDeal"
      }
    },
    {
      id: 6,
      name: "Mountain Trail Lodge",
      location: "Colorado",
      country: "USA",
      stars: 4,
      rating: 8.7,
      ratingText: "Very Good",
      price: 199,
      pricePerNight: 199,
      description: "Rustic lodge surrounded by nature with direct access to hiking trails and pet-friendly accommodations.",
      image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Pet-friendly", "Hiking Trails", "Nature"]
    }
  ];

  // Return filtered hotels based on prompt if needed
  return hotels;
};
