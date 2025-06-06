import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Home, Award } from 'lucide-react';
import Button from '../components/ui/Button';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-blue-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              About Luxury Stays Club
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Your premier partner in luxury property management in Utah
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Founded with a vision to redefine luxury property management, Luxury Stays Club has grown to become Utah's premier property management company. Our journey began with a simple belief: that exceptional properties deserve exceptional care and service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <img 
                  src="https://images.pexels.com/photos/7031607/pexels-photo-7031607.jpeg" 
                  alt="Luxury property management" 
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                  A Legacy of Excellence
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Since our inception, we've been dedicated to providing unparalleled service to both property owners and guests. Our deep understanding of the luxury market, combined with our commitment to excellence, has made us the trusted choice for discerning property owners in Utah.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Today, we manage an exclusive portfolio of luxury properties in prime locations across Utah, including Park City, Deer Valley, and Heber City. Our success is built on our unwavering commitment to quality, attention to detail, and personalized service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
              Why Choose Luxury Stays Club?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We combine local expertise with luxury hospitality to deliver exceptional experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-gold-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Luxury Focus</h3>
              <p className="text-gray-600">
                Specialized in high-end property management and luxury guest experiences
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-gold-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Local Expertise</h3>
              <p className="text-gray-600">
                Deep knowledge of Utah's luxury market and prime locations
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="text-gold-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Full Service</h3>
              <p className="text-gray-600">
                Comprehensive property care and guest services
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-gold-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Results Driven</h3>
              <p className="text-gray-600">
                Maximizing returns while maintaining property value
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                Our Commitment to Excellence
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Delivering unparalleled service and exceptional experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Quality Assurance</h3>
                <p className="text-gray-600 mb-6">
                  Every property in our portfolio undergoes rigorous quality checks and regular maintenance to ensure the highest standards of luxury living.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li>• Regular property inspections</li>
                  <li>• Professional cleaning services</li>
                  <li>• Preventive maintenance</li>
                  <li>• Quality amenity restocking</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Guest Experience</h3>
                <p className="text-gray-600 mb-6">
                  We go above and beyond to ensure every guest enjoys a memorable and comfortable stay at our properties.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li>• 24/7 guest support</li>
                  <li>• Personalized welcome</li>
                  <li>• Local recommendations</li>
                  <li>• Concierge services</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Owner Benefits</h3>
                <p className="text-gray-600 mb-6">
                  Property owners enjoy peace of mind knowing their investment is in capable hands and generating optimal returns.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li>• Revenue optimization</li>
                  <li>• Regular reporting</li>
                  <li>• Property protection</li>
                  <li>• Market insights</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join Utah's premier luxury property management company
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              className="bg-gold-400 hover:bg-gold-500 text-blue-900"
              as={Link}
              to="/contact"
            >
              Contact Us
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-white border-white hover:bg-white hover:text-blue-900"
              as={Link}
              to="/properties"
            >
              View Properties
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;