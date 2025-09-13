import { useState, useEffect } from 'react';

export const useAnimatedCounter = (end: number, duration: number = 2000, startDelay: number = 0) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(end * easeOutQuart));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [end, duration, startDelay]);

  return count;
};