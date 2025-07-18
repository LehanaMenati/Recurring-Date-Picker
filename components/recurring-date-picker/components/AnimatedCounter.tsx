'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  className?: string;
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000; // 1 second
    const steps = 30;
    const increment = (value - displayValue) / steps;
    
    if (Math.abs(value - displayValue) < 0.1) {
      setDisplayValue(value);
      return;
    }

    const timer = setInterval(() => {
      setDisplayValue(prev => {
        const next = prev + increment;
        if ((increment > 0 && next >= value) || (increment < 0 && next <= value)) {
          clearInterval(timer);
          return value;
        }
        return next;
      });
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, displayValue]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={Math.floor(displayValue)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={className}
      >
        {Math.floor(displayValue)}
      </motion.span>
    </AnimatePresence>
  );
}