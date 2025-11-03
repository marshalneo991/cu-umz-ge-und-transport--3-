import React from 'react';
import { ServicesContent, Service } from '../types';
import Section, { useAnimateOnScroll } from '../components/Section';
import { CheckIcon } from '../components/icons/Icons';
import { useServiceImages } from '../hooks/useServiceImages';

interface ServicesProps {
  content: ServicesContent;
}

const ServiceCard: React.FC<{ service: Service, index: number }> = ({ service, index }) => {
    const [ref, isVisible] = useAnimateOnScroll<HTMLDivElement>();
    const { serviceImages } = useServiceImages();
    
    const imageSrc = serviceImages[service.key] || `https://picsum.photos/400/400?image=3${index}`;

    const slideFromClass = index % 2 === 0 ? '-translate-x-10' : 'translate-x-10';
    return (
        <div 
            ref={ref} 
            className={`bg-white p-8 rounded-lg shadow-lg border border-gray-200 flex flex-col md:flex-row gap-8 items-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${slideFromClass}`}`}
            style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
        >
            <div className="flex-shrink-0">
                <img src={imageSrc} alt={service.title} className="w-full md:w-64 h-64 object-cover rounded-lg"/>
            </div>
            <div className="flex-grow">
                <h2 className="text-3xl font-bold text-blue-900 mb-4">{service.title}</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-3">
                    {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center">
                            <CheckIcon className="h-6 w-6 text-orange-500 mr-3" />
                            <span className="text-gray-800">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const Services: React.FC<ServicesProps> = ({ content }) => {
  return (
    <>
      <div className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">{content.title}</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-blue-100">{content.intro}</p>
        </div>
      </div>
      <Section>
        <div className="max-w-5xl mx-auto space-y-12">
          {content.services.map((service, index) => (
            <ServiceCard key={service.key} service={service} index={index} />
          ))}
        </div>
      </Section>
    </>
  );
};

export default Services;