import React, { useState } from 'react';
import { HomeContent, Review } from '../types';
import StarRatingInput from './StarRatingInput';

interface ReviewFormProps {
    content: HomeContent['reviews'];
    onAddReview: (review: Review) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ content, onAddReview }) => {
    const [author, setAuthor] = useState('');
    const [quote, setQuote] = useState('');
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (author && quote && rating > 0) {
            onAddReview({ author, quote, rating });
            setAuthor('');
            setQuote('');
            setRating(0);
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 5000); // Reset form after 5 seconds
        }
    };

    if (submitted) {
        return (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg text-center" role="alert">
                <p className="font-bold">{content.form.success}</p>
            </div>
        );
    }
    
    return (
        <div className="bg-blue-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-center text-white mb-6">{content.addReviewTitle}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="author" className="block text-sm font-medium text-blue-200">{content.form.name}</label>
                    <input 
                        type="text" 
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required 
                        className="mt-1 block w-full bg-blue-700 border-blue-600 text-white rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 px-3 py-2" 
                    />
                </div>
                <div>
                    <label htmlFor="quote" className="block text-sm font-medium text-blue-200">{content.form.review}</label>
                    <textarea 
                        id="quote" 
                        rows={4}
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        required 
                        className="mt-1 block w-full bg-blue-700 border-blue-600 text-white rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 px-3 py-2"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">{content.form.rating}</label>
                    <StarRatingInput rating={rating} setRating={setRating} />
                </div>
                <div>
                    <button 
                        type="submit"
                        disabled={!author || !quote || rating === 0}
                        className="w-full bg-orange-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-orange-600 transition-all duration-300 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        {content.form.submit}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
