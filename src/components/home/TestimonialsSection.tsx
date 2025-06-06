import React from 'react';
import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    id: 1,
    text: "Our family vacation in Heber City was absolutely perfect thanks to Luxury Stays Club. The property management team went above and beyond to ensure everything was perfect.",
    author: "James Wilson",
    location: "California, USA",
    rating: 5
  },
  {
    id: 2,
    text: "The attention to detail and concierge service made our stay unforgettable. The property was immaculate and the amenities were top-notch.",
    author: "Sarah Johnson",
    location: "Texas, USA",
    rating: 5
  },
  {
    id: 3,
    text: "As property owners, we couldn't be happier with Luxury Stays Club's management services. They truly understand the luxury market in Utah.",
    author: "Michael Ross",
    location: "New York, USA",
    rating: 4.5
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h6 className="text-blue-800 font-medium mb-2">TESTIMONIALS</h6>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Hear from property owners and guests who have experienced our exceptional service
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;