import React, { useState } from 'react';
import { StarIcon, StarOutlineIcon } from './icons/Icons';

interface StarRatingInputProps {
    rating: number;
    setRating: (rating: number) => void;
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({ rating, setRating }) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <button
                        type="button"
                        key={ratingValue}
                        className="focus:outline-none transform transition-transform duration-150 hover:scale-125"
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                        aria-label={`Rate ${ratingValue} out of 5 stars`}
                    >
                        {ratingValue <= (hover || rating) ? (
                            <StarIcon className="w-8 h-8 text-orange-400" />
                        ) : (
                            <StarOutlineIcon className="w-8 h-8 text-orange-400" />
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default StarRatingInput;
