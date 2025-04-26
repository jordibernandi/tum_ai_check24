import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { SearchFormData } from "@/types/hotel";

const samplePrompts = [
  "Luxury beachfront resort in Maldives",
  "Family-friendly hotel with pool in Barcelona",
  "Boutique hotel in Paris near attractions",
  "All-inclusive mountain resort with spa",
  "Budget-friendly hotel in London city center",
  "Pet-friendly hotel near hiking trails"
];

const formSchema = z.object({
  prompt: z.string().min(3, "Please enter at least 3 characters"),
});

interface SearchFormProps {
  onSearch: (data: SearchFormData) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const { toast } = useToast();

  const form = useForm<SearchFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const handleSamplePromptClick = (prompt: string) => {
    form.setValue("prompt", prompt);
    toast({
      title: "Prompt selected!",
      description: "Click search to find hotels.",
    });
  };

  const onSubmit = (data: SearchFormData) => {
    onSearch(data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="E.g., Beachfront resort with pool in Bali for couples"
                      className="w-full px-4 py-6 pr-12 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    size="icon"
                    variant="ghost"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary-dark transition-colors duration-200"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>

      {/* Sample Prompts */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-neutral-500 mb-2">Try one of these:</h3>
        <div className="flex flex-wrap gap-2">
          {samplePrompts.map((prompt, index) => (
            <motion.button
              key={index}
              className="text-sm bg-primary-light text-primary px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-200"
              onClick={() => handleSamplePromptClick(prompt)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {prompt}
            </motion.button>
          ))}
        </div>
      </div>
    </>
  );
}
