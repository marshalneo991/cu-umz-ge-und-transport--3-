import React from 'react';
// Fix: Updated import for Page to point to the centralized types.ts file.
import { FooterContent, Page } from '../types';
import { PhoneIcon, MailIcon, LocationIcon } from './icons/Icons';

interface FooterProps {
  content: FooterContent;
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ content, onNavigate }) => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-extrabold">
              CU <span className="text-orange-500">Umzüge</span>
            </h3>
            <p className="mt-4 text-blue-200">{content.company.description}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold uppercase tracking-wider">{content.links.title}</h4>
            <ul className="mt-4 space-y-2">
              {content.links.items.map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => onNavigate(item.page)}
                    className="text-blue-200 hover:text-white hover:underline transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold uppercase tracking-wider">{content.contact.title}</h4>
            <ul className="mt-4 space-y-3 text-blue-200">
              <li className="flex items-start">
                <LocationIcon className="h-5 w-5 text-orange-400 mr-3 mt-1 flex-shrink-0" />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content.contact.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline transition-colors duration-200"
                >
                  {content.contact.address}
                </a>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-orange-400 mr-3 flex-shrink-0" />
                <a
                  href={`tel:${content.contact.phone.replace(/\s/g, '')}`}
                  className="hover:text-white hover:underline transition-colors duration-200"
                >
                  {content.contact.phone}
                </a>
              </li>
              <li className="flex items-center">
                <MailIcon className="h-5 w-5 text-orange-400 mr-3 flex-shrink-0" />
                <a
                  href={`mailto:${content.contact.email}`}
                  className="hover:text-white hover:underline transition-colors duration-200"
                >
                  {content.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-blue-950 py-4">
        <div className="container mx-auto px-6 text-center text-sm text-blue-300">
          {content.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;