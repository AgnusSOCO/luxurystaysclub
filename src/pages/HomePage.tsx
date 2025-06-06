import React, { useState, useEffect } from 'react';
import SearchBar from '../components/booking/SearchBar';
import AboutSection from '../components/home/AboutSection';
import FeaturedProperties from '../components/home/FeaturedProperties';
import ServicesSection from '../components/home/ServicesSection';
import LocationsSection from '../components/home/LocationsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CallToAction from '../components/home/CallToAction';

const HomePage: React.FC = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsHeaderVisible(true);
    }, 300);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(https://images.pexels.com/photos/754268/pexels-photo-754268.jpeg)'
        }}
      >
        <div className="container mx-auto px-4 z-10">
          <div className={`transition-all duration-1000 ease-out transform ${isHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                Luxury Property Management in Utah
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Premier property management services in Heber City
              </p>
            </div>
            
            <SearchBar />
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-32"></div>
      </section>

      <AboutSection />
      <FeaturedProperties />
      <ServicesSection />
      <LocationsSection />
      <TestimonialsSection />
      <CallToAction />
    </div>
  );
};

export default HomePage;