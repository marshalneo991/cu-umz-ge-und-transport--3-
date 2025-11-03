import { useState, useEffect, useCallback } from 'react';

const SERVICE_IMAGES_STORAGE_KEY = 'serviceImages';

// Type for the stored object
type ServiceImages = Record<string, string>;

export const useServiceImages = () => {
  const [serviceImages, setServiceImages] = useState<ServiceImages>({});

  useEffect(() => {
    try {
      const storedImages = localStorage.getItem(SERVICE_IMAGES_STORAGE_KEY);
      if (storedImages) {
        setServiceImages(JSON.parse(storedImages));
      } else {
        // Initialize with an empty object
        const initialImages: ServiceImages = {};
        localStorage.setItem(SERVICE_IMAGES_STORAGE_KEY, JSON.stringify(initialImages));
        setServiceImages(initialImages);
      }
    } catch (error) {
      console.error("Failed to access localStorage for service images:", error);
      setServiceImages({});
    }
  }, []);

  const updateStorageAndState = (newImages: ServiceImages) => {
    setServiceImages(newImages);
    localStorage.setItem(SERVICE_IMAGES_STORAGE_KEY, JSON.stringify(newImages));
  };

  const updateServiceImage = useCallback((serviceKey: string, imageUrl: string) => {
    const updatedImages = { ...serviceImages, [serviceKey]: imageUrl };
    updateStorageAndState(updatedImages);
  }, [serviceImages]);

  const resetServiceImage = useCallback((serviceKey: string) => {
    const { [serviceKey]: _, ...remainingImages } = serviceImages;
    updateStorageAndState(remainingImages);
  }, [serviceImages]);

  return { serviceImages, updateServiceImage, resetServiceImage };
};
