import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif mb-4">Luxury Stays Club</h3>
            <p className="text-gray-400">
              Your premier partner for luxury property management in Utah
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Property Management</li>
              <li>Concierge Services</li>
              <li>Interior Design</li>
              <li>Guest Experience</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Locations</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Park City</li>
              <li>Deer Valley</li>
              <li>Heber City</li>
              <li>Jordanelle</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Instagram</li>
              <li>Facebook</li>
              <li>LinkedIn</li>
              <li>Twitter</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Luxury Stays Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;