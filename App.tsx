import React, { useState, useCallback } from 'react';
import { content } from './constants/content';
import { Language, Page } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Admin from './pages/Admin';
import BackToTopButton from './components/BackToTopButton';
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('de');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { isAdmin } = useAuth();
  
  const currentContent = content[language];

  const handleSetPage = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home content={currentContent.home} galleryContent={currentContent.gallery} reviewsContent={currentContent.home.reviews} onNavigate={handleSetPage} />;
      case 'about':
        return <About content={currentContent.about} />;
      case 'services':
        return <Services content={currentContent.services} />;
      case 'gallery':
        return <Gallery content={currentContent.gallery} />;
      case 'contact':
        return <Contact content={currentContent.contact} />;
      case 'login':
        return <Login content={currentContent.login} onNavigate={handleSetPage} />;
      case 'admin':
        // Protected Route: Only render Admin page if isAdmin is true
        return isAdmin ? <Admin content={currentContent.admin} /> : <Login content={currentContent.login} onNavigate={handleSetPage} />;
      default:
        return <Home content={currentContent.home} galleryContent={currentContent.gallery} reviewsContent={currentContent.home.reviews} onNavigate={handleSetPage} />;
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col text-gray-800">
      <Header
        content={currentContent.header}
        language={language}
        setLanguage={setLanguage}
        currentPage={currentPage}
        onNavigate={handleSetPage}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer content={currentContent.footer} onNavigate={handleSetPage} />
      <BackToTopButton />
    </div>
  );
};

export default App;