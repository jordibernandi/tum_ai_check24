import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      icon: "fa-keyboard",
      title: "Describe Your Perfect Stay",
      description: "Tell us what you're looking for in natural language - amenities, location, vibe, and budget."
    },
    {
      icon: "fa-magic",
      title: "AI-Powered Matching",
      description: "Our advanced algorithm analyzes thousands of properties to find your perfect matches."
    },
    {
      icon: "fa-hotel",
      title: "Personalized Results",
      description: "Get a curated list of hotels that match your exact preferences and requirements."
    }
  ];

  return (
    <section id="how-it-works" className="mb-12 scroll-mt-20">
      <Card>
        <CardContent className="p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-6">How Our Hotel Recommender Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mb-4">
                  <i className={`fas ${step.icon} text-primary text-2xl`}></i>
                </div>
                <h3 className="font-medium text-lg mb-2">{step.title}</h3>
                <p className="text-neutral-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-neutral-200 text-center">
            <p className="text-neutral-600 mb-4">Powered by advanced natural language processing technology</p>
            <Button variant="link" className="text-primary hover:text-primary-dark font-medium" asChild>
              <a href="#search-section" className="inline-flex items-center">
                Try it now <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
