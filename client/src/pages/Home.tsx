import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SearchForm from "@/components/SearchForm";
import HotelList from "@/components/HotelList";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Hotel, HotelFilters as HotelFiltersType, SearchFormData } from "@/types/hotel";
import { useToast } from "@/hooks/use-toast";
import { getHotelRecommendations, generateSampleHotels } from "@/lib/api";
import { hotelImages } from "@/lib/images";

export default function Home() {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useState<SearchFormData | null>(null);
  const [simulatedLoading, setSimulatedLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Generate sample hotels for when search is performed
  const [dummyHotels] = useState<Hotel[]>(generateSampleHotels(""));

  // Query for hotel recommendations
  const {
    data,
    isLoading: apiLoading,
    error,
    refetch
  } = useQuery<Hotel[], Error>({
    queryKey: ["/api/hotels/recommend", searchParams?.prompt],
    enabled: false, // Disable automatic fetching
    queryFn: () => getHotelRecommendations(searchParams?.prompt || ""),
  });

  // Combine real loading state with simulated loading
  const isLoading = apiLoading || simulatedLoading;

  // Use dummy hotels for now since API isn't ready
  const hotels = showResults ? dummyHotels : [];

  // Handle search form submission
  const handleSearch = (data: SearchFormData) => {
    // Start simulated loading and hide any previous results
    setSimulatedLoading(true);
    setShowResults(false);

    // Show toast
    toast({
      title: "Searching hotels",
      description: `Finding matches for "${data.prompt}"`,
    });

    // Scroll to results
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });

    // Simulate API delay (2-3 seconds)
    setTimeout(() => {
      setSearchParams(data);
      // End simulated loading after delay and show results
      setTimeout(() => {
        setSimulatedLoading(false);
        setShowResults(true);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <Header />

      <main className="container mx-auto px-4 py-6 md:py-10 flex-grow">
        <Hero />

        <section id="search-section" className="mb-12 scroll-mt-20">
          <Card className="shadow-md bg-white border-neutral-200">
            <CardContent className="p-6 md:p-8 text-foreground">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-neutral-800">What are you looking for?</h2>
              <p className="text-neutral-600 mb-6">Describe your ideal hotel or vacation - we'll find perfect matches for you.</p>

              <SearchForm onSearch={handleSearch} />
            </CardContent>
          </Card>
        </section>

        <section id="results" className="mb-10 scroll-mt-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-semibold">Recommended Hotels</h2>
            {hotels.length > 0 && !isLoading && (
              <div className="text-sm text-neutral-600">
                Showing <span className="font-medium">{hotels.length}</span> results
              </div>
            )}
          </div>

          <HotelList
            hotels={hotels}
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
