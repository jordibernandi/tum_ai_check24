import { useState } from "react";
import HotelCard from "./HotelCard";
import LoadingState from "./LoadingState";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hotel } from "@/types/hotel";
import { motion } from "framer-motion";

interface HotelListProps {
  data: { status: number, hotels: Hotel[] };
  isPending: boolean;
  error: Error | null;
}

export default function HotelList({ data, isPending, error }: HotelListProps) {
  // Invalid state - no search performed
  if (!isPending && !error && (data && data.status === 500)) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-neutral-100 rounded-lg p-8 text-center mb-8"
      >
        <img
          src="../../public/images/travel-plan.avif"
          alt="Travel inspiration"
          className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
        />
        <h3 className="text-lg font-medium mb-2">None, invalid prompt! Ready to discover your ideal stay?</h3>
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

  // Empty state - no search performed
  if (!isPending && !error && (data && data.status === 404) || !data) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-neutral-100 rounded-lg p-8 text-center mb-8"
      >
        <img
          src="../../public/images/travel-plan.avif"
          alt="Travel inspiration"
          className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
        />
        <h3 className="text-lg font-medium mb-2">No hotel found! Ready to discover your ideal stay?</h3>
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
  if (isPending) {
    return <LoadingState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.hotels.map((hotel, index) => (
        <HotelCard key={index} hotel={hotel} index={index} />
      ))}
    </div>
  );
}