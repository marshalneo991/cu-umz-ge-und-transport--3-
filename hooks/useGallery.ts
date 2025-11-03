import { useState, useEffect, useCallback } from 'react';
import { GalleryImage } from '../types';

const GALLERY_STORAGE_KEY = 'galleryImages';

export const useGallery = (defaultImages: GalleryImage[]) => {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    try {
      const storedImages = localStorage.getItem(GALLERY_STORAGE_KEY);
      if (storedImages) {
        setImages(JSON.parse(storedImages));
      } else {
        // Initialize with default images if local storage is empty
        localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(defaultImages));
        setImages(defaultImages);
      }
    } catch (error) {
      console.error("Failed to access localStorage:", error);
      setImages(defaultImages);
    }
  }, [defaultImages]);

  const updateStorageAndState = (newImages: GalleryImage[]) => {
    setImages(newImages);
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(newImages));
  };

  const addImage = useCallback((newImage: GalleryImage) => {
    const currentImages = [...images];
    updateStorageAndState([newImage, ...currentImages]);
  }, [images]);

  const deleteImage = useCallback((src: string) => {
    const filteredImages = images.filter(image => image.src !== src);
    updateStorageAndState(filteredImages);
  }, [images]);

  return { images, addImage, deleteImage };
};
