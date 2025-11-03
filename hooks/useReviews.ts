import { useState, useEffect, useCallback } from 'react';
import { Review } from '../types';
import { fetchReviews, postReview } from '../services/api';

const REVIEWS_STORAGE_KEY = 'customerReviews';

export const useReviews = (defaultReviews: Review[]) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        // 1. Attempt to fetch reviews from the API
        const serverReviews = await fetchReviews();
        setReviews(serverReviews);
        localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(serverReviews));
      } catch (error) {
        // 2. If API fails, fall back to localStorage
        console.warn("API fetch failed, falling back to localStorage.", error);
        try {
          const storedReviews = localStorage.getItem(REVIEWS_STORAGE_KEY);
          if (storedReviews) {
            setReviews(JSON.parse(storedReviews));
          } else {
            // Initialize with default reviews if local storage is empty
            localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(defaultReviews));
            setReviews(defaultReviews);
          }
        } catch (localError) {
          console.error("Failed to access localStorage for reviews:", localError);
          setReviews(defaultReviews);
        }
      }
    };
    loadReviews();
  }, [defaultReviews]);

  const addReview = useCallback(async (newReview: Review) => {
    // Optimistic UI update
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    // Save to localStorage immediately as a reliable fallback
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updatedReviews));

    try {
      // Attempt to post the review to the server
      await postReview(newReview);
      // If successful, the server is now the source of truth.
      // We might re-fetch or trust the optimistic update.
      console.log("Review successfully synced with the server.");
    } catch (error) {
      console.warn("Failed to sync new review with the server. It has been saved locally.", error);
      // The review is already in the state and localStorage, so no need to revert.
    }
  }, [reviews]);

  return { reviews, addReview };
};
