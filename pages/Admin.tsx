import React, { useState, useRef } from 'react';
import { AdminContent, Service } from '../types';
import { useGallery } from '../hooks/useGallery';
import { useHeroImage } from '../hooks/useHeroImage';
import { useServiceImages } from '../hooks/useServiceImages';
import { useTeamMembers, TeamMember } from '../hooks/useTeamMembers';
import { content } from '../constants/content';
import Section from '../components/Section';

interface AdminProps {
  content: AdminContent;
}

const Admin: React.FC<AdminProps> = ({ content: adminContent }) => {
  // Hero Image Hook
  const { heroImage, updateHeroImage, resetHeroImage } = useHeroImage();

  // Service Images Hook
  const { serviceImages, updateServiceImage, resetServiceImage } = useServiceImages();

  // Team Members Hook
  const { teamMembers, addTeamMember, deleteTeamMember, updateTeamMemberImage } = useTeamMembers();
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('');
  const [newMemberImageSrc, setNewMemberImageSrc] = useState<string | null>(null);
  const teamMemberFileInputRef = useRef<HTMLInputElement>(null);

  // Gallery Images Hook
  const { images, addImage, deleteImage } = useGallery(content.en.gallery.images);
  const [newGalleryImageSrc, setNewGalleryImageSrc] = useState<string | null>(null);
  const [newGalleryImageAlt, setNewGalleryImageAlt] = useState('');
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (src: string | null) => void) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                updateHeroImage(reader.result as string);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleServiceFileChange = (e: React.ChangeEvent<HTMLInputElement>, serviceKey: string) => {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
            updateServiceImage(serviceKey, reader.result as string);
        };
        reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleTeamMemberImageChange = (e: React.ChangeEvent<HTMLInputElement>, memberKey: string) => {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                updateTeamMemberImage(memberKey, reader.result as string);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMemberName && newMemberRole && newMemberImageSrc) {
      const newMember: TeamMember = {
        key: newMemberName.toLowerCase().replace(/\s+/g, '-'),
        name: newMemberName,
        role: newMemberRole,
        src: newMemberImageSrc,
      };
      addTeamMember(newMember);
      setNewMemberName('');
      setNewMemberRole('');
      setNewMemberImageSrc(null);
      if (teamMemberFileInputRef.current) teamMemberFileInputRef.current.value = '';
    }
  };

  const handleAddGalleryImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGalleryImageSrc && newGalleryImageAlt) {
      addImage({ src: newGalleryImageSrc, alt: newGalleryImageAlt });
      setNewGalleryImageSrc(null);
      setNewGalleryImageAlt('');
      if (galleryFileInputRef.current) galleryFileInputRef.current.value = '';
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
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Image Management */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">{adminContent.heroManagement.title}</h2>
            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-4">{adminContent.heroManagement.currentImageTitle}</h3>
              <div className="relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden border">
                  <img src={heroImage} alt="Current hero" className="w-full h-full object-cover" />
              </div>
              <div className="mt-4 flex items-center gap-4">
                <label htmlFor="heroImageFile" className="text-sm text-orange-600 hover:underline cursor-pointer font-medium">
                  {adminContent.heroManagement.changeImage}
                  <input type="file" id="heroImageFile" onChange={handleHeroImageChange} accept="image/*" className="sr-only"/>
                </label>
                <button onClick={resetHeroImage} className="text-sm text-red-600 hover:underline">{adminContent.heroManagement.resetButton}</button>
              </div>
            </div>
          </div>

          {/* Service Image Management */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">{adminContent.serviceImageManagement.title}</h2>
            <div className="space-y-6">
              {content.de.services.services.map((service: Service, index) => (
                <div key={service.key} className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg">
                  <img src={serviceImages[service.key] || `https://picsum.photos/400/400?image=3${index}`} alt={service.title} className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
                  <div className="flex-grow text-center sm:text-left">
                    <h4 className="font-bold text-lg text-blue-800">{service.title}</h4>
                    <label htmlFor={`service-image-${service.key}`} className="text-sm text-orange-600 hover:underline cursor-pointer font-medium">{adminContent.serviceImageManagement.changeImage}
                      <input type="file" id={`service-image-${service.key}`} onChange={(e) => handleServiceFileChange(e, service.key)} accept="image/*" className="sr-only"/>
                    </label>
                  </div>
                  <button onClick={() => resetServiceImage(service.key)} className="text-xs text-red-600 hover:underline flex-shrink-0">{adminContent.serviceImageManagement.resetButton}</button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Team Management */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">{adminContent.teamManagement.title}</h2>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">{adminContent.teamManagement.currentTeam}</h3>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.key} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img src={member.src} alt={member.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-grow">
                      <p className="font-bold text-blue-800">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.role}</p>
                      <label htmlFor={`team-image-${member.key}`} className="text-sm text-orange-600 hover:underline cursor-pointer font-medium mt-1 inline-block">
                        {adminContent.teamManagement.changeImage}
                        <input type="file" id={`team-image-${member.key}`} onChange={(e) => handleTeamMemberImageChange(e, member.key)} accept="image/*" className="sr-only"/>
                      </label>
                    </div>
                    <button onClick={() => deleteTeamMember(member.key)} className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full hover:bg-red-600 self-start">{adminContent.teamManagement.deleteButton}</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">{adminContent.teamManagement.addMemberTitle}</h3>
              <form onSubmit={handleAddTeamMember} className="space-y-4">
                  <input type="text" value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} required placeholder={adminContent.teamManagement.form.name} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"/>
                  <input type="text" value={newMemberRole} onChange={(e) => setNewMemberRole(e.target.value)} required placeholder={adminContent.teamManagement.form.role} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"/>
                  <input type="file" ref={teamMemberFileInputRef} onChange={(e) => handleFileChange(e, setNewMemberImageSrc)} required accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 cursor-pointer"/>
                  {newMemberImageSrc && <img src={newMemberImageSrc} alt="Preview" className="mt-2 rounded-lg shadow-sm max-h-40 border"/>}
                  <button type="submit" disabled={!newMemberName || !newMemberRole || !newMemberImageSrc} className="w-full md:w-auto bg-orange-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-orange-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">{adminContent.teamManagement.form.submit}</button>
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
                  <input type="file" id="galleryImageFile" ref={galleryFileInputRef} onChange={(e) => handleFileChange(e, setNewGalleryImageSrc)} accept="image/*" required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 cursor-pointer"/>
                </div>
                {newGalleryImageSrc && <img src={newGalleryImageSrc} alt="Preview" className="mt-2 rounded-lg shadow-sm max-h-40 border"/>}
                <div>
                  <label htmlFor="altText" className="block text-sm font-medium text-gray-700">{adminContent.galleryManagement.form.altText}</label>
                  <input type="text" id="altText" value={newGalleryImageAlt} onChange={(e) => setNewGalleryImageAlt(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" placeholder="A brief description of the image"/>
                </div>
                <button type="submit" disabled={!newGalleryImageSrc || !newGalleryImageAlt} className="w-full md:w-auto bg-orange-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-orange-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">{adminContent.galleryManagement.form.submit}</button>
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
                        <button onClick={() => deleteImage(image.src)} className="text-white bg-red-600 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-semibold">{adminContent.galleryManagement.deleteButton}</button>
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