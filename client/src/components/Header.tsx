import { Link } from "wouter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useMobile from "@/hooks/use-mobile";

export default function Header() {
  const isMobile = useMobile();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <a className="flex items-center">
              <div className="text-primary font-bold text-2xl mr-2">
                Check<span className="text-secondary">24</span>
              </div>
              {!isMobile && (
                <span className="text-neutral-500 text-sm pl-2 border-l border-neutral-200">
                  Hotel Recommendations
                </span>
              )}
            </a>
          </Link>
        </div>
        
        <nav>
          <ul className="flex space-x-6 items-center">
            {!isMobile && (
              <>
                <li>
                  <Link href="/">
                    <a className="text-neutral-600 hover:text-primary transition-colors duration-200">Hotels</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className="text-neutral-600 hover:text-primary transition-colors duration-200">Destinations</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className="text-neutral-600 hover:text-primary transition-colors duration-200">Deals</a>
                  </Link>
                </li>
              </>
            )}
            <li>
              <Button variant="ghost" size="sm" className="text-neutral-600 hover:text-primary transition-colors duration-200">
                <i className="fas fa-user mr-2"></i>
                {!isMobile && "Account"}
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
