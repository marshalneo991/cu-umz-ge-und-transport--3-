import React from 'react';
import { GalleryContent } from '../types';
import Section, { useAnimateOnScroll } from '../components/Section';
import { useGallery } from '../hooks/useGallery';

interface GalleryProps {
  content: GalleryContent;
}

const Gallery: React.FC<GalleryProps> = ({ content }) => {
  const [gridRef, isGridVisible] = useAnimateOnScroll<HTMLDivElement>();
  const { images } = useGallery(content.images); // Use the hook to get dynamic images

  return (
    <>
      <div className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">{content.title}</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-blue-100">{content.description}</p>
        </div>
      </div>
      <Section>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div 
              key={image.src + index} 
              className={`group overflow-hidden rounded-lg shadow-lg cursor-pointer transition-all duration-500 ease-out ${isGridVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <img 
                src={image.src}
                alt={image.alt} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out aspect-[4/3]"
              />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default Gallery;