import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SearchForm from "@/components/SearchForm";
import HotelList from "@/components/HotelList";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Hotel, HotelFilters as HotelFiltersType, SearchFormData } from "@/types/hotel";
import { useToast } from "@/hooks/use-toast";
import { getHotelRecommendations } from "@/lib/api"; // Removed generateSampleHotels import
import { hotelImages } from "@/lib/images";

export default function Home() {
  const { toast } = useToast();
  const [searchResults, setSearchResults] = useState<{ status: number, hotels: Hotel[] } | null>(null);

  // Remove dummyHotels state
  // const [dummyHotels] = useState<Hotel[]>(generateSampleHotels(""));

  const {
    mutate: searchHotels,
    isPending,
    error
  } = useMutation({
    mutationFn: (prompt: string) => getHotelRecommendations(prompt),
    onSuccess: (data: { status: number, hotels: Hotel[] }) => {
      setSearchResults(data);
    }
  });

  // Handle search form submission
  const handleSearch = (formData: SearchFormData) => {
    console.log("handleSearch");
    // Show toast
    toast({
      title: "Searching hotels",
      description: `Finding matches for "${formData.prompt}"`,
    });

    // Scroll to results
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });

    // Call the API once with the search prompt
    searchHotels(formData.prompt);
  };

  console.log("IS PENDING", isPending)
  console.log("SEARCH", searchResults)

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
          {/* <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-semibold">Recommended Hotels</h2>
            {searchResults && searchResults?.hotels.length > 0 && !isPending && (
              <div className="text-sm text-neutral-600">
                Showing <span className="font-medium">{searchResults.hotels.length}</span> results
              </div>
            )}
          </div> */}

          <HotelList
            data={searchResults as { status: number, hotels: Hotel[] }}
            isPending={isPending}
            error={error instanceof Error ? error : null}
          />
        </section>

        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}