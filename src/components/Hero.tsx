import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative h-full flex flex-col justify-center items-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-serif text-center leading-tight mb-6">
          Elevate Your Property's Potential
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-3xl mb-12 text-gray-200">
          Premier luxury property management in Park City, Deer Valley, and beyond
        </p>
        <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors">
          Discover Our Services
        </button>
        
        <div className="absolute bottom-8 animate-bounce">
          <ChevronDown size={32} />
        </div>
      </div>
    </div>
  );
};

export default Hero;