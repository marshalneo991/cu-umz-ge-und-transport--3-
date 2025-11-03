import React, { useState } from 'react';
import { ContactContent } from '../types';
import Section, { useAnimateOnScroll } from '../components/Section';
import { PhoneIcon, MailIcon, WhatsappIcon, LocationIcon } from '../components/icons/Icons';

interface ContactProps {
  content: ContactContent;
}

const Contact: React.FC<ContactProps> = ({ content }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formRef, isFormVisible] = useAnimateOnScroll<HTMLDivElement>();
  const [detailsRef, isDetailsVisible] = useAnimateOnScroll<HTMLDivElement>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here
    setFormSubmitted(true);
  };

  return (
    <>
      <div className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">{content.title}</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-blue-100">{content.description}</p>
        </div>
      </div>
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div 
            ref={formRef} 
            className="bg-white p-8 rounded-lg shadow-lg border border-gray-200"
          >
            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <h3 className="text-2xl font-bold text-green-600">{content.form.success}</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className={`transition-all duration-500 ease-out ${isFormVisible ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-4'}`}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">{content.form.name}</label>
                    <input type="text" id="name" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white" />
                  </div>
                  <div className={`transition-all duration-500 ease-out ${isFormVisible ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-4'}`}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">{content.form.email}</label>
                    <input type="email" id="email" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white" />
                  </div>
                </div>
                <div className={`mt-6 transition-all duration-500 ease-out ${isFormVisible ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-4'}`}>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{content.form.phone}</label>
                  <input type="tel" id="phone" className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white" />
                </div>
                <div className={`mt-6 transition-all duration-500 ease-out ${isFormVisible ? 'opacity-100 translate-y-0 delay-400' : 'opacity-0 translate-y-4'}`}>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">{content.form.message}</label>
                  <textarea id="message" rows={5} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white"></textarea>
                </div>
                <div className={`mt-8 transition-all duration-500 ease-out ${isFormVisible ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-4'}`}>
                  <button type="submit" className="w-full bg-orange-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-orange-600 transition-all duration-300 text-lg transform hover:scale-105 hover:shadow-lg active:scale-95">
                    {content.form.submit}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Contact Details & CTAs */}
          <div 
            ref={detailsRef}
            className={`space-y-8 transition-all duration-700 ease-out delay-200 ${isDetailsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">{content.details.title}</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start"><LocationIcon className="h-6 w-6 text-orange-500 mr-4 mt-1 flex-shrink-0" /><span>{content.details.address}</span></li>
                <li className="flex items-center"><PhoneIcon className="h-6 w-6 text-orange-500 mr-4 flex-shrink-0" /><span>{content.details.phone}</span></li>
                <li className="flex items-center"><MailIcon className="h-6 w-6 text-orange-500 mr-4 flex-shrink-0" /><span>{content.details.email}</span></li>
              </ul>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <iframe
                  src="https://maps.google.com/maps?q=Birkenallee%2013,%2022147%20Hamburg&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Company Location on Google Maps"
              ></iframe>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="https://wa.me/491234567890" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 hover:shadow-md active:scale-95">
                <WhatsappIcon className="h-6 w-6 mr-3" />
                {content.cta.whatsapp}
              </a>
              <a href="tel:+491234567890" className="flex items-center justify-center p-4 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-md active:scale-95">
                <PhoneIcon className="h-6 w-6 mr-3" />
                {content.cta.call}
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Contact;