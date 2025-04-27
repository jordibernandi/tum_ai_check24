import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Search, Mic, MicOff } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { SearchFormData } from "@/types/hotel";

const samplePrompts = [
  "A nice hotel with atleast 6 rating",
  "I'm travelling with a dog and need a parking space.",
  "Stylish, modern hotel that not only offers great design but also serves an good breakfast.",
  "Find me a hotel with rating at least 9.3 and cheaper than 40 EUR per night.",
  "Find me a hotel for 50 EUR per night near to beach and luxury breakfast",
];

const formSchema = z.object({
  prompt: z.string().min(3, "Please enter at least 3 characters"),
});

interface SearchFormProps {
  onSearch: (data: SearchFormData) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<any | null>(null);

  const form = useForm<SearchFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  useEffect(() => {
    // Initialize speech recognition if available in the browser
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        form.setValue("prompt", transcript);
        setIsListening(false);

        toast({
          title: "Voice input received! Click search.",
          description: transcript,
        });
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);

        toast({
          title: "Voice recognition error",
          description: `Error: ${event.error}`,
          variant: "destructive",
        });
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [form, toast]);

  const toggleListening = () => {
    if (!recognition) {
      toast({
        title: "Feature not supported",
        description: "Speech recognition is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      setIsListening(true);
      recognition.start();

      toast({
        title: "Listening...",
        description: "Speak now to enter your search query.",
      });
    }
  };

  const handleSamplePromptClick = (prompt: string) => {
    form.setValue("prompt", prompt);
    toast({
      title: "Prompt selected! Click search.",
      description: prompt,
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
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <Button
                      type="submit"
                      size="icon"
                      variant="ghost"
                      className="text-primary hover:text-primary-dark transition-colors duration-200"
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
      {/* Speak Prompts */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-neutral-500 mb-2">Speak to prompt:</h3>
        <div className="text-center">
          <Button
            type="button"
            size="icon"
            variant={isListening ? "destructive" : "outline"}
            onClick={toggleListening}
            className="h-20 w-20 rounded-full"
            title={isListening ? "Stop listening" : "Speak to search"}
          >
            {isListening ? (
              <MicOff className="h-16 w-16" />
            ) : (
              <Mic className="h-16 w-16" />
            )}
          </Button>
        </div>
      </div>
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

// Type definitions for the Web Speech API if needed
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}