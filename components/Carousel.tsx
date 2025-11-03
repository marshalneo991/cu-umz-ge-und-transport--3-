import React, { useState, useEffect, useCallback } from 'react';
import { GalleryImage } from '../types';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/Icons';

interface CarouselProps {
  images: GalleryImage[];
  autoPlayInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ images, autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  
  useEffect(() => {
    if (autoPlayInterval && images.length > 1) {
      const timer = setInterval(() => {
        goToNext();
      }, autoPlayInterval);
      return () => clearInterval(timer);
    }
  }, [goToNext, autoPlayInterval, images.length]);

  if (!images || images.length === 0) {
    return <div className="text-center p-8 bg-gray-100 rounded-lg">No gallery images to display.</div>;
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto h-96 rounded-lg overflow-hidden shadow-2xl group" role="region" aria-roledescription="carousel">
      {/* Slide Container */}
      <div 
        className="flex transition-transform ease-in-out duration-500 h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        aria-live="off"
      >
        {images.map((image, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 w-full h-full bg-gray-800"
            role="group"
            aria-roledescription="slide"
            aria-label={`Image ${index + 1} of ${images.length}`}
            aria-hidden={currentIndex !== index}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-full object-contain" 
            />
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button 
            onClick={goToPrevious} 
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Previous image"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button 
            onClick={goToNext} 
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Next image"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </>
      )}


      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10" role="tablist">
          {images.map((_, index) => (
            <button 
              key={index} 
              onClick={() => goToSlide(index)} 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={currentIndex === index}
              role="tab"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;