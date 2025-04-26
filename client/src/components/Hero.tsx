import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import useMobile from "@/hooks/use-mobile";
import { scrollToElement } from "@/lib/utils";

export default function Hero() {
  const isMobile = useMobile();

  const handleScrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToElement(sectionId, 80); // 80px offset to account for header height
  };

  return (
    <section className="mb-10 bg-gradient-to-r from-primary to-primary-dark rounded-xl overflow-hidden shadow-lg">
      <div className="flex flex-col md:flex-row">
        <motion.div
          className="p-6 md:p-10 md:w-1/2 flex flex-col justify-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            Find Your Perfect Hotel Match
          </h1>
          <p className="text-primary-light mb-6 text-lg">
            Tell us what you're looking for, and we'll recommend the best hotels for you.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              size={isMobile ? "default" : "lg"}
              className="bg-secondary hover:bg-secondary-dark text-white font-semibold"
              asChild
            >
              <a href="#search-section" onClick={handleScrollToSection('search-section')}>Start Searching</a>
            </Button>
            <Button
              variant="outline"
              size={isMobile ? "default" : "lg"}
              className="text-primary border-white hover:bg-white hover:text-primary transition-all duration-200"
              asChild
            >
              <a href="#how-it-works" onClick={handleScrollToSection('how-it-works')} className="flex items-center">
                <span>How it works</span>
                <i className="fas fa-chevron-right ml-2 text-xs"></i>
              </a>
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="md:w-1/2 h-60 md:h-auto relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img
            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Luxury hotel room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </motion.div>
      </div>
    </section>
  );
}
