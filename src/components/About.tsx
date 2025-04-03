import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-serif mb-6">At Luxury Stays Club</h2>
            <p className="text-gray-600 mb-6 text-lg">
              We recognize that every property and guest is unique. We take pride in delivering distinctive 
              and memorable services tailored to the specific needs of each client, ensuring a personalized 
              experience for every stay.
            </p>
            <p className="text-gray-600 mb-8 text-lg">
              Our expert concierge team is dedicated to ensuring meticulous care for your property. From 
              property maintenance and guest services to marketing and booking management, we handle every 
              detail to provide comprehensive and seamless support.
            </p>
            <button className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors">
              Learn More About Us
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                className="rounded-2xl"
                alt="Luxury interior"
              />
              <img 
                src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                className="rounded-2xl"
                alt="Luxury bedroom"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img 
                src="https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                className="rounded-2xl"
                alt="Luxury bathroom"
              />
              <img 
                src="https://images.unsplash.com/photo-1591825729269-caeb344f6df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                className="rounded-2xl"
                alt="Luxury pool"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;