import React, { useState, useRef } from 'react';
import { AdminContent } from '../types';
import { useGallery } from '../hooks/useGallery';
import { useHeroImage } from '../hooks/useHeroImage';
import { content } from '../constants/content';
import Section from '../components/Section';

interface AdminProps {
  content: AdminContent;
}

const Admin: React.FC<AdminProps> = ({ content: adminContent }) => {
  // Hook for Hero Image
  const { heroImage, updateHeroImage } = useHeroImage();
  const [newHeroImageSrc, setNewHeroImageSrc] = useState<string | null>(null);
  const heroFileInputRef = useRef<HTMLInputElement>(null);

  // Hook for Gallery Images
  const { images, addImage, deleteImage } = useGallery(content.en.gallery.images);
  const [newGalleryImageSrc, setNewGalleryImageSrc] = useState<string | null>(null);
  const [newGalleryImageAlt, setNewGalleryImageAlt] = useState('');
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  const handleHeroFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewHeroImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateHeroImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHeroImageSrc) {
      updateHeroImage(newHeroImageSrc);
      setNewHeroImageSrc(null);
      if (heroFileInputRef.current) {
        heroFileInputRef.current.value = '';
      }
    }
  };

  const handleGalleryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewGalleryImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddGalleryImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGalleryImageSrc && newGalleryImageAlt) {
      addImage({ src: newGalleryImageSrc, alt: newGalleryImageAlt });
      setNewGalleryImageSrc(null);
      setNewGalleryImageAlt('');
      if (galleryFileInputRef.current) {
        galleryFileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <div className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">{adminContent.title}</h1>
        </div>
      </div>
      <Section>
        <div className="max-w-4xl mx-auto">
          {/* Hero Image Management */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">{adminContent.heroManagement.title}</h2>
            
            <div className="mb-8">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">{adminContent.heroManagement.currentImageTitle}</h3>
                <div className="relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden border">
                    <img src={heroImage} alt="Current hero" className="w-full h-full object-cover" />
                </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">{adminContent.heroManagement.uploadTitle}</h3>
              <form onSubmit={handleUpdateHeroImage} className="space-y-4">
                <div>
                  <label htmlFor="heroImageFile" className="block text-sm font-medium text-gray-700">{adminContent.heroManagement.form.imageFile}</label>
                  <input
                    type="file"
                    id="heroImageFile"
                    ref={heroFileInputRef}
                    onChange={handleHeroFileChange}
                    accept="image/*"
                    required
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 cursor-pointer"
                  />
                </div>
                
                {newHeroImageSrc && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700">Image Preview:</p>
                    <img src={newHeroImageSrc} alt="Preview" className="mt-2 rounded-lg shadow-sm max-h-40 border"/>
                  </div>
                )}
                
                <div>
                  <button 
                    type="submit" 
                    disabled={!newHeroImageSrc} 
                    className="w-full md:w-auto bg-orange-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-orange-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {adminContent.heroManagement.form.submit}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Gallery Management */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">{adminContent.galleryManagement.title}</h2>

            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">{adminContent.galleryManagement.uploadTitle}</h3>
              <form onSubmit={handleAddGalleryImage} className="space-y-4">
                <div>
                  <label htmlFor="galleryImageFile" className="block text-sm font-medium text-gray-700">{adminContent.galleryManagement.form.imageFile}</label>
                  <input
                    type="file"
                    id="galleryImageFile"
                    ref={galleryFileInputRef}
                    onChange={handleGalleryFileChange}
                    accept="image/*"
                    required
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 cursor-pointer"
                  />
                </div>
                
                {newGalleryImageSrc && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700">Image Preview:</p>
                    <img src={newGalleryImageSrc} alt="Preview" className="mt-2 rounded-lg shadow-sm max-h-40 border"/>
                  </div>
                )}

                <div>
                  <label htmlFor="altText" className="block text-sm font-medium text-gray-700">{adminContent.galleryManagement.form.altText}</label>
                  <input
                    type="text"
                    id="altText"
                    value={newGalleryImageAlt}
                    onChange={(e) => setNewGalleryImageAlt(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    placeholder="A brief description of the image"
                  />
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    disabled={!newGalleryImageSrc || !newGalleryImageAlt} 
                    className="w-full md:w-auto bg-orange-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-orange-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {adminContent.galleryManagement.form.submit}
                  </button>
                </div>
              </form>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-4">{adminContent.galleryManagement.currentImagesTitle}</h3>
              {images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map((image) => (
                    <div key={image.src} className="relative group border rounded-lg overflow-hidden shadow-sm">
                      <img src={image.src} alt={image.alt} className="w-full h-32 object-cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                        <button
                          onClick={() => deleteImage(image.src)}
                          className="text-white bg-red-600 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-semibold"
                        >
                          {adminContent.galleryManagement.deleteButton}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">{adminContent.galleryManagement.noImages}</p>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Admin;