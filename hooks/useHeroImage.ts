import { useState, useEffect, useCallback } from 'react';

const HERO_IMAGE_STORAGE_KEY = 'heroImageURL';
const DEFAULT_HERO_IMAGE = 'https://picsum.photos/1600/900?image=1070';

export const useHeroImage = () => {
  const [heroImage, setHeroImage] = useState<string>(DEFAULT_HERO_IMAGE);

  useEffect(() => {
    try {
      const storedImage = localStorage.getItem(HERO_IMAGE_STORAGE_KEY);
      if (storedImage) {
        setHeroImage(storedImage);
      } else {
        localStorage.setItem(HERO_IMAGE_STORAGE_KEY, DEFAULT_HERO_IMAGE);
        setHeroImage(DEFAULT_HERO_IMAGE);
      }
    } catch (error) {
      console.error("Failed to access localStorage:", error);
      setHeroImage(DEFAULT_HERO_IMAGE);
    }
  }, []);

  const updateHeroImage = useCallback((newImageUrl: string) => {
    try {
      localStorage.setItem(HERO_IMAGE_STORAGE_KEY, newImageUrl);
      setHeroImage(newImageUrl);
    } catch (error) {
      console.error("Failed to set hero image in localStorage:", error);
    }
  }, []);

  return { heroImage, updateHeroImage };
};
