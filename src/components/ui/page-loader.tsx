"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Short delay to show the loader, then fade out
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-8 w-8 text-accent" />
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="h-0.5 rounded-full bg-accent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
