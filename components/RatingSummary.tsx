import React from 'react';
import { Review } from '../types';
import { StarIcon } from './icons/Icons';

interface RatingSummaryProps {
  reviews: Review[];
}

const RatingSummary: React.FC<RatingSummaryProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className="bg-blue-800 p-6 rounded-lg text-center text-white">
        No reviews yet.
      </div>
    );
  }

  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;
  
  const ratingCounts = [0, 0, 0, 0, 0]; // Index 0 for 1 star, etc.
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1]++;
    }
  });

  return (
    <div className="bg-blue-800 p-6 rounded-lg text-white shadow-lg h-full">
      <div className="flex items-center mb-4">
        <p className="text-5xl font-bold text-white mr-4">{averageRating.toFixed(1)}</p>
        <div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className={`h-5 w-5 ${i < Math.round(averageRating) ? 'text-orange-400' : 'text-blue-600'}`} />
            ))}
          </div>
          <p className="text-sm text-blue-200">{totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        {ratingCounts.reverse().map((count, index) => {
          const starValue = 5 - index;
          const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
          return (
            <div key={starValue} className="flex items-center space-x-2">
              <span className="text-sm text-blue-200 w-8">{starValue} ★</span>
              <div className="w-full bg-blue-700 rounded-full h-2.5">
                <div 
                  className="bg-orange-400 h-2.5 rounded-full" 
                  style={{ width: `${percentage}%` }}
                  aria-label={`${percentage.toFixed(0)}% of reviews are ${starValue} stars`}
                ></div>
              </div>
              <span className="text-sm text-blue-200 w-8 text-right">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatingSummary;
