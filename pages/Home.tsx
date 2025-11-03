import React, { useState, useEffect } from 'react';
import { HomeContent, Page, GalleryContent, Review, BenefitItem, ServiceItemSummary } from '../types';
import Section, { useAnimateOnScroll } from '../components/Section';
import { StarIcon, FastIcon, ReliableIcon, ProfessionalIcon, InsuredIcon } from '../components/icons/Icons';
import { useHeroImage } from '../hooks/useHeroImage';
import { useGallery } from '../hooks/useGallery';
import Carousel from '../components/Carousel';
import { useReviews } from '../hooks/useReviews';
import RatingSummary from '../components/RatingSummary';
import ReviewForm from '../components/ReviewForm';

interface HomeProps {
  content: HomeContent;
  onNavigate: (page: Page) => void;
  galleryContent: GalleryContent;
  reviewsContent: HomeContent['reviews'];
}

const benefitIcons: { [key: string]: React.FC<{className?: string}> } = {
  fast: FastIcon,
  reliable: ReliableIcon,
  professional: ProfessionalIcon,
  insured: InsuredIcon
};

// --- Reusable Animated Components for individual item animations ---

const AnimatedBenefitCard: React.FC<{ item: BenefitItem }> = ({ item }) => {
  const [ref, isVisible] = useAnimateOnScroll<HTMLDivElement>();
  const Icon = benefitIcons[item.icon];
  return (
    <div
      ref={ref}
      className={`text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mx-auto mb-4">
        {Icon && <Icon className="h-8 w-8 text-orange-500" />}
      </div>
      <h3 className="text-xl font-semibold text-blue-900 mb-2">{item.title}</h3>
      <p className="text-gray-600">{item.description}</p>
    </div>
  );
};

const AnimatedServiceSummary: React.FC<{ service: ServiceItemSummary }> = ({ service }) => {
  const [ref, isVisible] = useAnimateOnScroll<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-lg transition-all duration-500 bg-white ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      <h3 className="text-2xl font-semibold text-blue-900 mb-3">{service.title}</h3>
      <p className="text-gray-600">{service.description}</p>
    </div>
  );
};

const AnimatedReview: React.FC<{ review: Review }> = ({ review }) => {
  const [ref, isVisible] = useAnimateOnScroll<HTMLDivElement>();
  return (
    <div ref={ref} className={`bg-blue-800 p-6 rounded-lg shadow-lg transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      <div className="flex items-center mb-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => <StarIcon key={i} className={`h-5 w-5 ${i < review.rating ? 'text-orange-400' : 'text-blue-600'}`} />)}
        </div>
        <p className="font-semibold text-right text-white ml-auto">- {review.author}</p>
      </div>
      <p className="text-blue-100 italic">"{review.quote}"</p>
    </div>
  );
};

const Home: React.FC<HomeProps> = ({ content, onNavigate, galleryContent, reviewsContent }) => {
  const [heroVisible, setHeroVisible] = useState(false);
  const { heroImage } = useHeroImage();
  const { images: galleryImages } = useGallery(galleryContent.images);
  const { reviews, addReview } = useReviews(reviewsContent.items);

  // Hooks for section titles and static content
  const [benefitsTitleRef, benefitsTitleVisible] = useAnimateOnScroll<HTMLHeadingElement>();
  const [servicesTitleRef, servicesTitleVisible] = useAnimateOnScroll<HTMLDivElement>();
  const [reviewsContainerRef, reviewsContainerVisible] = useAnimateOnScroll<HTMLDivElement>();
  const [galleryRef, galleryVisible] = useAnimateOnScroll<HTMLDivElement>();
  const [contactRef, contactVisible] = useAnimateOnScroll<HTMLDivElement>();

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
            <h2 ref={benefitsTitleRef} className={`text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12 transition-all duration-700 ease-out ${benefitsTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>{content.benefits.title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.benefits.items.map((item, index) => (
              <AnimatedBenefitCard key={index} item={item} />
            ))}
          </div>
      </Section>

      {/* Services Section */}
      <Section>
        <div ref={servicesTitleRef} className="text-center">
          <h2 className={`text-3xl md:text-4xl font-bold text-blue-900 transition-all duration-700 ease-out ${servicesTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>{content.services.title}</h2>
          <p className={`mt-4 max-w-2xl mx-auto text-lg text-gray-600 transition-all duration-700 ease-out delay-100 ${servicesTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>{content.services.description}</p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.services.items.map((service, index) => (
            <AnimatedServiceSummary key={index} service={service} />
          ))}
        </div>
        <div className="text-center mt-12">
          <button onClick={() => onNavigate('services')} className={`bg-orange-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 ease-out ${servicesTitleVisible ? 'opacity-100' : 'opacity-0'}`}>
            {content.services.cta}
          </button>
        </div>
      </Section>

      {/* Reviews Section */}
      <Section className="bg-blue-900">
        <div ref={reviewsContainerRef} className={`transition-all duration-700 ease-out ${reviewsContainerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">{reviewsContent.title}</h2>
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-1">
              <RatingSummary reviews={reviews} />
            </div>
            <div className="lg:col-span-2 space-y-6">
              {reviews.slice(0, 3).map((review, index) => (
                <AnimatedReview key={index} review={review} />
              ))}
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto mt-16">
             <ReviewForm content={reviewsContent} onAddReview={addReview} />
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