export interface Hotel {
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
    type: 'bestValue' | 'discount' | 'popular' | 'flashDeal';
  };
}

export interface HotelFilters {
  priceRange: string;
  starRating: string;
  propertyType: string;
}

export interface SearchFormData {
  prompt: string;
}
