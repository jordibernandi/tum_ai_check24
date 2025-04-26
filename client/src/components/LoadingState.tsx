import { motion } from "framer-motion";

export default function LoadingState() {
  return (
    <motion.div 
      className="py-10 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      <p className="mt-4 text-neutral-600">Finding the perfect hotels for you...</p>
    </motion.div>
  );
}
