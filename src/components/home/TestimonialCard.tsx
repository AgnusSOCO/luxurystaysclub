import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  testimonial: {
    id: number;
    text: string;
    author: string;
    location: string;
    rating: number;
  };
}

const TestimonialCard: React.FC<TestimonialProps> = ({ testimonial }) => {
  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(testimonial.rating);
    const hasHalfStar = testimonial.rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={18} className="text-gold-400 fill-gold-400" />);
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="relative">
          <Star size={18} className="text-gold-400" />
          <Star 
            size={18} 
            className="text-gold-400 fill-gold-400 absolute top-0 left-0" 
            style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
          />
        </span>
      );
    }

    const remainingStars = 5 - Math.ceil(testimonial.rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={18} className="text-gold-400" />);
    }

    return (
      <div className="flex">
        {stars}
      </div>
    );
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="mb-4">
        {renderRating()}
      </div>
      <blockquote className="text-gray-700 mb-6">
        "{testimonial.text}"
      </blockquote>
      <div className="flex items-center">
        <div className="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center text-gray-700 font-bold">
          {testimonial.author.charAt(0)}
        </div>
        <div className="ml-4">
          <p className="font-semibold text-gray-900">{testimonial.author}</p>
          <p className="text-gray-500 text-sm">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;