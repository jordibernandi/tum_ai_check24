import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Hotel } from "@/types/hotel";
import { motion } from "framer-motion";

interface HotelCardProps {
  hotel: Hotel;
  index: number;
}

export default function HotelCard({ hotel, index }: HotelCardProps) {
  const getBadgeColor = (type?: string) => {
    switch (type) {
      case 'bestValue':
        return 'bg-primary text-white';
      case 'discount':
        return 'bg-success text-white';
      case 'popular':
        return 'bg-secondary text-white';
      case 'flashDeal':
        return 'bg-warning text-white';
      default:
        return 'bg-white bg-opacity-90 text-primary';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full transition-shadow duration-300 hover:shadow-lg bg-white border-neutral-200">
        <div className="relative">
          <img 
            src={hotel.image} 
            alt={hotel.name} 
            className="w-full h-48 object-cover" 
          />
          {hotel.badge && (
            <div className={`absolute top-3 right-3 px-2 py-1 rounded text-sm font-medium ${getBadgeColor(hotel.badge.type)}`}>
              <i className={`fas ${hotel.badge.type === 'bestValue' ? 'fa-tag' : hotel.badge.type === 'discount' ? 'fa-percentage' : hotel.badge.type === 'popular' ? 'fa-fire' : 'fa-bolt'} mr-1`}></i>
              {hotel.badge.text}
            </div>
          )}
        </div>
        
        <CardContent className="p-5 text-foreground">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">{hotel.name}</h3>
            <div className="flex items-center bg-primary-light text-primary font-bold rounded px-2 py-1 text-sm">
              <span>{hotel.rating}</span>
              <span className="ml-1 text-xs font-medium">{hotel.ratingText}</span>
            </div>
          </div>
          
          <div className="flex items-center text-neutral-500 text-sm mb-3">
            <i className="fas fa-map-marker-alt mr-1"></i>
            <span>{hotel.location}, {hotel.country}</span>
            <span className="mx-2">•</span>
            <i className="fas fa-star text-secondary text-xs mr-1"></i>
            <span>{hotel.stars}-star {hotel.stars >= 4 ? 'hotel' : 'property'}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {hotel.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="bg-neutral-100 text-neutral-600 text-xs rounded-full">
                {tag}
              </Badge>
            ))}
          </div>
          
          <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{hotel.description}</p>
          
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs text-neutral-500">Starting from</div>
              <div className="text-lg font-bold text-primary">
                €{hotel.pricePerNight}<span className="text-sm font-normal text-neutral-500">/night</span>
              </div>
            </div>
            
            <Button className="bg-secondary hover:bg-secondary-dark text-white font-medium text-sm">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
