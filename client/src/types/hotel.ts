export interface Hotel {
  hotel_name: string;
  locationname: string;
  // country: string;
  starcategory: number; // stars
  rating: number;
  pricepernight: number;
  image: string;
  explanability: string;
  // tags: string[];
  // badge?: {
  //   text: string;
  //   type: 'bestValue' | 'discount' | 'popular' | 'flashDeal';
  // };
}

export interface HotelFilters {
  priceRange: string;
  starRating: string;
  propertyType: string;
}

export interface SearchFormData {
  prompt: string;
}
