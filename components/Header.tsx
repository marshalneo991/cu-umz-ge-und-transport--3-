import React, { useState } from 'react';
import { HeaderContent, Language, Page } from '../types';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  content: HeaderContent;
  language: Language;
  setLanguage: (lang: Language) => void;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ content, language, setLanguage, currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAdmin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onNavigate('home');
    setIsMenuOpen(false);
  };

  const navLinks: { page: Page; label: string; adminOnly?: boolean }[] = [
    { page: 'home', label: content.nav.home },
    { page: 'about', label: content.nav.about },
    { page: 'services', label: content.nav.services },
    { page: 'gallery', label: content.nav.gallery },
    { page: 'contact', label: content.nav.contact },
    { page: 'admin', label: content.nav.admin, adminOnly: true },
  ];

  const filteredNavLinks = navLinks.filter(link => !link.adminOnly || isAdmin);

  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-extrabold text-blue-900 cursor-pointer" onClick={() => onNavigate('home')}>
          CU<span className="text-orange-500">Umzüge</span>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-8">
          {filteredNavLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => onNavigate(link.page)}
              className={`text-base font-medium ${currentPage === link.page ? 'text-orange-500' : 'text-gray-600'} hover:text-orange-500 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center border border-gray-300 rounded-full">
            <button onClick={() => setLanguage('de')} className={`px-3 py-1 text-sm rounded-full transition-colors duration-300 ${language === 'de' ? 'bg-blue-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>DE</button>
            <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-sm rounded-full transition-colors duration-300 ${language === 'en' ? 'bg-blue-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>EN</button>
          </div>
          {isAdmin ? (
            <button onClick={handleLogout} className="bg-gray-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-gray-700 transition-all duration-300 shadow-sm">
              {content.nav.logout}
            </button>
          ) : (
            <button onClick={() => onNavigate('login')} className="bg-blue-800 text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-900 transition-all duration-300 shadow-sm">
              {content.nav.login}
            </button>
          )}
          <button onClick={() => onNavigate('contact')} className="bg-orange-500 text-white font-semibold px-5 py-2 rounded-full hover:bg-orange-600 transition-all duration-300 shadow-sm transform hover:scale-105 hover:shadow-md active:scale-95">
            {content.cta}
          </button>
        </div>

        <div className="lg:hidden flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg absolute top-full left-0 w-full border-t border-gray-200">
          <nav className="flex flex-col items-center p-4 space-y-4">
            {filteredNavLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => { onNavigate(link.page); setIsMenuOpen(false); }}
                className={`text-lg font-medium ${currentPage === link.page ? 'text-orange-500' : 'text-gray-700'} hover:text-orange-500 active:text-orange-600 transition-colors`}
              >
                {link.label}
              </button>
            ))}
            <button onClick={() => { onNavigate('contact'); setIsMenuOpen(false); }} className="bg-orange-500 text-white font-semibold w-full max-w-xs px-6 py-3 rounded-full hover:bg-orange-600 transition-all duration-300 mt-4 transform hover:scale-105 active:scale-95">
              {content.cta}
            </button>
             {isAdmin ? (
              <button onClick={handleLogout} className="bg-gray-600 text-white font-semibold w-full max-w-xs px-6 py-3 rounded-full hover:bg-gray-700 transition-all duration-300 mt-2">
                {content.nav.logout}
              </button>
            ) : (
              <button onClick={() => {onNavigate('login'); setIsMenuOpen(false);}} className="bg-blue-800 text-white font-semibold w-full max-w-xs px-6 py-3 rounded-full hover:bg-blue-900 transition-all duration-300 mt-2">
                {content.nav.login}
              </button>
            )}
            <div className="flex items-center border border-gray-300 rounded-full mt-4">
                <button onClick={() => setLanguage('de')} className={`px-4 py-2 text-sm rounded-full transition-colors duration-300 ${language === 'de' ? 'bg-blue-900 text-white' : 'text-gray-600'}`}>DE</button>
                <button onClick={() => setLanguage('en')} className={`px-4 py-2 text-sm rounded-full transition-colors duration-300 ${language === 'en' ? 'bg-blue-900 text-white' : 'text-gray-600'}`}>EN</button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;