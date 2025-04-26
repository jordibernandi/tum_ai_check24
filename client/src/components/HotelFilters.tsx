import { useForm } from "react-hook-form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { HotelFilters } from "@/types/hotel";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import useMobile from "@/hooks/use-mobile";

interface HotelFiltersProps {
  onFilterChange: (filters: HotelFilters) => void;
}

export default function HotelFilterComponent({ onFilterChange }: HotelFiltersProps) {
  const isMobile = useMobile();
  
  const form = useForm<HotelFilters>({
    defaultValues: {
      priceRange: "any",
      starRating: "any",
      propertyType: "any",
    },
  });

  const onSubmit = (data: HotelFilters) => {
    onFilterChange(data);
  };

  return (
    <div className="border-t border-neutral-200 pt-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-wrap md:flex-nowrap gap-4 md:items-end">
            <FormField
              control={form.control}
              name="priceRange"
              render={({ field }) => (
                <FormItem className="w-full md:w-auto">
                  <FormLabel className="text-sm font-medium text-neutral-700">
                    Price range
                  </FormLabel>
                  <FormControl>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Any price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any price</SelectItem>
                        <SelectItem value="budget">Budget (under $100)</SelectItem>
                        <SelectItem value="moderate">Moderate ($100-$200)</SelectItem>
                        <SelectItem value="luxury">Luxury ($200+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="starRating"
              render={({ field }) => (
                <FormItem className="w-full md:w-auto">
                  <FormLabel className="text-sm font-medium text-neutral-700">
                    Star rating
                  </FormLabel>
                  <FormControl>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Any rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any rating</SelectItem>
                        <SelectItem value="3">3+ stars</SelectItem>
                        <SelectItem value="4">4+ stars</SelectItem>
                        <SelectItem value="5">5 stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem className="w-full md:w-auto">
                  <FormLabel className="text-sm font-medium text-neutral-700">
                    Property type
                  </FormLabel>
                  <FormControl>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Any type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any type</SelectItem>
                        <SelectItem value="hotel">Hotel</SelectItem>
                        <SelectItem value="resort">Resort</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="w-full md:w-auto md:ml-auto">
              <Button 
                type="submit"
                className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white font-medium"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
