import { Link } from "wouter";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import useMobile from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";

export default function Header() {
  const isMobile = useMobile();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <div className="text-primary font-bold text-2xl mr-2">
                STAY<span className="text-secondary">24</span>
              </div>
              {!isMobile && (
                <span className="text-neutral-500 text-sm pl-2 border-l border-neutral-200">
                  Smart Travel Assistant for You
                </span>
              )}
            </div>
          </Link>
        </div>

        {isMobile ? (
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-neutral-600 mr-2"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>

            {/* Mobile menu */}
            {mobileMenuOpen && (
              <div
                ref={menuRef}
                className="absolute top-14 right-4 bg-white shadow-lg rounded-md py-3 px-4 w-48 z-50 transition-all"
              >
                <ul className="space-y-3">
                  <li>
                    <Link href="/">
                      <span className="text-neutral-600 hover:text-primary transition-colors duration-200 cursor-pointer block py-1">
                        <i className="fas fa-hotel mr-2"></i> Hotels
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <span className="text-neutral-600 hover:text-primary transition-colors duration-200 cursor-pointer block py-1">
                        <i className="fas fa-map-marker-alt mr-2"></i> Destinations
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <span className="text-neutral-600 hover:text-primary transition-colors duration-200 cursor-pointer block py-1">
                        <i className="fas fa-tag mr-2"></i> Deals
                      </span>
                    </Link>
                  </li>
                  <li className="border-t border-neutral-100 pt-2 mt-2">
                    <Link href="/">
                      <span className="text-neutral-600 hover:text-primary transition-colors duration-200 cursor-pointer block py-1">
                        <i className="fas fa-user mr-2"></i> Account
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <nav>
            <ul className="flex space-x-6 items-center">
              <li>
                <Link href="/">
                  <span className="text-neutral-600 hover:text-primary transition-colors duration-200 cursor-pointer">Hotels</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-neutral-600 hover:text-primary transition-colors duration-200 cursor-pointer">Destinations</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-neutral-600 hover:text-primary transition-colors duration-200 cursor-pointer">Deals</span>
                </Link>
              </li>
              <li>
                <Button variant="ghost" size="sm" className="text-neutral-600 hover:text-primary transition-colors duration-200">
                  <i className="fas fa-user mr-2"></i>
                  Account
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
