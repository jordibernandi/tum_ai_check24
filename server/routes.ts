import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";
import { Hotel } from "../shared/types";
import { hotelImages, getRandomHotelImage } from "./hotelImages";

// Hotel type
interface Hotel {
  id: number;
  name: string;
  location: string;
  country: string;
  stars: number;
  rating: number;
  ratingText: string;
  price: number;
  pricePerNight: number;
  description: string;
  image: string;
  tags: string[];
  badge?: {
    text: string;
    type: string;
  };
}

// Collection of hotel images
const hotelImages = {
  luxury: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  exterior: [
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1543968996-ee822b8176ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1561501878-aabd62634533?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  amenities: [
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1525596662741-e94ff9f26de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ]
};

// Get a random image from a specific category
const getRandomImage = (category: 'luxury' | 'exterior' | 'amenities') => {
  const images = hotelImages[category];
  return images[Math.floor(Math.random() * images.length)];
};

// Get a random image from any category
const getRandomHotelImage = () => {
  const categories = Object.keys(hotelImages) as Array<keyof typeof hotelImages>;
  const category = categories[Math.floor(Math.random() * categories.length)];
  return getRandomImage(category);
};

// Sample hotel data
const sampleHotels: Hotel[] = [
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
    stars: 5,
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

// Flask API URL (would come from environment variables in production)
const FLASK_API_URL = process.env.FLASK_API_URL || 'http://localhost:5000';

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to get hotel recommendations
  app.post('/api/hotels/recommend', async (req: Request, res: Response) => {
    try {
      const { prompt } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required' });
      }
      
      // In a real implementation, this would call the Flask API
      // For now, we'll return sample data as a fallback
      
      try {
        // Attempt to call Flask API
        const response = await axios.post(`${FLASK_API_URL}/api/recommend`, { 
          prompt 
        });
        return res.json(response.data);
      } catch (flaskError) {
        console.log('Flask API not available, using sample data', flaskError);
        
        // Use sample data if Flask API is not available
        // In a real implementation, we could filter based on the prompt
        return res.json(sampleHotels);
      }
    } catch (error) {
      console.error('Error getting hotel recommendations:', error);
      res.status(500).json({ message: 'Failed to get hotel recommendations' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
