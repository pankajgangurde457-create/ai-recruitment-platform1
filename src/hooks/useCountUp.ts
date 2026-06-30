import { useState, useEffect } from 'react';

export const useCountUp = (target: number, duration: number = 1200): number => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (end <= 0) return;

    const incrementTime = 16; // Approx 60fps
    const totalSteps = duration / incrementTime;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
};
export default useCountUp;
