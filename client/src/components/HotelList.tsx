import { useState } from "react";
import HotelCard from "./HotelCard";
import LoadingState from "./LoadingState";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Hotel } from "@/types/hotel";
import { motion } from "framer-motion";

interface HotelListProps {
  hotels: Hotel[];
  isLoading: boolean;
  error: Error | null;
}

export default function HotelList({ hotels, isLoading, error }: HotelListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 6;
  
  // Calculate pagination
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);
  const totalPages = Math.ceil(hotels.length / hotelsPerPage);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Empty state - no search performed
  if (!isLoading && !error && hotels.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-neutral-100 rounded-lg p-8 text-center mb-8"
      >
        <img 
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
          alt="Travel inspiration" 
          className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
        />
        <h3 className="text-lg font-medium mb-2">Ready to discover your ideal stay?</h3>
        <p className="text-neutral-600 mb-4">Enter your preferences in the search box above to see our recommendations.</p>
        <Button 
          onClick={() => document.getElementById("search-section")?.scrollIntoView({ behavior: "smooth" })}
          className="bg-primary text-white hover:bg-primary-dark transition-colors duration-200 font-medium px-4 py-2 rounded-lg"
        >
          Start Searching
        </Button>
      </motion.div>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert variant="destructive" className="mb-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Oops! Something went wrong</AlertTitle>
        <AlertDescription>
          We couldn't process your request. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentHotels.map((hotel, index) => (
          <HotelCard key={hotel.id} hotel={hotel} index={index} />
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <PaginationItem key={number}>
                  <PaginationLink
                    onClick={() => paginate(number)}
                    isActive={currentPage === number}
                  >
                    {number}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
}
