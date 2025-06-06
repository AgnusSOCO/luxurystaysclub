import React, { useState } from 'react';
import { Mail, MapPin, Clock } from 'lucide-react';
import Button from '../components/ui/Button';
import GoogleMap from '../components/maps/GoogleMap';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    setSubmitted(true);
  };

  // Coordinates for Heber City office
  const officeLocation = {
    lat: 40.5077,
    lng: -111.4134
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-blue-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-blue-100">
              Get in touch with our team to learn more about our luxury property management services
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-6">
                  Send Us a Message
                </h2>

                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
                    <p className="text-green-700">
                      We've received your message and will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      >
                        <option value="">Select a subject</option>
                        <option value="property-management">Property Management Services</option>
                        <option value="booking">Property Booking</option>
                        <option value="partnership">Business Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      ></textarea>
                    </div>

                    <Button type="submit" variant="primary" className="w-full">
                      Send Message
                    </Button>
                  </form>
                )}
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-6">
                  Get in Touch
                </h2>

                <div className="bg-gray-50 rounded-lg p-8 mb-8">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <MapPin className="text-blue-800 mt-1 mr-4" size={24} />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Office Location</h3>
                        <p className="text-gray-600">
                          1012 W Vissen Way<br />
                          Heber City, UT 84032<br />
                          United States
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="text-blue-800 mt-1 mr-4" size={24} />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                        <p className="text-gray-600">
                          <a href="mailto:booking@luxurystaysclub.com" className="hover:text-blue-800 transition-colors">
                            booking@luxurystaysclub.com
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="text-blue-800 mt-1 mr-4" size={24} />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                        <p className="text-gray-600">
                          Monday - Friday: 9:00 AM - 6:00 PM<br />
                          Saturday: 10:00 AM - 4:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900 rounded-lg p-8 text-white">
                  <h3 className="text-xl font-semibold mb-4">24/7 Support for Guests</h3>
                  <p className="mb-6">
                    Our concierge team is available around the clock via email to assist guests with any needs during their stay.
                  </p>
                  <div className="flex items-center">
                    <Mail className="mr-2" size={20} />
                    <a href="mailto:booking@luxurystaysclub.com" className="hover:text-gold-400 transition-colors">
                      booking@luxurystaysclub.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
              Our Location
            </h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-96">
              <GoogleMap lat={officeLocation.lat} lng={officeLocation.lng} zoom={15} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;