import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="text-xl font-bold mb-4">
              STAY<span className="text-secondary">24</span> Hotels
            </h3>
            <p className="text-neutral-400 mb-4">
              Find your perfect hotel match with our AI-powered recommendation system.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">
                <i className="fab fa-pinterest-p"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Home</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Search Hotels</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Destinations</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Special Offers</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Contact Us</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">FAQs</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
            <p className="text-neutral-400 mb-4">Subscribe to get special offers and travel inspiration.</p>
            <form className="flex">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="rounded-r-none bg-white text-neutral-800"
              />
              <Button type="submit" className="bg-secondary hover:bg-secondary-dark rounded-l-none">
                <i className="fas fa-paper-plane"></i>
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">© 2025 STAY24 Hotel Recommender. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="American Express" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
}
