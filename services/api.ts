import { Review } from '../types';

// In a real application, this would be your API's base URL
const API_BASE_URL = '/api';

/**
 * Fetches all reviews from the server.
 * In this simulated environment, this will fail, triggering the localStorage fallback.
 * @returns A promise that resolves to an array of reviews.
 */
export const fetchReviews = async (): Promise<Review[]> => {
    const response = await fetch(`${API_BASE_URL}/reviews`);

    if (!response.ok) {
        throw new Error('Failed to fetch reviews from the server.');
    }

    return response.json();
};

/**
 * Posts a new review to the server.
 * @param review The new review object to be saved.
 * @returns A promise that resolves to the saved review object from the server.
 */
export const postReview = async (review: Review): Promise<Review> => {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
    });

    if (!response.ok) {
        throw new Error('Failed to post review to the server.');
    }

    return response.json();
};
