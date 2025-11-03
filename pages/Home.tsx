import React, { useState, useEffect } from 'react';
// Fix: Import GalleryContent to use for props.
import { HomeContent, Page, GalleryContent } from '../types';
import Section, { useAnimateOnScroll } from '../components/Section';
import { StarIcon, FastIcon, ReliableIcon, ProfessionalIcon, InsuredIcon } from '../components/icons/Icons';
import { useHeroImage } from '../hooks/useHeroImage';
import { useGallery } from '../hooks/useGallery';
import Carousel from '../components/Carousel';

interface HomeProps {
  content: HomeContent;
  onNavigate: (page: Page) => void;
  // Fix: Added galleryContent to props to provide images for the gallery preview.
  galleryContent: GalleryContent;
}

const benefitIcons: { [key: string]: React.FC<{className?: string}> } = {
  fast: FastIcon,
  reliable: ReliableIcon,
  professional: ProfessionalIcon,
  insured: InsuredIcon
};

// Fix: Destructured galleryContent from props.
const Home: React.FC<HomeProps> = ({ content, onNavigate, galleryContent }) => {
  const [heroVisible, setHeroVisible] = useState(false);
  const [benefitsRef, benefitsVisible] = useAnimateOnScroll<HTMLDivElement>();
  const [servicesRef, servicesVisible] = useAnimateOnScroll<HTMLDivElement>();
  const [reviewsRef, reviewsVisible] = useAnimateOnScroll<HTMLDivElement>();
  const [galleryRef, galleryVisible] = useAnimateOnScroll<HTMLDivElement>();
  const [contactRef, contactVisible] = useAnimateOnScroll<HTMLDivElement>();
  const { heroImage } = useHeroImage();
  // Fix: Used galleryContent.images to correctly source the images for the useGallery hook, resolving the type error.
  const { images: galleryImages } = useGallery(galleryContent.images);

  useEffect(() => {
    // Trigger hero animation on mount
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white h-[60vh] md:h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: `url('${heroImage}')` }}></div>
        <div className="relative container mx-auto px-6 text-center">
          <div className={`transition-all duration-1000 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">{content.hero.headline}</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-blue-100">{content.hero.subheadline}</p>
            <button onClick={() => onNavigate('contact')} className="bg-orange-500 text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95">
              {content.hero.cta}
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <Section className="bg-blue-50">
        <div className="text-center">
            <h2 ref={benefitsRef} className={`text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12 transition-all duration-700 ease-out ${benefitsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>{content.benefits.title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.benefits.items.map((item, index) => {
              const Icon = benefitIcons[item.icon];
              return (
                <div 
                  key={index} 
                  className={`text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ease-out ${benefitsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} 
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mx-auto mb-4">
                    {Icon && <Icon className="h-8 w-8 text-orange-500" />}
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
      </Section>

      {/* Services Section */}
      <Section>
        <div ref={servicesRef} className="text-center">
          <h2 className={`text-3xl md:text-4xl font-bold text-blue-900 transition-all duration-700 ease-out ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>{content.services.title}</h2>
          <p className={`mt-4 max-w-2xl mx-auto text-lg text-gray-600 transition-all duration-700 ease-out delay-100 ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>{content.services.description}</p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.services.items.map((service, index) => (
            <div 
              key={index} 
              className={`border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-lg transition-all duration-500 bg-white ease-out ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} 
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <h3 className="text-2xl font-semibold text-blue-900 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button onClick={() => onNavigate('services')} className={`bg-orange-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 ease-out ${servicesVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '500ms' }}>
            {content.services.cta}
          </button>
        </div>
      </Section>

      {/* Reviews Section */}
      <Section className="bg-blue-900">
        <div ref={reviewsRef} className={`transition-all duration-700 ease-out ${reviewsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">{content.reviews.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.reviews.items.map((review, index) => (
              <div key={index} className="bg-blue-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} className="h-5 w-5 text-orange-400" />)}
                </div>
                <p className="text-blue-100 italic mb-4">"{review.quote}"</p>
                <p className="font-semibold text-right text-white">- {review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Gallery Preview */}
      <Section>
        <div ref={galleryRef} className={`transition-all duration-700 ease-out ${galleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">{content.gallery.title}</h2>
          
          <Carousel images={galleryImages.slice(0, 8)} />

          <div className="text-center mt-12">
            <button onClick={() => onNavigate('gallery')} className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
              {content.gallery.cta}
            </button>
          </div>
        </div>
      </Section>

      {/* Contact CTA Section */}
      <Section className="bg-blue-50">
        <div ref={contactRef} className={`text-center max-w-3xl mx-auto transition-all duration-700 ease-out ${contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">{content.contact.title}</h2>
          <p className="mt-4 text-lg text-gray-600">{content.contact.description}</p>
          <button onClick={() => onNavigate('contact')} className="mt-8 bg-orange-500 text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95">
            {content.contact.cta}
          </button>
        </div>
      </Section>

    </div>
  );
};

export default Home;