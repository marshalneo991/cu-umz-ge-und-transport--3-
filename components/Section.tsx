import React, { useState, useEffect, useRef } from 'react';

// A reusable hook for triggering animations on scroll
export const useAnimateOnScroll = <T extends HTMLElement>() => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // This will be true when the element is intersecting, and false otherwise.
        // This makes the animation work both ways (in and out).
        setIsVisible(entry.isIntersecting);
      },
      {
        // Trigger when 10% of the element is visible on screen for a responsive feel.
        threshold: 0.1,
      }
    );

    const currentElement = ref.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      // Clean up the observer when the component unmounts.
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount.

  return [ref, isVisible] as const;
};


interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = '', id }) => {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="container mx-auto px-6">
        {children}
      </div>
    </section>
  );
};

export default Section;
