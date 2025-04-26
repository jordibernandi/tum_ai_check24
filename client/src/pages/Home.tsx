import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SearchForm from "@/components/SearchForm";
import HotelFilters from "@/components/HotelFilters";
import HotelList from "@/components/HotelList";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Hotel, HotelFilters as HotelFiltersType, SearchFormData } from "@/types/hotel";
import { useToast } from "@/hooks/use-toast";
import { getHotelRecommendations } from "@/lib/api";
import { hotelImages } from "@/lib/images";

export default function Home() {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useState<SearchFormData | null>(null);
  const [filters, setFilters] = useState<HotelFiltersType>({
    priceRange: "any",
    starRating: "any", 
    propertyType: "any"
  });

  // Query for hotel recommendations
  const {
    data: hotels = [],
    isLoading,
    error,
    refetch
  } = useQuery<Hotel[], Error>({ 
    queryKey: ["/api/hotels/recommend", searchParams?.prompt],
    enabled: !!searchParams?.prompt,
    queryFn: () => getHotelRecommendations(searchParams?.prompt || ""),
  });

  // Handle search form submission
  const handleSearch = (data: SearchFormData) => {
    setSearchParams(data);
    refetch();
    
    // Show toast
    toast({
      title: "Searching hotels",
      description: `Finding matches for "${data.prompt}"`,
    });
    
    // Scroll to results
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: HotelFiltersType) => {
    setFilters(newFilters);
    
    toast({
      title: "Filters applied",
      description: "Results updated with your filters",
    });
  };

  // Apply filters to hotel results
  const filteredHotels = hotels.filter(hotel => {
    // Filter by price range
    if (filters.priceRange !== "any") {
      if (filters.priceRange === "budget" && hotel.pricePerNight >= 100) return false;
      if (filters.priceRange === "moderate" && (hotel.pricePerNight < 100 || hotel.pricePerNight > 200)) return false;
      if (filters.priceRange === "luxury" && hotel.pricePerNight <= 200) return false;
    }
    
    // Filter by star rating
    if (filters.starRating !== "any") {
      const minRating = parseInt(filters.starRating);
      if (hotel.stars < minRating) return false;
    }
    
    // Filter by property type
    if (filters.propertyType !== "any") {
      if (!hotel.tags.some(tag => tag.toLowerCase().includes(filters.propertyType.toLowerCase()))) return false;
    }
    
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6 md:py-10 flex-grow">
        <Hero />
        
        <section id="search-section" className="mb-12 scroll-mt-20">
          <Card className="shadow-md">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">What are you looking for?</h2>
              <p className="text-neutral-600 mb-6">Describe your ideal hotel or vacation - we'll find perfect matches for you.</p>
              
              <SearchForm onSearch={handleSearch} />
              <HotelFilters onFilterChange={handleFilterChange} />
            </CardContent>
          </Card>
        </section>
        
        <section id="results" className="mb-10 scroll-mt-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-semibold">Recommended Hotels</h2>
            {filteredHotels.length > 0 && !isLoading && (
              <div className="text-sm text-neutral-600">
                Showing <span className="font-medium">{filteredHotels.length}</span> results
              </div>
            )}
          </div>
          
          <HotelList 
            hotels={filteredHotels} 
            isLoading={isLoading}
            error={error instanceof Error ? error : null}
          />
        </section>
        
        <HowItWorks />
      </main>
      
      <Footer />
    </div>
  );
}
